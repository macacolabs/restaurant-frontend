"use client";

import ProductCSS from "./Product.module.css";
import { useRouter } from "next/navigation";

function Product({
  product: { productCode, productImageUrl, productName, productPrice },
}) {
  const router = useRouter();

  const onClickProductHandler = (productCode) => {
    router.push(`/product/${productCode}`);
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
