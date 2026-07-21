import { useState } from "react";

export default function App() {
  const [mode, setMode] = useState("percent"); // percent | fixed | findPercent | findOriginal
  const [original, setOriginal] = useState("");
  const [discount, setDiscount] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [result, setResult] = useState(null);

  const modes = [
    { id: "percent", label: "% Off" },
    { id: "fixed", label: "$ Off" },
    { id: "findPercent", label: "Find % Off" },
    { id: "findOriginal", label: "Find Original" },
  ];

  const calculate = () => {
    const o = parseFloat(original);
    const d = parseFloat(discount);
    const s = parseFloat(salePrice);

    if (mode === "percent") {
      if (!o || !d || o <= 0 || d < 0 || d > 100) return;
      const saved = o * (d / 100);
      const finalPrice = o - saved;
      setResult({ finalPrice, saved, discountPct: d, original: o });
    } else if (mode === "fixed") {
      if (!o || !d || o <= 0 || d < 0) return;
      const saved = Math.min(d, o);
      const finalPrice = o - saved;
      const discountPct = (saved / o) * 100;
      setResult({ finalPrice, saved, discountPct, original: o });
    } else if (mode === "findPercent") {
      if (!o || !s || o <= 0 || s < 0 || s > o) return;
      const saved = o - s;
      const discountPct = (saved / o) * 100;
      setResult({ finalPrice: s, saved, discountPct, original: o });
    } else if (mode === "findOriginal") {
      if (!s || !d || s <= 0 || d <= 0 || d >= 100) return;
      const o = s / (1 - d / 100);
      const saved = o - s;
      setResult({ finalPrice: s, saved, discountPct: d, original: o });
    }
  };

  const reset = () => {
    setOriginal(""); setDiscount(""); setSalePrice(""); setResult(null);
  };

  const fmt = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    fontSize: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    background: "#fff",
  };

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "6px",
  };

  const renderInputs = () => {
    if (mode === "percent") return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Original Price ($)</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontWeight: "600" }}>$</span>
            <input type="number" placeholder="e.g. 80" value={original} onChange={e => setOriginal(e.target.value)} min="0" style={{ ...inputStyle, paddingLeft: "28px" }} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Discount (%)</label>
          <div style={{ position: "relative" }}>
            <input type="number" placeholder="e.g. 30" value={discount} onChange={e => setDiscount(e.target.value)} min="0" max="100" style={{ ...inputStyle, paddingRight: "36px" }} />
            <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontWeight: "600" }}>%</span>
          </div>
        </div>
      </div>
    );

    if (mode === "fixed") return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Original Price ($)</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontWeight: "600" }}>$</span>
            <input type="number" placeholder="e.g. 100" value={original} onChange={e => setOriginal(e.target.value)} min="0" style={{ ...inputStyle, paddingLeft: "28px" }} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Discount Amount ($)</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontWeight: "600" }}>$</span>
            <input type="number" placeholder="e.g. 20" value={discount} onChange={e => setDiscount(e.target.value)} min="0" style={{ ...inputStyle, paddingLeft: "28px" }} />
          </div>
        </div>
      </div>
    );

    if (mode === "findPercent") return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Original Price ($)</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontWeight: "600" }}>$</span>
            <input type="number" placeholder="e.g. 80" value={original} onChange={e => setOriginal(e.target.value)} min="0" style={{ ...inputStyle, paddingLeft: "28px" }} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Sale Price ($)</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontWeight: "600" }}>$</span>
            <input type="number" placeholder="e.g. 56" value={salePrice} onChange={e => setSalePrice(e.target.value)} min="0" style={{ ...inputStyle, paddingLeft: "28px" }} />
          </div>
        </div>
      </div>
    );

    if (mode === "findOriginal") return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Sale Price ($)</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontWeight: "600" }}>$</span>
            <input type="number" placeholder="e.g. 56" value={salePrice} onChange={e => setSalePrice(e.target.value)} min="0" style={{ ...inputStyle, paddingLeft: "28px" }} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Discount (%)</label>
          <div style={{ position: "relative" }}>
            <input type="number" placeholder="e.g. 30" value={discount} onChange={e => setDiscount(e.target.value)} min="0" max="99" style={{ ...inputStyle, paddingRight: "36px" }} />
            <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontWeight: "600" }}>%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "16px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="https://tabutility.com" style={{ fontSize: "15px", fontWeight: "700", color: "#6366f1", textDecoration: "none" }}>⌘ Tabutility</a>
          <span style={{ fontSize: "13px", color: "#6b7280" }}>Free Online Tools</span>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 16px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#111827", margin: "0 0 8px 0" }}>Discount Calculator</h1>
        <p style={{ fontSize: "15px", color: "#6b7280", margin: "0 0 28px 0" }}>
          Calculate sale price, savings, discount percentage, or original price instantly.
        </p>

        {/* Mode tabs */}
        <div style={{ display: "flex", background: "#f3f4f6", borderRadius: "10px", padding: "4px", marginBottom: "20px", gap: "4px" }}>
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => { setMode(m.id); reset(); }}
              style={{
                flex: 1,
                padding: "8px 4px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "13px",
                background: mode === m.id ? "#6366f1" : "transparent",
                color: mode === m.id ? "#fff" : "#6b7280",
                transition: "all 0.2s",
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Input card */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: "20px" }}>
          {renderInputs()}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button onClick={calculate} style={{
              flex: 1, padding: "13px", background: "#6366f1", color: "#fff",
              border: "none", borderRadius: "10px", fontSize: "16px", fontWeight: "700", cursor: "pointer",
            }}>
              Calculate
            </button>
            <button onClick={reset} style={{
              padding: "13px 20px", background: "#f3f4f6", color: "#374151",
              border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: "600", cursor: "pointer",
            }}>
              Reset
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div style={{ marginBottom: "32px" }}>
            {/* Sale price hero */}
            <div style={{ background: "#22c55e", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 4px 12px rgba(34,197,94,0.3)", marginBottom: "12px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                {mode === "findOriginal" ? "Original Price" : "Sale Price"}
              </div>
              <div style={{ fontSize: "56px", fontWeight: "900", color: "#fff", lineHeight: 1 }}>
                ${fmt(mode === "findOriginal" ? result.original : result.finalPrice)}
              </div>
              <div style={{ marginTop: "10px", display: "inline-block", background: "rgba(255,255,255,0.2)", borderRadius: "20px", padding: "4px 14px" }}>
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#fff" }}>{result.discountPct.toFixed(1)}% off</span>
              </div>
            </div>

            {/* Savings breakdown */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              {[
                { label: "Original Price", value: `$${fmt(result.original)}`, color: "#6b7280" },
                { label: "You Save", value: `$${fmt(result.saved)}`, color: "#22c55e" },
                { label: "Final Price", value: `$${fmt(result.finalPrice)}`, color: "#6366f1" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ background: "#fff", borderRadius: "12px", padding: "16px 12px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", textAlign: "center" }}>
                  <div style={{ fontSize: "15px", fontWeight: "800", color }}>{value}</div>
                  <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "4px", fontWeight: "600" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div style={{ textAlign: "center" }}>
          <a href="https://tabutility.com" style={{ fontSize: "14px", color: "#6366f1", textDecoration: "none", fontWeight: "600" }}>
            ← Back to all free tools
          </a>
        </div>
      </div>
    </div>
  );
}
