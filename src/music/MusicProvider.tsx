import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { wedding } from '../config/wedding.ts';

/**
 * Butun sayt uchun BITTA audio instance.
 * - play() faqat foydalanuvchi bosishi ichida chaqiriladi (konvertdagi "Ochish" yoki musiqa tugmasi).
 * - Til almashtirish va scroll bu komponentni qayta yaratmaydi, shuning uchun musiqa boshidan boshlanmaydi.
 * - Holat (status) audio elementining haqiqiy hodisalaridan olinadi.
 */

export type MusicStatus = 'idle' | 'playing' | 'paused' | 'blocked' | 'error';

interface MusicValue {
  status: MusicStatus;
  /** Foydalanuvchi kamida bir marta ijro qilishga uringanmi */
  attempted: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
}

const MusicContext = createContext<MusicValue | null>(null);

const clampVolume = (v: number) => (Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0.35);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<MusicStatus>('idle');
  const [attempted, setAttempted] = useState(false);

  const getAudio = useCallback((): HTMLAudioElement | null => {
    if (audioRef.current) return audioRef.current;
    if (typeof Audio === 'undefined' || !wedding.musicSrc.trim()) return null;
    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'metadata';
    try {
      audio.volume = clampVolume(wedding.musicVolume);
    } catch {
      /* iOS ovozni dasturiy o‘zgartirishga ruxsat bermaydi */
    }
    audio.addEventListener('playing', () => setStatus('playing'));
    audio.addEventListener('pause', () => setStatus((s) => (s === 'error' ? s : 'paused')));
    audio.addEventListener('error', () => setStatus('error'));
    audio.src = wedding.musicSrc;
    audioRef.current = audio;
    return audio;
  }, []);

  // Sahifa yuklanganda faqat element tayyorlanadi (metadata) — ovozli autoplay yo‘q.
  useEffect(() => {
    if (!getAudio()) setStatus('error');
  }, [getAudio]);

  const play = useCallback(() => {
    setAttempted(true);
    const audio = getAudio();
    if (!audio) {
      setStatus('error');
      return;
    }
    if (audio.error) {
      // Avvalgi yuklash xatosidan keyin qayta urinish
      setStatus('idle');
      audio.load();
    }
    let promise: Promise<void> | undefined;
    try {
      promise = audio.play();
    } catch {
      setStatus('error');
      return;
    }
    promise
      ?.then(() => setStatus('playing'))
      .catch((err: unknown) => {
        const name = err instanceof DOMException ? err.name : '';
        if (name === 'AbortError') return;
        if (name === 'NotAllowedError') setStatus('blocked');
        else setStatus('error');
      });
  }, [getAudio]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) pause();
    else play();
  }, [pause, play]);

  const value = useMemo(
    () => ({ status, attempted, play, pause, toggle }),
    [status, attempted, play, pause, toggle],
  );
  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic(): MusicValue {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic MusicProvider ichida ishlatilishi kerak');
  return ctx;
}
