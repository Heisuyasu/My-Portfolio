"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { CommandPalette } from "@/components/command/CommandPalette";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { MouseGlow } from "@/components/layout/MouseGlow";

/**
 * Client-side chrome that wraps every page: cursor, scroll progress,
 * navbar, command palette, loading screen and the mouse-follow glow.
 * Keeps the root layout a server component.
 */
export function AppChrome() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
      <LoadingScreen />
      <MouseGlow />
      <CustomCursor />
      <ScrollProgress />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </>
  );
}
