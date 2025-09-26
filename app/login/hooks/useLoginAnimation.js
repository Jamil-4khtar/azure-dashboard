import { useEffect, useState } from "react";

export function useLoginAnimation() {
  const [phase, setPhase] = useState("intro");

  useEffect(() => {
    const timer = setTimeout(() => setPhase("layout"), 2000);
    return () => clearTimeout(timer);
  }, []);

  return { phase };
}
