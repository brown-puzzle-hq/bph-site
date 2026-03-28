"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import colorwheelPng from "./colorwheel.png";

import Image from "next/image";
import colorWheel from "./color-wheel.png";

type Pin = {
  id: string;
  xPct: number;
  yPct: number;
  label: string;
  rPct: number;
  thetaDeg: number;
  color: string;
  alpha: number;
  isDark: boolean;
  showLabel: boolean;
  showPin: boolean;
};

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const hexToRgb = (hex: string) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
  if (!m) return null;
  const group = m[1];
  if (!group) return null;
  const intVal = parseInt(group, 16);
  return {
    r: (intVal >> 16) & 255,
    g: (intVal >> 8) & 255,
    b: intVal & 255,
  };
};

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0"))
    .join("")}`;

const normalizeHex = (raw: string) => {
  const s = String(raw ?? "").trim();
  if (!s) return null;
  const m6 = /^#?([0-9a-f]{6})$/i.exec(s);
  if (m6?.[1]) return `#${m6[1].toLowerCase()}`;
  const m3 = /^#?([0-9a-f]{3})$/i.exec(s);
  if (m3?.[1]) {
    const e = m3[1]
      .split("")
      .map((c) => `${c}${c}`)
      .join("");
    return `#${e.toLowerCase()}`;
  }
  return null;
};

const isDarkColor = (hex: string) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness < 120;
};

const applyAlphaOnBlack = (hex: string, alpha: number) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const a = clamp01(alpha);
  return rgbToHex(
    Math.round(rgb.r * a),
    Math.round(rgb.g * a),
    Math.round(rgb.b * a),
  );
};

const hslToRgb = (h: number, s: number, l: number) => {
  const hh = ((h % 360) + 360) % 360;
  const ss = clamp01(s);
  const ll = clamp01(l);

  const c = (1 - Math.abs(2 * ll - 1)) * ss;
  const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
  const m = ll - c / 2;
  let rp = 0;
  let gp = 0;
  let bp = 0;

  if (hh < 60) {
    rp = c;
    gp = x;
  } else if (hh < 120) {
    rp = x;
    gp = c;
  } else if (hh < 180) {
    gp = c;
    bp = x;
  } else if (hh < 240) {
    gp = x;
    bp = c;
  } else if (hh < 300) {
    rp = x;
    bp = c;
  } else {
    rp = c;
    bp = x;
  }

  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
};

const rgbToHsl = (r: number, g: number, b: number) => {
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const d = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rr:
        h = ((gg - bb) / d) % 6;
        break;
      case gg:
        h = (bb - rr) / d + 2;
        break;
      default:
        h = (rr - gg) / d + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return { h, s, l };
};

const fallbackWheelColor = (thetaDeg: number, rPct: number) => {
  const lightness = 0.9 - clamp01(rPct) * 0.4;
  const { r, g, b } = hslToRgb(thetaDeg, 1, lightness);
  return rgbToHex(r, g, b);
};

const fallbackPositionForHex = (hex: string) => {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  if (normalized === "#000000") {
    return { xPct: 0.5, yPct: 0.5, rPct: 0, thetaDeg: 0 };
  }
  const rgb = hexToRgb(normalized);
  if (!rgb) return null;
  const { h } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const theta = (h * Math.PI) / 180;
  const rPct = 0.85;
  const xPct = clamp01(0.5 + Math.cos(theta) * rPct * 0.5);
  const yPct = clamp01(0.5 + Math.sin(theta) * rPct * 0.5);
  const thetaDeg =
    ((Math.atan2(yPct - 0.5, xPct - 0.5) * 180) / Math.PI + 360) % 360;
  return { xPct, yPct, rPct, thetaDeg };
};

