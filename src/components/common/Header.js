"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import HeaderCSS from "./Header.module.css";
import { useState, useEffect } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { callLogoutAPI } from "../../apis/MemberAPICalls";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function Header() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [search, setSearch] = useState("");
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  // 로그인 상태 확인
  const checkLoginStatus = () => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("accessToken")
        : null;
    console.log("[Header] checkLoginStatus - token:", token);
    setIsLogin(!!token);
  };

  useEffect(() => {
    // 초기 로그인 상태 확인
    checkLoginStatus();
  }, []);

  const onSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onEnterkeyHandler = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key", search);
      router.push(`/search?value=${search}`);
    }
  };

  const onClickLogoHandler = () => {
    router.push("/");
  };

  const onClickMypageHandler = () => {
    // 토큰이 만료되었을때 다시 로그인
    const token = decodeJwt(
      typeof window !== "undefined"
        ? window.localStorage.getItem("accessToken")
        : null
    );
    console.log("[Header] onClickMypageHandler token : ", token);

    if (token && token.exp * 1000 < Date.now()) {
      setLoginModal(true);
      return;
    }

    router.push("/mypage");
  };

  const onClickLogoutHandler = () => {
    // 로그아웃
    callLogoutAPI();
    setIsLogin(false);

    alert("로그아웃이 되어 메인화면으로 이동합니다.");
    router.push("/");
  };

  // 로그인 모달 닫기 핸들러
  const handleLoginModalClose = () => {
    console.log("[Header] Closing login modal");
    setLoginModal(false);
  };

  // 회원가입 모달 닫기 핸들러
  const handleRegisterModalClose = () => {
    console.log("[Header] Closing register modal");
    setRegisterModal(false);
  };

  // 로그인 모달로 전환
  const switchToLogin = () => {
    setRegisterModal(false);
    setLoginModal(true);
  };

  // 회원가입 모달로 전환
  const switchToRegister = () => {
    setLoginModal(false);
    setRegisterModal(true);
  };

  function BeforeLogin() {
    return (
      <div>
        <button
          className={HeaderCSS.HeaderBtn}
          onClick={() => setLoginModal(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "inherit",
            textDecoration: "underline",
          }}
        >
          로그인
        </button>{" "}
        |{" "}
        <button
          className={HeaderCSS.HeaderBtn}
          onClick={() => setRegisterModal(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "inherit",
            textDecoration: "underline",
          }}
        >
          회원가입
        </button>
      </div>
    );
  }

  function AfterLogin() {
    return (
      <div>
        <button className={HeaderCSS.HeaderBtn} onClick={onClickMypageHandler}>
          마이페이지
        </button>{" "}
        |{" "}
        <button className={HeaderCSS.HeaderBtn} onClick={onClickLogoutHandler}>
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <>
      {/* 로그인 모달 */}
      {loginModal && (
        <LoginModal
          setLoginModal={handleLoginModalClose}
          switchToRegister={switchToRegister}
        />
      )}

      {/* 회원가입 모달 */}
      {registerModal && (
        <RegisterModal
          setRegisterModal={handleRegisterModalClose}
          switchToLogin={switchToLogin}
        />
      )}

      <div className={HeaderCSS.HeaderDiv}>
        <button className={HeaderCSS.LogoBtn} onClick={onClickLogoHandler}>
          OHGIRAFFERS
        </button>
        <input
          className={HeaderCSS.InputStyle}
          type="text"
          placeholder="검색"
          value={search}
          onKeyUp={onEnterkeyHandler}
          onChange={onSearchChangeHandler}
        />

        {/* 로그인 상태에 따라 다른 컴포넌트 랜더링 */}
        {!isLogin ? <BeforeLogin /> : <AfterLogin />}
      </div>
    </>
  );
}

export default Header;
