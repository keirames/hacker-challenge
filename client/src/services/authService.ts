import jwtDecode from "jwt-decode";

const tokenKey = "token";

export const loginWithJwt = (jwt: string) => {
  localStorage.setItem(tokenKey, jwt);
};

export const logout = () => {
  localStorage.removeItem(tokenKey);
};

export const getCurrentUser = (): any => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (jwt) return jwtDecode(jwt);
    return null;
  } catch (error) {
    return null;
  }
};
