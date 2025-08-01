"use client";

import LoginModalCSS from "./LoginModal.module.css";
import { useState } from "react";
import { removeToken } from "../../utils/cookieUtils";
import { callLoginAPI } from "../../apis/MemberAPICalls";

function LoginModal({ setLoginModal }) {
  const [form, setForm] = useState({
    memberId: "",
    memberPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

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

  const onClickLoginHandler = async () => {
    console.log("[LoginModal] Login Process Start!!");

    if (!form.memberId || !form.memberPassword) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      // 기존 토큰 제거 (Cookie와 localStorage 모두)
      removeToken();

      const result = await callLoginAPI({ form: form });

      if (result.status === 200) {
        setLoginModal(false);
        console.log("[LoginModal] Login Process End!!");
        alert("로그인이 완료되었습니다.");
        window.location.reload();
      } else {
        alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("[LoginModal] Login ERROR:", error);
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={LoginModalCSS.modal}>
      <div className={LoginModalCSS.modalContainer}>
        <div className={LoginModalCSS.loginModalDiv}>
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
            onClick={() => setLoginModal(false)}
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
