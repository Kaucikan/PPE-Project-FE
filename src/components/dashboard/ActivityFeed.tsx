import { motion } from "framer-motion";
import { AlertTriangle, HardHat, Shield } from "lucide-react";

const activities = [
  { id: 1, type: "helmet", message: "No helmet detected — Zone B, Camera 3", time: "2 min ago", severity: "high" },
  { id: 2, type: "harness", message: "Missing safety harness — Zone A, Camera 7", time: "8 min ago", severity: "critical" },
  { id: 3, type: "helmet", message: "Helmet compliance restored — Zone C", time: "15 min ago", severity: "resolved" },
  { id: 4, type: "vest", message: "Hi-vis vest not detected — Zone D, Camera 1", time: "22 min ago", severity: "medium" },
  { id: 5, type: "helmet", message: "No helmet detected — Zone A, Camera 5", time: "31 min ago", severity: "high" },
];

const severityStyles = {
  critical: "bg-danger/10 text-danger border-danger/20",
  high: "bg-warning/10 text-warning border-warning/20",
  medium: "bg-primary/10 text-primary border-primary/20",
  resolved: "bg-accent/10 text-accent border-accent/20",
};

const typeIcons = {
  helmet: HardHat,
  harness: Shield,
  vest: AlertTriangle,
};

export const ActivityFeed = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-panel p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Recent Violations</h3>
        <span className="text-xs text-muted-foreground font-mono">LIVE FEED</span>
      </div>
      <div className="space-y-3">
        {activities.map((activity, i) => {
          const Icon = typeIcons[activity.type as keyof typeof typeIcons] || AlertTriangle;
          const severity = activity.severity as keyof typeof severityStyles;
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${severityStyles[severity]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground leading-relaxed">{activity.message}</p>
                <p className="text-[10px] text-muted-foreground mt-1 font-mono">{activity.time}</p>
              </div>
              <span className={`text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-md border ${severityStyles[severity]}`}>
                {activity.severity}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
