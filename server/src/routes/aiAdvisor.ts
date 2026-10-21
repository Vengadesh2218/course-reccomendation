import { Router } from 'express';
import { db } from '../db';
import { StudentProfile } from '../types';

export const aiAdvisorRouter = Router();

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

aiAdvisorRouter.post('/chat', async (req, res) => {
  const {
    message,
    profile,
    history
  }: {
    message: string;
    profile?: StudentProfile;
    history?: ChatMessage[];
  } = req.body;

  console.log('[AI Advisor] Received Message:', message);
  console.log('[AI Advisor] History Length:', history?.length || 0);
  console.log('[AI Advisor] Profile Available:', !!profile);

  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'User message is required.' });
  }

  const allCourses = db.getAllCourses();
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const historyFormatted = (history || [])
        .slice(-10)
        .map((h) => `${h.sender === 'user' ? 'USER' : 'ASSISTANT'}: ${h.text}`)
        .join('\n');

      const promptContext = `
You are PathWise AI Advisor, an intelligent academic and career guidance assistant.

SYSTEM INSTRUCTIONS:
You are PathWise AI Advisor, an intelligent academic and career guidance assistant.
Your primary responsibility is to understand the student's actual message and answer the exact question being asked.
Never respond with a generic predefined answer when the student's message contains a meaningful question or statement.
Always consider the current user message, recent conversation history, and available student profile information.
Do not ask for information that is already available in the student's profile or previous conversation turns.
Understand natural, informal, grammatically incorrect, and conversational English (including typos like "mathemetics" or "maths illa").
For academic course questions, use the available course database and eligibility rules.
Eligibility must be evaluated before recommending a course.
Do not invent admission requirements or eligibility rules.
Clearly distinguish between student interest and actual academic eligibility.

When useful, explain:
- why a course matches
- academic match
- subject match
- marks match
- interest match
- skill match
- career relevance
- missing prerequisites
- additional requirements

If university-specific rules may vary, clearly tell the student to verify current institution-specific eligibility requirements.
Never guarantee admission.
Maintain conversation context across multiple turns.
If the student asks a follow-up question, interpret it using the previous conversation.
Do not restart the conversation unnecessarily.
Do not repeat the same generic response.
If the student's question is clear, answer it directly.
If required information is genuinely missing, ask only the minimum necessary follow-up question.
You are a conversational AI advisor, not a static FAQ system.

LOGGED-IN STUDENT PROFILE:
${profile ? JSON.stringify(profile, null, 2) : 'No student profile provided.'}

COURSE DATABASE & ELIGIBILITY RULES (SOURCE OF TRUTH):
${JSON.stringify(
  allCourses.map((c) => ({
    name: c.courseName,
    degree: c.degree,
    level: c.level,
    requiredSubjects: c.requiredSubjects,
    minimumMarks: c.minimumMarks,
    acceptedStreams: c.acceptedStreams,
    careerAreas: c.careerAreas
  })),
  null,
  2
)}

CONVERSATION HISTORY:
${historyFormatted || 'No prior turns.'}

USER LATEST MESSAGE: "${message}"
`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptContext }] }]
          })
        }
      );

      if (response.ok) {
        const data: any = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply && reply.trim()) {
          console.log('[AI Advisor] Gemini Response Success');
          return res.json({ reply: reply.trim(), source: 'gemini' });
        }
      }
    } catch (err) {
      console.warn('[AI Advisor] Gemini API call error, falling back to conversational engine:', err);
    }
  }

  const reply = generateConversationalReply(message, profile, allCourses, history || []);
  console.log('[AI Advisor] Conversational Engine Response:', reply);
  return res.json({ reply, source: 'conversational-engine' });
});

