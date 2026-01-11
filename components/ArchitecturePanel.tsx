
import React from 'react';
import { ICONS } from '../constants';
import { Card } from './ui/card';
import { Spotlight } from './ui/spotlight';
import { SplineScene } from './ui/splite';
import { GlowingEffect } from './ui/glowing-effect';

const ArchitecturePanel: React.FC = () => {
  const agents = [
    {
      id: "01",
      name: "Profile Understanding Agent",
      role: "Narrative Intake & Structuring",
      desc: "Captures raw, messy conversational input and identifies the 'What, How, and Result' of lived experiences. It transforms rambling stories into structured narrative segments.",
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: "02",
      name: "Bias-Scrubbing Agent",
      role: "Ethical Sanitization",
      desc: "Acts as an adversarial filter. It scans for and redacts demographic markers (age, gender, ethnicity, location) to create a 'Clean Identity' ready for blind merit review.",
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      id: "03",
      name: "Skill Translation Agent",
      role: "Semantic Merit Mapping",
      desc: "The logic core. It maps informal life tasks to industry-standard competencies (e.g., mapping 'community organizing' to 'Strategic Stakeholder Management').",
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      id: "04",
      name: "Job Matching Agent",
      role: "Merit-Based Discovery",
      desc: "Queries the job vector database. It prioritizes 'Skill Overlap' and 'Growth Potential' over traditional credentials like ivy-league degrees or linear career paths.",
      color: "bg-purple-100 text-purple-700"
    },
    {
      id: "05",
      name: "Accessibility Adaptation Agent",
      role: "Dynamic UI/UX Optimization",
      desc: "Monitors interaction patterns in real-time. It automatically triggers WCAG 3.0 UI shifts (contrast, font size, motion reduction) based on user behavior.",
      color: "bg-amber-100 text-amber-700"
    }
  ];

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
      <div className="relative z-10 max-w-6xl mx-auto space-y-20 pb-24 pt-12 px-4 animate-in fade-in duration-700">
        {/* Hero Header Card */}
        <div className="relative rounded-[2.5rem] border-[0.75px] border-white/10 p-4">
          <GlowingEffect
            spread={60}
            glow={true}
            disabled={false}
            proximity={100}
            inactiveZone={0.01}
            borderWidth={5}
          />
          <Card className="bg-gradient-to-br from-slate-900/80 via-indigo-950/70 to-purple-950/60 backdrop-blur-xl relative overflow-hidden border-white/20 rounded-[2.25rem] shadow-2xl">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              size={300}
            />
            
            <div className="p-10 md:p-16 relative z-10">
              <div className="inline-block mb-4">
                <span className="text-[11px] bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full font-black uppercase tracking-widest shadow-lg">
                  5-Agent System
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-indigo-300 leading-tight mb-6">
                Agentic Pipeline
              </h1>
              <p className="text-xl text-neutral-200 max-w-2xl leading-relaxed font-medium">
                BridgeAI is powered by five specialized AI agents working in sequence to ensure equity and professional visibility.
              </p>
            </div>
          </Card>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agents.map((agent) => (
          <div key={agent.id} className="relative rounded-[2.5rem] border-[0.75px] border-white/10 p-4 transform hover:scale-105 transition-all duration-300">
            <GlowingEffect
              spread={60}
              glow={true}
              disabled={false}
              proximity={100}
              inactiveZone={0.01}
              borderWidth={5}
            />
            <div className="relative bg-gradient-to-br from-slate-900/80 via-indigo-950/70 to-slate-900/80 backdrop-blur-xl p-10 rounded-[2.25rem] border border-white/20 shadow-2xl hover:shadow-indigo-500/30 transition-all group h-full">
              <div className={`w-16 h-16 ${agent.color} rounded-3xl flex items-center justify-center font-black text-2xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}>
                {agent.id}
              </div>
              <h3 className="text-xl font-black text-white mb-2">{agent.name}</h3>
              <p className="text-[11px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 uppercase tracking-widest mb-5">{agent.role}</p>
              <p className="text-base text-slate-200 leading-relaxed font-medium">
                {agent.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative rounded-[2.5rem] border-[0.75px] border-white/10 p-4 max-w-5xl mx-auto">
        <GlowingEffect
          spread={60}
          glow={true}
          disabled={false}
          proximity={100}
          inactiveZone={0.01}
          borderWidth={5}
        />
        <section className="bg-gradient-to-br from-slate-900/80 via-indigo-950/70 to-slate-900/80 backdrop-blur-xl rounded-[2.25rem] p-12 md:p-20 text-white overflow-hidden relative border border-white/20 shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-16 flex items-center gap-4">
            <span className="w-2 h-12 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
            The Data Flow Sequence
          </h2>
          
          <div className="space-y-14 relative">
            {/* Connection Line */}
            <div className="absolute left-8 top-4 bottom-4 w-1 bg-gradient-to-b from-indigo-500/30 via-purple-500/30 to-indigo-500/30 hidden md:block rounded-full"></div>
            
            <div className="flex flex-col md:flex-row gap-8 items-start relative">
              <div className="w-16 h-16 flex-none bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl shadow-indigo-500/40 z-10">1</div>
              <div>
                <h4 className="text-2xl font-bold mb-3 text-white">Narrative Intake</h4>
                <p className="text-slate-300 text-base leading-relaxed max-w-xl">
                  User provides raw lived experience via text or voice. The <strong className="text-white">Profile Understanding Agent</strong> identifies functional activities within the story.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start relative">
              <div className="w-16 h-16 flex-none bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl shadow-emerald-500/40 z-10">2</div>
              <div>
                <h4 className="text-2xl font-bold mb-3 text-white">Bias Cleansing</h4>
                <p className="text-slate-300 text-base leading-relaxed max-w-xl">
                  The data passes through the <strong className="text-white">Bias-Scrubbing Agent</strong>. All demographic indicators are replaced with merit-neutral tokens to prevent unconscious bias.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start relative">
              <div className="w-16 h-16 flex-none bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl shadow-indigo-500/40 z-10">3</div>
              <div>
                <h4 className="text-2xl font-bold mb-3 text-white">Competency Mapping</h4>
                <p className="text-slate-300 text-base leading-relaxed max-w-xl">
                  The <strong className="text-white">Skill Translation Agent</strong> cross-references the narrative against industry taxonomies to generate a high-density professional profile.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start relative">
              <div className="w-16 h-16 flex-none bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl shadow-purple-500/40 z-10">4</div>
              <div>
                <h4 className="text-2xl font-bold mb-3 text-white">Discovery & Match</h4>
                <p className="text-slate-300 text-base leading-relaxed max-w-xl">
                  The <strong className="text-white">Job Matching Agent</strong> calculates compatibility scores. Finally, the <strong className="text-white">Accessibility Agent</strong> optimizes the results for the user's sensory preferences.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-emerald-400/30 rounded-full blur-[100px] -ml-32 -mb-32 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </section>
      </div>

      <div className="relative rounded-[2.5rem] border-[0.75px] border-white/10 p-4 max-w-5xl mx-auto">
        <GlowingEffect
          spread={60}
          glow={true}
          disabled={false}
          proximity={100}
          inactiveZone={0.01}
          borderWidth={5}
        />
        <div className="bg-gradient-to-br from-indigo-950/90 via-purple-950/80 to-indigo-950/90 backdrop-blur-xl p-12 md:p-16 rounded-[2.25rem] border border-indigo-700/40 shadow-2xl flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h3 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">Agentic Orchestration</h3>
          <p className="text-indigo-200 text-lg font-medium leading-relaxed">
            By decoupling the extraction process into specialized agents, BridgeAI ensures that 100% of the reasoning is transparent and auditable. Each agent maintains its own "Ethics Log" to justify its decisions.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <span className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-[11px] font-black uppercase text-white tracking-widest border-2 border-white/20 shadow-lg">Zero-Shot Chain of Thought</span>
            <span className="px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-[11px] font-black uppercase text-white tracking-widest border-2 border-white/20 shadow-lg">Adversarial Bias Testing</span>
          </div>
        </div>
        <div className="w-full md:w-64 aspect-square bg-slate-900/60 backdrop-blur-sm rounded-[2rem] shadow-2xl border border-indigo-700/30 flex items-center justify-center p-8">
           <div className="relative w-full h-full">
             <div className="absolute inset-0 border-4 border-dashed border-indigo-200 rounded-full animate-spin-slow"></div>
             <div className="absolute inset-4 border-4 border-indigo-500/20 rounded-full"></div>
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-12 h-12 bg-indigo-600 rounded-2xl rotate-45 flex items-center justify-center shadow-lg shadow-indigo-200">
                 <div className="-rotate-45">
                   <ICONS.Brain className="w-6 h-6 text-white" />
                 </div>
               </div>
             </div>
           </div>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ArchitecturePanel;
