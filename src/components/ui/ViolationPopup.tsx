import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function ViolationPopup({
  violation,
}: {
  violation: string | null;
}) {
  return (
    <AnimatePresence>
      {violation && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 20, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          className="fixed top-0 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-xl shadow-xl flex gap-2 z-50"
        >
          <AlertTriangle />
          {violation}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
