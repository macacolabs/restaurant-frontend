"use client";

import Product from "../components/products/Product";
import MainCSS from "../pages_old/products/Main.module.css";
import { useEffect, useState } from "react";
import { callProductListAPI } from "../apis/ProductAPICalls";

function Main() {
  const [products, setProducts] = useState({ data: null, pageInfo: null });
  const [currentPage, setCurrentPage] = useState(1);

  const productList = products.data?.content;
  const pageInfo = products.pageInfo;

  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await callProductListAPI({
          currentPage: currentPage,
        });
        setProducts(result);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className={MainCSS.productDiv}>
        {Array.isArray(productList) &&
          productList.map((product) => (
            <Product key={product.productCode} product={product} />
          ))}
      </div>
      <div
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
          gap: "5px",
        }}
      >
        {Array.isArray(productList) && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={MainCSS.pagingBtn}
          >
            &lt;
          </button>
        )}
        {pageNumber.map((num) => (
          <li
            key={num}
            onClick={() => setCurrentPage(num)}
            style={{ listStyle: "none" }}
          >
            <button
              style={currentPage === num ? { backgroundColor: "orange" } : null}
              className={MainCSS.pagingBtn}
            >
              {num}
            </button>
          </li>
        ))}
        {Array.isArray(productList) && (
          <button
            className={MainCSS.pagingBtn}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}

export default Main;
