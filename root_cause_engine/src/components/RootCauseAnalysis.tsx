import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Cause {
  cause: string;
  confidence: number;
}

interface RootCauseData {
  defect: string;
  primary: Cause;
  secondary: Cause[];
  actions: string[];
  severity: "Low" | "Medium" | "High" | "Critical";
  reason: string;
  warning?: string | null;
}

interface RootCauseAnalysisProps {
  data: RootCauseData;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const SEVERITY_CONFIG = {
  Low:      { color: "#4ade80", bg: "rgba(74,222,128,0.10)",  label: "LOW" },
  Medium:   { color: "#facc15", bg: "rgba(250,204,21,0.10)",  label: "MED" },
  High:     { color: "#f97316", bg: "rgba(249,115,22,0.10)",  label: "HIGH" },
  Critical: { color: "#ef4444", bg: "rgba(239,68,68,0.12)",   label: "CRIT" },
};

const ACTION_ICONS = ["⚙️", "🔧", "🔍", "📋", "🧪", "🛠️"];

// ─── Confidence Bar ───────────────────────────────────────────────────────────

function ConfidenceBar({ value, color }: { value: number; color: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 80);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
      <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            borderRadius: 99,
            transition: "width 0.9s cubic-bezier(.22,1,.36,1)",
            boxShadow: `0 0 8px ${color}55`,
          }}
        />
      </div>
      <span style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 11,
        color,
        minWidth: 44,
        textAlign: "right",
        fontWeight: 700,
        letterSpacing: "0.02em",
      }}>
        {value.toFixed(1)}%
      </span>
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <div style={{ width: 3, height: 13, background: "linear-gradient(180deg,#e11d48,#fb7185)", borderRadius: 2, flexShrink: 0 }} />
      <span style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 10,
        letterSpacing: "0.16em",
        color: "rgba(255,255,255,0.35)",
        textTransform: "uppercase" as const,
      }}>
        {children}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RootCauseAnalysis({ data }: RootCauseAnalysisProps) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const sev = SEVERITY_CONFIG[data.severity] ?? SEVERITY_CONFIG.Medium;

  const cardStyle = {
    background: "rgba(255,255,255,0.026)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: "18px 20px",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@500;600;700;800&display=swap');
        .rca * { box-sizing: border-box; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a0 { animation: fadeUp 0.5s 0.00s cubic-bezier(.22,1,.36,1) both; }
        .a1 { animation: fadeUp 0.5s 0.08s cubic-bezier(.22,1,.36,1) both; }
        .a2 { animation: fadeUp 0.5s 0.16s cubic-bezier(.22,1,.36,1) both; }
        .a3 { animation: fadeUp 0.5s 0.24s cubic-bezier(.22,1,.36,1) both; }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(225,29,72,0.40); }
          70%  { box-shadow: 0 0 0 8px rgba(225,29,72,0); }
          100% { box-shadow: 0 0 0 0 rgba(225,29,72,0); }
        }
        .pulse { animation: pulse-ring 2.5s ease-out infinite; }
        .action-btn {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 14px; width: 100%; text-align: left; cursor: pointer;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          transition: background 0.18s, border-color 0.18s;
        }
        .action-btn:hover { background: rgba(225,29,72,0.07); border-color: rgba(225,29,72,0.22); }
        .action-btn.open  { background: rgba(225,29,72,0.06); border-color: rgba(225,29,72,0.28); }
        .sec-row {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.022);
          border: 1px solid rgba(255,255,255,0.055);
          border-radius: 10px;
          transition: background 0.18s;
        }
        .sec-row:hover { background: rgba(255,255,255,0.042); }
      `}</style>

      <div
        className="rca"
        style={{
          fontFamily: "'Syne', sans-serif",
          background: "#0d0d0f",
          minHeight: "100vh",
          padding: "28px 20px",
          color: "#fff",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        {/* ── Header ── */}
        <div className="a0" style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
            <div className="pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#e11d48", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: "rgba(255,255,255,0.32)", textTransform: "uppercase" as const }}>
              Root Cause Analysis
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>
              {data.defect}
            </h1>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10, fontWeight: 700,
              letterSpacing: "0.12em",
              color: sev.color,
              background: sev.bg,
              border: `1px solid ${sev.color}44`,
              borderRadius: 6,
              padding: "3px 9px",
            }}>
              {sev.label}
            </span>
          </div>
        </div>

        {/* ── Warning ── */}
        {data.warning && (
          <div className="a0" style={{
            background: "rgba(250,204,21,0.07)",
            border: "1px solid rgba(250,204,21,0.22)",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 9,
          }}>
            <span style={{ fontSize: 14 }}>⚠️</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#facc15", letterSpacing: "0.02em" }}>
              {data.warning}
            </span>
          </div>
        )}

        {/* ── Primary Cause ── */}
        <div className="a1" style={{ ...cardStyle, marginBottom: 12 }}>
          <SectionLabel>Primary Root Cause</SectionLabel>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: "rgba(225,29,72,0.12)",
              border: "1px solid rgba(225,29,72,0.28)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18,
            }}>
              🎯
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.01em" }}>
                {data.primary.cause}
              </div>
              <ConfidenceBar value={data.primary.confidence} color="#e11d48" />
            </div>
          </div>

          {/* Reasoning */}
          <div style={{ background: "rgba(255,255,255,0.035)", borderRadius: 9, padding: "10px 13px", display: "flex", gap: 9 }}>
            <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>💡</span>
            <p style={{
              margin: 0,
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.7,
              letterSpacing: "0.01em",
            }}>
              {data.reason}
            </p>
          </div>
        </div>

        {/* ── Secondary Causes ── */}
        <div className="a2" style={{ ...cardStyle, marginBottom: 12 }}>
          <SectionLabel>Alternative Causes</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {data.secondary.map((s, i) => (
              <div key={i} className="sec-row">
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.28)", minWidth: 20, fontWeight: 700 }}>
                  {String(i + 2).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.75)", flex: 1, letterSpacing: "-0.005em" }}>
                  {s.cause}
                </span>
                <ConfidenceBar value={s.confidence} color="#64748b" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Recommended Actions ── */}
        <div className="a3" style={cardStyle}>
          <SectionLabel>Recommended Actions</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {data.actions.map((action, i) => (
              <button
                key={i}
                className={`action-btn${expanded === i ? " open" : ""}`}
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: expanded === i ? "rgba(225,29,72,0.16)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${expanded === i ? "rgba(225,29,72,0.35)" : "rgba(255,255,255,0.08)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14,
                  transition: "all 0.2s",
                }}>
                  {ACTION_ICONS[i] ?? "📌"}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 13, fontWeight: 600,
                    color: expanded === i ? "#fff" : "rgba(255,255,255,0.7)",
                    letterSpacing: "-0.005em",
                    transition: "color 0.18s",
                  }}>
                    {action}
                  </div>
                  {expanded === i && (
                    <div style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.32)",
                      marginTop: 5,
                      letterSpacing: "0.02em",
                      lineHeight: 1.6,
                    }}>
                      Step {i + 1} of {data.actions.length} · Tap to mark complete
                    </div>
                  )}
                </div>

                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 14,
                  color: expanded === i ? "#e11d48" : "rgba(255,255,255,0.18)",
                  flexShrink: 0,
                  display: "inline-block",
                  transform: expanded === i ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.22s, color 0.18s",
                }}>
                  ›
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}