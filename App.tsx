
import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Layout from './components/Layout';
import StoryTranslator from './components/StoryTranslator';
import VoiceApply from './components/VoiceApply';
import ArchitecturePanel from './components/ArchitecturePanel';
import RecruiterView from './components/RecruiterView';
import AccessibilityHub from './components/AccessibilityHub';
import EthicalGovernance from './components/EthicalGovernance';
import ImpactSection from './components/ImpactSection';
import { Scene } from './components/ui/hero-section';
import { GlowingEffect } from './components/ui/glowing-effect';
import { AppTab, Job } from './types';
import { ICONS } from './constants';

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    company: 'EcoLogistics Corp',
    title: 'Operations Coordinator',
    matchScore: 94,
    trustScore: 98,
    tags: ['Project Management', 'Crisis Intervention'],
    description: 'Seeking someone with experience in grassroots organizing and local distribution networks.'
  },
  {
    id: '2',
    company: 'Unity Health Net',
    title: 'Patient Navigator',
    matchScore: 88,
    trustScore: 85,
    tags: ['Advocacy', 'Case Management'],
    description: 'Manage complex medical schedules and advocate for community members within healthcare systems.'
  },
  {
    id: '3',
    company: 'FutureCities Lab',
    title: 'Community Liaison',
    matchScore: 82,
    trustScore: 92,
    tags: ['Negotiation', 'Urban Planning'],
    description: 'Bridge the gap between municipal data science and neighborhood lived experiences.'
  }
];

const DEMO_PROFILE = `Jane Doe is a 42-year-old mother from Oakland who spent 12 years as a stay-at-home parent before becoming a local community leader. 

She has been managing the North Oakland Mutual Aid fund since 2020. During her time there, she coordinated over 500 grocery deliveries, managed a volunteer base of 45 people, and successfully raised $12,000 in micro-grants for local families. Before her break, she graduated from UC Berkeley in 2004 with a focus on Sociology. 

She is highly adept at conflict resolution, having mediated over 20 vendor disputes at the local farmers market. She is currently looking for a role as an Operations Manager where she can apply her deep roots in community logistics.`;

