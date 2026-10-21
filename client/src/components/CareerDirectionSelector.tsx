import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, X, Check, Target, ChevronDown } from 'lucide-react';

export const PREDEFINED_CAREER_DIRECTIONS = [
  // Software & Technology
  'Software Development',
  'Software Engineer',
  'Artificial Intelligence',
  'AI Engineer',
  'Data Science',
  'Data Scientist',
  'Cybersecurity',
  'Cloud Computing',
  'System Architect',
  'UI/UX Designer',
  'Product Manager',
  'Web Development',
  'Mobile App Development',
  
  // Healthcare & Medicine
  'Doctor',
  'Physician / Doctor',
  'Nursing',
  'Pharmacy',
  'Biotechnology',
  'Medical Science',
  'Healthcare',
  'Dentistry',
  'Physiotherapy',
  'Biomedical Engineering',
  
  // Engineering
  'Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Electronics & Communication',
  'Chemical Engineering',
  'Aerospace Engineering',
  'Robotics',
  'Automobile Engineering',

  // Architecture & Design
  'Architecture',
  'Interior Design',
  'Fashion Design',
  'Graphic Design',
  'Animation & VFX',
  'Industrial Design',

  // Commerce, Business & Finance
  'Commerce',
  'Finance',
  'Accounting',
  'Chartered Accountant',
  'Banking',
  'Investment Banking',
  'Business',
  'Management',
  'Marketing',
  'Human Resources',
  'Financial Analyst',

  // Law & Public Policy
  'Law',
  'Corporate Lawyer',
  'Legal Advisor',
  'Public Administration',

  // Education, Research & Social Sciences
  'Teaching',
  'Professor',
  'Research',
  'Scientific Research',
  'Psychology',
  'Counseling',
  'Sociology',

  // Media, Arts & Communication
  'Media',
  'Journalism',
  'Content Creation',
  'Mass Communication',
  'Film Making',

  // Agriculture, Food & Tourism
  'Agriculture',
  'Agronomy',
  'Food Technology',
  'Hotel Management',
  'Tourism',
  'Event Management',

  // Government, Defence & Sports
  'Government Jobs',
  'Civil Services (UPSC)',
  'Defence / Armed Forces',
  'Entrepreneurship',
  'Social Work',
  'Sports',
  'Sports Management',
  'Other'
];

interface CareerDirectionSelectorProps {
  selectedCareers: string[];
  onChange: (updatedCareers: string[]) => void;
}

