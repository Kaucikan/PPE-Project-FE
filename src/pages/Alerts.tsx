import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Mail,
  MessageSquare,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import API from "../services/api";

interface AlertType {
  id: number;
  message: string;
  priority: string;
  time: string;
  image?: string;
}

const Alerts = () => {
  
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [ack, setAck] = useState<Set<number>>(new Set());
  const [modalImage, setModalImage] = useState<string | null>(null);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(() => {
    const saved = localStorage.getItem("emailEnabled");
    return saved === null ? true : saved === "true";
  });
  const [smsEnabled, setSmsEnabled] = useState(false);
  useEffect(() => {
    fetch(`${API}/alert-settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailEnabled }),
    });
  }, []);
  // ---------------- LIVE POLLING ----------------
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API}/violations/latest`);
        const data = await res.json();
        console.log(data);
        if (data.new && data.image_url) {
          const newAlert: AlertType = {
            id: Date.now(),
            message: "🚨 Live PPE Violation Detected",
            priority: "critical",
            time: "Just now",
            image: `${API}/violations/${data.image}`,
          };

          setAlerts((prev) => [newAlert, ...prev]);
          setModalImage(data.image_url);

          if (soundEnabled) {
            const audio = new Audio("/alarm.mp3");
            audio.play().catch(() => {});
          }
        }
      } catch {}
    }, 4000);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  const acknowledge = (id: number) => {
    setAck((prev) => new Set(prev).add(id));
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-xl font-semibold">Alert Center</h1>
        <p className="text-xs text-muted-foreground font-mono">
          Notification & Incident Management
        </p>
      </div>
      {/* SETTINGS TOGGLES */}
      <div className="flex gap-6 items-center text-sm">
        {/* EMAIL TOGGLE */}
        <button
          onClick={async () => {
            const newState = !emailEnabled;
            setEmailEnabled(newState);
            localStorage.setItem("emailEnabled", String(newState));

            await fetch(`${API}/alert-settings`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: newState }),
            });
          }}
          className="flex items-center gap-2"
        >
          <Mail size={16} />
          <span>Email</span>
          <div
            className={`w-10 h-5 rounded-full relative transition ${
              emailEnabled ? "bg-primary" : "bg-muted"
            }`}
          >
            <div
              className={`w-4 h-4 bg-background rounded-full absolute top-0.5 transition ${
                emailEnabled ? "left-5" : "left-1"
              }`}
            />
          </div>
        </button>

        {/* SOUND TOGGLE */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-2"
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span>Sound</span>
        </button>
      </div>

      {/* ALERT LIST */}
      <div className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a.id}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm">{a.message}</p>
                <p className="text-[10px] text-muted-foreground">{a.time}</p>
              </div>

              {!ack.has(a.id) && (
                <button
                  onClick={() => acknowledge(a.id)}
                  className="flex items-center gap-1 text-xs text-primary"
                >
                  <CheckCircle size={14} />
                  ACK
                </button>
              )}
            </div>

            {a.image && (
              <img
                src={a.image}
                onClick={() => setModalImage(a.image!)}
                className="mt-3 rounded-lg border border-border cursor-pointer hover:opacity-80 transition"
              />
            )}
          </div>
        ))}
      </div>

      {/* POPUP MODAL */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-card p-4 rounded-xl max-w-3xl w-full relative"
            >
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-3 right-3 text-muted-foreground"
              >
                <X />
              </button>

              <img
                src={modalImage}
                className="rounded-lg border border-border"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Alerts;
