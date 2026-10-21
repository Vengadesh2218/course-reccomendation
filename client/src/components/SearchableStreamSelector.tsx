import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, Check, BookOpen, Sparkles } from 'lucide-react';
import { EXPANDED_12TH_STREAM_GROUPS, StreamGroup } from '../config/expanded12thStreams';

interface SearchableStreamSelectorProps {
  selectedGroup: StreamGroup | null;
  onSelectGroup: (group: StreamGroup) => void;
}

export const SearchableStreamSelector: React.FC<SearchableStreamSelectorProps> = ({
  selectedGroup,
  onSelectGroup
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

  // Filter groups based on search term
  const query = searchTerm.trim().toLowerCase();
  const filteredGroups = EXPANDED_12TH_STREAM_GROUPS.filter((g) => {
    if (!query) return true;
    return (
      g.groupName.toLowerCase().includes(query) ||
      g.stream.toLowerCase().includes(query) ||
      g.subjects.some((s) => s.toLowerCase().includes(query)) ||
      g.careerPaths.some((cp) => cp.toLowerCase().includes(query)) ||
      g.searchableKeywords.some((k) => k.toLowerCase().includes(query))
    );
  });

  const handleSelect = (group: StreamGroup) => {
    onSelectGroup(group);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleClear = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const getStreamBadgeStyle = (stream: string) => {
    switch (stream) {
      case 'Science':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      case 'Commerce':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Arts & Humanities':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Vocational':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-3" ref={containerRef}>
      <label className="block text-xs font-semibold text-slate-300">
        12th Stream / Group
      </label>

      {/* Currently Selected Group Display */}
      {selectedGroup && !isOpen && (
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 flex items-start justify-between gap-3 shadow-lg animate-fadeIn">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getStreamBadgeStyle(selectedGroup.stream)}`}>
                {selectedGroup.stream}
              </span>
              <h4 className="text-sm font-extrabold text-white">{selectedGroup.groupName}</h4>
            </div>

            <div className="text-xs text-slate-300 flex flex-wrap gap-1 items-center">
              <span className="text-slate-400 font-medium">Subjects:</span>
              <span className="font-bold text-indigo-300">{selectedGroup.subjects.join(', ')}</span>
            </div>

            <div className="text-[11px] text-slate-400 flex flex-wrap gap-1 items-center">
              <span className="text-slate-500">Career paths:</span>
              <span>{selectedGroup.careerPaths.slice(0, 3).join(', ')}...</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setTimeout(() => inputRef.current?.focus(), 50);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-sky-400 border border-slate-700 shrink-0 transition-colors"
          >
            Change / Search →
          </button>
        </div>
      )}

      {/* Search Input Field */}
      {(!selectedGroup || isOpen) && (
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setIsOpen(false);
                if (e.key === 'Enter' && filteredGroups.length > 0) {
                  e.preventDefault();
                  handleSelect(filteredGroups[0]);
                }
              }}
              placeholder="Search 12th group (e.g., Bio, Computer, Commerce, Arts, Mechanical, PCM...)"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-inner transition-colors"
            />
            {searchTerm ? (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 pointer-events-none" />
            )}
          </div>

          {/* Search Suggestions Dropdown */}
          {isOpen && (
            <div className="absolute z-50 mt-2 w-full max-h-80 overflow-y-auto rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl backdrop-blur-xl p-2 space-y-2">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Searchable 12th Standard Groups ({filteredGroups.length})</span>
                <span className="text-indigo-400">Click to select</span>
              </div>

              {filteredGroups.length > 0 ? (
                filteredGroups.map((group) => {
                  const isSelected = selectedGroup?.id === group.id;
                  return (
                    <div
                      key={group.id}
                      onClick={() => handleSelect(group)}
                      className={`p-3 rounded-xl cursor-pointer border transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-indigo-600/25 border-indigo-500 shadow-md shadow-indigo-600/20'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStreamBadgeStyle(group.stream)}`}>
                            {group.stream}
                          </span>
                          <span className="font-bold text-xs text-white">{group.groupName}</span>
                        </div>

                        <div className="text-[11px] text-slate-300">
                          <strong>Subjects:</strong> {group.subjects.join(', ')}
                        </div>

                        <div className="text-[10px] text-slate-400">
                          <strong>Career Paths:</strong> {group.careerPaths.join(', ')}
                        </div>
                      </div>

                      {isSelected && <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-1" />}
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-300">No matching 12th group found for "{searchTerm}"</p>
                  <p className="text-[11px] text-slate-500">Try searching for keywords like "Bio", "Computer", "Commerce", "Arts", "Mechanical", or "Nursing".</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
