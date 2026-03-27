export type Screen = 'onboarding' | 'quick-relief' | 'session';

export interface SessionSettings {
  duration: number; // in minutes
  sound: string;
  voiceGuidance: boolean;
}

export type BreathPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

export const PHASE_DURATION = 4; // seconds per phase for box breathing
