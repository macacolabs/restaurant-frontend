"use client";

import { useState, useEffect } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { callPurchaseListAPI } from "../../apis/PurchaseAPICalls";
import ProductReviewModal from "../products/ProductReviewModal";

function Payment() {
  const [purchaseList, setPurchaseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productReviewModal, setProductReviewModal] = useState(false);
  const [productCode, setProductCode] = useState(0);
  const [memberCode, setMemberCode] = useState(0);

  useEffect(() => {
    const fetchPurchaseList = async () => {
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

        console.log(
          "[Payment] Fetching purchase list for memberId:",
          decodedToken.sub
        );

        const result = await callPurchaseListAPI({
          memberId: decodedToken.sub,
        });
        console.log("[Payment] API result:", result);

        if (result.status === 200) {
          console.log("[Payment] Setting purchase list:", result.data);
          setPurchaseList(result.data || []);
        } else {
          console.error(
            "[Payment] API returned non-200 status:",
            result.status
          );
          setError(`결제 내역 조회에 실패했습니다. (${result.status})`);
        }
      } catch (error) {
        console.error("[Payment] Fetch error:", error);
        setError(`결제 내역을 불러오는데 실패했습니다: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseList();
  }, []);

  const onClickReviewHandler = (productFromTable) => {
    console.log("[Payment] Review handler called with:", productFromTable);
    setProductCode(productFromTable.product.productCode);
    setMemberCode(productFromTable.orderMember);
    setProductReviewModal(true);
  };

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
        <div>결제 내역을 불러오는 중...</div>
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
    <>
      {productReviewModal && (
        <ProductReviewModal
          memberCode={memberCode}
          productCode={productCode}
          setProductReviewModal={setProductReviewModal}
        />
      )}
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
        <h2
          style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "600" }}
        >
          결제 내역
        </h2>

        {purchaseList.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            결제 내역이 없습니다.
          </div>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f8f9fa",
                  borderBottom: "2px solid #dee2e6",
                }}
              >
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  주문일자
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  주문 상품 정보
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  상품금액(수량)
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  리뷰
                </th>
              </tr>
            </thead>
            <tbody>
              {purchaseList.map((purchase) => (
                <tr
                  key={purchase.orderCode}
                  style={{ borderBottom: "1px solid #dee2e6" }}
                >
                  <td style={{ padding: "12px" }}>{purchase.orderDate}</td>
                  <td style={{ padding: "12px" }}>
                    {purchase.product.productName}
                  </td>
                  <td style={{ padding: "12px" }}>
                    {(
                      purchase.product.productPrice * purchase.orderAmount
                    ).toLocaleString()}
                    원 ({purchase.orderAmount}개)
                  </td>
                  <td style={{ padding: "12px" }}>
                    <button
                      onClick={() => onClickReviewHandler(purchase)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      리뷰 등록
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Payment;
