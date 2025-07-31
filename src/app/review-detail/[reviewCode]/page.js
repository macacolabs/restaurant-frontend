import ReviewDetailClient from "./ReviewDetailClient";

// 정적 경로 생성을 위한 함수
export async function generateStaticParams() {
  // 정적 내보내기를 위해 샘플 경로들 반환
  // 실제 운영 시에는 API에서 모든 reviewCode를 가져와서 반환
  return [{ reviewCode: "1" }, { reviewCode: "2" }, { reviewCode: "3" }];
}

function ReviewDetail({ params }) {
  const { reviewCode } = params;
  return <ReviewDetailClient reviewCode={reviewCode} />;
}

export default ReviewDetail;
