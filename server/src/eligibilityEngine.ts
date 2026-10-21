import {
  Course,
  StudentProfile,
  EligibilityDetail,
  EligibilityStatus,
  CompatibilityBreakdown,
  RecommendedCourse,
  RecommendationResponse
} from './types';

export function sanitizeAndRecalculate12thProfile(profile: StudentProfile): StudentProfile {
  if (profile.educationLevel === 'COMPLETED_12TH' && profile.subjectMarks12th) {
    const marks = profile.subjectMarks12th;
    const entries = Object.entries(marks);
    let validSum = 0;
    let validCount = 0;

    for (const [_, rawVal] of entries) {
      const val = Number(rawVal);
      if (rawVal !== null && rawVal !== undefined && !isNaN(val) && val >= 0 && val <= 100) {
        validSum += val;
        validCount += 1;
      }
    }

    if (validCount > 0) {
      const totalMax = validCount * 100;
      const pct = Math.round((validSum / totalMax) * 10000) / 100;
      profile.totalObtained12thMarks = validSum;
      profile.totalMax12thMarks = totalMax;
      profile.overall12thPercentage = pct;
    }
  }
  return profile;
}

/**
 * LAYER 1: Rule-Based Eligibility Engine
 */
export function checkEligibility(course: Course, profile: StudentProfile): EligibilityDetail {
  const reasons: string[] = [];
  const passedPrerequisites: string[] = [];
  const missingPrerequisites: string[] = [];
  let missingMinMarks = false;

  // 1. Level Alignment check
  const isLevelCompatible =
    (profile.educationLevel === 'COMPLETED_10TH' && course.level === 'COMPLETED_10TH') ||
    (profile.educationLevel === 'COMPLETED_12TH' && course.level === 'COMPLETED_12TH') ||
    (profile.educationLevel === 'UG_STUDENT' && course.level === 'UG_STUDENT') ||
    (profile.educationLevel === 'PG_STUDENT' && course.level === 'PG_STUDENT');

  if (!isLevelCompatible) {
    reasons.push(`Course target level (${course.level}) does not match student education level (${profile.educationLevel}).`);
  }

  // 2. Stream / Qualification Match check
  if (profile.educationLevel === 'COMPLETED_12TH' && profile.stream12th) {
    if (course.acceptedStreams && course.acceptedStreams.length > 0) {
      const matchStream = course.acceptedStreams.some((st) =>
        st.toLowerCase().includes(profile.stream12th!.toLowerCase()) ||
        profile.stream12th!.toLowerCase().includes(st.toLowerCase()) ||
        st.toLowerCase().includes('all')
      );
      if (!matchStream) {
        reasons.push(`Student 12th stream (${profile.stream12th}) is not in course accepted streams list.`);
      }
    }
  } else if (profile.educationLevel === 'UG_STUDENT' && profile.ugDegree) {
    if (course.acceptedStreams && course.acceptedStreams.length > 0) {
      const matchDegree = course.acceptedStreams.some((st) =>
        st.toLowerCase().includes(profile.ugDegree!.toLowerCase()) ||
        profile.ugDegree!.toLowerCase().includes(st.toLowerCase()) ||
        st.toLowerCase().includes('all ug')
      );
      if (!matchDegree) {
        reasons.push(`Student UG degree (${profile.ugDegree}) does not satisfy accepted stream prerequisites.`);
      }
    }
  }

  // 3. Subject-based Prerequisites check (CRITICAL REQUIREMENT)
  let studentSubjects: string[] = [];
  let studentMarks: Record<string, number> = {};
  let overallPct = 0;

  if (profile.educationLevel === 'COMPLETED_10TH') {
    studentSubjects = profile.favoriteSubjects10th || [];
    studentMarks = profile.subjectMarks10th || {};
    overallPct = profile.overall10thPercentage || 0;
  } else if (profile.educationLevel === 'COMPLETED_12TH') {
    studentSubjects = profile.subjectsStudied12th || [];
    studentMarks = profile.subjectMarks12th || {};
    overallPct = profile.overall12thPercentage || 0;
  } else if (profile.educationLevel === 'UG_STUDENT') {
    studentSubjects = profile.ugSubjects || [];
    overallPct = profile.ugPercentage || 0;
  } else {
    overallPct = profile.pgPercentage || 0;
  }

  if (course.requiredSubjects && course.requiredSubjects.length > 0) {
    for (const reqSub of course.requiredSubjects) {
      const hasSubject = studentSubjects.some((s) => s.toLowerCase() === reqSub.toLowerCase()) ||
        (studentMarks[reqSub] !== undefined && studentMarks[reqSub] > 0);

      if (hasSubject) {
        passedPrerequisites.push(reqSub);
      } else {
        missingPrerequisites.push(reqSub);
        reasons.push(`Required prerequisite subject missing: ${reqSub} was not studied.`);
      }
    }
  }

  // 4. Minimum Overall Percentage check
  if (course.minimumMarks && overallPct < course.minimumMarks) {
    missingMinMarks = true;
    reasons.push(
      `Minimum overall score threshold unmet: Requires ${course.minimumMarks}%, student achieved ${overallPct}%.`
    );
  }

  // 5. Subject Specific Marks threshold check
  if (course.subjectRequirements && course.subjectRequirements.length > 0) {
    for (const req of course.subjectRequirements) {
      const mark = studentMarks[req.subject];
      if (mark !== undefined && mark < req.minMark) {
        missingMinMarks = true;
        reasons.push(
          `Subject score threshold unmet for ${req.subject}: Requires min ${req.minMark}%, student scored ${mark}%.`
        );
      }
    }
  }

  let status: EligibilityStatus = 'ELIGIBLE';

  if (missingPrerequisites.length > 0 || reasons.length > 1 || missingMinMarks) {
    status = 'NOT_ELIGIBLE';
  } else if (reasons.length === 1 && !missingPrerequisites.length) {
    status = 'PARTIALLY_COMPATIBLE';
  }

  return {
    status,
    reasons,
    passedPrerequisites,
    missingPrerequisites,
    missingMinMarks
  };
}

