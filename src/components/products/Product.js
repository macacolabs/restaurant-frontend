"use client";

import ProductCSS from "./Product.module.css";
import { useRouter } from "next/navigation";

function Product({
  product: { productCode, productImageUrl, productName, productPrice },
}) {
  const router = useRouter();

  const onClickProductHandler = (productCode) => {
    // Next.js 라우터를 사용하여 같은 도메인 내에서 이동
    router.push(`/product/${productCode}`);
  };

  return (
    <div
      className={ProductCSS.productDiv}
      onClick={() => onClickProductHandler(productCode)}
    >
      <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}${productImageUrl}`} alt="테스트" />
      <h5>{productName}</h5>
      <h5>{productPrice}</h5>
    </div>
  );
}

export default Product;
