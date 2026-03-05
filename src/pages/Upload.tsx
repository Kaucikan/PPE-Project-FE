import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload as UploadIcon,
  Image as ImageIcon,
  CheckCircle,
  Download,
  BarChart3,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import API from "../services/api";
import { DetectionResult } from "../types";

const Upload: React.FC = () => {
  /* ---------------- STATE ---------------- */
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---------------- CLEANUP PREVIEW ---------------- */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* ---------------- RESET ---------------- */
  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setResultImage(null);
  };

  /* ---------------- FILE HANDLING ---------------- */
  const handleFileChange = (selected: File) => {
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
    setResultImage(null);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0]);
  }, []);

  /* ---------------- ANALYZE ---------------- */
  const analyzeFile = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API}/detect/upload-image`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Backend error");

      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      const backend = json.data;

      setResultImage(`${API}/${backend.file_path}`);

      setResult({
        isSafe: backend.violation_count === 0,
        violations: backend.violations || [],
        confidence: backend.violation_count > 0 ? 0.95 : 0.85,
      });
    } catch (err) {
      console.error(err);
      alert("Detection failed. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DOWNLOAD ---------------- */
  const downloadResult = () => {
    if (!resultImage) return;
    const a = document.createElement("a");
    a.href = resultImage;
    a.download = "ppe_result.jpg";
    a.click();
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold">Upload & Analyze</h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          MANUAL PPE DETECTION ANALYSIS
        </p>
      </div>

      {/* ---------------- UPLOAD AREA ---------------- */}
      {!file ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`glass-panel p-16 flex flex-col items-center justify-center cursor-pointer transition ${
            isDragging
              ? "border-primary neon-glow-yellow"
              : "hover:border-primary/30"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            hidden
            accept="image/*"
            onChange={(e) =>
              e.target.files?.[0] && handleFileChange(e.target.files[0])
            }
          />

          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <UploadIcon className="w-8 h-8 text-primary" />
          </div>

          <p className="text-sm font-semibold mb-1">Drop image here</p>
          <p className="text-xs text-muted-foreground">
            or click to browse — JPG, PNG supported
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* TOP BAR */}
          <div className="glass-panel p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ImageIcon className="w-5 h-5 text-primary" />
              <span className="text-xs font-mono truncate max-w-[220px]">
                {file.name}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={reset}
                className="text-xs font-bold text-muted-foreground hover:text-foreground px-4"
              >
                CANCEL
              </button>

              {!result && (
                <button
                  onClick={analyzeFile}
                  disabled={loading}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <BarChart3 className="w-3 h-3" />
                  )}
                  {loading ? "ANALYZING..." : "RUN DETECTION"}
                </button>
              )}
            </div>
          </div>

          {/* IMAGE VIEW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-panel p-4">
              <p className="industrial-text mb-3">ORIGINAL</p>
              <div className="aspect-video rounded-xl overflow-hidden">
                {preview && (
                  <img
                    src={preview}
                    alt="original"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>

            <div className="glass-panel p-4 relative">
              <p className="industrial-text mb-3">AI OUTPUT</p>
              <div className="aspect-video rounded-xl overflow-hidden relative">
                {resultImage ? (
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={resultImage}
                    alt="result"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full opacity-30">
                    <Loader2
                      className={`w-8 h-8 ${loading ? "animate-spin" : ""}`}
                    />
                  </div>
                )}

                {loading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Loader2 className="animate-spin text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RESULT PANEL */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass-panel p-5 border-l-4 ${
                  result.isSafe ? "border-accent" : "border-danger"
                }`}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    {result.isSafe ? (
                      <CheckCircle className="text-accent w-5 h-5" />
                    ) : (
                      <AlertTriangle className="text-danger w-5 h-5" />
                    )}
                    <h3 className="text-sm font-semibold">
                      {result.isSafe
                        ? "SITE COMPLIANT"
                        : "SAFETY VIOLATIONS DETECTED"}
                    </h3>
                  </div>

                  <button
                    onClick={downloadResult}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Result
                  </button>
                </div>

                {result.violations.length === 0 ? (
                  <p className="text-xs italic text-muted-foreground">
                    No PPE violations detected.
                  </p>
                ) : (
                  result.violations.map((v, i) => (
                    <div key={i} className="text-xs mb-2 font-mono">
                      {v.description}
                    </div>
                  ))
                )}

                <button
                  onClick={reset}
                  className="text-[10px] text-muted-foreground hover:text-primary mt-4"
                >
                  ← Upload another image
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default Upload;