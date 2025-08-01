"use client";

import ProductCSS from "./Product.module.css";
import { useRouter } from "next/navigation";
import config from "../../config/config";

function Product({
  product: { productCode, productImageUrl, productName, productPrice },
}) {
  const router = useRouter();

  const onClickProductHandler = (productCode) => {
    // Elastic Beanstalk 도메인으로 페이지 이동
    const targetUrl = `${config.BASE_URL}/product/${productCode}`;
    window.location.href = targetUrl;
  };

  return (
    <div
      className={ProductCSS.productDiv}
      onClick={() => onClickProductHandler(productCode)}
    >
      <img src={productImageUrl} alt="테스트" />
      <h5>{productName}</h5>
      <h5>{productPrice}</h5>
    </div>
  );
}

export default Product;
