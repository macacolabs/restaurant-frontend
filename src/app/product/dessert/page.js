"use client";

import Product from "../../../components/products/Product";
import MainCSS from "../../../pages_old/products/Main.module.css";
import { useEffect, useState } from "react";
import { callProductListAboutDessertAPI } from "../../../apis/ProductAPICalls";

function Dessert() {
  const [dessertList, setDessertList] = useState([]);

  useEffect(() => {
    const fetchDessertProducts = async () => {
      try {
        const result = await callProductListAboutDessertAPI();
        setDessertList(result || []);
      } catch (error) {
        console.error("Failed to fetch dessert products:", error);
        setDessertList([]);
      }
    };

    fetchDessertProducts();
  }, []);

  return (
    <div className={MainCSS.productDiv}>
      {dessertList.length > 0 &&
        dessertList.map((dessert) => (
          <Product key={dessert.productCode} product={dessert} />
        ))}
    </div>
  );
}

export default Dessert;