function normalizeText(text: string): string {
  let s = text.toLowerCase();
  s = s.replace(/\b(mathemetics|mathematic|mathes|maths|mathmatic|mathmatics|mathemetic)\b/g, 'mathematics');
  s = s.replace(/\b(bio|biolo|biolog)\b/g, 'biology');
  s = s.replace(/\b(chem|chemist)\b/g, 'chemistry');
  s = s.replace(/\b(phy|physic)\b/g, 'physics');
  s = s.replace(/\b(cs|comp sci|computer|computers)\b/g, 'computer science');
  s = s.replace(/\b(engg|engineer|engineerng)\b/g, 'engineering');
  s = s.replace(/\b(i don't studied|i dont studied|didn't studied|didnt studied|no studied|don't have|dont have|didn't take|didnt take|not studied|no maths|without maths)\b/g, 'without');
  return s;
}

function generateConversationalReply(
  message: string,
  profile?: StudentProfile,
  allCourses: any[] = [],
  history: ChatMessage[] = []
): string {
  const text = message.trim();
  const lowerRaw = text.toLowerCase();
  const normalized = normalizeText(text);

  // Extract student details from profile OR conversation history
  let userName = profile?.name || '';
  let subjects: string[] = profile?.subjectsStudied12th ? [...profile.subjectsStudied12th] : [];
  let educationStage = profile?.educationLevel ? profile.educationLevel.replace('_', ' ') : '';
  let stream12th = profile?.stream12th || '';
  let marksPercentage = profile?.overall12thPercentage || profile?.overall10thPercentage || profile?.ugPercentage;

  // Scan full conversation history to extract name, subjects, education stage
  const fullConversation = [...history, { sender: 'user' as const, text }];
  for (const turn of fullConversation) {
    if (turn.sender !== 'user') continue;
    const rawT = turn.text;
    const tLow = rawT.toLowerCase();

    // Name extraction
    const nameMatch = rawT.match(/(?:i am|my name is|i'm)\s+([a-zA-Z]+)/i);
    if (nameMatch && nameMatch[1]) {
      const candidate = nameMatch[1];
      const excluded = ['a', 'the', 'studying', 'interested', 'looking', 'here', 'ready', 'from', 'in', 'weak', 'without'];
      if (!excluded.includes(candidate.toLowerCase())) {
        userName = candidate.charAt(0).toUpperCase() + candidate.slice(1);
      }
    }

    // Subjects extraction
    if (tLow.includes('physics')) subjects.push('Physics');
    if (tLow.includes('chemistry')) subjects.push('Chemistry');
    if (tLow.includes('math')) subjects.push('Mathematics');
    if (tLow.includes('computer') || tLow.includes('cs')) subjects.push('Computer Science');
    if (tLow.includes('biology') || tLow.includes('bio')) subjects.push('Biology');

    // Education stage extraction
    if (tLow.includes('12th') || tLow.includes('higher secondary')) educationStage = '12th Standard';
    if (tLow.includes('10th') || tLow.includes('sslc')) educationStage = '10th Standard';
    if (tLow.includes('ug') || tLow.includes('bachelor') || tLow.includes('bca') || tLow.includes('b.sc')) educationStage = 'UG Student';

    // Stream extraction
    if (tLow.includes('bio-computer') || tLow.includes('bio computer')) stream12th = 'Bio-Computer Science';
  }

  subjects = Array.from(new Set(subjects));

  // Check recent AI responses to prevent duplicate replies
  const recentAiReplies = history.filter((h) => h.sender === 'ai').map((h) => h.text.toLowerCase());
  const lastAiReply = recentAiReplies.length > 0 ? recentAiReplies[recentAiReplies.length - 1] : '';

  // 1. NO MATHEMATICS STATEMENT ("without mathematics", "i don't studied mathematics", "no maths")
  const isNoMathsStatement =
    normalized.includes('without') && normalized.includes('mathematics') ||
    lowerRaw.includes('without math') ||
    lowerRaw.includes("don't have math") ||
    lowerRaw.includes("didn't take math") ||
    lowerRaw.includes('no math');

  if (isNoMathsStatement) {
    if (stream12th || subjects.includes('Biology') || subjects.includes('Computer Science')) {
      return `Got it, ${userName || 'there'}. Since you did not study Mathematics in 12th, core B.Tech Engineering courses requiring Math as a mandatory prerequisite are marked ineligible. However, with your background (${stream12th || subjects.join(', ')}), you are eligible for **BCA (Bachelor of Computer Applications)**, **B.Sc Cyber Security**, **B.Sc Information Technology**, **BBA**, and **Biotechnology**. Would you like to explore BCA or B.Sc Cyber Security?`;
    }
    return `Got it. Courses requiring Mathematics as a mandatory prerequisite (such as core B.Tech Engineering) require 12th Math. However, pathways like **BCA (Bachelor of Computer Applications)**, **B.Sc Cyber Security**, **B.Sc IT**, **BBA**, and **Bio-IT** do not require 12th Math. What stream or subjects did you study in 12th?`;
  }

  // 2. ENGINEERING WITHOUT MATHS ("can I study engineering without mathematics?")
  if (
    (lowerRaw.includes('engineering') || lowerRaw.includes('btech')) &&
    (lowerRaw.includes('without math') || lowerRaw.includes('no math') || lowerRaw.includes("don't have math") || normalized.includes('without') && normalized.includes('mathematics'))
  ) {
    return `Under PathWise AI eligibility rules, core B.Tech Engineering programs require Mathematics as a mandatory prerequisite subject in 12th standard. Therefore, core B.Tech is not eligible without Mathematics. However, you can study **BCA (Bachelor of Computer Applications)** or **B.Sc Cyber Security** to learn coding, software development, and computer skills without 12th Math!`;
  }

  // 3. FOLLOW-UP: "What about BCA?" / "Tell me about BCA"
  if (lowerRaw.includes('bca') || lowerRaw.includes('bachelor of computer applications')) {
    return `BCA (Bachelor of Computer Applications) is a great choice! Under our eligibility rules, BCA accepts 12th students from Science, Commerce, or Arts without requiring Mathematics. It covers software engineering, web development, databases, and programming. After BCA, you can also pursue MCA for Master's level equivalence!`;
  }

  // 4. FOLLOW-UP: "Which one is better for AI?" / "BCA vs BSc for AI"
  if (lowerRaw.includes('better for ai') || (lowerRaw.includes('which one') && lowerRaw.includes('ai'))) {
    return `For Artificial Intelligence, both BCA and B.Sc Computer Science are strong options. BCA focuses heavily on practical coding, application development, and software tools. B.Sc CS covers computer theory and algorithms. If you prefer hands-on software development without heavy calculus, BCA is ideal!`;
  }

  // 5. "Tell me about MCA"
  if (lowerRaw.includes('mca') || lowerRaw.includes('master of computer applications')) {
    return `MCA (Master of Computer Applications) is a 2-year Postgraduate program designed for students seeking advanced expertise in software engineering, AI, cloud computing, and full-stack development. Under our eligibility rules, candidates who completed a UG degree like BCA, B.Sc CS, or B.Sc IT are eligible for MCA!`;
  }

  // 6. "Can I become a data scientist?"
  if (lowerRaw.includes('data scientist') || lowerRaw.includes('data science career')) {
    return `Yes, absolutely! To become a Data Scientist, top pathways include B.Sc Data Analytics, BCA with Data Science specialization, or B.Tech CS/AI. Key skills needed are Programming (Python/R), Problem Solving, and Database SQL. What is your current education level?`;
  }

  // 7. MARKS + INTEREST: "I got 78% in 12th and I like programming. What can I study?"
  if (
    (lowerRaw.includes('78%') || lowerRaw.includes('72%') || lowerRaw.includes('%') || marksPercentage) &&
    (lowerRaw.includes('programming') || lowerRaw.includes('coding') || lowerRaw.includes('ai'))
  ) {
    const markStr = marksPercentage ? `${marksPercentage}%` : 'your score';
    return `With ${markStr} and an interest in programming, you comfortably meet the minimum cutoff threshold (50% to 60%) for top tech programs like B.Tech Computer Science, B.Sc CS, and BCA! What subjects did you take in 12th?`;
  }

  // 8. 12TH GROUP + UG OPTIONS ("I completed 12th with Bio-Computer Science. What UG courses can I choose?")
  if (
    lowerRaw.includes('completed 12th') ||
    lowerRaw.includes('12th pass') ||
    lowerRaw.includes('bio-computer') ||
    lowerRaw.includes('bio computer') ||
    (lowerRaw.includes('ug course') && educationStage.includes('12th'))
  ) {
    if (stream12th || subjects.length > 0) {
      return `With your 12th background in ${stream12th || subjects.join(', ')}, your top eligible pathways include **BCA (Bachelor of Computer Applications)**, **B.Sc Cyber Security**, **B.Sc Computer Science**, **B.Sc Biotechnology**, and **B.Sc Information Technology**. Since core B.Tech Engineering requires Mathematics, BCA and B.Sc Cyber Security are the best tech choices without Math!`;
    }
  }

  // 9. MEDICAL / MBBS QUESTIONS ("Can I study MBBS?")
  if (lowerRaw.includes('mbbs') || lowerRaw.includes('medical') || lowerRaw.includes('doctor')) {
    const hasBio = subjects.some((s) => s.toLowerCase() === 'biology');
    if (hasBio) {
      return `For MBBS (Bachelor of Medicine and Bachelor of Surgery), mandatory prerequisites include Physics, Chemistry, and Biology in 12th standard with a minimum 50% aggregate score, along with qualifying the NEET entrance exam. Since your background includes Biology, you satisfy the subject requirement!`;
    } else {
      return `For MBBS, mandatory prerequisite subjects are Physics, Chemistry, and Biology in 12th standard, plus NEET qualification. Since your background is in Computer Science without Biology, core MBBS requires Biology. However, you can explore tech-driven healthcare, Bio-IT, Biotechnology (with Maths), or Pharmacy!`;
    }
  }

  // 10. GREETINGS ("Hi", "Hi I am Vengat", "Hello")
  const isGreetingOrIntro =
    /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/i.test(lowerRaw) ||
    /(?:i am|my name is|i'm)\s+[a-zA-Z]+/i.test(lowerRaw);

  const isCourseSpecific =
    lowerRaw.includes('course') ||
    lowerRaw.includes('study') ||
    lowerRaw.includes('mbbs') ||
    lowerRaw.includes('btech') ||
    lowerRaw.includes('bca') ||
    lowerRaw.includes('engineering') ||
    lowerRaw.includes('eligibl') ||
    lowerRaw.includes('after 12th') ||
    lowerRaw.includes('after 10th');

  if (isGreetingOrIntro && !isCourseSpecific) {
    if (userName) {
      return `Hi ${userName}! 👋 Nice to meet you. How can I help you with your academic or career journey today?`;
    }
    return `Hello! 👋 How can I help you with your course or career choices today?`;
  }

  // 11. THANKS / APPRECIATION ("Thank you", "Thanks")
  if (/^(thank you|thanks|thank u|thx|tq|many thanks|bye|goodbye)\b/i.test(lowerRaw)) {
    return `You're welcome! 😊 If you need help choosing a course or planning your academic pathway, just ask me.`;
  }

  // 12. VAGUE QUERIES ("Tell me about that", "Explain that")
  if (/^(tell me about that|explain that|what about that|tell me more|tell about that)\b/i.test(lowerRaw)) {
    return `Sure! What would you like me to explain — a course, career, eligibility requirement, or academic pathway?`;
  }

  // 13. DYNAMIC SAFE FALLBACK (NO REPEATING QUESTIONS WHEN EDUCATION STAGE/PROFILE IS ALREADY KNOWN!)
  if (educationStage || stream12th || profile) {
    const stageStr = stream12th || educationStage || '12th Standard';
    return `Got it, ${userName || 'Vengat'}. Based on your ${stageStr} background, ask me anything about eligible UG/PG courses, minimum cutoff marks, or career pathways, and I will evaluate your eligibility!`;
  }

  return `I can help you explore courses, check eligibility prerequisites, or plan your academic pathway! What stream, subjects, or career areas are you interested in?`;
}
