"use client";
import React, { useEffect, useRef, useState } from "react";
import StyleInspector from "./StyleInspector";
// Add this to your VisualEditor component imports
import {
  clearPageData,
  getAllSavedPages,
  publishPage,
} from "@/lib/persistence";

export default function VisualEditor({ initialPage = "/" }) {
  const iframeRef = useRef(null);

  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [rect, setRect] = useState(null);
  const [isTextEditing, setIsTextEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const [selectedStyles, setSelectedStyles] = useState(null); // NEW
  const [savedPages, setSavedPages] = useState(null); // null = "not loaded yet"

  // Keep latest selectedId in a ref to avoid stale closures
  const selectedIdRef = useRef(selectedId);
  useEffect(() => {
    selectedIdRef.current = selectedId;
  }, [selectedId]);

  // Attach message listener ONCE
  useEffect(() => {
    function onMessage(e) {
      const msg = e.data;
      if (!msg || typeof msg !== "object") return;

      if (msg.type === "ready") {
        console.log("Preview iframe is ready");
      }

      if (msg.type === "clicked") {
        // Only set state; request rect/styles in the effect below
        setSelectedId(msg.id);
        setIsTextEditing(false);
        setRect(null); // clear the old outline immediately
        setSelectedStyles(null); // reset style loading state
      }

      if (msg.type === "rect") {
        // Compare against the ref (latest selectedId), not stale closure
        if (msg.id === selectedIdRef.current) {
          setRect(msg.rect);
        }
      }

      if (msg.type === "styles") {
        // Handle styles in the parent to avoid race with StyleInspector mount
        if (msg.id === selectedIdRef.current) {
          setSelectedStyles(msg.styles || {});
        }
      }

      if (msg.type === "textEditStart") {
        setIsTextEditing(true);
        setEditingText(msg.text);
      }

      if (msg.type === "textEditEnd") {
        setIsTextEditing(false);
        setEditingText("");
      }
    }

    window.addEventListener("message", onMessage);
    // keyboard shortcuts
    function onKey(e) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (!mod) return;
      if (e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        iframeRef.current?.contentWindow?.postMessage({ type: "UNDO" }, "*");
      }
      if (
        (e.key.toLowerCase() === "z" && e.shiftKey) ||
        e.key.toLowerCase() === "y"
      ) {
        e.preventDefault();
        iframeRef.current?.contentWindow?.postMessage({ type: "REDO" }, "*");
      }
    }
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("keydown", onKey, true);
    };
  }, []);

  // After selectedId changes, request rect + styles from the iframe
  useEffect(() => {
    if (!selectedId) return;
    const w = iframeRef.current?.contentWindow;
    if (!w) return;

    w.postMessage({ type: "getRect", id: selectedId }, "*");
    w.postMessage({ type: "getStyles", id: selectedId }, "*");
  }, [selectedId]);

  function requestStyles(id) {
    const w = iframeRef.current?.contentWindow;
    if (!w) return;
    w.postMessage({ type: "getStyles", id }, "*");
  }

  function applyStyles(id, styles) {
    const w = iframeRef.current?.contentWindow;
    if (!w) return;
    w.postMessage({ type: "applyStyles", id, styles }, "*");
    // optimistic local update so the UI reflects immediately
    setSelectedStyles((prev) => ({ ...(prev || {}), ...styles }));
  }

  function clearSelection() {
    setSelectedId(null);
    setRect(null);
    setIsTextEditing(false);
    setSelectedStyles(null);
  }

  const previewUrl = `${currentPage}?editor=true`;

  // Load on client only (prevents SSR/client mismatch)
  useEffect(() => {
    try {
      setSavedPages(getAllSavedPages());
    } catch {
      setSavedPages([]);
    }
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr 320px",
        height: "100vh",
      }}
    >
      {/* Left Sidebar - Page Selector */}
      <div
        style={{
          background: "#f1f5f9",
          padding: 16,
          borderRight: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <button
            onClick={() => {
              if (
                confirm(
                  `Publish current draft to live for page: ${currentPage}?`
                )
              ) {
                const ok = publishPage(currentPage);
                if (ok)
                  alert(
                    "✅ Published! Open the page without ?editor=true to see live changes."
                  );
              }
            }}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #22c55e",
              borderRadius: 6,
              background: "#dcfce7",
              color: "#166534",
              cursor: "pointer",
              fontSize: 12,
              marginBottom: 8,
            }}
          >
            ✅ Publish
          </button>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <button
              onClick={() =>
                iframeRef.current?.contentWindow?.postMessage(
                  { type: "UNDO" },
                  "*"
                )
              }
              style={{
                flex: 1,
                padding: "8px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: 6,
                background: "#fff",
                color: "#111827",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              ↶ Undo
            </button>
            <button
              onClick={() =>
                iframeRef.current?.contentWindow?.postMessage(
                  { type: "REDO" },
                  "*"
                )
              }
              style={{
                flex: 1,
                padding: "8px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: 6,
                background: "#fff",
                color: "#111827",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              ↷ Redo
            </button>
          </div>
          <button
            onClick={() => {
              if (confirm(`Clear all changes for page: ${currentPage}?`)) {
                clearPageData(currentPage);
                window.location.reload();
              }
            }}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #dc2626",
              borderRadius: 6,
              background: "#fee2e2",
              color: "#dc2626",
              cursor: "pointer",
              fontSize: 12,
              marginBottom: 8,
            }}
          >
            🗑️ Clear This Page
          </button>

          <div style={{ fontSize: 10, color: "#64748b" }}>
            Saved pages:{" "}
            {savedPages === null
              ? "—" // SSR/client stable placeholder
              : savedPages.length
              ? savedPages.join(", ")
              : "None"}
          </div>
        </div>
        <h3 style={{ margin: "0 0 16px 0" }}>Pages</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { path: "/", name: "Home" },
            { path: "/about", name: "About" },
            { path: "/contact", name: "Contact" },
            { path: "/services", name: "Services" },
            { path: "/corporate-solutions", name: "Corporate Solutions" },
            { path: "/hospital-solutions", name: "Hospital Solutions" },
          ].map((page) => (
            <button
              key={page.path}
              onClick={() => setCurrentPage(page.path)}
              style={{
                padding: "8px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: 6,
                background: currentPage === page.path ? "#3b82f6" : "#fff",
                color: currentPage === page.path ? "#fff" : "#374151",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              {page.name}
            </button>
          ))}
        </div>
        {/* Instructions */}
        <div
          style={{
            marginTop: 24,
            padding: 12,
            background: "#fff",
            borderRadius: 8,
            fontSize: 12,
            color: "#64748b",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 8 }}>How to use:</div>
          <div style={{ marginBottom: 4 }}>• Click to select elements</div>
          <div style={{ marginBottom: 4 }}>• Double-click text to edit</div>
          <div>• Use inspector to change styles</div>
        </div>
      </div>

      {/* Center - Preview Canvas */}
      <div style={{ position: "relative", background: "#fff" }}>
        <iframe
          ref={iframeRef}
          title="preview"
          src={previewUrl}
          style={{ width: "100%", height: "100%", border: "none" }}
          sandbox="allow-scripts allow-same-origin allow-forms"
        />

        {/* Selection Overlay */}
        {rect && !isTextEditing && (
          <div
            onClick={clearSelection}
            style={{
              pointerEvents: "auto",
              position: "absolute",
              left: rect.x,
              top: rect.y,
              width: rect.width,
              height: rect.height,
              outline: "2px dashed #3b82f6",
              borderRadius: 4,
              boxShadow: "0 0 0 4px rgba(59,130,246,0.15)",
              cursor: "pointer",
            }}
          />
        )}

        {/* Text Editing Indicator */}
        {isTextEditing && rect && (
          <div
            style={{
              pointerEvents: "none",
              position: "absolute",
              left: rect.x,
              top: rect.y,
              width: rect.width,
              height: rect.height,
              // outline: "2px dashed #10b981",
              borderRadius: 4,
              boxShadow: "0 0 0 4px rgba(16,185,129,0.15)",
            }}
          />
        )}
      </div>

      {/* Right Sidebar - Inspector */}
      <div
        style={{
          background: "#f8fafc",
          borderLeft: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: 16, borderBottom: "1px solid #e2e8f0" }}>
          <h3 style={{ margin: "0 0 8px 0" }}>Inspector</h3>
          <div style={{ fontSize: 14, color: "#64748b" }}>
            {selectedId
              ? `Selected: ${selectedId}`
              : "Click an element to select it"}
          </div>
          {isTextEditing && (
            <div style={{ fontSize: 12, color: "#10b981", marginTop: 4 }}>
              ✏️ Editing text (Enter to save, Esc to cancel)
            </div>
          )}
        </div>

        {selectedId && (
          <div style={{ flex: 1, overflow: "auto" }}>
            <StyleInspector
              selectedId={selectedId}
              styles={selectedStyles} // NEW: parent supplies styles
              onRequestStyles={requestStyles} // NEW: child asks parent to request styles
              onStyleChange={applyStyles}
            />
          </div>
        )}
      </div>
    </div>
  );
}
