"use client";

import { useState, useEffect } from "react";
import { decodeJwt } from "../../utils/tokenUtils";

function Review() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token =
          typeof window !== "undefined"
            ? window.localStorage.getItem("accessToken")
            : null;

        if (!token) {
          setError("로그인이 필요합니다.");
          setLoading(false);
          return;
        }

        const decodedToken = decodeJwt(token);
        if (!decodedToken) {
          setError("토큰이 유효하지 않습니다.");
          setLoading(false);
          return;
        }

        // TODO: 리뷰 목록 API 호출
        // 현재는 더미 데이터 사용
        setReviews([]);
        setLoading(false);
      } catch (error) {
        console.error("[Review] Fetch error:", error);
        setError(`리뷰 목록을 불러오는데 실패했습니다: ${error.message}`);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          width: "100%",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <div>리뷰 목록을 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          width: "100%",
          boxSizing: "border-box",
          textAlign: "center",
          color: "red",
        }}
      >
        <div>오류: {error}</div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "600" }}>
        리뷰 관리
      </h2>

      {reviews.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
          작성한 리뷰가 없습니다.
        </div>
      ) : (
        <div>
          {/* 리뷰 목록이 있을 때 표시할 내용 */}
          <p>리뷰 관리 기능은 준비 중입니다.</p>
        </div>
      )}
    </div>
  );
}

export default Review;
