import jwtDecode from "jwt-decode";

const tokenKey = "token";

export const signInWithJwt = (jwt: string) => {
  localStorage.setItem(tokenKey, jwt);
};

export const signOut = () => {
  localStorage.removeItem(tokenKey);
};

export const getJwt = (): string | null => {
  return localStorage.getItem(tokenKey);
};

export const getCurrentUser = (): object | null => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (jwt) return jwtDecode(jwt);
    return null;
  } catch (error) {
    return null;
  }
};
