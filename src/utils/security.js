import DOMPurify from "dompurify";

// Rate limiting
const rateLimit = {
  timestamp: Date.now(),
  count: 0,
  reset() {
    this.timestamp = Date.now();
    this.count = 0;
  },
};

export const checkRateLimit = () => {
  const now = Date.now();
  const timeWindow = 60000; // 1 minute
  const maxRequests = 10; // max 10 requests per minute

  if (now - rateLimit.timestamp > timeWindow) {
    rateLimit.reset();
  }

  rateLimit.count++;
  return rateLimit.count <= maxRequests;
};

// Input validation
export const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";

  // Remove any HTML/script tags
  const cleaned = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [], // No attributes allowed
  });

  // Additional custom filtering
  return cleaned
    .trim()
    .slice(0, 500) // Limit length
    .replace(/[<>{}]/g, ""); // Remove potentially dangerous characters
};

// Content validation
export const validateContent = (content) => {
  // Block common malicious patterns
  const blockedPatterns = [/<script/i, /javascript:/i, /data:/i, /onload=/i, /onerror=/i];

  return !blockedPatterns.some((pattern) => pattern.test(content));
};
