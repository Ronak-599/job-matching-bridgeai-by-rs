
import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ICONS } from '../constants';
import { extractProfessionalSkills } from '../services/geminiService';
import { PlaceholdersAndVanishInput } from './ui/placeholders-and-vanish-input';
import { SplineScene } from './ui/splite';
import { GlowingEffect } from './ui/glowing-effect';
import { Card } from './ui/card';
import { Spotlight } from './ui/spotlight';

const VoiceApply: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState<'language' | 'record' | 'processing' | 'result'>('language');
  const [selectedLang, setSelectedLang] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [profile, setProfile] = useState<any>(null);
  const [storyInput, setStoryInput] = useState('');

  const languages = [
    { name: 'English', code: 'en', flag: '🇺🇸' },
    { name: 'Español', code: 'es', flag: '🇲🇽' },
    { name: 'Tagalog', code: 'tl', flag: '🇵🇭' },
    { name: 'Tiếng Việt', code: 'vi', flag: '🇻🇳' },
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simulation: in a real app, use SpeechRecognition API
    setTimeout(() => {
      setTranscription("He trabajado cuidando a los niños de mi barrio por cinco años. He organizado sus comidas, actividades y he ayudado con sus tareas escolares. También medié conflictos entre los padres cuando había desacuerdos.");
      setIsRecording(false);
      setStep('processing');
    }, 4000);
  };

  useEffect(() => {
    if (step === 'processing' && transcription) {
      const analyze = async () => {
        try {
          const result = await extractProfessionalSkills(transcription);
          setProfile(result);
          setStep('result');
        } catch (err) {
          console.error(err);
        }
      };
      analyze();
    }
  }, [step, transcription]);

  const renderStep = () => {
    switch (step) {
      case 'language':
        return (
          <div className="text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="relative rounded-[2rem] border-[0.75px] border-white/5 p-3 max-w-2xl mx-auto mb-12">
              <GlowingEffect
                spread={50}
                glow={true}
                disabled={false}
                proximity={80}
                inactiveZone={0.01}
                borderWidth={4}
              />
              <Card className="bg-slate-900/70 backdrop-blur-sm relative overflow-hidden border-white/10 rounded-[1.75rem] p-8">
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={300} />
                <h2 className="text-3xl md:text-4xl font-black text-white relative z-10">What language do you prefer?</h2>
                <p className="text-neutral-400 mt-3 relative z-10">Choose your preferred language for the interview</p>
              </Card>
            </div>
            <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto">
              {languages.map(lang => (
                <div key={lang.code} className="relative rounded-[2rem] border-[0.75px] border-white/5 p-3">
                  <GlowingEffect
                    spread={50}
                    glow={true}
                    disabled={false}
                    proximity={80}
                    inactiveZone={0.01}
                    borderWidth={4}
                  />
                  <button
                    onClick={() => { setSelectedLang(lang.name); setStep('record'); }}
                    className="touch-target group bg-slate-900/70 backdrop-blur-sm p-8 rounded-[1.75rem] border border-white/10 hover:border-indigo-500/50 transition-all flex flex-col items-center gap-4 shadow-2xl hover:shadow-indigo-500/20 w-full"
                  >
                    <span className="text-5xl">{lang.flag}</span>
                    <span className="font-black text-white group-hover:text-indigo-400 uppercase tracking-widest text-sm">{lang.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'record':
        const placeholders = [
          "Tell me about a time you helped organize an event in your community...",
          "Describe how you managed schedules or coordinated people...",
          "Share a story about resolving a conflict or solving a problem...",
          "What skills have you developed from your volunteer work?",
          "Tell me about a role you've played that you're proud of..."
        ];

        return (
          <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
            <div className="relative rounded-[2rem] border-[0.75px] border-white/5 p-3 max-w-md mx-auto">
              <GlowingEffect
                spread={50}
                glow={true}
                disabled={false}
                proximity={80}
                inactiveZone={0.01}
                borderWidth={4}
              />
              <div className="flex items-center gap-3 bg-indigo-900/70 backdrop-blur-sm p-4 rounded-[1.75rem] border border-white/10">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <ICONS.Mic className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-bold text-white">Career Coach Agent</h3>
                  <p className="text-xs font-medium text-indigo-400 uppercase tracking-wider">Active Interview Mode</p>
                </div>
              </div>
            </div>

            <div className="text-center space-y-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Tell Your Story to BridgeAI
              </h2>

              <div className="max-w-3xl mx-auto">
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={(e) => setStoryInput(e.target.value)}
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (storyInput.trim()) {
                      setTranscription(storyInput);
                      setStep('processing');
                    }
                  }}
                />
              </div>

              <div className="pt-8">
                <p className="text-neutral-400 text-base mb-6">Or use voice to share your experience</p>
                <div className="relative inline-block">
                  <button
                    onClick={handleStartRecording}
                    disabled={isRecording}
                    className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl transition-all shadow-xl ${
                      isRecording 
                        ? 'bg-red-500 text-white scale-105 shadow-red-500/50' 
                        : 'bg-indigo-600 text-white hover:scale-105 shadow-indigo-500/50 hover:bg-indigo-700'
                    }`}
                  >
                    <ICONS.Mic className="w-6 h-6" />
                    <span className="font-bold text-base uppercase tracking-wider">
                      {isRecording ? "Recording..." : "Start Voice Recording"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {isRecording && (
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 bg-red-100 rounded-full animate-ping opacity-20 absolute"></div>
                  <div className="w-24 h-24 bg-red-100 rounded-full animate-ping opacity-40 absolute inset-0 m-auto"></div>
                </div>
              </div>
            )}
          </div>
        );
      case 'processing':
        return (
          <motion.div 
            className="text-center py-20 space-y-8 animate-in fade-in duration-700"
            initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
          >
            <motion.div 
              className="w-24 h-24 bg-indigo-900/70 backdrop-blur-sm text-indigo-400 rounded-3xl flex items-center justify-center mx-auto relative overflow-hidden border border-indigo-700/30 shadow-2xl shadow-indigo-500/20"
              animate={shouldReduceMotion ? {} : { scale: [1, 1.05, 1] }}
              transition={shouldReduceMotion ? {} : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
               <div className="absolute inset-0 bg-indigo-600/20 animate-pulse"></div>
               <ICONS.Brain className="w-12 h-12 animate-bounce" />
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tight">Understanding Your Strengths</h2>
              <motion.p 
                className="text-neutral-400 font-medium"
                animate={shouldReduceMotion ? {} : { opacity: [0.5, 1, 0.5] }}
                transition={shouldReduceMotion ? {} : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Gemini is translating your experience into professional skills.
              </motion.p>
            </div>
          </motion.div>
        );
      case 'result':
        return (
          <div className="max-w-2xl mx-auto relative rounded-[2rem] border-[0.75px] border-white/5 p-3 animate-in zoom-in-95 duration-700">
            <GlowingEffect
              spread={50}
              glow={true}
              disabled={false}
              proximity={80}
              inactiveZone={0.01}
              borderWidth={4}
            />
            <div className="bg-slate-900/70 backdrop-blur-sm p-8 md:p-12 rounded-[1.75rem] shadow-2xl border border-white/10">
              <div className="text-center mb-10">
                <span className="text-[10px] bg-indigo-900/50 text-indigo-400 px-4 py-1.5 rounded-full font-black uppercase tracking-widest border border-indigo-700/30">Profile Ready</span>
                <h2 className="text-4xl font-black text-white mt-4 leading-tight">{profile.Professional_Title}</h2>
              </div>

              <div className="space-y-8">
                <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/10">
                  <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Professional Impact</h3>
                  <p className="text-neutral-300 text-lg font-light leading-relaxed italic">"{profile.Impact_Statement}"</p>
                </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Your Skills</h3>
                   <div className="flex flex-wrap gap-2">
                     {profile.Hard_Skills.slice(0, 4).map((s: string, idx: number) => (
                       <motion.span 
                         key={s} 
                         className="bg-indigo-900/50 text-indigo-300 px-3 py-2 rounded-xl text-sm font-bold border border-indigo-700/30 shadow-sm"
                         initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: shouldReduceMotion ? 0 : idx * 0.05, duration: shouldReduceMotion ? 0 : 0.3 }}
                       >
                         {s}
                       </motion.span>
                     ))}
                   </div>
                 </div>
                 <div>
                   <h3 className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-4">Your Strengths</h3>
                   <div className="flex flex-wrap gap-2">
                     {profile.Soft_Skills.slice(0, 4).map((s: string, idx: number) => (
                       <motion.span 
                         key={s} 
                         className="bg-teal-900/50 text-teal-300 px-3 py-2 rounded-xl text-sm font-bold border border-teal-700/30 shadow-sm"
                         initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: shouldReduceMotion ? 0 : idx * 0.05, duration: shouldReduceMotion ? 0 : 0.3 }}
                       >
                         {s}
                       </motion.span>
                     ))}
                   </div>
                 </div>
               </div>
            </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/50 hover:scale-[1.02]"
                >
                  Send to Employers
                </button>
                <button 
                  onClick={() => setStep('language')}
                  className="w-full mt-4 text-neutral-400 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* 3D Background Animation - Full Page */}
      <div className="fixed inset-0 z-0">
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto py-12 px-4">
        <div className="mb-12 flex items-center justify-center gap-4">
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step === 'language' ? 'bg-indigo-500 scale-125 shadow-lg shadow-indigo-500/50' : 'bg-white/20 backdrop-blur-sm'}`} />
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step === 'record' ? 'bg-indigo-500 scale-125 shadow-lg shadow-indigo-500/50' : 'bg-white/20 backdrop-blur-sm'}`} />
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step === 'processing' ? 'bg-indigo-500 scale-125 shadow-lg shadow-indigo-500/50' : 'bg-white/20 backdrop-blur-sm'}`} />
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step === 'result' ? 'bg-indigo-500 scale-125 shadow-lg shadow-indigo-500/50' : 'bg-white/20 backdrop-blur-sm'}`} />
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default VoiceApply;
