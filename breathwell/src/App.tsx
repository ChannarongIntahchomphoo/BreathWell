/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Settings, 
  Home, 
  Wind, 
  ArrowRight, 
  Lock, 
  Sparkles, 
  Brain, 
  Volume2, 
  Pause, 
  Play, 
  CheckCircle2, 
  ChevronRight,
  ArrowLeft,
  Droplets,
  Waves,
  Trees,
  HelpCircle
} from 'lucide-react';
import { Screen, SessionSettings, BreathPhase, PHASE_DURATION } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [settings, setSettings] = useState<SessionSettings>({
    duration: 3,
    sound: 'Rainfall',
    voiceGuidance: true
  });

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence mode="wait">
        {currentScreen === 'onboarding' && (
          <Onboarding key="onboarding" onBegin={() => setCurrentScreen('quick-relief')} />
        )}
        {currentScreen === 'quick-relief' && (
          <QuickRelief 
            key="quick-relief" 
            settings={settings}
            setSettings={setSettings}
            onStart={() => setCurrentScreen('session')}
            onBack={() => setCurrentScreen('onboarding')}
          />
        )}
        {currentScreen === 'session' && (
          <Session 
            key="session" 
            settings={settings}
            setSettings={setSettings}
            onEnd={() => setCurrentScreen('quick-relief')}
            onRestartJourney={() => setCurrentScreen('onboarding')}
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation - Only shown on Quick Relief and Session (as per design) */}
      {currentScreen !== 'onboarding' && (
        <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] glass z-50 rounded-t-4xl shadow-[0_-10px_40px_rgba(26,28,25,0.06)]">
          <button 
            onClick={() => setCurrentScreen('quick-relief')}
            className={`flex flex-col items-center justify-center px-8 py-3 rounded-2xl transition-all active:scale-95 duration-300 ${currentScreen === 'quick-relief' ? 'bg-primary text-white scale-105 shadow-lg' : 'text-on-surface-variant hover:bg-surface-container'}`}
          >
            <Home className="w-6 h-6 mb-1" />
            <span className="text-[0.85rem] font-medium tracking-wide">Quick Relief Setup</span>
          </button>
          <button 
            onClick={() => setCurrentScreen('session')}
            className={`flex flex-col items-center justify-center px-8 py-3 rounded-2xl transition-all active:scale-95 duration-300 ${currentScreen === 'session' ? 'bg-primary text-white scale-105 shadow-lg' : 'text-on-surface-variant hover:bg-surface-container'}`}
          >
            <Wind className="w-6 h-6 mb-1" />
            <span className="text-[0.85rem] font-medium tracking-wide">Sessions</span>
          </button>
        </nav>
      )}
    </div>
  );
}

function Onboarding({ onBegin }: { onBegin: () => void, key?: string }) {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-grow flex flex-col items-center justify-center px-6 py-12 max-w-4xl mx-auto text-center lg:text-left"
    >
      <header className="w-full mb-12 space-y-6">
        <div className="inline-flex items-center px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full mb-4 mx-auto lg:mx-0">
          <Sparkles className="w-4 h-4 mr-2" />
          <span className="text-xs font-bold uppercase tracking-widest">Welcome to Calm</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-primary leading-tight">BreathWell</h1>
        <p className="text-xl lg:text-2xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto lg:mx-0">
          A breath is a bridge. We invite you to explore the profound impact of intentional breathing on your nervous system.
        </p>
      </header>

      <section className="w-full mb-12">
        <div className="flex items-center p-4 bg-surface-container-low border border-on-surface-variant/10 rounded-2xl max-w-xl mx-auto lg:mx-0">
          <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mr-4">
            <Lock className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-on-surface">Your Privacy Matters</h4>
            <p className="text-sm text-on-surface-variant leading-snug">No data is ever collected or stored. Your journey is entirely private and stays on your device.</p>
          </div>
        </div>
      </section>

      <section className="w-full mb-16 max-w-xl mx-auto lg:mx-0">
        <div className="p-8 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-on-surface-variant/5">
          <div className="mb-8 text-left">
            <Brain className="w-10 h-10 text-secondary mb-4" />
            <h3 className="text-2xl font-semibold text-on-surface mb-3">Cognitive Ease</h3>
            <p className="text-on-surface-variant leading-relaxed">Lower cortisol levels and clear mental fog through rhythmic, tactile-guided sessions designed for immediate relief.</p>
          </div>
          <div className="h-32 w-full rounded-2xl overflow-hidden">
            <img 
              alt="Nature background" 
              className="w-full h-full object-cover grayscale opacity-60" 
              src="https://picsum.photos/seed/nature-calm/1000/400"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      <footer className="w-full flex flex-col items-center justify-center space-y-6">
        <button 
          onClick={onBegin}
          className="group relative px-12 py-6 bg-primary text-white rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 flex items-center"
        >
          <span className="mr-3">Begin Your Journey</span>
          <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
        </button>
        <p className="text-sm text-on-surface-variant tracking-wide">Takes less than 2 minutes to customize your BreathWell experience.</p>
      </footer>
    </motion.main>
  );
}

