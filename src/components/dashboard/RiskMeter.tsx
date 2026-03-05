import { motion } from "framer-motion";

export const RiskMeter = () => {
  const riskLevel = 62;
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (riskLevel / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-panel p-5 flex flex-col items-center"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4 self-start">Site Risk Level</h3>
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="60" fill="none" stroke="hsl(220, 20%, 15%)" strokeWidth="8" />
          <motion.circle
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke={riskLevel > 70 ? "hsl(0, 72%, 51%)" : riskLevel > 40 ? "hsl(48, 85%, 55%)" : "hsl(155, 100%, 50%)"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold font-mono text-foreground">{riskLevel}%</span>
          <span className="text-[10px] font-mono text-warning uppercase tracking-widest">MODERATE</span>
        </div>
      </div>
      <div className="flex gap-4 mt-4 text-[10px] font-mono text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-accent" />Low</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Med</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-danger" />High</span>
      </div>
    </motion.div>
  );
};
