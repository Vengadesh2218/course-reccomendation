import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Check, Sparkles, ChevronDown, Plus } from 'lucide-react';

export const COMPREHENSIVE_ACADEMIC_INTERESTS = [
  // Tech & Computer Science
  'Technology',
  'Programming',
  'Computer Science',
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Cybersecurity',
  'Cloud Computing',
  'Software Development',
  'Web Development',
  'Mobile App Development',
  'Robotics',
  'Information Technology',

  // Sciences & Health
  'Science',
  'Physics',
  'Chemistry',
  'Biology',
  'Mathematics',
  'Medicine',
  'Healthcare',
  'Biotechnology',
  'Pharmacy',
  'Microbiology',
  'Biochemistry',
  'Medical Research',

  // Engineering
  'Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Electronics',
  'Aerospace Engineering',

  // Business & Commerce
  'Business',
  'Finance',
  'Accounting',
  'Commerce',
  'Management',
  'Entrepreneurship',
  'Marketing',
  'Economics',
  'Banking',
  'Human Resources',

  // Design & Creative Arts
  'Design',
  'Graphic Design',
  'UI/UX Design',
  'Fashion Design',
  'Interior Design',
  'Arts',
  'Literature',
  'Languages',
  'History',
  'Geography',
  'Political Science',
  'Psychology',
  'Sociology',
  'Drawing',

  // Media, Education & Humanities
  'Media',
  'Journalism',
  'Animation',
  'Film',
  'Education',
  'Teaching',
  'Research',
  'Agriculture',
  'Architecture',
  'Law',
  'Tourism',
  'Hospitality',
  'Sports',
  'Social Work',
  'Social Sciences'
];

interface SearchableInterestSelectorProps {
  selectedInterests: string[];
  onChange: (updatedInterests: string[]) => void;
}

export const SearchableInterestSelector: React.FC<SearchableInterestSelectorProps> = ({
  selectedInterests,
  onChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const query = searchTerm.trim().toLowerCase();

  // Filter matching suggestions
  const filteredSuggestions = COMPREHENSIVE_ACADEMIC_INTERESTS.filter((interest) =>
    interest.toLowerCase().includes(query)
  );

  const isCustomNew =
    query.length > 0 &&
    !COMPREHENSIVE_ACADEMIC_INTERESTS.some(
      (i) => i.toLowerCase() === query
    ) &&
    !selectedInterests.some(
      (i) => i.toLowerCase() === query
    );

  const toggleInterest = (interest: string) => {
    const trimmed = interest.trim();
    if (!trimmed) return;

    if (selectedInterests.some((i) => i.toLowerCase() === trimmed.toLowerCase())) {
      onChange(selectedInterests.filter((i) => i.toLowerCase() !== trimmed.toLowerCase()));
    } else {
      onChange([...selectedInterests, trimmed]);
    }
    setSearchTerm('');
  };

  const removeInterest = (interestToRemove: string) => {
    onChange(selectedInterests.filter((i) => i !== interestToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (query) {
        const exactMatch = filteredSuggestions.find(
          (s) => s.toLowerCase() === query
        );
        if (exactMatch) {
          toggleInterest(exactMatch);
        } else if (filteredSuggestions.length > 0) {
          toggleInterest(filteredSuggestions[0]);
        } else {
          toggleInterest(searchTerm.trim());
        }
      }
    } else if (e.key === 'Backspace' && !searchTerm && selectedInterests.length > 0) {
      removeInterest(selectedInterests[selectedInterests.length - 1]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Popular quick chips
  const POPULAR_QUICK_CHIPS = [
    'Technology',
    'Programming',
    'Artificial Intelligence',
    'Medicine',
    'Business',
    'Finance',
    'Design',
    'Engineering',
    'Psychology',
    'Law'
  ];

  return (
    <div className="space-y-4" ref={containerRef}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-300">
          Academic Interests
        </label>
        <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
          {selectedInterests.length} Selected
        </span>
      </div>

      {/* Selected Tags Display */}
      {selectedInterests.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
          <div className="w-full text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
            Selected Interests:
          </div>
          {selectedInterests.map((interest) => (
            <span
              key={interest}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-200 text-xs font-semibold border border-amber-500/40 shadow-sm animate-fadeIn"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{interest}</span>
              <button
                type="button"
                onClick={() => removeInterest(interest)}
                className="hover:bg-amber-500/30 p-0.5 rounded-full text-amber-300 hover:text-white transition-colors ml-0.5"
                title={`Remove ${interest}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search Input Field */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="🔍 Search your academic interest (e.g., Computer, AI, Medicine, Design, Business...)"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 shadow-inner transition-colors"
          />
          {searchTerm ? (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                inputRef.current?.focus();
              }}
              className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 pointer-events-none" />
          )}
        </div>

        {/* Filtered Suggestions Dropdown */}
        {isOpen && (
          <div className="absolute z-50 mt-2 w-full max-h-64 overflow-y-auto rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl backdrop-blur-xl p-2 space-y-1 divide-y divide-slate-800/60">
            {/* Custom option prompt if typed term is new */}
            {isCustomNew && (
              <button
                type="button"
                onClick={() => {
                  toggleInterest(searchTerm.trim());
                  setIsOpen(false);
                }}
                className="w-full p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-400" />
                  Add Custom Academic Interest: <strong>"{searchTerm.trim()}"</strong>
                </span>
                <span className="text-[10px] bg-amber-500/30 px-2 py-0.5 rounded text-amber-300">
                  Custom
                </span>
              </button>
            )}

            {/* Filtered suggestions list */}
            {filteredSuggestions.length > 0 ? (
              <div className="pt-1 space-y-1">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Matching Academic Interests ({filteredSuggestions.length})
                </div>
                {filteredSuggestions.map((interest) => {
                  const isSelected = selectedInterests.some(
                    (i) => i.toLowerCase() === interest.toLowerCase()
                  );
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                        {interest}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            ) : (
              !isCustomNew && (
                <div className="p-4 text-center text-xs text-slate-500">
                  No matching interest found. Press Enter to add your custom interest.
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Quick Featured Suggestions Chips */}
      <div>
        <div className="text-[11px] font-bold text-slate-400 mb-2">
          Popular Interests (Click to quick toggle):
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_QUICK_CHIPS.map((cat) => {
            const isSelected = selectedInterests.some(
              (i) => i.toLowerCase() === cat.toLowerCase()
            );
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleInterest(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-amber-500/20 text-amber-200 border-amber-500/50 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {isSelected ? '✓ ' : '+ '} {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
