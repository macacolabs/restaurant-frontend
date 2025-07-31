"use client";

import { useState } from "react";
import { callReviewWriteAPI } from "../../apis/ReviewAPICalls";

function ProductReviewModal({
  memberCode,
  productCode,
  setProductReviewModal,
}) {
  const [form, setForm] = useState({
    productCode: productCode,
    memberCode: memberCode,
    reviewTitle: "",
    reviewContent: "",
  });

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickProductReviewHandler = async () => {
    console.log("[ProductReviewModal] onClickProductReviewHandler Start!!");

    try {
      const result = await callReviewWriteAPI({
        form: form,
      });

      if (result.status === 201) {
        setProductReviewModal(false);
        alert("리뷰 등록이 완료되었습니다.");
        window.location.reload();
      } else {
        alert("리뷰 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("[ProductReviewModal] Review write error:", error);
      alert("리뷰 등록에 실패했습니다.");
    }

    console.log("[ProductReviewModal] onClickProductReviewHandler End!!");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "500px",
          padding: "20px",
          textAlign: "center",
          backgroundColor: "rgb(255, 255, 255)",
          borderRadius: "10px",
          boxShadow: "0 2px 3px 0 rgba(34, 36, 38, 0.15)",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            height: "500px",
            width: "400px",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: 0,
            padding: 0,
            backgroundColor: "white",
            border: "solid 1px black",
            borderRadius: "25px",
          }}
        >
          <h1 style={{ marginBottom: "20px" }}>리뷰</h1>
          <input
            type="text"
            name="reviewTitle"
            placeholder="리뷰 제목"
            autoComplete="off"
            onChange={onChangeHandler}
            style={{
              width: "80%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
          <textarea
            placeholder="리뷰 본문"
            name="reviewContent"
            autoComplete="off"
            onChange={onChangeHandler}
            style={{
              width: "80%",
              height: "150px",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
              resize: "none",
            }}
          />
          <button
            onClick={onClickProductReviewHandler}
            style={{
              width: "80%",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            리뷰 작성하기
          </button>
          <button
            onClick={() => setProductReviewModal(false)}
            style={{
              width: "80%",
              padding: "10px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductReviewModal;
