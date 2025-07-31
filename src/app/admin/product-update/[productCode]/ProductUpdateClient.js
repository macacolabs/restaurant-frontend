"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../../../utils/tokenUtils";
import {
  callProductDetailForAdminAPI,
  callProductUpdateAPI,
} from "../../../../apis/ProductAPICalls";

function ProductUpdateClient({ productCode }) {
  const router = useRouter();
  const [decoded, setDecoded] = useState(null);
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    categoryCode: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

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
    if (decoded && productCode) {
      fetchProductDetail();
    }
  }, [decoded, productCode]);

  const fetchProductDetail = async () => {
    try {
      const result = await callProductDetailForAdminAPI({ productCode });
      setProduct(result);
      setForm({
        productName: result.productName || "",
        productPrice: result.productPrice || "",
        productDescription: result.productDescription || "",
        categoryCode: result.category?.categoryCode || "",
      });
    } catch (error) {
      console.error("상품 상세 조회 실패:", error);
      alert("상품 정보를 불러오는데 실패했습니다.");
    } finally {
      setInitialLoading(false);
    }
  };

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
      formData.append("productCode", productCode);
      formData.append("productName", form.productName);
      formData.append("productPrice", form.productPrice);
      formData.append("productDescription", form.productDescription);
      formData.append("categoryCode", form.categoryCode);

      if (imageFile) {
        formData.append("productImage", imageFile);
      }

      const result = await callProductUpdateAPI({ form: formData });

      if (result.status === 200) {
        alert("상품이 성공적으로 수정되었습니다.");
        router.push("/admin/product-management");
      } else {
        alert("상품 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("상품 수정 실패:", error);
      alert("상품 수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!decoded || initialLoading) {
    return <div>로딩 중...</div>;
  }

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "30px", fontSize: "28px", fontWeight: "600" }}>
        상품 수정
      </h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}
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
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}
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
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}
          >
            카테고리 *
          </label>
          <select
            name="categoryCode"
            value={form.categoryCode}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
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
            style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}
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
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              resize: "vertical",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}
          >
            상품 이미지
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 24px",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {loading ? "수정 중..." : "상품 수정"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/product-management")}
            style={{
              padding: "12px 24px",
              backgroundColor: "#6c757d",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductUpdateClient;
