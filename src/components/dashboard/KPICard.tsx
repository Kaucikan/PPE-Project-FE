import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  color: "primary" | "accent" | "danger" | "warning";
  delay?: number;
}

const colorMap = {
  primary: "text-primary bg-primary/10 border-primary/20",
  accent: "text-accent bg-accent/10 border-accent/20",
  danger: "text-danger bg-danger/10 border-danger/20",
  warning: "text-warning bg-warning/10 border-warning/20",
};

const iconBgMap = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  danger: "bg-danger/10 text-danger",
  warning: "bg-warning/10 text-warning",
};

export const KPICard = ({ title, value, suffix = "", icon: Icon, trend, color, delay = 0 }: KPICardProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="kpi-card"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBgMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`text-xs font-mono font-semibold ${trend.positive ? "text-accent" : "text-danger"}`}>
            {trend.positive ? "↑" : "↓"} {trend.value}%
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="industrial-text">{title}</p>
        <p className="text-3xl font-bold font-mono tracking-tight text-foreground">
          {count}{suffix}
        </p>
      </div>
      {/* Subtle bottom accent */}
      <div className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full opacity-30 ${
        color === "primary" ? "bg-primary" : color === "accent" ? "bg-accent" : color === "danger" ? "bg-danger" : "bg-warning"
      }`} />
    </motion.div>
  );
};
