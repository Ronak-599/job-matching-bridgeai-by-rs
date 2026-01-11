
import React from 'react';
import { ICONS } from '../constants';

interface AccessibilityHubProps {
  settings: {
    highContrast: boolean;
    largeFont: boolean;
    reducedMotion: boolean;
    lowStimuli: boolean;
    readerHints: boolean;
  };
  setSetting: (key: string, value: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
}

const AccessibilityHub: React.FC<AccessibilityHubProps> = ({ settings, setSetting, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Side Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-indigo-50/30">
          <div>
            <h2 className="text-2xl font-black text-slate-900">A11y Preference Hub</h2>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-1">WCAG 3.0 Adaptive UI</p>
          </div>
          <button 
            onClick={onClose}
            className="touch-target p-2 rounded-full hover:bg-slate-200 transition-colors"
            aria-label="Close accessibility menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          {/* Visual Category */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ICONS.Shield className="w-3 h-3" /> Visual Experience
            </h3>
            
            <Toggle 
              label="High Contrast" 
              description="Increases brightness and color difference for better visibility."
              active={settings.highContrast}
              onToggle={(v) => setSetting('highContrast', v)}
            />
            
            <Toggle 
              label="Large Text (WCAG Silver)" 
              description="Increases all font sizes for easier reading."
              active={settings.largeFont}
              onToggle={(v) => setSetting('largeFont', v)}
            />
          </section>

          {/* Cognitive Category */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ICONS.Brain className="w-3 h-3" /> Cognitive & Motion
            </h3>
            
            <Toggle 
              label="Reduced Motion" 
              description="Stops all moving parts and fast transitions."
              active={settings.reducedMotion}
              onToggle={(v) => setSetting('reducedMotion', v)}
            />
            
            <Toggle 
              label="Low Stimuli Mode" 
              description="Desaturates colors and simplifies complex visuals."
              active={settings.lowStimuli}
              onToggle={(v) => setSetting('lowStimuli', v)}
            />
          </section>

          {/* Technical Category */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ICONS.Chart className="w-3 h-3" /> Screen Reading
            </h3>
            
            <Toggle 
              label="Enhanced Reader Hints" 
              description="Adds extra descriptions to AI components for screen readers."
              active={settings.readerHints}
              onToggle={(v) => setSetting('readerHints', v)}
            />
          </section>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100">
          <button 
            onClick={onClose}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all"
          >
            Save Preferences
          </button>
          <p className="text-[10px] text-center text-slate-400 mt-4 font-medium italic">
            Preferences are saved to your local browser session.
          </p>
        </div>
      </div>
    </div>
  );
};

const Toggle: React.FC<{label: string, description: string, active: boolean, onToggle: (v: boolean) => void}> = ({ label, description, active, onToggle }) => (
  <div className="group flex items-start justify-between gap-6">
    <div className="flex-1">
      <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{label}</h4>
      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{description}</p>
    </div>
    <button 
      onClick={() => onToggle(!active)}
      className={`touch-target w-14 h-8 rounded-full p-1 transition-colors ${active ? 'bg-indigo-600' : 'bg-slate-200'}`}
      aria-pressed={active}
      role="switch"
    >
      <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${active ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  </div>
);

export default AccessibilityHub;