/**
 * LAYER 2: Personalized Compatibility Matching Engine
 */
export function calculateCompatibility(course: Course, profile: StudentProfile): CompatibilityBreakdown {
  let studentPct = 0;
  if (profile.educationLevel === 'COMPLETED_10TH') studentPct = profile.overall10thPercentage || 70;
  else if (profile.educationLevel === 'COMPLETED_12TH') studentPct = profile.overall12thPercentage || 70;
  else if (profile.educationLevel === 'UG_STUDENT') studentPct = profile.ugPercentage || 70;
  else studentPct = profile.pgPercentage || 70;

  const minPct = course.minimumMarks || 50;
  const academicDiff = studentPct - minPct;
  let academicMatch = 70;
  if (academicDiff >= 20) academicMatch = 98;
  else if (academicDiff >= 10) academicMatch = 90;
  else if (academicDiff >= 0) academicMatch = 80;
  else academicMatch = Math.max(30, 70 + academicDiff * 2);

  let subjectMatch = 75;
  if (course.requiredSubjects && course.requiredSubjects.length > 0) {
    let studentSubjects: string[] = [];
    if (profile.educationLevel === 'COMPLETED_12TH') studentSubjects = profile.subjectsStudied12th || [];
    else if (profile.educationLevel === 'COMPLETED_10TH') studentSubjects = profile.favoriteSubjects10th || [];
    
    const matchedCount = course.requiredSubjects.filter((rs) =>
      studentSubjects.some((ss) => ss.toLowerCase() === rs.toLowerCase())
    ).length;

    subjectMatch = Math.round((matchedCount / course.requiredSubjects.length) * 100);
  }

  let interestMatch = 60;
  if (course.interests && profile.interests && profile.interests.length > 0) {
    const studentInterestsLower = profile.interests.map((i) => i.toLowerCase());
    const courseInterestsLower = course.interests.map((i) => i.toLowerCase());

    const matched = courseInterestsLower.filter((ci) =>
      studentInterestsLower.some((si) => si.includes(ci) || ci.includes(si))
    ).length;

    if (courseInterestsLower.length > 0) {
      interestMatch = Math.min(100, Math.round((matched / Math.min(courseInterestsLower.length, 3)) * 100));
      if (matched === 0) interestMatch = 40;
    }
  }

  let skillMatch = 65;
  if (course.skills && profile.skills && Object.keys(profile.skills).length > 0) {
    const studentSkills = profile.skills;
    let totalPoints = 0;
    let maxPoints = course.skills.length * 5;

    course.skills.forEach((sk) => {
      const key = Object.keys(studentSkills).find(
        (k) => k.toLowerCase() === sk.toLowerCase() || k.toLowerCase().includes(sk.toLowerCase())
      );
      if (key) {
        totalPoints += studentSkills[key];
      } else {
        totalPoints += 2;
      }
    });

    skillMatch = Math.min(100, Math.round((totalPoints / Math.max(maxPoints, 1)) * 100));
  }

  let careerMatch = 70;
  if (profile.careerGoals && profile.careerGoals.length > 0) {
    const goalsLower = profile.careerGoals.map((g) => g.toLowerCase().trim()).filter(Boolean);
    const areasLower = (course.careerAreas || []).map((a) => a.toLowerCase());
    const domainLower = (course.domain || '').toLowerCase();
    const courseNameLower = (course.courseName || '').toLowerCase();
    const descLower = (course.description || '').toLowerCase();

    const matched = goalsLower.some((g) => {
      return (
        areasLower.some((a) => a.includes(g) || g.includes(a)) ||
        (domainLower && (domainLower.includes(g) || g.includes(domainLower))) ||
        courseNameLower.includes(g) ||
        descLower.includes(g)
      );
    });

    careerMatch = matched ? 95 : 65;
  }

  return {
    academicMatch,
    subjectMatch,
    interestMatch,
    skillMatch,
    careerMatch
  };
}

