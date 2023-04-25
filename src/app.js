import express from "express";
import { port } from "./config/index.js";
import apiRouter from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);

//정적 경로 설정
app.use("/static", express.static("uploads"));

app.get("/", (req, res)=>{
  res.json({message: "바질팜 테스트"});
});

app.listen(port, () => {
  console.log(`🚀 서버가 포트 ${port}에서 운영중입니다.`);
});
