import React, { useState, useEffect } from "react";
import {
  Wifi,
  Play,
  Square,
  Loader2,
  Maximize2,
  Minimize2,
} from "lucide-react";
import API from "../../services/api";

interface CameraFeedProps {
  camera: any;
  onFullscreen?: () => void;
  fullscreen?: boolean;
}

export default function CameraFeed({
  camera,
  onFullscreen,
  fullscreen = false,
}: CameraFeedProps) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [streamUrl, setStreamUrl] = useState("");
  const [violations, setViolations] = useState(0);
  const [nightMode, setNightMode] = useState(false);

  /* ---------------- POLLING ---------------- */
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API}/violations/latest`);
        const data = await res.json();
        setViolations(data.count);
      } catch {}
    }, 4000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  /* ---------------- CLEANUP ---------------- */
  useEffect(() => {
    return () => {
      fetch(`${API}/stop-stream`).catch(() => {});
    };
  }, []);

  /* ---------------- START ---------------- */
const start = () => {
  setLoading(true);

  let url = "";

  if (camera.mode === "face") {
    url = `${API}/video?mode=face&ts=${Date.now()}`;
  } else {
    url = `${API}/video?mode=ppe&ts=${Date.now()}`;
  }

  setStreamUrl(url);

  setTimeout(() => {
    setIsStreaming(true);
    setLoading(false);
  }, 400);
};
  /* ---------------- STOP ---------------- */
  const stop = async () => {
    await fetch(`${API}/stop-stream`).catch(() => {});
    setIsStreaming(false);
    setStreamUrl("");
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
      <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
        {/* LOADING */}
        {loading && <Loader2 className="animate-spin text-white" />}

        {/* STOPPED */}
        {!isStreaming && !loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400 text-md">
              Camera{camera?.id} stopped
            </div>
          </div>
        )}

        {/* STREAM */}
        {isStreaming && (
          <div
            className={`absolute inset-0 ${
              nightMode ? "grayscale contrast-125 brightness-90" : ""
            }`}
          >
            {streamUrl && (
              <img
                key={streamUrl}
                src={streamUrl}
                className="w-full h-full object-cover"
                onError={() => stop()}
              />
            )}
          </div>
        )}

        {/* VIOLATION BADGE */}
        {isStreaming && (
          <div className="absolute top-3 left-3 bg-black/70 px-3 py-1 rounded text-xs text-white">
            Violations: {violations}
          </div>
        )}

        {/* NIGHT MODE TOGGLE (Camera 4 only) */}
        {camera?.nightVision && (
          <button
            onClick={() => setNightMode(!nightMode)}
            className="absolute top-3 right-3 bg-black/60 text-green-400 px-3 py-1 rounded-lg text-xs border border-green-500"
          >
            {nightMode ? "Normal Mode" : "Night Vision"}
          </button>
        )}

        {/* PLAY / STOP */}
        <button
          onClick={isStreaming ? stop : start}
          className="absolute bottom-4 left-4 bg-white text-black p-2 rounded"
        >
          {isStreaming ? <Square size={18} /> : <Play size={18} />}
        </button>

        {/* FULLSCREEN */}
        {onFullscreen && (
          <button
            onClick={onFullscreen}
            className="absolute bottom-4 right-4 bg-white text-black p-2 rounded"
          >
            {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        )}
      </div>

      {/* FOOTER */}
      {!fullscreen && (
        <div className="p-2 text-sm flex justify-between text-gray-300">
          <span>{camera?.name}</span>
          <span className="flex items-center gap-1">
            <Wifi size={14} />
            {isStreaming ? "LIVE" : "OFF"}
          </span>
        </div>
      )}
    </div>
  );
}
