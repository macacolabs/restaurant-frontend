"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { decodeJwt } from "../../../utils/tokenUtils";
import {
  callReviewDetailAPI,
  callReviewUpdateAPI,
} from "../../../apis/ReviewAPICalls";

function ReviewDetail() {
  const router = useRouter();
  const params = useParams();
  const reviewCode = params.reviewCode;

  const [reviewDetail, setReviewDetail] = useState(null);
  const [modifyMode, setModifyMode] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = decodeJwt(token);
      setDecoded(decodedToken);
    }
    fetchReviewDetail();
  }, [reviewCode]);

  const fetchReviewDetail = async () => {
    try {
      setLoading(true);
      const result = await callReviewDetailAPI({ reviewCode: reviewCode });
      if (result.status === 200) {
        setReviewDetail(result.data);
      }
    } catch (error) {
      console.error("리뷰 상세 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickModifyModeHandler = () => {
    setModifyMode(true);
    setForm({
      reviewCode: reviewDetail.reviewCode,
      reviewTitle: reviewDetail.reviewTitle,
      reviewContent: reviewDetail.reviewContent,
    });
  };

  const onClickReviewUpdateHandler = async () => {
    try {
      const result = await callReviewUpdateAPI({ form: form });
      if (result.status === 200) {
        alert("리뷰가 수정되었습니다.");
        router.push(`/review?productCode=${reviewDetail.productCode}`);
      }
    } catch (error) {
      console.error("리뷰 수정 실패:", error);
      alert("리뷰 수정에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>로딩 중...</div>
      </div>
    );
  }

  if (!reviewDetail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>리뷰를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "30px", fontSize: "24px", fontWeight: "600" }}>
        리뷰 상세
      </h1>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <colgroup>
            <col width="20%" />
            <col width="80%" />
          </colgroup>
          <tbody>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <th
                style={{
                  padding: "15px",
                  backgroundColor: "#f8f9fa",
                  textAlign: "left",
                  borderRight: "1px solid #eee",
                }}
              >
                제목
              </th>
              <td style={{ padding: "15px" }}>
                <input
                  name="reviewTitle"
                  placeholder="제목"
                  readOnly={!modifyMode}
                  onChange={onChangeHandler}
                  value={
                    !modifyMode
                      ? reviewDetail.reviewTitle
                      : form.reviewTitle || ""
                  }
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "16px",
                    backgroundColor: !modifyMode ? "#f8f9fa" : "white",
                    boxSizing: "border-box",
                  }}
                />
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <th
                style={{
                  padding: "15px",
                  backgroundColor: "#f8f9fa",
                  textAlign: "left",
                  borderRight: "1px solid #eee",
                }}
              >
                작성자
              </th>
              <td style={{ padding: "15px" }}>
                <input
                  placeholder="작성자"
                  readOnly={true}
                  value={
                    (reviewDetail.member && reviewDetail.member.memberName) ||
                    ""
                  }
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "16px",
                    backgroundColor: "#f8f9fa",
                    boxSizing: "border-box",
                  }}
                />
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <th
                style={{
                  padding: "15px",
                  backgroundColor: "#f8f9fa",
                  textAlign: "left",
                  borderRight: "1px solid #eee",
                }}
              >
                작성일
              </th>
              <td style={{ padding: "15px" }}>
                <input
                  placeholder="작성일"
                  readOnly={true}
                  value={reviewDetail.reviewCreateDate || ""}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "16px",
                    backgroundColor: "#f8f9fa",
                    boxSizing: "border-box",
                  }}
                />
              </td>
            </tr>
            <tr>
              <th
                style={{
                  padding: "15px",
                  backgroundColor: "#f8f9fa",
                  textAlign: "left",
                  borderRight: "1px solid #eee",
                  verticalAlign: "top",
                }}
              >
                내용
              </th>
              <td style={{ padding: "15px" }}>
                <textarea
                  name="reviewContent"
                  placeholder="내용"
                  readOnly={!modifyMode}
                  onChange={onChangeHandler}
                  value={
                    !modifyMode
                      ? reviewDetail.reviewContent
                      : form.reviewContent || ""
                  }
                  style={{
                    width: "100%",
                    minHeight: "200px",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "16px",
                    backgroundColor: !modifyMode ? "#f8f9fa" : "white",
                    boxSizing: "border-box",
                    resize: "vertical",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {decoded && decoded.memberCode === reviewDetail.member?.memberCode && (
          <>
            {!modifyMode ? (
              <button
                onClick={onClickModifyModeHandler}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                수정
              </button>
            ) : (
              <button
                onClick={onClickReviewUpdateHandler}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                저장
              </button>
            )}
          </>
        )}

        <button
          onClick={() =>
            router.push(`/review?productCode=${reviewDetail.productCode}`)
          }
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          목록으로
        </button>
      </div>
    </div>
  );
}

export default ReviewDetail;
