import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, HardHat, Shield, AlertTriangle, Eye, X, Image } from "lucide-react";

const violations = [
  { id: "V-001", type: "No Helmet", zone: "Zone A", camera: "CAM-03", time: "14:32", worker: "W-1042", confidence: 92, severity: "high" },
  { id: "V-002", type: "No Harness", zone: "Zone B", camera: "CAM-07", time: "14:28", worker: "W-0871", confidence: 87, severity: "critical" },
  { id: "V-003", type: "No Vest", zone: "Zone D", camera: "CAM-01", time: "14:15", worker: "W-1205", confidence: 78, severity: "medium" },
  { id: "V-004", type: "No Helmet", zone: "Zone A", camera: "CAM-05", time: "13:58", worker: "W-0933", confidence: 95, severity: "high" },
  { id: "V-005", type: "No Harness", zone: "Zone E", camera: "CAM-09", time: "13:40", worker: "W-0612", confidence: 81, severity: "critical" },
  { id: "V-006", type: "No Helmet", zone: "Zone C", camera: "CAM-02", time: "13:22", worker: "W-1150", confidence: 89, severity: "high" },
];

const severityBadge: Record<string, string> = {
  critical: "bg-danger/10 text-danger border-danger/20",
  high: "bg-warning/10 text-warning border-warning/20",
  medium: "bg-primary/10 text-primary border-primary/20",
};

const Violations = () => {
  const [selectedViolation, setSelectedViolation] = useState<string | null>(null);
  const [filterType, setFilterType] = useState("all");

  const filtered = filterType === "all" ? violations : violations.filter(v => v.type.toLowerCase().includes(filterType));

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-xl font-bold text-foreground">Violation Intelligence</h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">VIOLATION HISTORY & ANALYTICS</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-secondary/50 rounded-xl px-3 py-2 flex-1 max-w-sm">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search violations..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
        </div>
        {["all", "helmet", "harness", "vest"].map((f) => (
          <button
            key={f}
            onClick={() => setFilterType(f)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              filterType === f ? "bg-primary/10 text-primary border border-primary/20" : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["ID", "Type", "Zone", "Camera", "Time", "Worker", "Confidence", "Severity", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left industrial-text">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <motion.tr
                  key={v.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{v.id}</td>
                  <td className="px-4 py-3 text-xs font-medium text-foreground">{v.type}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{v.zone}</td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{v.camera}</td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{v.time}</td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{v.worker}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${v.confidence}%` }} />
                      </div>
                      <span className="text-xs font-mono text-primary">{v.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-md border ${severityBadge[v.severity]}`}>
                      {v.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelectedViolation(v.id)} className="p-1.5 rounded-lg hover:bg-secondary/50 transition-colors">
                      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      {selectedViolation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedViolation(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="glass-panel-strong w-full max-w-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-foreground">Violation Snapshot</h3>
              <button onClick={() => setSelectedViolation(null)} className="p-1 rounded-lg hover:bg-secondary/50"><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <div className="aspect-video bg-secondary/50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="grid-bg absolute inset-0 opacity-10" />
              <Image className="w-12 h-12 text-muted-foreground/20" />
              <div className="absolute top-[20%] left-[20%] w-[25%] h-[45%] border-2 border-danger rounded-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {(() => {
                const v = violations.find(v => v.id === selectedViolation)!;
                return (
                  <>
                    <div className="bg-secondary/30 rounded-xl p-3"><span className="text-muted-foreground">Type</span><p className="font-semibold text-foreground mt-1">{v.type}</p></div>
                    <div className="bg-secondary/30 rounded-xl p-3"><span className="text-muted-foreground">Zone</span><p className="font-semibold text-foreground mt-1">{v.zone}</p></div>
                    <div className="bg-secondary/30 rounded-xl p-3"><span className="text-muted-foreground">Worker ID</span><p className="font-semibold text-foreground mt-1 font-mono">{v.worker}</p></div>
                    <div className="bg-secondary/30 rounded-xl p-3"><span className="text-muted-foreground">Confidence</span><p className="font-semibold text-primary mt-1 font-mono">{v.confidence}%</p></div>
                  </>
                );
              })()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Violations;
