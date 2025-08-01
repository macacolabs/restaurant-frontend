import { getToken } from "../utils/cookieUtils";

// API 서버 기본 URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const callPurchaseListAPI = async ({ memberId }) => {
  const requestURL = `${API_BASE_URL}/api/v1/orders/${memberId}`;

  console.log(
    "[PurchaseAPICalls] callPurchaseListAPI called with memberId:",
    memberId
  );
  console.log("[PurchaseAPICalls] Request URL:", requestURL);

  try {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("accessToken")
        : "";
    console.log("[PurchaseAPICalls] Token available:", !!token);

    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("[PurchaseAPICalls] Response status:", response.status);
    console.log("[PurchaseAPICalls] Response ok:", response.ok);

    if (!response.ok) {
      console.error(
        "[PurchaseAPICalls] Response not ok:",
        response.status,
        response.statusText
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("[PurchaseAPICalls] callPurchaseListAPI RESULT : ", result);
    return result;
  } catch (error) {
    console.error("[PurchaseAPICalls] callPurchaseListAPI ERROR : ", error);
    throw error;
  }
};

export const callPurchaseAPI = async ({ form }) => {
  console.log("[PurchaseAPICalls] callPurchaseAPI Call");

  const requestURL = `${API_BASE_URL}/api/v1/purchase`;

  try {
    const response = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + (getToken() || ""),
      },
      body: JSON.stringify({
        productCode: form.productCode,
        memberId: form.orderMemberId,
        orderPhone: form.orderPhone,
        orderEmail: form.orderEmail,
        orderReceiver: form.orderReceiver,
        orderAddress: form.orderAddress,
        orderAmount: form.orderAmount,
      }),
    });

    const result = await response.json();
    console.log("[PurchaseAPICalls] callPurchaseAPI RESULT : ", result);
    return result;
  } catch (error) {
    console.error("[PurchaseAPICalls] callPurchaseAPI ERROR : ", error);
    throw error;
  }
};
