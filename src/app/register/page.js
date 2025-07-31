"use client";

import RegisterCSS from "../../pages_old/member/Register.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { callRegisterAPI } from "../../apis/MemberAPICalls";

function Register() {
  const router = useRouter();

  // 회원가입 결과 상태 관리
  const [registerResult, setRegisterResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    memberId: "",
    memberPassword: "",
    memberName: "",
    memberEmail: "",
  });

  useEffect(() => {
    if (registerResult && registerResult.status === 201) {
      console.log("[Register] Register SUCCESS {}", registerResult);
      router.push("/login");
    }
  }, [registerResult, router]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickBackHandler = () => {
    // 돌아가기 클릭시 메인 페이지로 이동
    router.push("/");
  };

  const onClickRegisterHandler = async () => {
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
      setRegisterResult(result);
    } catch (error) {
      console.error("[Register] Register ERROR:", error);
      alert("회원가입에 실패했습니다. 입력 정보를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={RegisterCSS.backgroundDiv}>
      <div className={RegisterCSS.registerDiv}>
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
          onClick={onClickBackHandler}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}

export default Register;
