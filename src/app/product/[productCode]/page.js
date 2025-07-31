import ProductDetailClient from "./ProductDetailClient";

// 정적 경로 생성을 위한 함수
export async function generateStaticParams() {
  // 정적 내보내기를 위해 샘플 경로들 반환
  // 실제 운영 시에는 API에서 모든 productCode를 가져와서 반환
  return [{ productCode: "1" }, { productCode: "2" }, { productCode: "3" }];
}

function ProductDetail({ params }) {
  return <ProductDetailClient productCode={params.productCode} />;
}

export default ProductDetail;
