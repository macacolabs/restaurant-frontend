"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";

function AdminPage() {
  const router = useRouter();
  const [decoded, setDecoded] = useState(null);

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

  const handleNavigation = (path) => {
    router.push(path);
  };

  if (!decoded) {
    return <div>로딩 중...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "30px", fontSize: "28px", fontWeight: "600" }}>
        관리자 페이지
      </h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <button
          onClick={() => handleNavigation("/admin/product-management")}
          style={{
            padding: "15px 30px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          상품 관리
        </button>

        <button
          onClick={() => handleNavigation("/admin/product-registration")}
          style={{
            padding: "15px 30px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          상품 등록
        </button>
      </div>
    </div>
  );
}

export default AdminPage;
