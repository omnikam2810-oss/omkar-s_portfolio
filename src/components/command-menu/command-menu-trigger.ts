"use client";

import { useSyncExternalStore } from "react";

/** Fired on window to open the ⌘K menu (the nav button and the shortcut both use it). */
export const OPEN_COMMAND_MENU = "command-menu:open";

export function openCommandMenu() {
  window.dispatchEvent(new Event(OPEN_COMMAND_MENU));
}

const noop = () => () => {};
const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

/** "⌘K" on Apple devices (and before hydration, as designed), "Ctrl K" elsewhere. */
export function useShortcutLabel() {
  return useSyncExternalStore(noop, () => (isMac() ? "⌘K" : "Ctrl K"), () => "⌘K");
}