const App: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [a11y, setA11y] = useState({
    highContrast: false,
    largeFont: false,
    reducedMotion: false,
    lowStimuli: false,
    readerHints: false
  });
  const [showA11yHub, setShowA11yHub] = useState(false);

  useEffect(() => {
    const { body } = document;
    body.classList.toggle('high-contrast', a11y.highContrast);
    body.classList.toggle('large-font', a11y.largeFont);
    body.classList.toggle('reduced-motion', a11y.reducedMotion);
    body.classList.toggle('low-stimuli', a11y.lowStimuli);
  }, [a11y]);

  const setA11ySetting = (key: string, value: boolean) => {
    setA11y(prev => ({ ...prev, [key]: value }));
  };

  const renderDashboard = () => (
    <div className="relative min-h-screen bg-black">
      {/* 3D Animated Background */}
      <div className='absolute inset-0 z-0'>
        <Scene />
      </div>

      {/* Dashboard Content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 space-y-12">
        {/* Hero Section */}
        <div className="w-full max-w-6xl space-y-8 flex flex-col items-center text-center pt-16">
          <span className="backdrop-blur-sm bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-xs font-semibold">
            ✨ SDG 10 Initiative
          </span>
          
          <div className="space-y-6 flex items-center justify-center flex-col">
            <h1 className="text-3xl md:text-6xl font-semibold tracking-tight max-w-3xl text-white">
              Equity-First Career Intelligence
            </h1>
            <p className="text-lg text-neutral-300 max-w-2xl">
              BridgeAI is dismantling hiring inequalities by surfacing the invisible talent within marginalized communities. 
              Translate lived experience into professional power through agentic AI coaching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button 
                onClick={() => setActiveTab(AppTab.VOICE_APPLY)}
                className="text-sm px-8 py-3 rounded-xl bg-white text-black border border-white/10 shadow-none hover:bg-white/90 transition-none flex items-center gap-2 font-medium"
              >
                <ICONS.Mic className="h-5 w-5" />
                Voice-to-Apply
              </button>
              <button 
                onClick={() => setActiveTab(AppTab.STORY_TO_PROFILE)}
                className="text-sm px-8 py-3 rounded-xl bg-transparent text-white border border-white/20 shadow-none hover:bg-white/10 transition-none font-medium"
              >
                AI Story Translator
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl w-full mx-auto">
          {[
            { label: "Community Users", val: "12,400+", icon: <ICONS.Chart className="w-5 h-5" /> },
            { label: "Skills Identified", val: "85,000+", icon: <ICONS.Brain className="w-5 h-5" /> },
            { label: "Hiring Partners", val: "240+", icon: <ICONS.Shield className="w-5 h-5" /> }
          ].map((stat, i) => (
            <div key={i} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6 h-40 flex flex-col justify-start items-start space-y-3">
              <div className="text-white/80">
                {stat.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-white">{stat.val}</h3>
              <p className="text-xs md:text-sm text-neutral-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Career Matches Section */}
        <section className="w-full max-w-6xl space-y-6">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-xl md:text-2xl font-semibold text-white">Top Career Matches</h3>
            <button 
              onClick={() => setActiveTab(AppTab.MATCHES)}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Explore all →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {MOCK_JOBS.map((job, index) => (
              <motion.div 
                key={job.id} 
                className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6 h-64 flex flex-col justify-between transition-all hover:bg-white/10 hover:border-white/20"
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : index * 0.1, duration: shouldReduceMotion ? 0 : 0.4 }}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center font-bold text-lg text-white">
                      {job.company.charAt(0)}
                    </div>
                    <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-[10px] font-semibold text-white">
                      {job.matchScore}%
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-white mb-1">{job.title}</h4>
                    <p className="text-xs text-neutral-400 uppercase tracking-wider">{job.company}</p>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <ICONS.Shield className="w-3 h-3 text-teal-400" />
                    <span className="text-[10px] font-medium text-teal-400">{job.trustScore}% Equity Trust</span>
                  </div>
                </div>
                
                <button className="w-full rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 py-2.5 text-sm font-medium text-white transition-all">
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return renderDashboard();
      case AppTab.STORY_TO_PROFILE:
        return <StoryTranslator />;
      case AppTab.VOICE_APPLY:
        return <VoiceApply />;
      case AppTab.MATCHES:
        return (
          <div className="space-y-8 max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-normal text-white/80">Merit-First Opportunities</h2>
            <div className="grid grid-cols-1 gap-6">
              {MOCK_JOBS.map((job, index) => (
                <motion.div 
                  key={job.id} 
                  className="relative"
                  initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: shouldReduceMotion ? 0 : index * 0.1, duration: shouldReduceMotion ? 0 : 0.4 }}
                >
                  <div className="relative h-full rounded-[2rem] border-[0.75px] border-white/5 p-3">
                    <GlowingEffect
                      spread={50}
                      glow={true}
                      disabled={false}
                      proximity={80}
                      inactiveZone={0.01}
                      borderWidth={4}
                    />
                    <div className="relative bg-slate-900/95 backdrop-blur-sm p-8 rounded-[1.75rem] border border-white/10 shadow-2xl flex flex-col md:flex-row gap-8 items-start">
                      <div className="w-24 h-24 flex-none bg-slate-800/50 border border-white/10 rounded-3xl flex items-center justify-center text-4xl font-bold text-slate-300 uppercase">
                        {job.company.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
                          <h3 className="font-bold text-2xl text-white">{job.title}</h3>
                          <div className="flex gap-2">
                            <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                              {job.matchScore}% Match
                            </span>
                            <span className="bg-teal-400 text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                              {job.trustScore}% Equity
                            </span>
                          </div>
                        </div>
                        <p className="text-slate-400 font-medium mb-4">{job.company}</p>
                        <p className="text-slate-300 leading-relaxed mb-6">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.tags.map((tag, tagIdx) => (
                            <motion.span 
                              key={tag} 
                              className="text-xs bg-slate-800/50 text-slate-300 px-3 py-1.5 rounded-lg font-medium uppercase tracking-wide border border-white/10"
                              initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: shouldReduceMotion ? 0 : index * 0.1 + tagIdx * 0.05, duration: shouldReduceMotion ? 0 : 0.3 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-none w-full md:w-auto">
                        <button className="w-full md:w-48 bg-white text-slate-900 py-4 rounded-2xl text-sm font-bold hover:bg-slate-100 transition-all shadow-lg">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case AppTab.ARCHITECTURE:
        return <ArchitecturePanel />;
      case AppTab.RECRUITER_PREVIEW:
        return <RecruiterView originalProfile={DEMO_PROFILE} />;
      case AppTab.ETHICS:
        return <EthicalGovernance />;
      case AppTab.IMPACT:
        return <ImpactSection />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
    >
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}

        {/* Persistent Accessibility Hub FAB */}
        <div className="fixed bottom-8 right-8 z-[150]">
        <button 
          onClick={() => setShowA11yHub(true)}
          className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform focus:ring-4 focus:ring-indigo-500/50"
          aria-label="Open Accessibility Hub"
          title="Accessibility Preferences"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m-9.75 0h9.75" />
          </svg>
        </button>
      </div>

      <AccessibilityHub 
        isOpen={showA11yHub} 
        onClose={() => setShowA11yHub(false)}
        settings={a11y}
        setSetting={setA11ySetting}
      />
      </Layout>
    </motion.div>
  );
};

export default App;
