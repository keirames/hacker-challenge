import jwtDecode from 'jwt-decode';

const tokenKey = 'token';

export const signInWithJwt = (jwt: string): void => {
  localStorage.setItem(tokenKey, jwt);
};

export const signOut = (): void => {
  localStorage.removeItem(tokenKey);
};

export const getJwt = (): string | null => {
  return localStorage.getItem(tokenKey);
};

export const getCurrentUser = (): unknown => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (jwt) return jwtDecode(jwt);
    return null;
  } catch (error) {
    return null;
  }
};

export const navigateToSocialProvider = (provider: string): void => {
  window.location.href = `http://localhost:3000/auth/${provider}`;
};

export const getCookie = (cookieName: string): string | null => {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArr = decodedCookie.split(';');
  for (const cookie of cookieArr) {
    let c = cookie;
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};

export const deleteCookie = (cookieName: string): void => {
  document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};
