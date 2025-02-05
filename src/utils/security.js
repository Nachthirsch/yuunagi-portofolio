import DOMPurify from "dompurify";

// CSRF Protection
const csrfTokens = new Set();

export const generateCsrfToken = () => {
  const token = Math.random().toString(36).substring(2);
  csrfTokens.add(token);
  return token;
};

export const validateCsrfToken = (token) => {
  if (!csrfTokens.has(token)) return false;
  csrfTokens.delete(token); // One-time use
  return true;
};

// Enhanced Rate limiting with IP tracking
const rateLimits = new Map();

export const checkRateLimit = (ip) => {
  const now = Date.now();
  const timeWindow = 60000; // 1 minute
  const maxRequests = 10; // max 10 requests per minute

  if (!rateLimits.has(ip)) {
    rateLimits.set(ip, { timestamp: now, count: 1 });
    return true;
  }

  const userLimit = rateLimits.get(ip);
  if (now - userLimit.timestamp > timeWindow) {
    userLimit.timestamp = now;
    userLimit.count = 1;
    return true;
  }

  userLimit.count++;
  return userLimit.count <= maxRequests;
};

// Request size limiting
export const checkRequestSize = (data, maxSize = 1000000) => {
  // 1MB limit
  const size = new TextEncoder().encode(JSON.stringify(data)).length;
  return size <= maxSize;
};

// Enhanced input validation
export const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";

  const cleaned = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });

  return cleaned
    .trim()
    .slice(0, 500)
    .replace(/[<>{}]/g, "")
    .replace(/(\r\n|\n|\r)/gm, "") // Remove line breaks
    .replace(/[^\x20-\x7E]/g, ""); // Only allow printable ASCII
};

// Enhanced content validation
export const validateContent = (content) => {
  const blockedPatterns = [/<script/i, /javascript:/i, /data:/i, /onload=/i, /onerror=/i, /onclick=/i, /eval\(/i, /alert\(/i, /document\./i, /window\./i];

  return !blockedPatterns.some((pattern) => pattern.test(content));
};

// API key validation
export const validateApiKey = (apiKey) => {
  if (!apiKey || typeof apiKey !== "string") return false;
  return /^[A-Za-z0-9-_]{32,}$/.test(apiKey);
};

// Request origin validation
export const validateOrigin = (origin) => {
  const allowedOrigins = [
    "https://handraputratama.xyz", // Ganti dengan domain portfolio Anda
    "http://localhost:5173", // Port development Vite default
    "http://localhost:3000", // Port development alternatif
  ];
  return allowedOrigins.includes(origin);
};
