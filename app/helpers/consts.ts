import { Modes } from "@/types";

export const LS_KEY: Record<Modes, string> = {
  kitchen: 'sr_kitchenCount',
  stock: 'sr_picked',
  tasks: 'sr_todo'
}

export interface IAppAccent {
  accent: string;
  gradient: string;
}

export const MODE_COLORS: Record<Modes, IAppAccent> = {
  kitchen: {
    accent: '#6366f1',
    gradient: '#4f46e5',
  },
  stock: {
    accent: '#f97316',
    gradient: '#ea580c',
  },
  tasks: {
    accent: '#3b82f6',
    gradient: '#2563eb',
  },
};

export const getAccentColor = (mode: Modes): IAppAccent => ({
  accent: MODE_COLORS[mode].accent,
  gradient: `linear-gradient(135deg, ${MODE_COLORS[mode].accent} 0%, ${MODE_COLORS[mode].gradient} 100%)`,
});

const MODE_SUBTITLES: Record<Modes, string> = {
  kitchen: 'Count what is in the kitchen',
  stock: 'Record what you picked up',
  tasks: 'Manage your daily tasks',
};

export const getHeaderSubtitle = (mode: Modes): string => MODE_SUBTITLES[mode];