export function generateExplainability(
  course: Course,
  profile: StudentProfile,
  eligibility: EligibilityDetail,
  breakdown: CompatibilityBreakdown
): { whyRecommended: string[]; thingsToVerify: string[]; alternativeSuggestions?: string[] } {
  const why: string[] = [];
  const verify: string[] = [];

  if (eligibility.passedPrerequisites.length > 0) {
    why.push(`Your background in ${eligibility.passedPrerequisites.join(', ')} satisfies course prerequisites.`);
  }

  if (breakdown.academicMatch >= 85) {
    why.push(`Your academic marks exceed minimum entry requirements for this program.`);
  }

  if (breakdown.interestMatch >= 80) {
    why.push(`Strong alignment with your interest in ${course.interests.slice(0, 3).join(', ')}.`);
  }

  if (breakdown.skillMatch >= 75) {
    why.push(`Your rated skills in ${course.skills.slice(0, 2).join(' & ')} fit this academic curriculum.`);
  }

  if (breakdown.careerMatch >= 80) {
    why.push(`Direct pathway toward your target career as ${course.careerAreas[0] || 'an industry professional'}.`);
  }

  if (why.length === 0) {
    why.push(`Presents a structured progression in ${course.domain} matching your general educational profile.`);
  }

  if (course.additionalRequirements) {
    verify.push(course.additionalRequirements);
  }
  verify.push(`Verify specific university entrance examination requirements (e.g., State CET or National entrance tests).`);
  verify.push(`Check current annual cutoff scores and category-based quota allocations.`);
  verify.push(`Confirm minimum percentage requirements directly with official institution admission brochures.`);

  const alternatives: string[] = [];
  if (eligibility.status === 'NOT_ELIGIBLE') {
    if (eligibility.missingPrerequisites.includes('Mathematics')) {
      alternatives.push(`Consider BCA or B.Sc Cyber Security, which offer strong computing paths with flexible mathematics rules.`);
    }
    if (eligibility.missingMinMarks) {
      alternatives.push(`Explore diploma pathways, bridge courses, or foundational certification programs to boost entry scores.`);
    }
  }

  return {
    whyRecommended: why,
    thingsToVerify: verify,
    alternativeSuggestions: alternatives.length > 0 ? alternatives : undefined
  };
}

