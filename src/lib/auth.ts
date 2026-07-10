const AUTH_KEY = "dammapeta_admin";

export function login(username: string, password: string): boolean {
  if (username === "admin" && password === "admin123") {
    sessionStorage.setItem(AUTH_KEY, "true");
    return true;
  }

  return false;
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isLoggedIn() {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}
