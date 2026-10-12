export type SoundKind =
  | 'click'
  | 'nav'
  | 'menu-open'
  | 'menu-close'
  | 'theme-light'
  | 'theme-dark'
  | 'copied'
  | 'confirm';

const STORAGE_KEY = 'qt-sound';
const CHANGE_EVENT = 'qt-sound-change';
const MAX_GAIN = 0.035;

let audioContext: AudioContext | null = null;
let sessionEnabled = false;

const reducedMotion = () => typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isSoundEnabled = () => {
  if (typeof window === 'undefined' || !('AudioContext' in window) || reducedMotion()) return false;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === null ? sessionEnabled : stored === 'on';
  } catch {
    return sessionEnabled;
  }
};

export const isSoundAvailable = () => typeof window !== 'undefined' && 'AudioContext' in window && !reducedMotion();

const getAudioContext = () => {
  if (audioContext) return audioContext;
  const AudioContextClass = window.AudioContext;
  audioContext = new AudioContextClass();
  return audioContext;
};

const soundNotes: Record<SoundKind, Array<[frequency: number, duration: number]>> = {
  click: [[1600, 0.025]],
  nav: [[1900, 0.03]],
  'menu-open': [[1400, 0.03], [2100, 0.035]],
  'menu-close': [[2100, 0.03], [1400, 0.035]],
  'theme-light': [[1600, 0.03], [2400, 0.04]],
  'theme-dark': [[2400, 0.03], [1600, 0.04]],
  copied: [[1800, 0.035], [2700, 0.055]],
  confirm: [[2200, 0.04]],
};

export const play = (kind: SoundKind) => {
  if (!isSoundEnabled()) return;

  try {
    const context = getAudioContext();
    if (context.state === 'suspended') void context.resume();

    let start = context.currentTime;
    soundNotes[kind].forEach(([frequency, duration]) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(MAX_GAIN, start);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + duration);
      start += duration;
    });
  } catch {
    // Audio feedback is optional and must never block the requested action.
  }
};

export const setSoundEnabled = (enabled: boolean) => {
  if (!isSoundAvailable()) return;
  sessionEnabled = enabled;

  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off');
  } catch {
    // Session state remains active when storage is unavailable.
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
  if (enabled) play('confirm');
};

export const subscribeToSound = (listener: () => void) => {
  const media = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  window.addEventListener(CHANGE_EVENT, listener);
  media?.addEventListener('change', listener);

  return () => {
    window.removeEventListener(CHANGE_EVENT, listener);
    media?.removeEventListener('change', listener);
  };
};

export const installSoundDelegation = () => {
  const handleClick = (event: MouseEvent) => {
    const target = event.target instanceof Element ? event.target.closest('a, button') : null;
    if (!target || target.hasAttribute('data-sound-toggle')) return;

    const explicitKind = target.getAttribute('data-sound') as SoundKind | null;
    play(explicitKind ?? (target instanceof HTMLAnchorElement ? 'nav' : 'click'));
  };

  document.addEventListener('click', handleClick, true);
  return () => document.removeEventListener('click', handleClick, true);
};
