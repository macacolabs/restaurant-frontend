import ProductUpdateClient from "./ProductUpdateClient";

// 정적 경로 생성을 위한 함수
export async function generateStaticParams() {
  // 정적 내보내기를 위해 빈 배열 반환
  // 실제 운영 시에는 모든 productCode를 미리 가져와서 반환해야 함
  return [];
}

function ProductUpdate({ params }) {
  const { productCode } = params;
  return <ProductUpdateClient productCode={productCode} />;
}

export default ProductUpdate;