function QuickRelief({ settings, setSettings, onStart, onBack }: { 
  settings: SessionSettings, 
  setSettings: (s: SessionSettings) => void,
  onStart: () => void,
  onBack: () => void,
  key?: string
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-grow flex flex-col"
    >
      <header className="glass fixed top-0 w-full z-50 shadow-[0_20px_50px_rgba(26,28,25,0.06)] flex items-center justify-between px-6 pt-[env(safe-area-inset-top,0px)] h-[calc(5rem+env(safe-area-inset-top,0px))]">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 text-primary hover:opacity-80 transition-opacity" title="Back to Onboarding">
            <HelpCircle className="w-6 h-6" />
          </button>
          <button 
            onClick={onStart} 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            title="Start Session"
          >
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="font-bold text-2xl tracking-tight text-primary">BreathWell</h1>
          </button>
        </div>
      </header>

      <main className="pt-[calc(7rem+env(safe-area-inset-top,0px))] pb-32 px-6 max-w-2xl mx-auto w-full space-y-10">
        <section className="text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tight text-on-surface">Quick Relief Setup</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">Let's find your center. Focus on the light.</p>
          </div>

          <div className="relative flex justify-center items-center py-12">
            <div className="absolute w-72 h-72 rounded-full border-4 border-primary/10 animate-pulse"></div>
            <button 
              onClick={onStart}
              className="bg-primary w-64 h-64 rounded-full shadow-[0_30px_60px_rgba(10,67,115,0.25)] flex flex-col items-center justify-center text-white transition-transform hover:scale-105 active:scale-95 duration-300"
            >
              <Wind className="w-12 h-12 mb-4" />
              <span className="text-2xl font-bold tracking-widest uppercase text-center">START<br/>BreathWell</span>
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-on-surface-variant font-medium text-center uppercase tracking-widest text-sm">Session Duration</h3>
          <div className="flex justify-between gap-4">
            {[1, 3, 5].map((d) => (
              <button 
                key={d}
                onClick={() => setSettings({ ...settings, duration: d })}
                className={`flex-1 py-5 rounded-xl transition-all shadow-sm border-2 ${settings.duration === d ? 'bg-primary text-white scale-105 border-primary ring-4 ring-primary/10' : 'bg-surface-container-lowest text-on-surface border-transparent hover:border-primary/20'}`}
              >
                <span className="block text-2xl font-bold">{d}</span>
                <span className="text-xs uppercase tracking-tighter opacity-60">Minute{d > 1 ? 's' : ''}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <div className="col-span-2 bg-secondary-container/30 p-6 rounded-2xl flex items-center gap-6">
            <div className="bg-secondary rounded-full p-4 text-white">
              <Wind className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-on-secondary-container font-bold text-xl leading-tight">Box Breathing</h4>
              <p className="text-on-secondary-container/80 leading-snug">Rhythmic 4-second cycles to lower heart rate.</p>
            </div>
          </div>
          {['Inhale', 'Hold', 'Exhale', 'Hold'].map((phase, i) => (
            <div key={i} className="bg-surface-container-lowest p-5 rounded-2xl flex flex-col items-center text-center shadow-sm">
              <span className="text-primary font-bold text-2xl mb-1">4s</span>
              <span className="text-on-surface-variant font-medium text-sm">{phase}</span>
            </div>
          ))}
        </section>

        <section className="bg-surface-container p-6 rounded-4xl space-y-6">
          <h3 className="text-on-surface font-semibold text-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Grounding Sounds
            </div>
            <button 
              onClick={() => {
                const audio = new Audio(SOUND_URLS[settings.sound]);
                audio.volume = 0.4;
                audio.play().catch(() => {});
                setTimeout(() => { audio.pause(); audio.src = ""; }, 2000);
              }}
              className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-widest hover:bg-primary/20 transition-colors"
            >
              Quick Test
            </button>
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'Rainfall', icon: Droplets },
              { name: 'Ocean Tide', icon: Waves }
            ].map((sound) => (
              <button 
                key={sound.name}
                onClick={() => setSettings({ ...settings, sound: sound.name })}
                className={`flex items-center gap-3 px-6 py-4 rounded-full transition-all shadow-sm border-2 ${settings.sound === sound.name ? 'bg-primary text-white border-primary' : 'bg-surface-container-lowest text-on-surface border-transparent hover:bg-white'}`}
              >
                <sound.icon className="w-5 h-5" />
                <span className="font-medium">{sound.name}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="flex justify-center items-center gap-2 py-4">
          <Shield className="w-4 h-4 text-secondary" />
          <span className="text-on-surface-variant text-xs font-medium uppercase tracking-widest">Privacy First: Local Data Only</span>
        </div>
      </main>
    </motion.div>
  );
}

const SOUND_URLS: Record<string, string> = {
  'Rainfall': 'https://assets.mixkit.co/active_storage/sfx/2431/2431-preview.mp3',
  'Ocean Tide': 'https://assets.mixkit.co/active_storage/sfx/1185/1185-preview.mp3'
};

function Session({ settings, setSettings, onEnd, onRestartJourney }: { 
  settings: SessionSettings, 
  setSettings: (s: SessionSettings) => void,
  onEnd: () => void, 
  onRestartJourney: () => void, 
  key?: string 
}) {
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [timeLeft, setTimeLeft] = useState(settings.duration * 60);
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(PHASE_DURATION);
  const [isPaused, setIsPaused] = useState(false);
  const [showSoundMenu, setShowSoundMenu] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }
    const audio = audioRef.current;
    audio.src = SOUND_URLS[settings.sound];
    audio.volume = 0.4;

    const playAudio = async () => {
      try {
        if (!isPaused) {
          await audio.play();
          setAudioBlocked(false);
        } else {
          audio.pause();
        }
      } catch (e) {
        console.log("Audio blocked", e);
        setAudioBlocked(true);
      }
    };

    playAudio();

    return () => {
      audio.pause();
    };
  }, [settings.sound, isPaused]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onEnd();
          return 0;
        }
        return prev - 1;
      });

      setPhaseTimeLeft((prev) => {
        if (prev <= 1) {
          setPhase((current) => {
            switch (current) {
              case 'inhale': return 'hold1';
              case 'hold1': return 'exhale';
              case 'exhale': return 'hold2';
              case 'hold2': return 'inhale';
            }
          });
          return PHASE_DURATION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, onEnd]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseText = (p: BreathPhase) => {
    switch (p) {
      case 'inhale': return 'Inhale';
      case 'hold1': return 'Hold';
      case 'exhale': return 'Exhale';
      case 'hold2': return 'Hold';
    }
  };

  const progress = ((settings.duration * 60 - timeLeft) / (settings.duration * 60)) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-grow flex flex-col"
    >
      <header className="glass fixed top-0 w-full z-50 shadow-[0_20px_50px_rgba(26,28,25,0.06)] flex items-center justify-between px-6 pt-[env(safe-area-inset-top,0px)] h-[calc(5rem+env(safe-area-inset-top,0px))]">
        <div className="flex items-center gap-2">
          <button onClick={onEnd} className="p-2 text-primary hover:opacity-80 transition-opacity" title="Back to Quick Relief Setup">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button onClick={onRestartJourney} className="p-2 text-primary hover:opacity-80 transition-opacity" title="Back to Onboarding">
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="font-bold text-2xl tracking-tight text-primary">BreathWell</h1>
        </div>
      </header>

      <main className="pt-[calc(7rem+env(safe-area-inset-top,0px))] pb-32 px-6 max-w-2xl mx-auto w-full space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-secondary font-medium uppercase tracking-widest text-sm">Current Session</h3>
          <h2 className="text-4xl font-bold tracking-tight text-on-surface">Calm</h2>
        </div>

        <div className="relative flex justify-center items-center py-10">
          <div className="absolute w-80 h-80 rounded-full border-4 border-primary/5 animate-pulse"></div>
          <motion.div 
            animate={{ 
              scale: phase === 'inhale' ? 1.2 : phase === 'exhale' ? 0.8 : 1,
              opacity: phase === 'inhale' ? 1 : phase === 'exhale' ? 0.8 : 0.9
            }}
            transition={{ duration: PHASE_DURATION, ease: "easeInOut" }}
            className="w-64 h-64 md:w-72 md:h-72 rounded-full border-[10px] border-primary-container flex flex-col items-center justify-center bg-surface-container-lowest shadow-[0_30px_60px_rgba(10,67,115,0.15)] relative z-10"
          >
            <span className="text-primary font-bold text-5xl md:text-6xl mb-2">{getPhaseText(phase)}</span>
            <span className="text-on-surface-variant font-medium text-lg">{phaseTimeLeft} Seconds</span>
          </motion.div>
        </div>

        <section className="bg-surface-container p-6 rounded-4xl space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-on-surface-variant text-xs font-medium uppercase tracking-widest">Time Remaining</span>
              <p className="text-3xl font-bold mt-1">{formatTime(timeLeft)}</p>
            </div>
            <div className="text-right">
              <span className="text-on-surface-variant text-xs font-medium uppercase tracking-widest">Completion</span>
              <p className="text-xl font-bold mt-1">{Math.round(progress)}%</p>
            </div>
          </div>
          <div className="h-3 w-full bg-surface-container-low rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary rounded-full transition-all duration-1000"
            />
          </div>
        </section>

        <div className="space-y-4">
          {audioBlocked && (
            <motion.button 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => {
                audioRef.current?.play();
                setAudioBlocked(false);
              }}
              className="w-full flex items-center justify-center gap-3 p-4 bg-secondary text-white rounded-2xl shadow-lg font-bold animate-pulse"
            >
              <Volume2 className="w-5 h-5" />
              Tap to Enable Ambient Sound
            </motion.button>
          )}

          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="w-full flex items-center justify-between p-5 bg-surface-container-lowest rounded-2xl shadow-sm border border-transparent hover:border-primary/20 transition-all group"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
              </div>
              <div>
                <span className="block font-bold text-lg text-on-surface">{isPaused ? 'Resume' : 'Pause'} Session</span>
                <span className="text-sm text-on-surface-variant">Narrator and sound are {isPaused ? 'paused' : 'active'}</span>
              </div>
            </div>
            {!isPaused && <CheckCircle2 className="w-6 h-6 text-secondary" />}
          </button>

          <div className="space-y-2">
            <button 
              onClick={() => setShowSoundMenu(!showSoundMenu)}
              className={`w-full flex items-center justify-between p-5 bg-surface-container-lowest rounded-2xl shadow-sm border transition-all group ${showSoundMenu ? 'border-primary' : 'border-transparent hover:border-primary/20'}`}
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                  <Volume2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="block font-bold text-lg text-on-surface">Ambient Sound</span>
                  <span className="text-sm text-on-surface-variant">{settings.sound} • 40% Volume</span>
                </div>
              </div>
              <motion.div
                animate={{ rotate: showSoundMenu ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-6 h-6 text-on-surface-variant" />
              </motion.div>
            </button>

            <AnimatePresence>
              {showSoundMenu && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-surface-container-lowest p-4 rounded-2xl border border-primary/10 flex flex-wrap gap-2">
                    {[
                      { name: 'Rainfall', icon: Droplets },
                      { name: 'Ocean Tide', icon: Waves }
                    ].map((sound) => (
                      <button 
                        key={sound.name}
                        onClick={() => {
                          setSettings({ ...settings, sound: sound.name });
                          setShowSoundMenu(false);
                        }}
                        className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all text-sm font-medium border-2 ${settings.sound === sound.name ? 'bg-primary text-white border-primary' : 'bg-surface-container-low text-on-surface border-transparent hover:bg-white'}`}
                      >
                        <sound.icon className="w-4 h-4" />
                        <span>{sound.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 py-4">
          <Shield className="w-4 h-4 text-secondary" />
          <span className="text-on-surface-variant text-xs font-medium uppercase tracking-widest">Privacy First: Local Data Only</span>
        </div>
      </main>
    </motion.div>
  );
}
