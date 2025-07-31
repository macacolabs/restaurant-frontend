"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { callPurchaseAPI } from "../../apis/PurchaseAPICalls";

// 동적 렌더링 강제
export const dynamic = "force-dynamic";

function PurchaseContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const productCode = searchParams.get("productCode");

  const [product, setProduct] = useState({});
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 폼 데이터 한번에 변경 및 State에 저장
  const [form, setForm] = useState({
    productCode: parseInt(productCode) || 0,
    orderMemberId: "",
    orderPhone: "",
    orderEmail: "",
    orderReceiver: "",
    orderAddress: "",
    orderAmount: parseInt(amount) || 1,
  });

  useEffect(() => {
    const tokenData = decodeJwt(localStorage.getItem("accessToken"));
    setToken(tokenData);

    if (tokenData) {
      setForm((prev) => ({
        ...prev,
        orderMemberId: tokenData.sub || "",
      }));
    }

    // 상품 정보 가져오기 (임시로 하드코딩, 실제로는 API 호출 필요)
    setProduct({
      productCode: parseInt(productCode) || 0,
      productName: "상품명",
      productPrice: 10000,
    });

    setLoading(false);
  }, [productCode]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!product || !product.productCode) {
    alert("잘못된 접근입니다");
    router.push("/");
    return null;
  }

  const onClickPurchaseHandler = async () => {
    console.log("[Purchase] Purchase event Started!!");
    console.log("form", form);

    if (
      form.orderPhone === "" ||
      form.orderEmail === "" ||
      form.orderReceiver === "" ||
      form.orderAddress === ""
    ) {
      alert("정보를 다 입력해주세요.");
      return;
    }

    try {
      const result = await callPurchaseAPI({ form: form });

      if (result.status === 200) {
        alert("결제 정보 페이지로 이동합니다.");
        router.push("/mypage/payment");
      } else {
        alert("구매 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("구매 처리 실패:", error);
      alert("구매 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          marginTop: "10px",
          width: "350px",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3
          style={{
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          주문자 정보
        </h3>
        <input
          name="orderMemberId"
          placeholder="주문자 아이디"
          autoComplete="off"
          onChange={onChangeHandler}
          value={token?.sub || ""}
          style={{
            marginTop: "5px",
            marginBottom: "5px",
            height: "20px",
            width: "80%",
            borderRadius: "25px",
            backgroundColor: "white",
            fontWeight: "bold",
            textIndent: "1em",
            border: "1px solid #ddd",
          }}
        />
        <input
          name="orderPhone"
          placeholder="핸드폰번호"
          autoComplete="off"
          onChange={onChangeHandler}
          style={{
            marginTop: "5px",
            marginBottom: "5px",
            height: "20px",
            width: "80%",
            borderRadius: "25px",
            backgroundColor: "white",
            fontWeight: "bold",
            textIndent: "1em",
            border: "1px solid #ddd",
          }}
        />
        <input
          placeholder="이메일주소"
          name="orderEmail"
          autoComplete="off"
          onChange={onChangeHandler}
          style={{
            marginTop: "5px",
            marginBottom: "5px",
            height: "20px",
            width: "80%",
            borderRadius: "25px",
            backgroundColor: "white",
            fontWeight: "bold",
            textIndent: "1em",
            border: "1px solid #ddd",
          }}
        />
        <h3
          style={{
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          배송 정보
        </h3>
        <input
          placeholder="받는사람"
          name="orderReceiver"
          autoComplete="off"
          onChange={onChangeHandler}
          style={{
            marginTop: "5px",
            marginBottom: "5px",
            height: "20px",
            width: "80%",
            borderRadius: "25px",
            backgroundColor: "white",
            fontWeight: "bold",
            textIndent: "1em",
            border: "1px solid #ddd",
          }}
        />
        <input
          placeholder="배송정보"
          name="orderAddress"
          autoComplete="off"
          onChange={onChangeHandler}
          style={{
            marginTop: "5px",
            marginBottom: "5px",
            height: "20px",
            width: "80%",
            borderRadius: "25px",
            backgroundColor: "white",
            fontWeight: "bold",
            textIndent: "1em",
            border: "1px solid #ddd",
          }}
        />
      </div>
      <div
        style={{
          marginTop: "10px",
          width: "350px",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3
          style={{
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          결제 정보
        </h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <colgroup>
            <col width="25%" />
            <col width="75%" />
          </colgroup>
          <tbody>
            <tr>
              <th
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  backgroundColor: "#f8f9fa",
                }}
              >
                상품명
              </th>
              <td
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                }}
              >
                {product.productName}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  backgroundColor: "#f8f9fa",
                }}
              >
                상품갯수
              </th>
              <td
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                }}
              >
                {amount}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  backgroundColor: "#f8f9fa",
                }}
              >
                결제금액
              </th>
              <td
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                }}
              >
                {amount * product.productPrice}
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                <button
                  onClick={onClickPurchaseHandler}
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    height: "30px",
                    width: "250px",
                    borderRadius: "25px",
                    backgroundColor: "white",
                    fontWeight: "bold",
                    border: "1px solid #ddd",
                    cursor: "pointer",
                  }}
                >
                  구매하기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Purchase() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PurchaseContent />
    </Suspense>
  );
}

export default Purchase;
