"use client";

import LoginCSS from "../../pages_old/member/Login.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { callLoginAPI } from "../../apis/MemberAPICalls";

function Login() {
  const router = useRouter();

  // 로그인 상태 관리
  const [loginResult, setLoginResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 폼 데이터 한번에 변경 및 State에 저장
  const [form, setForm] = useState({
    memberId: "",
    memberPassword: "",
  });

  useEffect(() => {
    if (loginResult && loginResult.status === 200) {
      console.log("[Login] Login SUCCESS {}", loginResult);
      router.push("/");
    }
  }, [loginResult, router]);

  // 로그인 상태일 시 로그인페이지로 접근 방지
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessToken")
      : null;
  if (token) {
    console.log("[Login] Login is already authenticated by the server");
    router.push("/");
    return null;
  }

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onKeyPressHandler = (e) => {
    if (e.key === "Enter") {
      onClickLoginHandler();
    }
  };

  const onClickRegisterHandler = () => {
    router.push("/register");
  };

  // 로그인 버튼 클릭시 API 호출
  const onClickLoginHandler = async () => {
    console.log("[Login] Login attempt with form:", form);

    if (!form.memberId || !form.memberPassword) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("[Login] Calling login API...");
      const result = await callLoginAPI({ form: form });
      console.log("[Login] Login API result:", result);
      setLoginResult(result);
    } catch (error) {
      console.error("[Login] Login ERROR:", error);
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={LoginCSS.backgroundDiv}>
      <div className={LoginCSS.loginDiv}>
        <h1>로그인</h1>
        <input
          type="text"
          name="memberId"
          placeholder="아이디"
          autoComplete="off"
          value={form.memberId}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <input
          type="password"
          name="memberPassword"
          placeholder="패스워드"
          autoComplete="off"
          value={form.memberPassword}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={onClickLoginHandler} disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
        <button
          style={{
            border: "none",
            margin: 0,
            fontSize: "10px",
            height: "10px",
          }}
          onClick={onClickRegisterHandler}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Login;
