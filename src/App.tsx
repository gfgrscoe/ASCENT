import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { queryClient } from "./lib/queryClient";

import CharacterCursor from "./components/CharacterCursor";
import Router from "./Router";

import { AudioProvider, useAudio } from "./context/AudioContext";
import { Volume2, VolumeX } from "lucide-react";

/* -------------------- AUDIO CONTROL BUTTON -------------------- */

const AudioControl = () => {
  const { isMuted, toggleMute, isPlaying } = useAudio();

  if (!isPlaying) return null;

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-10 left-10 z-[100] p-3 text-white/40 hover:text-white transition-colors bg-black/20 backdrop-blur-sm rounded-full border border-white/10 hover:border-primary/50 group"
    >
      {isMuted ? (
        <VolumeX
          size={20}
          className="group-hover:scale-110 transition-transform"
        />
      ) : (
        <Volume2
          size={20}
          className="group-hover:scale-110 transition-transform"
        />
      )}
    </button>
  );
};

/* -------------------- ROOT APP -------------------- */

function App() {
  return (
    <AudioProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CharacterCursor />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>

      <AudioControl />
    </AudioProvider>
  );
}

export default App;
