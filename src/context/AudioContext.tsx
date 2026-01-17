import { createContext, useContext, useState, useRef, useEffect } from "react";
import mainTheme from "../assets/Round_And_Round_Mingle_1767983924508.mp3";
import type { ReactNode } from "react";

type AudioContextType = {
  isMuted: boolean;
  isPlaying: boolean;
  toggleMute: () => void;
  startMusic: () => void;
  stopMusic: () => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const tryResume = async () => {
    const introDone = sessionStorage.getItem("introCompleted") === "true";
    const wasPlaying = localStorage.getItem("musicPlaying") === "true";

    if (introDone && wasPlaying) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        console.log("ok")
      }
      window.removeEventListener("click", tryResume);
      window.removeEventListener("keydown", tryResume);
    }
  };

  window.addEventListener("click", tryResume);
  window.addEventListener("keydown", tryResume);

  return () => {
    window.removeEventListener("click", tryResume);
    window.removeEventListener("keydown", tryResume);
  };
}, []);


  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(
    localStorage.getItem("musicPlaying") === "true"
  );
  const [isMuted, setIsMuted] = useState(
    localStorage.getItem("musicMuted") === "true"
  );

  /* Restore playback on load */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;
    audio.muted = isMuted;

    const savedTime = localStorage.getItem("musicTime");
    if (savedTime) audio.currentTime = Number(savedTime);

    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, []);

  /* Persist mute */
  useEffect(() => {
    localStorage.setItem("musicMuted", String(isMuted));
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  /* Persist playback position continuously */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const saveTime = () =>
      localStorage.setItem("musicTime", String(audio.currentTime));

    audio.addEventListener("timeupdate", saveTime);
    return () => audio.removeEventListener("timeupdate", saveTime);
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
      localStorage.setItem("musicPlaying", "true");
    } catch {}
  };

  const stopMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    localStorage.setItem("musicPlaying", "false");
  };

  return (
    <AudioContext.Provider value={{ isMuted, isPlaying, toggleMute, startMusic, stopMusic }}>
      <audio ref={audioRef} src={mainTheme} loop />
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
};
