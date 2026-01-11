
import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { extractProfessionalSkills, getAgenticFollowUp } from '../services/geminiService';
import { ICONS } from '../constants';
import { PlaceholdersAndVanishInput } from './ui/placeholders-and-vanish-input';

const StoryTranslator: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: "Hello! I'm your BridgeAI Career Coach. Tell me about a role you've played in your life or community that you're proud of. Don't worry about 'professional' language—just speak from the heart." }
  ]);
  const [userInput, setUserInput] = useState('');
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showReasoning, setShowReasoning] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const currentStory = messages.filter(m => m.role === 'user').map(m => m.text).join(' ') + ' ' + userInput;
    // Fix: Explicitly type the new messages array to satisfy TypeScript's string literal union type checking.
    const newMessages: {role: 'ai' | 'user', text: string}[] = [...messages, { role: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      // If user has provided enough detail (more than 1 response), generate profile. 
      // Otherwise, ask a follow-up.
      const userMessageCount = newMessages.filter(m => m.role === 'user').length;
      
      if (userMessageCount < 2) {
        const followUp = await getAgenticFollowUp(currentStory);
        setMessages(prev => [...prev, { role: 'ai', text: followUp }]);
      } else {
        const result = await extractProfessionalSkills(currentStory);
        setProfile(result);
        setMessages(prev => [...prev, { role: 'ai', text: "I've analyzed our conversation and built your professional competency profile. You can see it on the right!" }]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[700px] p-4 lg:p-0">
      {/* Agentic Chat Side */}
      <div className="flex flex-col h-full bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 rounded-[2.5rem] shadow-2xl border border-indigo-100/50 overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-indigo-100/50 flex items-center justify-between bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 transform transition-transform hover:scale-110">
              <ICONS.Brain className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-900">Career Coach Agent</h2>
              <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Active Interview Mode
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5 max-h-[500px]">
          {messages.map((m, i) => (
            <motion.div 
              key={i} 
              className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`max-w-[85%] p-5 rounded-3xl leading-relaxed shadow-lg hover:shadow-xl transition-all duration-300 ${
                m.role === 'ai' 
                ? 'bg-white text-slate-800 text-base rounded-tl-md border-2 border-indigo-100' 
                : 'bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white text-base rounded-tr-md shadow-indigo-300'
              }`}>
                {m.text}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-5 rounded-3xl rounded-tl-md flex gap-2 shadow-lg border-2 border-indigo-100">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-6 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 border-t border-indigo-100/50">
          <PlaceholdersAndVanishInput
            placeholders={[
              "Tell me about a time you helped organize an event in your community...",
              "Describe how you managed schedules or coordinated people...",
              "Share a story about resolving a conflict or solving a problem...",
              "What skills have you developed from your volunteer work?",
              "Tell me about a role you've played that you're proud of..."
            ]}
            onChange={(e) => setUserInput(e.target.value)}
            onSubmit={(e) => {
              e.preventDefault();
              if (userInput.trim() && !isLoading && !(profile && messages[messages.length-1].role === 'ai')) {
                handleSend();
              }
            }}
          />
          <p className="text-xs text-slate-500 mt-3 text-center flex items-center justify-center gap-2">
            <ICONS.Shield className="w-3 h-3" />
            BridgeAI respects your privacy. Data is used strictly for skill mapping.
          </p>
        </div>
      </div>

      {/* Profile Result Side */}
      <div className="relative">
        {profile ? (
          <motion.div 
            className="bg-gradient-to-br from-white via-purple-50/20 to-indigo-50/30 p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-indigo-100/50 h-full overflow-y-auto backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 flex justify-between items-start">
              <div>
                <motion.span 
                  className="text-[10px] bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 rounded-full font-black uppercase tracking-widest mb-3 block w-max shadow-sm border border-emerald-200/50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  ✓ Lived Experience Verified
                </motion.span>
                <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 leading-tight">
                  {profile.Professional_Title}
                </h2>
              </div>
              <button 
                onClick={() => setShowReasoning(!showReasoning)}
                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 bg-white px-3 py-2 rounded-xl shadow-sm border border-indigo-100 transition-all hover:shadow-md"
              >
                <ICONS.Shield className="w-3 h-3" />
                {showReasoning ? 'Hide AI Ethics Log' : 'Ethical AI Reasoning'}
              </button>
            </div>

            {showReasoning && (
              <motion.div 
                className="mb-8 p-5 bg-gradient-to-br from-indigo-50 to-purple-50/50 rounded-2xl border border-indigo-200/50 text-sm text-indigo-900 shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-bold mb-2 uppercase tracking-tight flex items-center gap-2">
                  <ICONS.Brain className="w-4 h-4" />
                  AI Mapping Logic (Transparency Log)
                </h4>
                <p className="leading-relaxed opacity-90 pl-6 border-l-2 border-indigo-300">{profile.AI_Reasoning}</p>
              </motion.div>
            )}

            <section className="mb-10">
              <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                Core Impact Summary
              </h3>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
                <p className="relative text-slate-800 text-xl font-light leading-relaxed border-l-4 border-gradient-to-b from-indigo-500 to-purple-500 pl-6 py-5 bg-white/80 backdrop-blur-sm rounded-r-2xl shadow-md italic">
                  "{profile.Impact_Statement}"
                </p>
              </div>
            </section>

            <div className="space-y-10">
              <section>
                <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></div>
                  Extracted Hard Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profile.Hard_Skills.map((skill: string, idx: number) => (
                    <motion.div 
                      key={idx} 
                      className="bg-gradient-to-br from-white to-indigo-50/50 border-2 border-indigo-200/50 px-6 py-3 rounded-2xl text-base font-bold text-slate-700 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default"
                      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: shouldReduceMotion ? 0 : idx * 0.05, duration: shouldReduceMotion ? 0 : 0.3 }}
                      whileHover={shouldReduceMotion ? {} : { y: -2 }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full"></div>
                  Interpersonal Strengths
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profile.Soft_Skills.map((skill: string, idx: number) => (
                    <motion.div 
                      key={idx} 
                      className="bg-gradient-to-br from-teal-50 to-emerald-50/80 border-2 border-teal-200/50 px-6 py-3 rounded-2xl text-base font-bold text-teal-700 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default"
                      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: shouldReduceMotion ? 0 : idx * 0.05, duration: shouldReduceMotion ? 0 : 0.3 }}
                      whileHover={shouldReduceMotion ? {} : { y: -2 }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-indigo-100/50 flex flex-col sm:flex-row gap-4">
               <motion.button 
                 className="flex-1 bg-gradient-to-r from-slate-900 via-slate-800 to-black text-white py-4 rounded-3xl font-black text-lg hover:from-black hover:via-slate-900 hover:to-slate-800 transition-all shadow-2xl shadow-slate-400/30 hover:shadow-slate-500/40 border border-slate-700"
                 whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
                 whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
               >
                 🔗 Sync with LinkedIn
               </motion.button>
               <motion.button 
                 className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white py-4 rounded-3xl font-black text-lg hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-700 transition-all shadow-2xl shadow-indigo-300/50 hover:shadow-indigo-400/60"
                 whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
                 whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
               >
                 🎯 Find Matches
               </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="h-full min-h-[500px] border-4 border-dashed border-indigo-200/50 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-300 p-12 text-center bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/20 backdrop-blur-sm">
            <motion.div 
              className="mb-6 p-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl shadow-lg"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <ICONS.Brain className="w-20 h-20 text-indigo-500" />
            </motion.div>
            <p className="text-3xl font-black bg-gradient-to-r from-slate-400 to-indigo-400 bg-clip-text text-transparent mb-3">Awaiting Context</p>
            <p className="text-lg font-medium max-w-xs leading-snug text-slate-500">Chat with the coach on the left to surface your hidden professional expertise.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryTranslator;
