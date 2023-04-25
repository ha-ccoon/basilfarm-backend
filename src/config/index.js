import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV ?? "development";
console.log(
  `어플리케이션 서버를 다음 환경으로 시작합니다: ${process.env.NODE_ENV}`
);

const envFound = dotenv.config();
const applicationName = process.env.APPLICATION_NAME;
const port = parseInt(process.env.PORT ?? "3000");

if (envFound.error) {
  throw new AppError(
    commonErrors.configError,
    "Couldn't find .env file",
    false
  );
}

export {
  applicationName, port
};