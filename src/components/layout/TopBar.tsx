import { Bell, Search, Wifi, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  darkMode: boolean;
  toggleTheme: () => void;
}

export const TopBar = ({ darkMode, toggleTheme }: Props) => {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/30 backdrop-blur-md z-10 transition-colors duration-300">
      {/* Search */}
      <div className="flex items-center gap-3 bg-secondary/50 rounded-xl px-4 py-2 w-80">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search cameras, workers, violations..."
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        {/* System status */}
        <div className="status-live text-accent">
          <span className="status-dot" />
          <span>LIVE</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Wifi className="w-3.5 h-3.5 text-accent" />
          <span>12 Cams</span>
        </div>

        {/* Premium Toggle */}
        <button
          onClick={toggleTheme}
          className="relative w-14 h-7 rounded-full bg-secondary transition-colors duration-300 flex items-center px-1"
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-5 h-5 bg-primary rounded-full shadow-md"
            style={{
              marginLeft: darkMode ? "24px" : "0px",
            }} />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-secondary/50 transition-colors">
          <Bell className="w-[18px] h-[18px] text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full animate-blink-rec" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
          <span className="text-xs font-bold text-primary">AD</span>
        </div>
      </div>
    </header>
  );
};
