// API 서버 기본 URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const callGetMemberAPI = async ({ memberId }) => {
  const requestURL = `${API_BASE_URL}/api/v1/members/${memberId}`;

  try {
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization:
          "Bearer " +
          (typeof window !== "undefined"
            ? window.localStorage.getItem("accessToken")
            : ""),
      },
    });

    const result = await response.json();
    console.log("[MemberAPICalls] callGetMemberAPI RESULT : ", result);
    return result;
  } catch (error) {
    console.error("[MemberAPICalls] callGetMemberAPI ERROR : ", error);
    throw error;
  }
};

export const callLoginAPI = async ({ form }) => {
  const requestURL = `${API_BASE_URL}/auth/login`;

  // form 객체 검증
  if (!form || !form.memberId || !form.memberPassword) {
    throw new Error("로그인 정보가 올바르지 않습니다.");
  }

  const requestBody = {
    memberId: form.memberId,
    memberPassword: form.memberPassword,
  };

  console.log("[MemberAPICalls] callLoginAPI REQUEST URL : ", requestURL);
  console.log("[MemberAPICalls] callLoginAPI REQUEST BODY : ", requestBody);

  try {
    const response = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log(
      "[MemberAPICalls] callLoginAPI RESPONSE STATUS : ",
      response.status
    );
    console.log("[MemberAPICalls] callLoginAPI RESPONSE OK : ", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "[MemberAPICalls] callLoginAPI ERROR RESPONSE : ",
        errorText
      );
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const result = await response.json();
    console.log("[MemberAPICalls] callLoginAPI RESULT : ", result);

    if (
      result.status === 200 &&
      result.userInfo &&
      result.userInfo.accessToken
    ) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("accessToken", result.userInfo.accessToken);
        console.log(
          "[MemberAPICalls] callLoginAPI TOKEN SAVED : ",
          result.userInfo.accessToken
        );
      }
    } else {
      console.warn(
        "[MemberAPICalls] callLoginAPI NO TOKEN IN RESPONSE : ",
        result
      );
    }

    return result;
  } catch (error) {
    console.error("[MemberAPICalls] callLoginAPI ERROR : ", error);
    throw error;
  }
};

export const callLogoutAPI = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("accessToken");
  }
  console.log("[MemberAPICalls] callLogoutAPI RESULT : SUCCESS");
  return { status: 200, message: "로그아웃 성공" };
};

export const callRegisterAPI = async ({ form }) => {
  const requestURL = `${API_BASE_URL}/auth/signup`;

  // form 객체 검증
  if (
    !form ||
    !form.memberId ||
    !form.memberPassword ||
    !form.memberName ||
    !form.memberEmail
  ) {
    throw new Error("회원가입 정보가 올바르지 않습니다.");
  }

  const requestBody = {
    memberId: form.memberId,
    memberPassword: form.memberPassword,
    memberName: form.memberName,
    memberEmail: form.memberEmail,
  };

  console.log("[MemberAPICalls] callRegisterAPI REQUEST BODY : ", requestBody);

  try {
    const response = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("[MemberAPICalls] callRegisterAPI RESULT : ", result);

    if (result.status === 201) {
      return result;
    }

    return result;
  } catch (error) {
    console.error("[MemberAPICalls] callRegisterAPI ERROR : ", error);
    throw error;
  }
};