export function runRecommendationPipeline(
  allCourses: Course[],
  profile: StudentProfile
): RecommendationResponse {
  profile = sanitizeAndRecalculate12thProfile(profile);
  const levelFiltered = allCourses.filter((c) => c.level === profile.educationLevel);

  const topCompatible: RecommendedCourse[] = [];
  const otherEligible: RecommendedCourse[] = [];
  const coursesRequiringPrerequisites: RecommendedCourse[] = [];
  const notEligibleCourses: RecommendedCourse[] = [];
  const futurePathways: RecommendedCourse[] = [];

  let currentStep = '10th Completion';
  let nextMilestone = '11th / 12th Stream Selection';
  let pathwayChain = ['10th Grade', '11th/12th Stream', 'Undergraduate Degree', 'Postgraduate Degree', 'Career Role'];

  if (profile.educationLevel === 'COMPLETED_12TH') {
    currentStep = `12th Grade (${profile.stream12th || 'Completed'})`;
    nextMilestone = 'Undergraduate Degree Admission';
    pathwayChain = [
      '10th Grade',
      `12th (${profile.stream12th || 'Science/Commerce'})`,
      'Eligible UG Course',
      'PG Pathway',
      profile.careerGoals[0] || 'Career Goal'
    ];
  } else if (profile.educationLevel === 'UG_STUDENT') {
    currentStep = `UG Degree (${profile.ugDegree || 'B.Sc/B.Tech/BCA'})`;
    nextMilestone = 'Postgraduate Specialization';
    pathwayChain = [
      `UG: ${profile.ugDegree || 'Degree'}`,
      'PG Pathway / Entrance',
      'Eligible Master Program',
      'Specialization / Ph.D.',
      profile.careerGoals[0] || 'Industry Role'
    ];
  } else if (profile.educationLevel === 'PG_STUDENT') {
    currentStep = `PG Degree (${profile.pgDegree || 'Master Degree'})`;
    nextMilestone = 'Ph.D / Executive Specialization';
    pathwayChain = [
      `PG: ${profile.pgDegree || 'Master'}`,
      'Research Proposal / Certifications',
      'Ph.D. / PG Executive Diploma',
      'Leadership Role'
    ];
  }

  levelFiltered.forEach((course) => {
    const eligibility = checkEligibility(course, profile);
    const breakdown = calculateCompatibility(course, profile);

    const finalScore = Math.round(
      breakdown.academicMatch * 0.25 +
      breakdown.subjectMatch * 0.25 +
      breakdown.interestMatch * 0.25 +
      breakdown.skillMatch * 0.15 +
      breakdown.careerMatch * 0.10
    );

    const explain = generateExplainability(course, profile, eligibility, breakdown);

    const recItem: RecommendedCourse = {
      course,
      eligibility,
      compatibilityScore: finalScore,
      breakdown,
      whyRecommended: explain.whyRecommended,
      thingsToVerify: explain.thingsToVerify,
      alternativeSuggestions: explain.alternativeSuggestions
    };

    if (eligibility.status === 'ELIGIBLE') {
      if (finalScore >= 80) {
        topCompatible.push(recItem);
      } else {
        otherEligible.push(recItem);
      }
    } else if (eligibility.status === 'PARTIALLY_COMPATIBLE') {
      coursesRequiringPrerequisites.push(recItem);
    } else {
      notEligibleCourses.push(recItem);
    }
  });

  topCompatible.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  otherEligible.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  coursesRequiringPrerequisites.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  notEligibleCourses.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

  const nextLevelMap: Record<string, any> = {
    COMPLETED_10TH: 'COMPLETED_12TH',
    COMPLETED_12TH: 'UG_STUDENT',
    UG_STUDENT: 'PG_STUDENT'
  };

  const nextLvl = nextLevelMap[profile.educationLevel];
  if (nextLvl) {
    const nextCourses = allCourses.filter((c) => c.level === nextLvl).slice(0, 3);
    nextCourses.forEach((c) => {
      const dummyProfile = { ...profile, educationLevel: nextLvl as any };
      const el = checkEligibility(c, dummyProfile);
      const bd = calculateCompatibility(c, profile);
      const ex = generateExplainability(c, profile, el, bd);
      futurePathways.push({
        course: c,
        eligibility: el,
        compatibilityScore: Math.round(bd.academicMatch * 0.3 + bd.interestMatch * 0.4 + bd.skillMatch * 0.3),
        breakdown: bd,
        whyRecommended: [`Future progression course after completing your next degree level.`],
        thingsToVerify: ex.thingsToVerify
      });
    });
  }

  return {
    studentProfile: profile,
    academicPathway: {
      currentStep,
      nextMilestone,
      pathwayChain
    },
    topCompatible,
    otherEligible,
    coursesRequiringPrerequisites,
    notEligibleCourses,
    futurePathways
  };
}
