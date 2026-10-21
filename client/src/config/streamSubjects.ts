export interface StreamConfig {
  streamName: string;
  subjects: string[];
}

export const STREAM_SUBJECTS_CONFIG: Record<string, string[]> = {
  'Computer Science + Mathematics': [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Computer Science',
    'English'
  ],
  'Computer Science + Biology': [
    'Biology',
    'Computer Science',
    'Physics',
    'Chemistry',
    'English'
  ],
  'Biology + Mathematics': [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English'
  ],
  'Pure Science': [
    'Physics',
    'Chemistry',
    'Biology',
    'Mathematics',
    'English'
  ],
  'Commerce + Mathematics': [
    'Commerce/Accountancy',
    'Business Studies',
    'Economics',
    'Mathematics',
    'English'
  ],
  'Commerce + Computer Applications': [
    'Commerce/Accountancy',
    'Business Studies',
    'Economics',
    'Computer Applications',
    'English'
  ],
  'Humanities': [
    'History',
    'Political Science',
    'Psychology',
    'Sociology',
    'English'
  ],
  'Vocational': [
    'Computer Hardware',
    'Networking',
    'Applied Physics',
    'Technical English',
    'Entrepreneurship'
  ]
};

export const DEFAULT_STREAM = 'Computer Science + Mathematics';

export function getSubjectsForStream(stream: string): string[] {
  return STREAM_SUBJECTS_CONFIG[stream] || STREAM_SUBJECTS_CONFIG[DEFAULT_STREAM];
}
