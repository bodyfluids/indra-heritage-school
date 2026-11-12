/** CSS custom properties for an element on the 1224px `.zg` canvas (see global.css). */
export const pos = (x: number, y: number, w: number, extra: Record<string, number> = {}) =>
  Object.entries({ x, y, w, ...extra })
    .map(([k, v]) => `--${k}:${v}`)
    .join(';');

type Rect = [x: number, y: number, w: number, h: number];

/**
 * Position of an image inside its frame when the live site zooms or offsets it beyond a plain
 * cover fit. Rects are measured in px relative to the frame; desktop frame is `fw`×`fh`.
 */
export const crop = (fw: number, fh: number, d: Rect, m?: { fw: number; fh: number; r: Rect }) => {
  const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`;
  const vars = [
    `--cl:${pct(d[0], fw)}`,
    `--ct:${pct(d[1], fh)}`,
    `--cw:${pct(d[2], fw)}`,
    `--ch:${pct(d[3], fh)}`,
  ];
  if (m) {
    vars.push(
      `--mcl:${pct(m.r[0], m.fw)}`,
      `--mct:${pct(m.r[1], m.fh)}`,
      `--mcw:${pct(m.r[2], m.fw)}`,
      `--mch:${pct(m.r[3], m.fh)}`,
    );
  }
  return vars.join(';');
};
