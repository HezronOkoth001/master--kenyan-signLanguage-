const DEFAULT_API_BASE_URL = "https://ksl-database.vercel.app";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || DEFAULT_API_BASE_URL
).replace(/\/+$/, "");

export const API_BASE_URL = API_BASE_URL;
export const API_URL = `${API_BASE_URL}/api`;
export const BLOGS_API_URL = `${API_URL}/blogs`;
export const AUTH_API_URL = `${API_URL}/auth`;

export const getServerUrl = (path = "") => {
  if (!path) return API_BASE_URL;

  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
