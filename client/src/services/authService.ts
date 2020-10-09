import jwtDecode from 'jwt-decode';
import { AxiosResponse } from 'axios';
import http from './httpService';
import { SignUpInput } from '../components/auth/SignUpForm';
import { SignInInput } from '../components/auth/SignInForm';

const authCookie = 'Authentication';
const tokenKey = 'hackerChallengeToken';
const apiEndPoint = '/auth';

export const removeToken = (): void => {
  localStorage.removeItem(tokenKey);
};

export const signIn = async (account: SignInInput): Promise<void> => {
  const { data: jwt } = await http.post(`${apiEndPoint}/signin`, account);
  localStorage.setItem(tokenKey, jwt);
};

export const signUp = async (account: SignUpInput): Promise<void> => {
  const { data: jwt } = await http.post(`${apiEndPoint}/signup`, account);
  localStorage.setItem(tokenKey, jwt);
};

export const signInWithJwt = (jwt: string): void => {
  localStorage.setItem(tokenKey, jwt);
};

export const signOut = (): void => {
  removeToken();
};

export const getJwt = (): string | null => {
  return localStorage.getItem(tokenKey);
};

export const getCurrentUser = (): string | null => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (jwt) return jwtDecode<string>(jwt);
    return null;
  } catch (error) {
    return null;
  }
};

// !Should use enum AuthProvider
export const navigateToSocialProvider = ({
  provider,
  type = 'signin',
  userId,
}: {
  provider: 'github' | 'google' | 'facebook';
  type: 'signin' | 'merge';
  userId: number | undefined;
}): void => {
  window.location.href = `${process.env.REACT_APP_API_REST_URL}${apiEndPoint}/${provider}?type=${type}&userId=${userId}`;
};

export const getAuthCookie = (cookieName = authCookie): string | null => {
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

export const deleteAuthCookie = (cookieName = authCookie): void => {
  document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const checkResetPasswordToken = (
  resetPasswordToken: string
): Promise<AxiosResponse<any>> => {
  return http.get(
    `${apiEndPoint}/check-reset-password-token/${resetPasswordToken}`
  );
};

export const forgotPassword = (email: string): Promise<AxiosResponse<any>> => {
  return http.post(`${apiEndPoint}/forgot-password`, { email });
};

export const resetPassword = (
  password: string,
  resetPasswordToken: string
): Promise<AxiosResponse<any>> => {
  return http.patch(`${apiEndPoint}/reset-password`, {
    password,
    resetPasswordToken,
  });
};

export const confirmation = (
  confirmationToken: string
): Promise<AxiosResponse<any>> => {
  return http.patch(`${apiEndPoint}/confirmation`, { confirmationToken });
};
