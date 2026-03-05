import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MonitorPlay,
  Upload,
  ShieldAlert,
  Bell,
  Settings,
  Trophy,
  ChevronLeft,
  ChevronRight,
  HardHat,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/monitoring", icon: MonitorPlay, label: "Live Monitor" },
  { to: "/upload", icon: Upload, label: "Upload & Analyze" },
  { to: "/violations", icon: ShieldAlert, label: "Violations" },
  { to: "/alerts", icon: Bell, label: "Alerts" },
  { to: "/admin", icon: Settings, label: "Admin" },
  { to: "/showcase", icon: Trophy, label: "Showcase" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="h-full bg-card border-r border-border flex flex-col relative z-20 backdrop-blur-xl transition-colors duration-300"
    >
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-4 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <HardHat className="w-5 h-5 text-primary" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-hidden"
          >
            <h1 className="text-sm font-bold tracking-wide text-foreground">
              IRON<span className="text-primary">THRONE</span>
            </h1>
            <p className="text-[10px] font-mono text-muted-foreground tracking-widest">
              SAFETY AI
            </p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? "bg-primary/15 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-7 h-7 rounded-full bg-background border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>
    </motion.aside>
  );
};
