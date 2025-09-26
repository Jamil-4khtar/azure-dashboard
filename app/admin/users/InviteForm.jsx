"use client";
import { useState } from "react";

export default function InviteForm() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("EDITOR");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function invite() {
    setBusy(true); setMsg("");
    const res = await fetch("/api/invite", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, role })
    }).then(r => r.json());
    setBusy(false);
    if (res?.ok) {
      setMsg("Invite sent. Check smtp4dev.");
      setEmail("");
    } else {
      setMsg(res?.error || "Failed to send invite.");
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="px-3 py-2 border rounded-lg bg-gray-900 text-white">
        + Invite
      </button>
    );
  }

  return (
    <div className="border rounded-xl p-4 shadow">
      <div className="grid gap-2 sm:grid-cols-3">
        <input className="border rounded-lg px-3 py-2" placeholder="email@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <select className="border rounded-lg px-3 py-2" value={role} onChange={e=>setRole(e.target.value)}>
          <option>EDITOR</option>
          <option>VIEWER</option>
          <option>ADMIN</option>
        </select>
        <div className="flex gap-2">
          <button disabled={busy} onClick={invite} className="flex-1 px-3 py-2 border rounded-lg bg-gray-900 text-white">
            {busy ? "Sending..." : "Send invite"}
          </button>
          <button onClick={() => setOpen(false)} className="px-3 py-2 border rounded-lg">Close</button>
        </div>
      </div>
      {msg && <div className="text-xs text-gray-700 mt-2">{msg}</div>}
    </div>
  );
}
