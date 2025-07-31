export const callSearchProductAPI = async ({ search }) => {
  console.log("[ProduceAPICalls] callSearchProductAPI Call");

  const requestURL = `/api/api/v1/products/search?s=${search}`;

  try {
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });

    const result = await response.json();
    console.log("[ProduceAPICalls] callSearchProductAPI RESULT : ", result);
    return result.data;
  } catch (error) {
    console.error("[ProduceAPICalls] callSearchProductAPI ERROR : ", error);
    throw error;
  }
};

export const callProductRegistAPI = async ({ form }) => {
  console.log("[ProduceAPICalls] callProductRegistAPI Call");

  const requestURL = `/api/api/v1/products`;

  try {
    const response = await fetch(requestURL, {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization:
          "Bearer " +
          (typeof window !== "undefined"
            ? window.localStorage.getItem("accessToken")
            : ""),
      },
      body: form,
    });

    const result = await response.json();
    console.log("[ProduceAPICalls] callProductRegistAPI RESULT : ", result);
    return result;
  } catch (error) {
    console.error("[ProduceAPICalls] callProductRegistAPI ERROR : ", error);
    throw error;
  }
};

export const callProductUpdateAPI = async ({ form }) => {
  console.log("[ProduceAPICalls] callProductUpdateAPI Call");

  const requestURL = `/api/api/v1/products`;

  try {
    const response = await fetch(requestURL, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        Authorization:
          "Bearer " +
          (typeof window !== "undefined"
            ? window.localStorage.getItem("accessToken")
            : ""),
      },
      body: form,
    });

    const result = await response.json();
    console.log("[ProduceAPICalls] callProductUpdateAPI RESULT : ", result);
    return result;
  } catch (error) {
    console.error("[ProduceAPICalls] callProductUpdateAPI ERROR : ", error);
    throw error;
  }
};

export const callProductDetailForAdminAPI = async ({ productCode }) => {
  const requestURL = `/api/api/v1/products-management/${productCode}`;

  try {
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization:
          "Bearer " +
          (typeof window !== "undefined"
            ? window.localStorage.getItem("accessToken")
            : ""),
      },
    });

    const result = await response.json();
    console.log("[ProduceAPICalls] callProductDetailAPI RESULT : ", result);

    if (result.status === 200) {
      console.log("[ProduceAPICalls] callProductDetailAPI SUCCESS");
      return result.data.data.content;
    }

    return result;
  } catch (error) {
    console.error(
      "[ProduceAPICalls] callProductDetailForAdminAPI ERROR : ",
      error
    );
    throw error;
  }
};

export const callProductDetailAPI = async ({ productCode }) => {
  const requestURL = `/api/api/v1/products/${productCode}`;

  try {
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });

    const result = await response.json();
    console.log("[ProduceAPICalls] callProductDetailAPI RESULT : ", result);

    if (result.status === 200) {
      console.log("[ProduceAPICalls] callProductDetailAPI SUCCESS");
      return result.data;
    }

    return result;
  } catch (error) {
    console.error("[ProduceAPICalls] callProductDetailAPI ERROR : ", error);
    throw error;
  }
};

export const callProductListForAdminAPI = async ({ currentPage }) => {
  let requestURL;

  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `/api/api/v1/products-management?offset=${currentPage}`;
  } else {
    requestURL = `/api/api/v1/products-management`;
  }

  console.log("[ProduceAPICalls] requestURL : ", requestURL);

  try {
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization:
          "Bearer " +
          (typeof window !== "undefined"
            ? window.localStorage.getItem("accessToken")
            : ""),
      },
    });

    const result = await response.json();

    if (result.status === 200) {
      console.log(
        "[ProduceAPICalls] callProductListForAdminAPI RESULT : ",
        result
      );
      return result.data;
    }

    return result;
  } catch (error) {
    console.error(
      "[ProduceAPICalls] callProductListForAdminAPI ERROR : ",
      error
    );
    throw error;
  }
};

export const callProductListAPI = async ({ currentPage }) => {
  let requestURL;

  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `/api/api/v1/products?offset=${currentPage}`;
  } else {
    requestURL = `/api/api/v1/products`;
  }

  console.log("[ProduceAPICalls] requestURL : ", requestURL);

  try {
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });

    const result = await response.json();

    if (result.status === 200) {
      console.log("[ProduceAPICalls] callProductAPI RESULT : ", result);
      return result.data;
    }

    return result;
  } catch (error) {
    console.error("[ProduceAPICalls] callProductListAPI ERROR : ", error);
    throw error;
  }
};

export const callProductListAboutMealAPI = async () => {
  const requestURL = `/api/api/v1/products/meals`;

  try {
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });

    const result = await response.json();

    if (result.status === 200) {
      console.log(
        "[ProduceAPICalls] callProductListAboutMeal RESULT : ",
        result
      );
      return result.data;
    }

    return result;
  } catch (error) {
    console.error(
      "[ProduceAPICalls] callProductListAboutMealAPI ERROR : ",
      error
    );
    throw error;
  }
};

export const callProductListAboutDessertAPI = async () => {
  const requestURL = `/api/api/v1/products/dessert`;

  try {
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });

    const result = await response.json();

    if (result.status === 200) {
      console.log(
        "[ProduceAPICalls] callProductListAboutDessert RESULT : ",
        result
      );
      return result.data;
    }

    return result;
  } catch (error) {
    console.error(
      "[ProduceAPICalls] callProductListAboutDessertAPI ERROR : ",
      error
    );
    throw error;
  }
};

export const callProductListAboutBeverageAPI = async () => {
  const requestURL = `/api/api/v1/products/beverage`;

  try {
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });

    const result = await response.json();

    if (result.status === 200) {
      console.log(
        "[ProduceAPICalls] callProductListAboutBeverage RESULT : ",
        result
      );
      return result.data;
    }

    return result;
  } catch (error) {
    console.error(
      "[ProduceAPICalls] callProductListAboutBeverageAPI ERROR : ",
      error
    );
    throw error;
  }
};
