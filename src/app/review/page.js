"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { callReviewsAPI } from "../../apis/ReviewAPICalls";

// 동적 렌더링 강제
export const dynamic = "force-dynamic";

function ReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productCode = searchParams.get("productCode");

  const [reviewList, setReviewList] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
    }
  }

  useEffect(() => {
    if (productCode) {
      fetchReviews();
    }
  }, [currentPage, productCode]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const result = await callReviewsAPI({
        productCode: productCode,
        currentPage: currentPage,
      });

      if (result.status === 200) {
        setReviewList(result.data);
        setPageInfo(result.pageInfo);
      }
    } catch (error) {
      console.error("리뷰 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const onClickTableTr = (reviewCode) => {
    router.push(`/review-detail/${reviewCode}`);
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

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "30px", fontSize: "24px", fontWeight: "600" }}>
        리뷰 목록
      </h1>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
          }}
        >
          <colgroup>
            <col width="10%" />
            <col width="50%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                번호
              </th>
              <th
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                리뷰 제목
              </th>
              <th
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                리뷰 작성일
              </th>
              <th
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                작성자
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(reviewList) && reviewList.length > 0 ? (
              reviewList.map((review) => (
                <tr
                  key={review.reviewCode}
                  onClick={() => onClickTableTr(review.reviewCode)}
                  style={{
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.parentElement.style.backgroundColor = "#f8f9fa")
                  }
                  onMouseLeave={(e) =>
                    (e.target.parentElement.style.backgroundColor = "white")
                  }
                >
                  <td style={{ padding: "12px" }}>{review.reviewCode}</td>
                  <td style={{ padding: "12px" }}>{review.reviewTitle}</td>
                  <td style={{ padding: "12px" }}>{review.reviewCreateDate}</td>
                  <td style={{ padding: "12px" }}>
                    {review.member.memberName}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  조회된 내용이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {Array.isArray(reviewList) && reviewList.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              opacity: currentPage === 1 ? 0.5 : 1,
            }}
          >
            &lt;
          </button>

          {pageNumber.map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: currentPage === num ? "orange" : "white",
                cursor: "pointer",
                margin: "0 2px",
              }}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage === pageInfo?.pageEnd || pageInfo?.total === 0
            }
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor:
                currentPage === pageInfo?.pageEnd || pageInfo?.total === 0
                  ? "not-allowed"
                  : "pointer",
              opacity:
                currentPage === pageInfo?.pageEnd || pageInfo?.total === 0
                  ? 0.5
                  : 1,
            }}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

function Review() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ReviewContent />
    </Suspense>
  );
}

export default Review;
