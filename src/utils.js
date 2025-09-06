export function verifyToken(token) {
    if (!token) return null;
    try { return JSON.parse(atob(token)); } catch(e){ return null; }
  }
  