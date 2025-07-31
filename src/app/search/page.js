"use client";

import MainCSS from "../../pages_old/products/Main.module.css";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Product from "../../components/products/Product";
import { callSearchProductAPI } from "../../apis/ProductAPICalls";

// 동적 렌더링 강제
export const dynamic = "force-dynamic";

function SearchContent() {
  const searchParams = useSearchParams();
  const value = searchParams.get("value");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (value) {
        try {
          const result = await callSearchProductAPI({
            search: value,
          });
          setProducts(result || []);
        } catch (error) {
          console.error("Search failed:", error);
          setProducts([]);
        }
      }
    };

    fetchSearchResults();
  }, [value]);

  return (
    <div className={MainCSS.productDiv}>
      {products.length > 0 &&
        products.map((product) => (
          <Product key={product.productCode} product={product} />
        ))}
    </div>
  );
}

function Search() {
  return (
    <Suspense fallback={<div>검색 중...</div>}>
      <SearchContent />
    </Suspense>
  );
}

export default Search;
