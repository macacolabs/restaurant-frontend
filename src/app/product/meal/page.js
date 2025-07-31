"use client";

import Product from "../../../components/products/Product";
import MainCSS from "../../../pages_old/products/Main.module.css";
import { useEffect, useState } from "react";
import { callProductListAboutMealAPI } from "../../../apis/ProductAPICalls";

function Meal() {
  const [mealList, setMealList] = useState([]);

  useEffect(() => {
    const fetchMealProducts = async () => {
      try {
        const result = await callProductListAboutMealAPI();
        setMealList(result || []);
      } catch (error) {
        console.error("Failed to fetch meal products:", error);
        setMealList([]);
      }
    };

    fetchMealProducts();
  }, []);

  return (
    <div className={MainCSS.productDiv}>
      {mealList.length > 0 &&
        mealList.map((meal) => (
          <Product key={meal.productCode} product={meal} />
        ))}
    </div>
  );
}

export default Meal;
