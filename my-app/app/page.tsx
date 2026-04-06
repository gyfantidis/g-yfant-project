"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootSequence from "@/components/os/BootSequence";
import Desktop from "@/components/os/Desktop";

export default function Page() {
  const [booted, setBooted] = useState(false);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <AnimatePresence>
        {!booted && (
          <BootSequence key="boot" onComplete={() => setBooted(true)} />
        )}
      </AnimatePresence>
      {booted && <Desktop />}
    </div>
  );
}
