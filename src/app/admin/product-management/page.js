"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../../utils/tokenUtils";
import { callProductListForAdminAPI } from "../../../apis/ProductAPICalls";

function ProductManagement() {
  const router = useRouter();
  const [decoded, setDecoded] = useState(null);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

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
    if (decoded) {
      fetchProductList();
    }
  }, [decoded, currentPage]);

  const fetchProductList = async () => {
    try {
      setLoading(true);
      const result = await callProductListForAdminAPI({ currentPage });
      if (result && result.content) {
        setProductList(result.content);
      }
    } catch (error) {
      console.error("상품 목록 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductUpdate = (productCode) => {
    router.push(`/admin/product-update/${productCode}`);
  };

  if (!decoded) {
    return <div>로딩 중...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "30px", fontSize: "28px", fontWeight: "600" }}>
        상품 관리
      </h1>

      <button
        onClick={() => router.push("/admin/product-registration")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        상품 등록
      </button>

      {loading ? (
        <div>상품 목록을 불러오는 중...</div>
      ) : (
        <div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  상품 코드
                </th>
                <th
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  상품명
                </th>
                <th
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  가격
                </th>
                <th
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  카테고리
                </th>
                <th
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  관리
                </th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr key={product.productCode}>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {product.productCode}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {product.productName}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {product.productPrice?.toLocaleString()}원
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {product.category?.categoryName}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    <button
                      onClick={() => handleProductUpdate(product.productCode)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      수정
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductManagement;
