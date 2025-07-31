# React Project

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── login/             # 로그인 페이지
│   ├── register/          # 회원가입 페이지
│   ├── search/            # 검색 페이지
│   ├── product/           # 상품 관련 페이지
│   │   ├── meal/          # 식사 카테고리
│   │   ├── dessert/       # 디저트 카테고리
│   │   ├── beverage/      # 음료 카테고리
│   │   └── [productCode]/ # 상품 상세 페이지
│   ├── layout.js          # 루트 레이아웃
│   └── page.js            # 메인 페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── common/           # 공통 컴포넌트
│   └── products/         # 상품 관련 컴포넌트
├── apis/                 # API 호출 함수들
├── pages/                # 기존 페이지 스타일 파일들
├── layouts/              # 레이아웃 스타일
└── utils/                # 유틸리티 함수들
```

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```
NEXT_PUBLIC_RESTAPI_IP=localhost
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 빌드 및 프로덕션 실행

```bash
npm run build
npm start
```

### ✅ 완료된 기능

- [x] 메인 페이지 (상품 목록)
- [x] 로그인/회원가입
- [x] 상품 상세 페이지
- [x] 카테고리별 상품 목록 (식사, 디저트, 음료)
- [x] 상품 검색
- [x] 헤더, 네비게이션, 푸터
- [x] 로그인 모달
- [x] API 호출 함수들

### 📝 추가 작업 필요

- [ ] 마이페이지 관련 페이지들
- [ ] 구매 관련 페이지들
- [ ] 리뷰 관련 페이지들
- [ ] 관리자 페이지들
- [ ] 에러 페이지

## 기술 스택

- **프레임워크**: Next.js 15.4.4
- **언어**: JavaScript
- **스타일링**: CSS Modules
- **상태 관리**: React Hooks
- **API**: Fetch API
- **인증**: JWT (localStorage)
