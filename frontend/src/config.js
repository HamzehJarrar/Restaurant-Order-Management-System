// In development: point to the separate backend dev server via VITE_API_URL.
// In production (same-server): leave VITE_API_URL unset — relative paths work automatically.
const raw = import.meta.env.VITE_API_URL ?? "";
export const API_BASE_URL = raw.replace(/\/$/, "");
