
import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { anonymizeProfile } from '../services/geminiService';
import { ICONS } from '../constants';
import { GlowingEffect } from './ui/glowing-effect';

interface RecruiterViewProps {
  originalProfile: string;
}

const RecruiterView: React.FC<RecruiterViewProps> = ({ originalProfile }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isAnonymized, setIsAnonymized] = useState(true);
  const [anonymizedText, setAnonymizedText] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const processAnonymization = async () => {
      if (!originalProfile) return;
      setLoading(true);
      try {
        const result = await anonymizeProfile(originalProfile);
        setAnonymizedText(result);
      } catch (err) {
        console.error("Anonymization failed", err);
        setAnonymizedText("Failed to anonymize profile. Technical error.");
      } finally {
        setLoading(false);
      }
    };

    processAnonymization();
  }, [originalProfile]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/95 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-2xl">
        <div>
          <h2 className="text-xl font-bold text-white">Recruiter Sourcing Dashboard</h2>
          <p className="text-sm text-slate-400">Reviewing talent via the Bias Shield Layer</p>
        </div>
        
        <div className="flex items-center gap-3 bg-slate-800/50 p-1 rounded-full border border-white/10">
          <button 
            onClick={() => setIsAnonymized(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${isAnonymized ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-300'}`}
          >
            Anonymized Mode
          </button>
          <button 
            onClick={() => setIsAnonymized(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${!isAnonymized ? 'bg-red-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-300'}`}
          >
            Revealed Mode
          </button>
        </div>
      </div>

      <div className="relative rounded-[2rem] border-[0.75px] border-white/5 p-3">
        <GlowingEffect
          spread={50}
          glow={true}
          disabled={false}
          proximity={80}
          inactiveZone={0.01}
          borderWidth={4}
        />
        <div className="relative bg-slate-900/95 backdrop-blur-sm rounded-[1.75rem] border border-white/10 shadow-2xl overflow-hidden">
        {isAnonymized && (
          <div className="absolute top-4 right-6 flex items-center gap-2">
            <ICONS.Shield className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Bias Shield Active</span>
          </div>
        )}

        <div className="p-8 md:p-12">
          {loading ? (
            <motion.div 
              className="flex flex-col items-center justify-center py-20 space-y-4"
              initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <motion.p 
                className="text-slate-400 font-medium"
                animate={shouldReduceMotion ? {} : { opacity: [0.5, 1, 0.5] }}
                transition={shouldReduceMotion ? {} : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Scanning for demographic markers...
              </motion.p>
            </motion.div>
          ) : (
            <div className={`prose prose-slate max-w-none transition-all duration-500 ${!isAnonymized ? 'opacity-100' : 'opacity-100'}`}>
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl transition-colors border ${isAnonymized ? 'bg-slate-800/50 text-slate-300 border-white/10' : 'bg-indigo-600 text-white border-indigo-500'}`}>
                   {isAnonymized ? '?' : 'JD'}
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold m-0 p-0 text-white">
                      {isAnonymized ? '[Candidate Identity Shielded]' : 'Jane Doe'}
                    </h3>
                    <p className="text-slate-400 m-0 p-0 font-medium">
                      {isAnonymized ? 'Verified Competency Profile' : 'Senior Operations Specialist | jane.doe@example.com'}
                    </p>
                 </div>
              </div>

              <div className="whitespace-pre-wrap text-slate-300 leading-relaxed font-light text-lg">
                {isAnonymized ? anonymizedText : originalProfile}
              </div>
            </div>
          )}
        </div>
        
        {!isAnonymized && (
          <div className="bg-red-950/50 p-4 border-t border-red-900/50 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-xs text-red-400 font-bold uppercase tracking-wider">Warning: Direct identity data revealed. High potential for cognitive bias.</p>
          </div>
        )}
        </div>
      </div>

      <div className="flex gap-4">
        <motion.button 
          className="flex-1 bg-white text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-lg"
          whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
        >
          Request Merit-Based Interview
        </motion.button>
        <motion.button 
          className="px-8 border-2 border-white/20 text-slate-300 py-4 rounded-2xl font-bold hover:bg-slate-800/50 transition-all"
          whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
        >
          Save to Shortlist
        </motion.button>
      </div>
    </div>
  );
};

export default RecruiterView;
