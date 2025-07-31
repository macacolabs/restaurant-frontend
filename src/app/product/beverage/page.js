"use client";

import Product from "../../../components/products/Product";
import MainCSS from "../../../pages_old/products/Main.module.css";
import { useEffect, useState } from "react";
import { callProductListAboutBeverageAPI } from "../../../apis/ProductAPICalls";

function Beverage() {
  const [beverageList, setBeverageList] = useState([]);

  useEffect(() => {
    const fetchBeverageProducts = async () => {
      try {
        const result = await callProductListAboutBeverageAPI();
        setBeverageList(result || []);
      } catch (error) {
        console.error("Failed to fetch beverage products:", error);
        setBeverageList([]);
      }
    };

    fetchBeverageProducts();
  }, []);

  return (
    <div className={MainCSS.productDiv}>
      {beverageList.length > 0 &&
        beverageList.map((beverage) => (
          <Product key={beverage.productCode} product={beverage} />
        ))}
    </div>
  );
}

export default Beverage;