export const CareerDirectionSelector: React.FC<CareerDirectionSelectorProps> = ({
  selectedCareers,
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

  // Filter suggestions
  const filteredSuggestions = PREDEFINED_CAREER_DIRECTIONS.filter((career) =>
    career.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const cleanSearchTerm = searchTerm.trim();
  const isCustomNew =
    cleanSearchTerm.length > 0 &&
    !PREDEFINED_CAREER_DIRECTIONS.some(
      (c) => c.toLowerCase() === cleanSearchTerm.toLowerCase()
    ) &&
    !selectedCareers.some(
      (c) => c.toLowerCase() === cleanSearchTerm.toLowerCase()
    );

  const addCareer = (career: string) => {
    const trimmed = career.trim();
    if (!trimmed) return;
    if (!selectedCareers.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      onChange([...selectedCareers, trimmed]);
    }
    setSearchTerm('');
    setIsOpen(false);
  };

  const removeCareer = (careerToRemove: string) => {
    onChange(selectedCareers.filter((c) => c !== careerToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (cleanSearchTerm) {
        // If there's an exact match in suggestions, add that; otherwise add custom
        const exactMatch = filteredSuggestions.find(
          (s) => s.toLowerCase() === cleanSearchTerm.toLowerCase()
        );
        if (exactMatch) {
          addCareer(exactMatch);
        } else if (filteredSuggestions.length > 0) {
          addCareer(filteredSuggestions[0]);
        } else {
          addCareer(cleanSearchTerm);
        }
      }
    } else if (e.key === 'Backspace' && !searchTerm && selectedCareers.length > 0) {
      // Remove last tag if search term is empty
      removeCareer(selectedCareers[selectedCareers.length - 1]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Featured popular suggestions for quick toggle
  const FEATURED_SUGGESTIONS = [
    'Software Engineer',
    'Doctor',
    'Data Scientist',
    'Mechanical Engineering',
    'Finance',
    'Fashion Design',
    'Law',
    'Civil Engineering',
    'Psychology',
    'Teaching',
    'Agriculture',
    'Entrepreneurship'
  ];

  return (
    <div className="space-y-4" ref={containerRef}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-300">
          Career Direction / Target Career Goals
        </label>
        <span className="text-[11px] text-slate-400">
          {selectedCareers.length} Selected
        </span>
      </div>

      {/* Selected Tag Pills */}
      {selectedCareers.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
          {selectedCareers.map((career) => (
            <span
              key={career}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500/20 to-indigo-500/20 text-white text-xs font-semibold border border-rose-500/40 shadow-sm animate-fadeIn"
            >
              <Target className="w-3.5 h-3.5 text-rose-400" />
              <span>{career}</span>
              <button
                type="button"
                onClick={() => removeCareer(career)}
                className="hover:bg-rose-500/30 p-0.5 rounded-full text-slate-300 hover:text-white transition-colors ml-0.5"
                title={`Remove ${career}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search Input Box */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
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
            placeholder="Search or type your career direction (e.g. Doctor, Law, Fashion Design, Mechanical...)"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
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

        {/* Dropdown Suggestions Menu */}
        {isOpen && (
          <div className="absolute z-50 mt-2 w-full max-h-64 overflow-y-auto rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl backdrop-blur-xl p-2 space-y-1 divide-y divide-slate-800/60">
            {/* Custom option prompt if user typed something new */}
            {isCustomNew && (
              <button
                type="button"
                onClick={() => addCareer(cleanSearchTerm)}
                className="w-full p-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-200 border border-indigo-500/30 text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-indigo-400" />
                  Add Custom Career Direction: <strong>"{cleanSearchTerm}"</strong>
                </span>
                <span className="text-[10px] bg-indigo-500/30 px-2 py-0.5 rounded text-indigo-300">
                  Custom
                </span>
              </button>
            )}

            {/* Filtered suggestions list */}
            {filteredSuggestions.length > 0 ? (
              <div className="pt-1 space-y-1">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Matching Career Suggestions ({filteredSuggestions.length})
                </div>
                {filteredSuggestions.map((career) => {
                  const isSelected = selectedCareers.some(
                    (c) => c.toLowerCase() === career.toLowerCase()
                  );
                  return (
                    <button
                      key={career}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          removeCareer(career);
                        } else {
                          addCareer(career);
                        }
                      }}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Target className="w-3.5 h-3.5 text-slate-400" />
                        {career}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-rose-400" />}
                    </button>
                  );
                })}
              </div>
            ) : (
              !isCustomNew && (
                <div className="p-4 text-center text-xs text-slate-500">
                  No matching career direction found. Press Enter or click above to add your custom choice.
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Quick Featured Category Chips */}
      <div>
        <div className="text-[11px] font-bold text-slate-400 mb-2">
          Popular Career Directions (Click to quick-select):
        </div>
        <div className="flex flex-wrap gap-2">
          {FEATURED_SUGGESTIONS.map((goal) => {
            const active = selectedCareers.some(
              (c) => c.toLowerCase() === goal.toLowerCase()
            );
            return (
              <button
                key={goal}
                type="button"
                onClick={() => {
                  if (active) {
                    removeCareer(goal);
                  } else {
                    addCareer(goal);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  active
                    ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {active ? '✓ ' : '+ '} {goal}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
