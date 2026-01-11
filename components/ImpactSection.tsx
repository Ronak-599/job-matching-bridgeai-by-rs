
import React from 'react';
import { ICONS } from '../constants';
import { Card } from './ui/card';
import { Spotlight } from './ui/spotlight';
import { SplineScene } from './ui/splite';
import { GlowingEffect } from './ui/glowing-effect';

const ImpactSection: React.FC = () => {
  const impactGoals = [
    {
      title: "Skill Discovery Equity",
      metric: "100%",
      description: "Recognition of informal labor by translating unstructured community narratives into industry-standard competency profiles.",
      icon: <ICONS.Brain className="w-6 h-6" />,
      tag: "Recognition Parity"
    },
    {
      title: "Zero-Identity Evaluability",
      metric: "100%",
      description: "Blind sourcing layer ensures the first interaction between recruiter and talent is strictly merit-based and demographic-free.",
      icon: <ICONS.Shield className="w-6 h-6" />,
      tag: "Bias Mitigation"
    },
    {
      title: "Adaptive Accessibility Reach",
      metric: "WCAG 3.0",
      description: "Targeting high-level accessibility standards to ensure cognitive, sensory, and motor parity in job navigation.",
      icon: <ICONS.Chart className="w-6 h-6" />,
      tag: "Inclusion Standard"
    },
    {
      title: "Multilingual Mobility",
      metric: "Real-time",
      description: "Removing the linguistic tax by allowing talent to define their professional value in their native language.",
      icon: <ICONS.Globe className="w-6 h-6" />,
      tag: "Global Equity"
    },
    {
      title: "Transparent Merit Audits",
      metric: "Immutable",
      description: "AI Reasoning Logs provide a clear trail for every recommendation, allowing candidates to audit the logic of their match.",
      icon: <ICONS.Brain className="w-6 h-6" />,
      tag: "Trust Framework"
    },
    {
      title: "SDG 10 Mobility Index",
      metric: "Tracked",
      description: "Measuring the successful transition of high-value community talent into formal professional roles in 'Digital Density' sectors.",
      icon: <ICONS.Star className="w-6 h-6" />,
      tag: "Economic Impact"
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
              <div className="max-w-3xl">
                <div className="inline-block mb-4">
                  <span className="text-[11px] bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full font-black uppercase tracking-widest shadow-lg">
                    UN SDG 10 Aligned
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-300 leading-tight mb-6">
                  Measurable Social Equity
                </h1>
                <p className="text-xl text-neutral-200 leading-relaxed font-medium">
                  BridgeAI is more than a tool; it's a systematic intervention aligned with UN SDG 10 to reduce inequality within global labor markets.
                </p>
              </div>
            </div>
          </Card>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {impactGoals.map((goal, i) => (
          <div key={i} className="relative rounded-[2.5rem] border-[0.75px] border-white/10 p-4 transform hover:scale-105 transition-all duration-300">
            <GlowingEffect
              spread={60}
              glow={true}
              disabled={false}
              proximity={100}
              inactiveZone={0.01}
              borderWidth={5}
            />
            <div className="relative bg-gradient-to-br from-slate-900/80 via-indigo-950/70 to-slate-900/80 backdrop-blur-xl p-10 rounded-[2.25rem] border border-white/20 shadow-2xl hover:shadow-indigo-500/30 transition-all group h-full flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg shadow-indigo-500/50 flex-shrink-0">
                  {goal.icon}
                </div>
                <span className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 uppercase tracking-widest bg-gradient-to-r from-indigo-900/50 to-purple-900/50 px-4 py-2 rounded-xl border-2 border-indigo-500/30 whitespace-nowrap backdrop-blur-sm">
                  {goal.tag}
                </span>
              </div>
              
              <div className="flex-1 space-y-5">
                <div className="space-y-3">
                  <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200 block">{goal.metric}</span>
                  <h3 className="text-xl font-bold text-white leading-snug">{goal.title}</h3>
                </div>
                <p className="text-base font-medium text-slate-200 leading-relaxed">
                  {goal.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/20 flex items-center gap-2 text-[11px] font-black text-indigo-300 uppercase tracking-widest">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex-shrink-0 animate-pulse"></div>
                Live Impact Target
              </div>
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
        <section className="bg-gradient-to-br from-indigo-950/90 via-purple-950/80 to-indigo-950/90 backdrop-blur-xl rounded-[2.25rem] p-16 md:p-24 text-white relative overflow-hidden text-center border border-indigo-700/40 shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <div className="inline-block mb-4">
              <span className="text-[11px] bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-full font-black uppercase tracking-widest shadow-lg">
                2026-2027 Target
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-200">The Equity Commitment 2026</h2>
            <p className="text-indigo-200 text-xl font-medium leading-relaxed">
              By 2027, BridgeAI aims to have verified <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">$1.2B</span> in "Unrecognized Human Capital" by accurately mapping the labor value of community care, grassroots logistics, and informal education.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5 pt-4">
              <button className="bg-gradient-to-r from-white to-indigo-100 text-indigo-700 px-10 py-5 rounded-2xl font-black text-base uppercase tracking-widest hover:scale-105 hover:shadow-2xl transition-all shadow-xl hover:from-indigo-100 hover:to-white">
                📊 Download Impact Report
              </button>
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-black text-base uppercase tracking-widest hover:scale-105 hover:shadow-2xl transition-all shadow-xl border-2 border-white/20">
                🎯 View Metrics Dashboard
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-400/30 to-emerald-400/30 rounded-full blur-[100px] -ml-32 -mb-32 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default ImpactSection;
