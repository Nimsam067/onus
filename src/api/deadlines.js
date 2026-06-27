const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const MOCK_DEADLINES = [
  { id: 1, title: "Project Proposal", date: "2025-05-15" },
  { id: 2, title: "Live circuit demo", date: "2025-05-24" },
  { id: 3, title: "Final report submission", date: "2025-06-07" },
];

// Flip this to false once the real backend/deadlines endpoint is ready
const USE_MOCK = false;

export async function getDeadlines() {
  if (USE_MOCK) return MOCK_DEADLINES;
  const res = await fetch(`${API_URL}/api/deadlines`);
  if (!res.ok) throw new Error("Failed to fetch deadlines");
  return res.json();
}
