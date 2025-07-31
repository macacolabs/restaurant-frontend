"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavCSS from "./Navbar.module.css";
import { useState, useEffect } from "react";
import { decodeJwt } from "../../utils/tokenUtils";

function Navbar() {
  const pathname = usePathname();
  const [decoded, setDecoded] = useState(null);

  // 로그인 상태 및 권한 확인
  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("accessToken")
        : null;

    if (token) {
      const temp = decodeJwt(token);
      if (temp && temp.memberRole && temp.memberRole[0]) {
        setDecoded(temp.memberRole[0].authority.authorityName);
      }
    } else {
      setDecoded(null);
    }
  }, []);

  return (
    <div className={NavCSS.NavbarDiv}>
      <ul className={NavCSS.NavlistUl}>
        <li>
          <Link
            href="/"
            className={`${NavCSS.navLink} ${
              pathname === "/" ? NavCSS.active : ""
            }`}
          >
            모든 음식
          </Link>
        </li>
        <li>
          <Link
            href="/product/meal"
            className={`${NavCSS.navLink} ${
              pathname === "/product/meal" ? NavCSS.active : ""
            }`}
          >
            식사
          </Link>
        </li>
        <li>
          <Link
            href="/product/dessert"
            className={`${NavCSS.navLink} ${
              pathname === "/product/dessert" ? NavCSS.active : ""
            }`}
          >
            디저트
          </Link>
        </li>
        <li>
          <Link
            href="/product/beverage"
            className={`${NavCSS.navLink} ${
              pathname === "/product/beverage" ? NavCSS.active : ""
            }`}
          >
            음료
          </Link>
        </li>
        {decoded === "ROLE_ADMIN" && (
          <li>
            <Link
              href="/admin/product-registration"
              className={`${NavCSS.navLink} ${
                pathname === "/admin/product-registration" ? NavCSS.active : ""
              }`}
            >
              상품등록
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
