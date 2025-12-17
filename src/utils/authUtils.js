// Decode JWT payload (base64url)
export function parseJwt(token) {
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

// Employee = Admin
export function isAdminFromToken(token) {
  const payload = parseJwt(token);
  if (!payload) return false;

  return payload.role === "Employee";
}

// Optional helper
export function isCustomerFromToken(token) {
  const payload = parseJwt(token);
  if (!payload) return false;

  return payload.role === "Customer";
}

export default {
  parseJwt,
  isAdminFromToken,
  isCustomerFromToken,
};
