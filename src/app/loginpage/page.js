"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function LoginPageRoute() {
  const router = useRouter();

  useEffect(() => {
    // /loginpage를 /login으로 리다이렉트
    router.replace("/login");
  }, [router]);

  return <div>리다이렉트 중...</div>;
}

export default LoginPageRoute;
