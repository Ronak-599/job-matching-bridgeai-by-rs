
export interface Skill {
  name: string;
  category: string;
  relevanceScore: number;
}

export interface ProfessionalProfile {
  Professional_Title: string;
  Hard_Skills: string[];
  Soft_Skills: string[];
  Impact_Statement: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  matchScore: number;
  trustScore: number; // 0-100 representation of diversity commitment
  tags: string[];
  description: string;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  STORY_TO_PROFILE = 'story_to_profile',
  VOICE_APPLY = 'voice_apply',
  MATCHES = 'matches',
  ARCHITECTURE = 'architecture',
  RECRUITER_PREVIEW = 'recruiter_preview',
  ETHICS = 'ethics',
  IMPACT = 'impact'
}
