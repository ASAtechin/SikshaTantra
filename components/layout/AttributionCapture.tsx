"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Records, once per tab session, which link or site brought the visitor (see lib/attribution.ts). */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
