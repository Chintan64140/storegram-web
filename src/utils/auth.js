'use client';

import Cookies from 'js-cookie';

export const PUBLISHER_TOKEN_COOKIE = 'publisherToken';
export const PUBLISHER_USER_STORAGE_KEY = 'publisherUser';

export function isPublisherUser(user) {
  return Boolean(user && user.role === 'PUBLISHER');
}

export function getStoredPublisherUser() {
  if (typeof window === 'undefined') {
    return null;
  }

  const userStr = window.localStorage.getItem(PUBLISHER_USER_STORAGE_KEY);
  if (!userStr) {
    return null;
  }

  try {
    return JSON.parse(userStr);
  } catch {
    clearPublisherSession();
    return null;
  }
}

export function setPublisherSession({ token, user }) {
  Cookies.set(PUBLISHER_TOKEN_COOKIE, token, { expires: 7 });
  window.localStorage.setItem(PUBLISHER_USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearPublisherSession() {
  Cookies.remove(PUBLISHER_TOKEN_COOKIE);

  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(PUBLISHER_USER_STORAGE_KEY);
    window.localStorage.removeItem('user');
  }
}

export function getPublisherToken() {
  return Cookies.get(PUBLISHER_TOKEN_COOKIE);
}

