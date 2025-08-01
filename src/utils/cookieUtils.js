// Cookie 유틸리티 함수들
export const setCookie = (name, value, days = 7) => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  // AWS 서브도메인 간 공유를 위한 도메인 설정
  const domain = ".amazonaws.com";

  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${expires.toUTCString()};path=/;domain=${domain};secure;samesite=none`;
};

export const getCookie = (name) => {
  if (typeof window === "undefined" || typeof document === "undefined")
    return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
};

export const deleteCookie = (name) => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const domain = ".amazonaws.com";
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${domain};`;
};

// localStorage와 Cookie 모두 지원하는 하이브리드 함수들
export const setToken = (token) => {
  // 우선 Cookie에 저장 (도메인 간 공유)
  setCookie("accessToken", token);

  // localStorage에도 저장 (같은 도메인 내 빠른 접근)
  if (typeof window !== "undefined") {
    window.localStorage.setItem("accessToken", token);
  }
};

export const getToken = () => {
  // 먼저 localStorage에서 확인 (빠름)
  if (typeof window !== "undefined") {
    const localToken = window.localStorage.getItem("accessToken");
    if (localToken) return localToken;
  }

  // localStorage에 없으면 Cookie에서 확인 (도메인 간 공유)
  return getCookie("accessToken");
};

export const removeToken = () => {
  // localStorage에서 제거
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("accessToken");
  }

  // Cookie에서도 제거
  deleteCookie("accessToken");
};
