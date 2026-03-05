import { Users, ShieldCheck, AlertTriangle, Bell } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { ViolationChart } from "@/components/dashboard/ViolationChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { RiskMeter } from "@/components/dashboard/RiskMeter";
import CameraFeed from "@/components/dashboard/CameraFeed";

const cameras = [
  { id: 1, name: "Gate Camera" },
  { id: 2, name: "Helmet Zone" },
  { id: 3, name: "Night Shift Area" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Smart Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            REAL-TIME SAFETY INTELLIGENCE
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accent/10 border border-accent/20">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono font-semibold text-accent">
            SYSTEM ONLINE
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Workers Detected"
          value={247}
          icon={Users}
          color="primary"
          trend={{ value: 12, positive: true }}
          delay={0}
        />
        <KPICard
          title="Safety Compliance"
          value={94}
          suffix="%"
          icon={ShieldCheck}
          color="accent"
          trend={{ value: 3, positive: true }}
          delay={100}
        />
        <KPICard
          title="Active Violations"
          value={7}
          icon={AlertTriangle}
          color="danger"
          trend={{ value: 18, positive: false }}
          delay={200}
        />
        <KPICard
          title="Alerts Triggered"
          value={23}
          icon={Bell}
          color="warning"
          trend={{ value: 5, positive: false }}
          delay={300}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ViolationChart />
        </div>
        <RiskMeter />
      </div>

      {/* Activity feed */}
      <ActivityFeed />

      {/* ⭐ Live Monitoring (NOW INSIDE COMPONENT) */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Live Monitoring</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cameras.map((cam) => (
            <CameraFeed key={cam.id} camera={cam} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
