"use client";
import React, { useState, useEffect } from "react";

export default function StyleInspector({ selectedId, styles: computedStyles, onStyleChange }) {
  const [styles, setStyles] = useState({});

  // derived loading: parent sets styles to null while fetching
  const isLoading = Boolean(selectedId && computedStyles == null);

  useEffect(() => {
    if (computedStyles) {
      setStyles(computedStyles);
    } else if (!selectedId) {
      setStyles({});
    }
  }, [computedStyles, selectedId]);

  function handleStyleChange(property, value) {
    const newStyles = { ...styles, [property]: value };
    setStyles(newStyles);
    onStyleChange(selectedId, { [property]: value });
  }

  if (!selectedId) {
    return (
      <div style={{ padding: 16, fontSize: 14, color: "#64748b" }}>
        Select an element to edit its styles
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ padding: 16, fontSize: 14, color: "#64748b" }}>
        Loading styles...
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h4 style={{ margin: "0 0 16px 0", fontSize: 16, fontWeight: 600 }}>
        Styles
      </h4>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Text Color */}
        <div>
          <label
            style={{
              fontSize: 12,
              color: "#64748b",
              display: "block",
              marginBottom: 4,
            }}
          >
            Text Color
          </label>
          <input
            type="color"
            value={toHex(styles.color) || "#000000"}
            onChange={(e) => handleStyleChange("color", e.target.value)}
            style={{
              width: "100%",
              height: 32,
              border: "none",
              borderRadius: 4,
            }}
          />
        </div>

        {/* Background Color */}
        <div>
          <label
            style={{
              fontSize: 12,
              color: "#64748b",
              display: "block",
              marginBottom: 4,
            }}
          >
            Background Color
          </label>
          <input
            type="color"
            value={toHex(styles.backgroundColor) || "#ffffff"}
            onChange={(e) =>
              handleStyleChange("backgroundColor", e.target.value)
            }
            style={{
              width: "100%",
              height: 32,
              border: "none",
              borderRadius: 4,
            }}
          />
        </div>

        {/* Font Size */}
        <div>
          <label
            style={{
              fontSize: 12,
              color: "#64748b",
              display: "block",
              marginBottom: 4,
            }}
          >
            Font Size
          </label>
          <input
            type="range"
            min="10"
            max="72"
            value={parseInt(styles.fontSize) || 16}
            onChange={(e) =>
              handleStyleChange("fontSize", e.target.value + "px")
            }
            style={{ width: "100%" }}
          />
          <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>
            {parseInt(styles.fontSize) || 16}px
          </div>
        </div>

        {/* Font Weight */}
        <div>
          <label
            style={{
              fontSize: 12,
              color: "#64748b",
              display: "block",
              marginBottom: 4,
            }}
          >
            Font Weight
          </label>
          <select
            value={styles.fontWeight || "normal"}
            onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
            style={{
              width: "100%",
              padding: "6px 8px",
              border: "1px solid #d1d5db",
              borderRadius: 4,
              fontSize: 14,
            }}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
          </select>
        </div>

        {/* Text Align */}
        <div>
          <label
            style={{
              fontSize: 12,
              color: "#64748b",
              display: "block",
              marginBottom: 4,
            }}
          >
            Text Align
          </label>
          <div style={{ display: "flex", gap: 4 }}>
            {["left", "center", "right", "justify"].map((align) => (
              <button
                key={align}
                onClick={() => handleStyleChange("textAlign", align)}
                style={{
                  flex: 1,
                  padding: "6px 4px",
                  border: "1px solid #d1d5db",
                  borderRadius: 4,
                  background: styles.textAlign === align ? "#3b82f6" : "#fff",
                  color: styles.textAlign === align ? "#fff" : "#374151",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                {align.charAt(0).toUpperCase() + align.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Border Radius */}
        <div>
          <label
            style={{
              fontSize: 12,
              color: "#64748b",
              display: "block",
              marginBottom: 4,
            }}
          >
            Border Radius
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={parseInt(styles.borderRadius) || 0}
            onChange={(e) =>
              handleStyleChange("borderRadius", e.target.value + "px")
            }
            style={{ width: "100%" }}
          />
          <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>
            {parseInt(styles.borderRadius) || 0}px
          </div>
        </div>
      </div>
    </div>
  );
}

// replace rgbToHex with a tolerant helper
function toHex(color) {
  if (!color) return "#000000";
  if (typeof color === "string" && color.trim().startsWith("#")) return color;
  if (!color.includes("rgb")) return "#000000";
  const nums = color.match(/\d+/g);
  if (!nums || nums.length < 3) return "#000000";
  const [r,g,b] = nums.map(n => parseInt(n, 10));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
