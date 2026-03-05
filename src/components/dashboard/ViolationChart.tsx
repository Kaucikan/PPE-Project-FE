import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "06:00", violations: 2, compliance: 96 },
  { time: "08:00", violations: 5, compliance: 92 },
  { time: "10:00", violations: 8, compliance: 88 },
  { time: "12:00", violations: 3, compliance: 94 },
  { time: "14:00", violations: 12, compliance: 82 },
  { time: "16:00", violations: 6, compliance: 90 },
  { time: "18:00", violations: 4, compliance: 93 },
  { time: "20:00", violations: 1, compliance: 98 },
];

export const ViolationChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-panel p-5"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Violation Trend</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Last 24 hours activity</p>
        </div>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Violations
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Compliance
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="violationGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(48, 85%, 55%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(48, 85%, 55%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="complianceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(155, 100%, 50%)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="hsl(155, 100%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 15%)" />
          <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: "hsl(220, 40%, 10%)",
              border: "1px solid hsl(220, 20%, 22%)",
              borderRadius: "12px",
              fontSize: "12px",
              color: "hsl(210, 20%, 92%)",
            }}
          />
          <Area type="monotone" dataKey="violations" stroke="hsl(48, 85%, 55%)" fill="url(#violationGradient)" strokeWidth={2} />
          <Area type="monotone" dataKey="compliance" stroke="hsl(155, 100%, 50%)" fill="url(#complianceGradient)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
