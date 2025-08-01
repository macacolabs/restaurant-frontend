import ProductDetailClient from "./ProductDetailClient";

// 정적 경로 생성을 위한 함수
export async function generateStaticParams() {
  try {
    // 실제 API에서 모든 상품 목록을 가져와서 정적 경로 생성
    const response = await fetch(
      "http://app-springboot-env.eba-dc4q3pmx.ap-northeast-2.elasticbeanstalk.com/api/product?page=1&amount=100"
    );
    const data = await response.json();

    if (data && data.content) {
      return data.content.map((product) => ({
        productCode: product.productCode.toString(),
      }));
    }
  } catch (error) {
    console.error("Failed to fetch products for static generation:", error);
  }

  // API 호출 실패 시 더 많은 기본 경로들 반환 (1~100번까지)
  const staticParams = [];
  for (let i = 1; i <= 100; i++) {
    staticParams.push({ productCode: i.toString() });
  }
  return staticParams;
}

function ProductDetail({ params }) {
  return <ProductDetailClient productCode={params.productCode} />;
}

export default ProductDetail;
