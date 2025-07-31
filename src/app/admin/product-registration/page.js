"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../../utils/tokenUtils";
import { callProductRegistAPI } from "../../../apis/ProductAPICalls";

function ProductRegistration() {
  const router = useRouter();
  const [decoded, setDecoded] = useState(null);
  const [form, setForm] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    categoryCode: "",
    productOrderable: "Y", // 기본값을 "Y"로 설정
    productStock: "0", // 기본값을 "0"으로 설정
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.productName || !form.productPrice || !form.categoryCode) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("productName", form.productName);
      formData.append("productPrice", form.productPrice);
      formData.append("productDescription", form.productDescription);
      formData.append("categoryCode", form.categoryCode);
      formData.append("productOrderable", form.productOrderable);
      formData.append("productStock", form.productStock);

      if (imageFile) {
        formData.append("productImage", imageFile);
      }

      const result = await callProductRegistAPI({ form: formData });

      console.log("[ProductRegistration] API Response:", result);
      console.log("[ProductRegistration] Status:", result.status);
      console.log("[ProductRegistration] Response data:", result.data);

      // 성공 조건을 더 포괄적으로 체크
      if (
        result.status === 201 ||
        result.status === 200 ||
        (result.data && result.data.productCode)
      ) {
        alert("상품이 성공적으로 등록되었습니다.");
        router.push("/");
      } else {
        console.error(
          "[ProductRegistration] Registration failed with status:",
          result.status
        );
        console.error("[ProductRegistration] Response:", result);
        alert("상품 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!decoded) {
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
            fontSize: "28px",
            fontWeight: "600",
            textAlign: "center",
            color: "#333",
          }}
        >
          상품 등록
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              상품명 *
            </label>
            <input
              type="text"
              name="productName"
              value={form.productName}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              가격 *
            </label>
            <input
              type="number"
              name="productPrice"
              value={form.productPrice}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              카테고리 *
            </label>
            <select
              name="categoryCode"
              value={form.categoryCode}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
              required
            >
              <option value="">카테고리 선택</option>
              <option value="1">식사</option>
              <option value="2">디저트</option>
              <option value="3">음료</option>
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              주문 가능 여부 *
            </label>
            <select
              name="productOrderable"
              value={form.productOrderable}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
              required
            >
              <option value="Y">주문 가능</option>
              <option value="N">주문 불가</option>
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              재고 수량 *
            </label>
            <input
              type="number"
              name="productStock"
              value={form.productStock}
              onChange={handleInputChange}
              min="0"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              상품 설명
            </label>
            <textarea
              name="productDescription"
              value={form.productDescription}
              onChange={handleInputChange}
              rows="4"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "16px",
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              상품 이미지
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
            }}
          >
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "14px 28px",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "16px",
                fontWeight: "500",
                minWidth: "120px",
              }}
            >
              {loading ? "등록 중..." : "상품 등록"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/")}
              style={{
                padding: "14px 28px",
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "500",
                minWidth: "120px",
              }}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductRegistration;
