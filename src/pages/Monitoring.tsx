import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CameraFeed from "../components/dashboard/CameraFeed";

interface Camera {
  id: number;
  name: string;
  type: string;
  deviceId?: string;
  nightVision?: boolean;
}

const cameras: Camera[] = [
  {
    id: 1,
    name: "Main Camera 1",
    type: "webcam",
    deviceId:
      "b7c59d46b4a1b15d84182ae8261bd2dc63a825dc96705e66e544af39c247c114",
  },
  {
    id: 2,
    name: "Night Shift Camera",
    type: "dummy",
    nightVision: true,
  },
  {
    id: 3,
    name: "Helmet Zone",
    type: "dummy",
  },
  {
    id: 4,
    name: "Gate Camera",
    type: "phone",
    // Night vision enabled only here
  },
];

export default function Monitoring() {
  const [fullscreenCam, setFullscreenCam] = useState<number | null>(null);

  // Memoized selected camera (prevents repeated find calls)
  const selectedCamera = useMemo(
    () => cameras.find((c) => c.id === fullscreenCam) ?? null,
    [fullscreenCam],
  );

  // ESC key to exit fullscreen
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFullscreenCam(null);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="relative max-w-[1400px] mx-auto space-y-6 px-4">
      {/* HEADER */}
      {!fullscreenCam && (
        <div>
          <h1 className="text-2xl font-semibold">Live Monitoring Center</h1>
          <p className="text-sm text-gray-400">Real-time PPE Surveillance</p>
        </div>
      )}

      {/* CAMERA GRID */}
      {!fullscreenCam && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cameras.map((cam) => (
            <div key={cam.id} className="w-full aspect-video">
              <CameraFeed
                camera={cam}
                onPlay={() => setFullscreenCam(cam.id)}
              />
            </div>
          ))}
        </div>
      )}

      {/* FULLSCREEN MODE */}
      <AnimatePresence>
        {fullscreenCam && selectedCamera && (
          <motion.div
            key="fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center p-6"
          >
            <div className="w-full max-w-6xl aspect-video">
              <CameraFeed
                camera={selectedCamera}
                fullscreen
                onPlay={() => setFullscreenCam(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
