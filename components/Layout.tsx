
import React from 'react';
import { AppTab } from '../types';
import { Header } from './ui/header-01';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 w-full pt-20">
        {children}
      </main>

      <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-neutral-400 text-xs">
          &copy; 2026 BridgeAI Framework. Built for the Frontend AI Hackathon.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
