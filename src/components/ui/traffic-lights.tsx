/** macOS window buttons for the window-style cards (9px on phones, 11px from md). */
export function TrafficLights() {
  return (
    <span aria-hidden="true" className="flex gap-[5px] md:gap-[7px]">
      {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
        <span
          key={c}
          className="size-[9px] rounded-full shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12)] md:size-[11px]"
          style={{ background: c }}
        />
      ))}
    </span>
  );
}
