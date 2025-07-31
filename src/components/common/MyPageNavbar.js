"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import MyPageNavbarCSS from "./MyPageNavbar.module.css";

function MyPageNavbar() {
  const router = useRouter();
  const [decoded, setDecoded] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    // 로그인 상태 확인
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("accessToken")
        : null;

    if (!token) {
      alert("로그인이 필요합니다.");
      router.push("/");
      return;
    }

    const temp = decodeJwt(token);
    if (temp && temp.exp * 1000 < Date.now()) {
      alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("accessToken");
      }
      router.push("/");
      return;
    }

    setDecoded(temp);
  }, [router]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // 부모 컴포넌트에 탭 변경 알림
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("mypage-tab-change", { detail: tab })
      );
    }
  };

  if (!decoded) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={MyPageNavbarCSS.MyPageNavbarDiv}>
      <div className={MyPageNavbarCSS.MyPageNavbarTitle}>
        <h2>마이페이지</h2>
      </div>
      <nav className={MyPageNavbarCSS.MyPageNavbarNav}>
        <ul className={MyPageNavbarCSS.MyPageNavbarUl}>
          <li>
            <button
              onClick={() => handleTabChange("profile")}
              className={`${MyPageNavbarCSS.MyPageNavbarLink} ${
                activeTab === "profile" ? MyPageNavbarCSS.active : ""
              }`}
              style={{
                background: "none",
                border: "none",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
                padding: "10px 15px",
                fontSize: "16px",
              }}
            >
              프로필
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange("payment")}
              className={`${MyPageNavbarCSS.MyPageNavbarLink} ${
                activeTab === "payment" ? MyPageNavbarCSS.active : ""
              }`}
              style={{
                background: "none",
                border: "none",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
                padding: "10px 15px",
                fontSize: "16px",
              }}
            >
              결제 내역
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange("purchase")}
              className={`${MyPageNavbarCSS.MyPageNavbarLink} ${
                activeTab === "purchase" ? MyPageNavbarCSS.active : ""
              }`}
              style={{
                background: "none",
                border: "none",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
                padding: "10px 15px",
                fontSize: "16px",
              }}
            >
              구매 내역
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange("review")}
              className={`${MyPageNavbarCSS.MyPageNavbarLink} ${
                activeTab === "review" ? MyPageNavbarCSS.active : ""
              }`}
              style={{
                background: "none",
                border: "none",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
                padding: "10px 15px",
                fontSize: "16px",
              }}
            >
              리뷰 관리
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MyPageNavbar;