export default function PrimaryInvestigationWheel() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [wheelAlpha, setWheelAlpha] = useState(1);
  const [imageReady, setImageReady] = useState(false);
  const [pins, setPins] = useState<Pin[]>([]);
  const [nextPinNumber, setNextPinNumber] = useState(1);
  const [addPinHex, setAddPinHex] = useState("");
  const [editingPinId, setEditingPinId] = useState<string | null>(null);
  const [editingLabelDraft, setEditingLabelDraft] = useState("");

  const [sampleData, setSampleData] = useState<Uint8ClampedArray | null>(null);
  const [sampleW, setSampleW] = useState(0);
  const [sampleH, setSampleH] = useState(0);

  const setupSampler = useCallback(() => {
    const img = imageRef.current;
    if (!img || !img.naturalWidth || !img.naturalHeight) return;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setSampleData(imgData.data);
      setSampleW(imgData.width);
      setSampleH(imgData.height);
    } catch {
      setSampleData(null);
      setSampleW(0);
      setSampleH(0);
    }
  }, []);

  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;
    const onLoad = () => {
      setImageReady(true);
      setupSampler();
    };
    if (img.complete && img.naturalWidth) {
      onLoad();
      return;
    }
    img.addEventListener("load", onLoad);
    return () => img.removeEventListener("load", onLoad);
  }, [setupSampler]);

  const sampleWheelColor = useCallback(
    (xPct: number, yPct: number, thetaDeg: number, rPct: number) => {
      if (!sampleData || !sampleW || !sampleH) {
        return fallbackWheelColor(thetaDeg, rPct);
      }
      try {
        const sx = Math.max(
          0,
          Math.min(sampleW - 1, Math.floor(xPct * sampleW)),
        );
        const sy = Math.max(
          0,
          Math.min(sampleH - 1, Math.floor(yPct * sampleH)),
        );
        const idx = (sy * sampleW + sx) * 4;
        const a = sampleData[idx + 3] ?? 0;
        if (a <= 10) return fallbackWheelColor(thetaDeg, rPct);
        return rgbToHex(
          sampleData[idx] ?? 0,
          sampleData[idx + 1] ?? 0,
          sampleData[idx + 2] ?? 0,
        );
      } catch {
        return fallbackWheelColor(thetaDeg, rPct);
      }
    },
    [sampleData, sampleH, sampleW],
  );

  const solveWheelPointAndAlphaForDisplayHex = useCallback(
    (displayHex: string) => {
      const normalized = normalizeHex(displayHex);
      if (!normalized) return null;
      if (normalized === "#000000") {
        return {
          xPct: 0.5,
          yPct: 0.5,
          rPct: 0,
          thetaDeg: 0,
          alpha: 0,
        };
      }
      if (!sampleData || !sampleW || !sampleH) return null;

      const targetRgb = hexToRgb(normalized);
      if (!targetRgb) return null;

      const cx = sampleW / 2;
      const cy = sampleH / 2;
      const radius = Math.min(cx, cy);
      const radiusSq = radius * radius;

      const pxCount = sampleW * sampleH;
      const step = pxCount > 900_000 ? 4 : 2;

      let bestErr = Number.POSITIVE_INFINITY;
      let bestX = Math.floor(cx);
      let bestY = Math.floor(cy);
      let bestAlpha = 1;

      for (let y = 0; y < sampleH; y += step) {
        const dy = y + 0.5 - cy;
        const row = y * sampleW * 4;
        for (let x = 0; x < sampleW; x += step) {
          const dx = x + 0.5 - cx;
          if (dx * dx + dy * dy > radiusSq) continue;

          const idx = row + x * 4;
          const pa = sampleData[idx + 3] ?? 0;
          if (pa <= 10) continue;

          const pr = sampleData[idx] ?? 0;
          const pg = sampleData[idx + 1] ?? 0;
          const pb = sampleData[idx + 2] ?? 0;
          const denom = pr * pr + pg * pg + pb * pb;
          if (denom <= 1) continue;

          let a =
            (pr * targetRgb.r + pg * targetRgb.g + pb * targetRgb.b) / denom;
          a = clamp01(a);

          const rr = pr * a - targetRgb.r;
          const gg = pg * a - targetRgb.g;
          const bb = pb * a - targetRgb.b;
          const err = rr * rr + gg * gg + bb * bb;

          if (err < bestErr) {
            bestErr = err;
            bestX = x;
            bestY = y;
            bestAlpha = a;
            if (bestErr === 0) break;
          }
        }
        if (bestErr === 0) break;
      }

      const xPct = clamp01((bestX + 0.5) / sampleW);
      const yPct = clamp01((bestY + 0.5) / sampleH);
      const dx = bestX + 0.5 - cx;
      const dy = bestY + 0.5 - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const rPct = clamp01(dist / radius);
      const thetaDeg = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;

      return { xPct, yPct, rPct, thetaDeg, alpha: bestAlpha };
    },
    [sampleData, sampleH, sampleW],
  );

  const movePinToHex = useCallback(
    (pinId: string, desiredDisplayHex: string) => {
      const normalized = normalizeHex(desiredDisplayHex);
      if (!normalized) return;

      const solved = solveWheelPointAndAlphaForDisplayHex(normalized);
      if (solved) {
        const a = clamp01(solved.alpha);
        setWheelAlpha(a);
        setPins((current) =>
          current.map((pin) =>
            pin.id === pinId
              ? {
                  ...pin,
                  xPct: solved.xPct,
                  yPct: solved.yPct,
                  rPct: solved.rPct,
                  thetaDeg: solved.thetaDeg,
                  alpha: a,
                  color: normalized,
                  isDark: isDarkColor(normalized),
                }
              : pin,
          ),
        );
        return;
      }

      const pos = fallbackPositionForHex(normalized);
      if (!pos) return;
      setPins((current) =>
        current.map((pin) =>
          pin.id === pinId
            ? {
                ...pin,
                xPct: pos.xPct,
                yPct: pos.yPct,
                rPct: pos.rPct,
                thetaDeg: pos.thetaDeg,
                color: normalized,
                isDark: isDarkColor(normalized),
              }
            : pin,
        ),
      );
    },
    [solveWheelPointAndAlphaForDisplayHex],
  );

  const addPinFromHex = useCallback(
    (hex: string) => {
      const normalized = normalizeHex(hex);
      if (!normalized) return;
      const label = `Pin ${nextPinNumber}`;
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setNextPinNumber((n) => n + 1);

      const solved = solveWheelPointAndAlphaForDisplayHex(normalized);
      if (solved) {
        const a = clamp01(solved.alpha);
        setWheelAlpha(a);
        setPins((current) => [
          ...current,
          {
            id,
            xPct: solved.xPct,
            yPct: solved.yPct,
            label,
            rPct: solved.rPct,
            thetaDeg: solved.thetaDeg,
            color: normalized,
            alpha: a,
            isDark: isDarkColor(normalized),
            showLabel: true,
            showPin: true,
          },
        ]);
        return;
      }

      const pos = fallbackPositionForHex(normalized);
      if (!pos) return;
      setPins((current) => [
        ...current,
        {
          id,
          xPct: pos.xPct,
          yPct: pos.yPct,
          label,
          rPct: pos.rPct,
          thetaDeg: pos.thetaDeg,
          color: normalized,
          alpha: wheelAlpha,
          isDark: isDarkColor(normalized),
          showLabel: true,
          showPin: true,
        },
      ]);
    },
    [nextPinNumber, solveWheelPointAndAlphaForDisplayHex, wheelAlpha],
  );

  const onWheelClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const y = evt.clientY - rect.top;
      if (!(x >= 0 && y >= 0 && x <= rect.width && y <= rect.height)) return;

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = x - cx;
      const dy = y - cy;
      const radius = Math.min(cx, cy);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > radius) return;

      const xPct = clamp01(x / rect.width);
      const yPct = clamp01(y / rect.height);
      const rPct = clamp01(dist / radius);
      const thetaDeg = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
      const sampled = sampleWheelColor(xPct, yPct, thetaDeg, rPct);
      const color = applyAlphaOnBlack(sampled, wheelAlpha);
      const label = `Pin ${nextPinNumber}`;

      setNextPinNumber((n) => n + 1);
      setPins((current) => [
        ...current,
        {
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          xPct,
          yPct,
          label,
          rPct,
          thetaDeg,
          color,
          alpha: wheelAlpha,
          isDark: isDarkColor(color),
          showLabel: true,
          showPin: true,
        },
      ]);
    },
    [nextPinNumber, sampleWheelColor, wheelAlpha],
  );

  const onAddHex = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      addPinFromHex(addPinHex);
      setAddPinHex("");
    },
    [addPinFromHex, addPinHex],
  );

  const pinCountLabel = useMemo(
    () => (pins.length === 0 ? "No pins yet." : null),
    [pins.length],
  );

  return (
    <div className="my-4 flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
        <div
          ref={wrapperRef}
          className="relative h-80 w-80 cursor-crosshair overflow-visible"
          onClick={onWheelClick}
        >
          <div className="absolute inset-0 overflow-hidden rounded-full bg-black">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                opacity: imageReady ? 0 : wheelAlpha,
                background:
                  "conic-gradient(#ff0000 0deg, #ff7f00 30deg, #ffff00 60deg, #7fff00 120deg, #00ff00 150deg, #00ff7f 180deg, #00ffff 210deg, #007fff 240deg, #0000ff 270deg, #7f00ff 300deg, #ff00ff 330deg, #ff0000 360deg)",
              }}
            />
            <Image
              ref={imageRef}
              src={colorwheelPng.src}
              alt=""
              className="absolute inset-0 h-full w-full rounded-full object-cover"
              style={{ opacity: wheelAlpha }}
            />
          </div>

          <div className="pointer-events-none absolute inset-0 z-10">
            {pins.map((pin) => (
              <div
                key={pin.id}
                className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${pin.xPct * 100}%`,
                  top: `${pin.yPct * 100}%`,
                }}
                title={pin.label}
              >
                <div
                  className="h-3 w-3 rounded-full border-2"
                  style={{
                    display: pin.showPin ? "block" : "none",
                    backgroundColor: pin.color,
                    borderColor: pin.isDark
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(0,0,0,0.85)",
                  }}
                />
                <div
                  className="absolute left-3.5 top-[-6px] max-w-36 truncate rounded-md border border-black/35 bg-white px-2 py-1 text-xs text-black shadow-sm"
                  style={{ display: pin.showLabel ? "block" : "none" }}
                >
                  {pin.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="flex w-full max-w-xs flex-col">
          <div className="flex items-center justify-between gap-2">
            <h2 className="m-0 text-lg font-bold">Pins</h2>
            <button
              type="button"
              onClick={() => {
                setPins([]);
                setNextPinNumber(1);
              }}
              disabled={pins.length === 0}
              className="rounded-md border border-black/20 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear all
            </button>
          </div>
          <p className="mb-2 mt-1 text-sm text-black/70">
            Click the wheel to drop a pin.
          </p>

          <form
            className="mb-3 grid grid-cols-[1fr_auto] gap-2"
            onSubmit={onAddHex}
          >
            <input
              type="text"
              value={addPinHex}
              onChange={(e) => setAddPinHex(e.target.value)}
              placeholder="#RRGGBB"
              aria-label="Hex code"
              className="rounded-md border border-black/20 px-2 py-1 text-sm text-black placeholder:text-black/60"
            />
            <button
              type="submit"
              className="rounded-md border border-black/20 px-3 py-1 text-sm"
            >
              Add pin
            </button>
          </form>

          <ul className="m-0 grid max-h-80 list-none gap-2 overflow-auto p-0 pr-1">
            {pinCountLabel && (
              <li className="rounded-md border border-dashed border-black/20 px-3 py-2 text-sm text-black/70">
                {pinCountLabel}
              </li>
            )}
            {pins.map((pin) => (
              <li
                key={`${pin.id}-row`}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-md border border-black/30 bg-white/95 p-2 text-black shadow-sm"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full border"
                      style={{
                        backgroundColor: pin.color,
                        borderColor: pin.isDark
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(0,0,0,0.35)",
                      }}
                    />
                    {editingPinId === pin.id ? (
                      <input
                        type="text"
                        value={editingLabelDraft}
                        onChange={(e) => setEditingLabelDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const trimmed = editingLabelDraft.trim();
                            if (!trimmed) return;
                            setPins((current) =>
                              current.map((p) =>
                                p.id === pin.id ? { ...p, label: trimmed } : p,
                              ),
                            );
                            setEditingPinId(null);
                            setEditingLabelDraft("");
                          } else if (e.key === "Escape") {
                            setEditingPinId(null);
                            setEditingLabelDraft("");
                          }
                        }}
                        className="min-w-0 flex-1 rounded-md border border-black/30 px-2 py-1 text-sm text-black placeholder:text-black/60"
                        autoFocus
                      />
                    ) : (
                      <strong className="truncate text-black">
                        {pin.label}
                      </strong>
                    )}
                    <button
                      type="button"
                      title="Click to edit hex"
                      onClick={() => {
                        const next = window.prompt("Pin hex code:", pin.color);
                        if (next === null) return;
                        movePinToHex(pin.id, next);
                      }}
                      className="ml-auto rounded-full border border-black/20 px-2 py-0.5 font-mono text-xs"
                    >
                      {String(pin.color || "").toUpperCase()}
                    </button>
                  </div>
                  {editingPinId === pin.id && (
                    <div className="mt-2 flex gap-1.5">
                      <button
                        type="button"
                        className="rounded-full border border-black/25 bg-black px-2 py-0.5 text-xs text-white"
                        onClick={() => {
                          const trimmed = editingLabelDraft.trim();
                          if (!trimmed) return;
                          setPins((current) =>
                            current.map((p) =>
                              p.id === pin.id ? { ...p, label: trimmed } : p,
                            ),
                          );
                          setEditingPinId(null);
                          setEditingLabelDraft("");
                        }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-black/25 bg-white px-2 py-0.5 text-xs text-black"
                        onClick={() => {
                          setEditingPinId(null);
                          setEditingLabelDraft("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  <div className="mt-2 flex gap-1.5">
                    <button
                      type="button"
                      className={`rounded-full border px-2 py-0.5 text-xs ${
                        pin.showLabel
                          ? "border-black bg-black text-white"
                          : "border-black/20 bg-white/75 text-black/80"
                      }`}
                      onClick={() =>
                        setPins((current) =>
                          current.map((p) =>
                            p.id === pin.id
                              ? { ...p, showLabel: !p.showLabel }
                              : p,
                          ),
                        )
                      }
                    >
                      {pin.showLabel ? "Label On" : "Label Off"}
                    </button>
                    <button
                      type="button"
                      className={`rounded-full border px-2 py-0.5 text-xs ${
                        pin.showPin
                          ? "border-black bg-black text-white"
                          : "border-black/20 bg-white/75 text-black/80"
                      }`}
                      onClick={() =>
                        setPins((current) =>
                          current.map((p) =>
                            p.id === pin.id ? { ...p, showPin: !p.showPin } : p,
                          ),
                        )
                      }
                    >
                      {pin.showPin ? "Pin On" : "Pin Off"}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={`Edit pin name: ${pin.label}`}
                  onClick={() => {
                    setEditingPinId(pin.id);
                    setEditingLabelDraft(pin.label);
                  }}
                  className="h-7 w-7 rounded-md border border-black/20 text-sm hover:bg-black/5"
                >
                  ✎
                </button>
                <button
                  type="button"
                  aria-label={`Remove pin: ${pin.label}`}
                  onClick={() =>
                    setPins((current) => current.filter((p) => p.id !== pin.id))
                  }
                  className="h-7 w-7 rounded-md border border-black/20 text-sm hover:bg-black/5"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={wheelAlpha}
        onChange={(e) => setWheelAlpha(clamp01(Number(e.target.value)))}
        className="w-full"
        aria-label="Color wheel opacity"
      />
    </div>
  );
}
