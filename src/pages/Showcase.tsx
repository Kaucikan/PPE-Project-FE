import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Target,
  Zap,
  Shield,
  Server,
  CheckCircle,
  HardHat,
  Eye,
  Bell,
  BarChart3,
  Activity,
  Layers,
} from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Real-Time Detection",
    desc: "YOLOv8-powered PPE detection at 30+ FPS",
  },
  {
    icon: HardHat,
    title: "Multi-PPE Support",
    desc: "Helmets, vests, harnesses, gloves, boots",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    desc: "Email, SMS, and sound notifications",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    desc: "Compliance trends and risk profiling",
  },
];

// Mock data for the new graphical representations
const weeklyTrend = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 72 },
  { day: "Wed", value: 85 },
  { day: "Thu", value: 81 },
  { day: "Fri", value: 94 },
  { day: "Sat", value: 96 },
  { day: "Sun", value: 98 },
];

const ppeStats = [
  { name: "Safety Helmets", count: 1245, color: "bg-emerald-500" },
  { name: "Hi-Vis Vests", count: 982, color: "bg-amber-500" },
  { name: "Safety Gloves", count: 654, color: "bg-blue-500" },
  { name: "Work Boots", count: 879, color: "bg-purple-500" },
];

const Showcase = () => {
  const accuracy = 96.8;

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono mb-4 border border-primary/20"
        >
          <Activity className="w-3 h-3 animate-pulse" />
          SYSTEM LIVE
        </motion.div>
        <h1 className="text-3xl font-bold text-foreground">System Showcase</h1>
        <p className="text-sm text-muted-foreground mt-2 font-mono">
          ARCHITECTURE & LIVE METRICS
        </p>
      </div>

      {/* Architecture Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-2xl border border-border bg-card"
      >
        <h3 className="text-sm font-semibold text-foreground mb-6 flex items-center gap-2">
          <Server className="w-4 h-4 text-primary" />
          Processing Pipeline
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
          {[
            "CCTV Feeds",
            "Edge Node",
            "YOLOv8 Core",
            "Alert Engine",
            "Web Dashboard",
          ].map((block, i) => (
            <React.Fragment key={block}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="px-4 py-3 rounded-xl bg-secondary/50 border border-border text-xs font-mono text-foreground shadow-sm flex items-center gap-2"
              >
                <Cpu className="w-3 h-3 text-muted-foreground" />
                {block}
              </motion.div>
              {i < 4 && (
                <span className="text-muted-foreground text-lg hidden sm:block">
                  →
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Accuracy Radial Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 rounded-2xl border border-border bg-card flex flex-col items-center justify-center"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4 w-full flex items-center gap-2">
            <Target className="w-4 h-4 text-accent" />
            Model Confidence
          </h3>
          <div className="relative w-40 h-40 mt-2">
            <svg
              className="w-full h-full -rotate-90 drop-shadow-lg"
              viewBox="0 0 140 140"
            >
              <circle
                cx="70"
                cy="70"
                r="58"
                fill="none"
                stroke="currentColor"
                className="text-secondary"
                strokeWidth="12"
              />
              <motion.circle
                cx="70"
                cy="70"
                r="58"
                fill="none"
                stroke="hsl(155, 100%, 50%)" /* Adjust color based on your theme */
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 58}
                initial={{ strokeDashoffset: 2 * Math.PI * 58 }}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 58 * (1 - accuracy / 100),
                }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold font-mono text-foreground">
                {accuracy}%
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                mAP@0.5:0.95
              </span>
            </div>
          </div>
        </motion.div>

        {/* 2. Weekly Compliance Histogram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 rounded-2xl border border-border bg-card flex flex-col"
        >
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            Weekly Compliance
          </h3>
          <p className="text-xs text-muted-foreground mb-6">
            Percentage of workers properly geared.
          </p>

          <div className="flex items-end justify-between gap-2 flex-1 mt-auto h-32">
            {weeklyTrend.map((d, i) => (
              <div
                key={d.day}
                className="flex flex-col items-center flex-1 group"
              >
                <div className="w-full relative flex justify-center h-full items-end">
                  {/* Tooltip on hover */}
                  <span className="absolute -top-6 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background px-2 py-0.5 rounded">
                    {d.value}%
                  </span>
                  <motion.div
                    className="w-full max-w-[24px] bg-primary/80 hover:bg-primary rounded-t-sm transition-colors"
                    initial={{ height: 0 }}
                    animate={{ height: `${d.value}%` }}
                    transition={{
                      delay: 0.4 + i * 0.1,
                      type: "spring",
                      stiffness: 50,
                    }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground mt-2 font-medium">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3. Object Detection Breakdown (Horizontal Bars) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6 rounded-2xl border border-border bg-card"
        >
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            Detection Breakdown
          </h3>
          <p className="text-xs text-muted-foreground mb-6">
            Volume of objects detected today.
          </p>

          <div className="space-y-4">
            {ppeStats.map((stat, i) => {
              const maxCount = 1500; // Mock maximum for scaling
              const percentage = (stat.count / maxCount) * 100;

              return (
                <div key={stat.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-foreground">{stat.name}</span>
                    <span className="text-muted-foreground font-mono">
                      {stat.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${stat.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 1 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Key Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {features.map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="glass-panel p-5 rounded-xl border border-border bg-card text-center hover:border-primary/50 transition-all duration-300 group cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center mx-auto mb-4">
              <feat.icon className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-sm font-bold text-foreground mb-1">
              {feat.title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feat.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Showcase;
