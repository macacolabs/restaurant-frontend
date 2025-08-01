import { getToken } from "../utils/cookieUtils";

// API 서버 기본 URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const callReviewDetailAPI = async ({ reviewCode }) => {
  const requestURL = `${API_BASE_URL}/api/v1/reviews/detail/${reviewCode}`;

  try {
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });

    const result = await response.json();
    console.log("[ReviewAPICalls] callReviewDetailAPI RESULT : ", result);
    return result;
  } catch (error) {
    console.error("[ReviewAPICalls] callReviewDetailAPI ERROR : ", error);
    throw error;
  }
};

export const callReviewWriteAPI = async ({ form }) => {
  console.log("[ReviewAPICalls] callReviewWriteAPI Call");

  const requestURL = `${API_BASE_URL}/api/v1/reviews`;

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
        memberCode: form.memberCode,
        reviewTitle: form.reviewTitle,
        reviewContent: form.reviewContent,
      }),
    });

    const result = await response.json();
    console.log("[ReviewAPICalls] callReviewWriteAPI RESULT : ", result);
    return result;
  } catch (error) {
    console.error("[ReviewAPICalls] callReviewWriteAPI ERROR : ", error);
    throw error;
  }
};

export const callReviewUpdateAPI = async ({ form }) => {
  console.log("[ReviewAPICalls] callReviewUpdateAPI Call");

  const requestURL = `${API_BASE_URL}/api/v1/reviews`;

  try {
    const response = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + (getToken() || ""),
      },
      body: JSON.stringify({
        reviewCode: form.reviewCode,
        reviewTitle: form.reviewTitle,
        reviewContent: form.reviewContent,
      }),
    });

    const result = await response.json();
    console.log("[ReviewAPICalls] callReviewUpdateAPI RESULT : ", result);
    return result;
  } catch (error) {
    console.error("[ReviewAPICalls] callReviewUpdateAPI ERROR : ", error);
    throw error;
  }
};

export const callReviewsAPI = async ({ productCode, currentPage }) => {
  console.log("[ReviewAPICalls] callReviewsAPI Call");

  const requestURL = `${API_BASE_URL}/api/v1/reviews/product/${productCode}?offset=${currentPage}`;

  try {
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });

    const result = await response.json();
    console.log("[ReviewAPICalls] callReviewsAPI RESULT : ", result);

    if (result.status === 200) {
      console.log("[ReviewAPICalls] callReviewsAPI SUCCESS");
      return result.data;
    }

    return result;
  } catch (error) {
    console.error("[ReviewAPICalls] callReviewsAPI ERROR : ", error);
    throw error;
  }
};
