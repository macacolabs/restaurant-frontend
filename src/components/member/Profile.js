"use client";

import { useState, useEffect } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { callGetMemberAPI } from "../../apis/MemberAPICalls";

function Profile() {
  const [memberDetail, setMemberDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberDetail = async () => {
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

        console.log("[Profile] Fetching member detail for memberId:", decodedToken.sub);

        const result = await callGetMemberAPI({
          memberId: decodedToken.sub,
        });
        console.log("[Profile] API result:", result);

        if (result.status === 200) {
          console.log("[Profile] Setting member detail:", result.data);
          setMemberDetail(result.data);
        } else {
          console.error("[Profile] API returned non-200 status:", result.status);
          setError(`회원 정보 조회에 실패했습니다. (${result.status})`);
        }
      } catch (error) {
        console.error("[Profile] Fetch error:", error);
        setError(`회원 정보를 불러오는데 실패했습니다: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberDetail();
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
        <div>회원 정보를 불러오는 중...</div>
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
        내 정보
      </h2>

      {memberDetail && (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
              아이디
            </label>
            <input
              type="text"
              value={memberDetail.memberId || ""}
              readOnly
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "16px",
                backgroundColor: "#f8f9fa",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
              이름
            </label>
            <input
              type="text"
              value={memberDetail.memberName || ""}
              readOnly
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "16px",
                backgroundColor: "#f8f9fa",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
              이메일
            </label>
            <input
              type="text"
              value={memberDetail.memberEmail || ""}
              readOnly
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "16px",
                backgroundColor: "#f8f9fa",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
