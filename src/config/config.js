const config = {
  // 개발 환경
  development: {
    BASE_URL: "http://localhost:3000",
    API_BASE_URL: "http://localhost:8080",
  },
  // 프로덕션 환경
  production: {
    BASE_URL:
      "http://app-springboot-env.eba-dc4q3pmx.ap-northeast-2.elasticbeanstalk.com",
    API_BASE_URL:
      "http://app-springboot-env.eba-dc4q3pmx.ap-northeast-2.elasticbeanstalk.com",
  },
};

const environment = process.env.NODE_ENV || "development";

export default config[environment];
