const DEFAULT_API_BASE_URL = "https://ksl-database.vercel.app";

const configuredApiBaseUrl = import.meta.env.VITE_API_URL;

const resolvedApiBaseUrl = (
  configuredApiBaseUrl &&
  !configuredApiBaseUrl.includes("ksl-database-ftb1ti32h-netwe.vercel.app")
    ? configuredApiBaseUrl
    : DEFAULT_API_BASE_URL
).replace(/\/+$/, "");

export const API_BASE_URL = resolvedApiBaseUrl;
export const API_URL = `${resolvedApiBaseUrl}/api`;
export const BLOGS_API_URL = `${API_URL}/blogs`;
export const AUTH_API_URL = `${API_URL}/auth`;

export const getServerUrl = (path = "") => {
  if (!path) return resolvedApiBaseUrl;

  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  // Existing database records use the old /uploads/ path.
  // Those legacy files live in the frontend repository under server/uploads.
  if (path.startsWith("/uploads/")) {
    const filename = path.slice("/uploads/".length);
    return `https://raw.githubusercontent.com/HezronOkoth001/master--kenyan-signLanguage-/main/server/uploads/${encodeURIComponent(filename)}`;
  }

  return `${resolvedApiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};
