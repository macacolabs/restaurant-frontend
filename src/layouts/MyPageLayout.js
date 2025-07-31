"use client";

import MyPageNavbar from "../components/common/MyPageNavbar";
import MyPageLayoutCSS from "./MyPageLayout.module.css";

function MyPageLayout({ children }) {
  return (
    <div className={MyPageLayoutCSS.MyPageLayoutDiv}>
      <MyPageNavbar />
      <div className={MyPageLayoutCSS.MyPageContentDiv}>{children}</div>
    </div>
  );
}

export default MyPageLayout;
