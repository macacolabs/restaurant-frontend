"use client";

import RegisterModalCSS from "./RegisterModal.module.css";
import { useState } from "react";

import { callRegisterAPI } from "../../apis/MemberAPICalls";

function RegisterModal({ setRegisterModal }) {
  const [form, setForm] = useState({
    memberId: "",
    memberPassword: "",
    memberName: "",
    memberEmail: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickRegisterHandler = async () => {
    console.log("[RegisterModal] Register Process Start!!");

    if (
      !form.memberId ||
      !form.memberPassword ||
      !form.memberName ||
      !form.memberEmail
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await callRegisterAPI({ form: form });

      if (result.status === 201) {
        setRegisterModal(false);
        console.log("[RegisterModal] Register Process End!!");
        alert("회원가입이 완료되었습니다.");
        window.location.reload();
      } else {
        alert("회원가입에 실패했습니다. 입력 정보를 확인해주세요.");
      }
    } catch (error) {
      console.error("[RegisterModal] Register ERROR:", error);
      alert("회원가입에 실패했습니다. 입력 정보를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={RegisterModalCSS.modal}>
      <div className={RegisterModalCSS.modalContainer}>
        <div className={RegisterModalCSS.registerModalDiv}>
          <h1>회원가입</h1>
          <input
            type="text"
            name="memberId"
            placeholder="아이디"
            autoComplete="off"
            value={form.memberId}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            name="memberPassword"
            placeholder="패스워드"
            autoComplete="off"
            value={form.memberPassword}
            onChange={onChangeHandler}
          />
          <input
            type="text"
            name="memberName"
            placeholder="이름"
            autoComplete="off"
            value={form.memberName}
            onChange={onChangeHandler}
          />
          <input
            type="text"
            name="memberEmail"
            placeholder="이메일"
            autoComplete="off"
            value={form.memberEmail}
            onChange={onChangeHandler}
          />
          <button onClick={onClickRegisterHandler} disabled={isLoading}>
            {isLoading ? "회원가입 중..." : "회원가입"}
          </button>
          <button
            style={{
              border: "none",
              margin: 0,
              fontSize: "10px",
              height: "10px",
            }}
            onClick={() => setRegisterModal(false)}
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
