"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import MyPageLayout from "../../layouts/MyPageLayout";
import Profile from "../../components/member/Profile";
import Payment from "../../components/member/Payment";
import Purchase from "../../components/member/Purchase";
import Review from "../../components/member/Review";

function MyPage() {
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

  useEffect(() => {
    // 네비게이션에서 탭 변경 이벤트 수신
    const handleTabChange = (event) => {
      setActiveTab(event.detail);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mypage-tab-change", handleTabChange);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mypage-tab-change", handleTabChange);
      }
    };
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!decoded) {
    return <div>로딩 중...</div>;
  }

  return (
    <MyPageLayout>
      <div
        style={{
          width: "100%",
          maxWidth: "none",
          padding: "20px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
            color: "#000",
            fontSize: "28px",
            fontWeight: "600",
          }}
        >
          마이페이지
        </h1>

        <div
          style={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          {activeTab === "profile" && <Profile />}
          {activeTab === "payment" && <Payment />}
          {activeTab === "purchase" && <Purchase />}
          {activeTab === "review" && <div>리뷰관리 준비 중...</div>}
        </div>
      </div>
    </MyPageLayout>
  );
}

export default MyPage;
