import { motion } from "framer-motion";
import { Camera, Cpu, Activity, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ---------------- CAMERA DATA ---------------- */

const cameras = [
  { id: "CAM-01", zone: "Zone A", status: "online", fps: 30 },
  { id: "CAM-02", zone: "Zone B", status: "online", fps: 28 },
  { id: "CAM-03", zone: "Zone C", status: "online", fps: 30 },
  { id: "CAM-04", zone: "Zone D", status: "offline", fps: 0 },
  { id: "CAM-05", zone: "Zone E", status: "online", fps: 25 },
];

/* ---------------- ROLE DATA ---------------- */

const roles = [
  { name: "Site Manager", access: "Full", users: 3 },
  { name: "Safety Officer", access: "Monitor + Alerts", users: 5 },
  { name: "Operator", access: "View Only", users: 12 },
];

/* ---------------- CHART DATA ---------------- */

const complianceHistogram = [
  { name: "Helmet", value: 92 },
  { name: "Vest", value: 85 },
  { name: "Boots", value: 78 },
  { name: "Gloves", value: 70 },
  { name: "Goggles", value: 60 },
];

const compliancePie = [
  { name: "Compliant", value: 78 },
  { name: "Violation", value: 22 },
];

const COLORS = ["#22c55e", "#ef4444"];

/* ====================================================== */

const Admin = () => {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold text-foreground">
          Admin Control Panel
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          SYSTEM CONFIGURATION & MANAGEMENT
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ================= MODEL STATUS ================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              AI Model Status
            </h3>
          </div>

          <div className="space-y-4">
            {[
              { label: "Model", value: "YOLOv8-PPE v3.2" },
              { label: "Inference Latency", value: "23ms" },
              { label: "GPU Utilization", value: "67%" },
              { label: "Last Updated", value: "2h ago" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between">
                <span className="text-xs text-muted-foreground">
                  {item.label}
                </span>
                <span className="text-xs font-mono font-semibold text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* sensitivity */}
          <div className="mt-5 pt-4 border-t border-border">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-muted-foreground">
                Detection Sensitivity
              </span>
              <span className="text-xs font-mono text-primary">75%</span>
            </div>

            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-primary rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* ================= CAMERA MANAGEMENT ================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Camera Management
            </h3>
          </div>

          <div className="space-y-2">
            {cameras.map((cam) => (
              <div
                key={cam.id}
                className="flex justify-between items-center p-2.5 rounded-xl bg-secondary/30"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      cam.status === "online" ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span className="text-xs font-mono text-foreground">
                    {cam.id}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {cam.zone}
                  </span>
                </div>

                <span className="text-xs font-mono text-muted-foreground">
                  {cam.fps} FPS
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ================= CHART ANALYTICS ================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-5 lg:col-span-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Safety Compliance Analytics
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* HISTOGRAM */}
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={complianceHistogram}>
                  <XAxis dataKey="name" stroke="#888" fontSize={10} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* PIE */}
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={compliancePie}
                    dataKey="value"
                    innerRadius={50}
                    outerRadius={70}
                  >
                    {compliancePie.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* ================= ROLES ================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Role-Based Access
            </h3>
          </div>

          <div className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.name}
                className="flex justify-between p-3 rounded-xl bg-secondary/30"
              >
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    {role.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {role.access}
                  </p>
                </div>

                <span className="text-xs font-mono text-muted-foreground">
                  {role.users} users
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
