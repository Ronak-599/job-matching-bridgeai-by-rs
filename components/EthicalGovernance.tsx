
import React from 'react';
import { ICONS } from '../constants';
import { Card } from './ui/card';
import { Spotlight } from './ui/spotlight';
import { SplineScene } from './ui/splite';
import { GlowingEffect } from './ui/glowing-effect';

const EthicalGovernance: React.FC = () => {
  const principles = [
    {
      title: "What We Hide",
      icon: <ICONS.Shield className="w-6 h-6" />,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      items: [
        "Your full name and physical address are redacted until you choose to reveal them.",
        "Age, gender markers, and graduation years are stripped to prevent time-based bias.",
        "Cultural identifiers in speech are normalized into professional English competencies.",
        "Specific neighborhoods or zip codes are generalized to prevent location-based profiling."
      ]
    },
    {
      title: "What AI Does NOT Decide",
      icon: <ICONS.Brain className="w-6 h-6" />,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
      items: [
        "AI does not 'hire' or 'reject' you. It only surfaces your hidden skills.",
        "AI does not rank candidates based on prestige (e.g., ivy league degrees).",
        "AI does not guess your personality or 'cultural fit.'",
        "AI does not determine your worth; it only translates your labor into industry terms."
      ]
    },
    {
      title: "Your Data Control",
      icon: <ICONS.Globe className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      items: [
        "1-Click Deletion: You can wipe your entire profile and interview history at any time.",
        "Explicit Consent: No data is shared with recruiters without your final 'OK' on the profile.",
        "Human Review: You have the final edit on every skill the AI suggests.",
        "No External Sales: We never sell your personal narrative to third-party advertisers."
      ]
    },
    {
      title: "Bias Mitigation Strategy",
      icon: <ICONS.Chart className="w-6 h-6" />,
      color: "bg-purple-50 text-purple-600 border-purple-100",
      items: [
        "Adversarial Testing: We intentionally try to 'trick' our AI to find and fix biased patterns.",
        "Equitable Taxonomy: We use a skill database that values non-traditional work (caregiving, volunteering).",
        "Transparency Logs: Every skill extraction includes an 'AI Reasoning' audit trail for recruiters.",
        "Diversity Feedback: Our model is fine-tuned using feedback from diverse HR professionals."
      ]
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
          <Card className="bg-gradient-to-br from-slate-900/80 via-emerald-950/70 to-teal-950/60 backdrop-blur-xl relative overflow-hidden border-white/20 rounded-[2.25rem] shadow-2xl">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              size={300}
            />
            
            <div className="p-10 md:p-16 relative z-10">
              <div className="inline-block mb-4">
                <span className="text-[11px] bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full font-black uppercase tracking-widest shadow-lg">
                  Radical Transparency
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-200 to-teal-300 leading-tight mb-6">
                Our Ethical Commitment
              </h1>
              <p className="text-xl text-neutral-200 max-w-2xl leading-relaxed font-medium">
                BridgeAI is built on the principle that technology should serve people, not profile them. We operate with radical transparency.
              </p>
            </div>
          </Card>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {principles.map((p, i) => (
          <div key={i} className="relative rounded-[2.5rem] border-[0.75px] border-white/10 p-4 transform hover:scale-105 transition-all duration-300">
            <GlowingEffect
              spread={60}
              glow={true}
              disabled={false}
              proximity={100}
              inactiveZone={0.01}
              borderWidth={5}
            />
            <div className="relative bg-gradient-to-br from-slate-900/80 via-indigo-950/70 to-slate-900/80 backdrop-blur-xl p-10 rounded-[2.25rem] border border-white/20 shadow-2xl hover:shadow-emerald-500/30 transition-all group h-full">
              <div className={`w-16 h-16 ${p.color} rounded-3xl flex items-center justify-center font-black mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}>
                {p.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-6">{p.title}</h3>
              <ul className="space-y-5">
                {p.items.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 mt-2 flex-none" />
                    <p className="text-base font-medium leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
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
        <div className="bg-gradient-to-br from-emerald-950/90 via-teal-950/80 to-emerald-950/90 backdrop-blur-xl rounded-[2.25rem] p-16 md:p-24 text-center relative overflow-hidden border border-emerald-700/40 shadow-2xl">
          <div className="relative z-10 space-y-10">
          <div className="inline-block mb-4">
            <span className="text-[11px] bg-gradient-to-r from-white to-emerald-100 text-emerald-900 px-5 py-2.5 rounded-full font-black uppercase tracking-widest shadow-lg">
              Trust First, Profit Second
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-200 to-teal-200 leading-tight">Built for Trust, Not for Profit.</h2>
          <p className="text-emerald-100 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            In 2026, the standard for AI isn't just speed—it's <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-300">safety</span>. BridgeAI is committed to the UN Sustainable Development Goal 10: Reduced Inequalities.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <div className="px-8 py-4 bg-gradient-to-r from-white/10 to-emerald-500/10 border-2 border-white/20 rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform shadow-lg">
              <span className="text-white font-black text-sm uppercase tracking-widest">✓ ISO 42001 Compliant</span>
            </div>
            <div className="px-8 py-4 bg-gradient-to-r from-white/10 to-teal-500/10 border-2 border-white/20 rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform shadow-lg">
              <span className="text-white font-black text-sm uppercase tracking-widest">✓ Zero-Bias Architecture</span>
            </div>
            <div className="px-8 py-4 bg-gradient-to-r from-white/10 to-emerald-500/10 border-2 border-white/20 rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform shadow-lg">
              <span className="text-white font-black text-sm uppercase tracking-widest">✓ GDPR 2026 Ready</span>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-emerald-500/60 to-teal-500/60 blur-[140px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-teal-500/60 to-emerald-500/60 blur-[140px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400/40 blur-[100px] rounded-full"></div>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default EthicalGovernance;
