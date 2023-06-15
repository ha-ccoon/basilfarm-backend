<img src="https://capsule-render.vercel.app/api?type=waving&color=50D374&height=300&section=header&text=Basil%20Farm&fontSize=90" />

## 프로젝트 설명
바질을 키우는 가장 스마트한 방법, Basil Farm </br>
바질을 좋아하시나요? 하지만 바쁜 일상 속에 바질을 키우는데 어려움이 있으신가요? </br>
그렇다면 저희 Basil Farm을 이용해 보세요! 자동 제어 시스템이 탑재된 스마트팜으로 최적의 환경에서 나만의 바질을 키워보세요! 🌿


- 기간: 2023.04 - 2023.05 (4주)
- 참여자: FE(2), BE(2), DEVICE(2)
- 엘리스 부트캠프 IoT 프로젝트 최우수상 수상 🏆

## Development Environment
### Frontend
- NextJS, Recoil, Emotion, React Hook Form, ChartJS, Axios
### Backend
- NodeJS, ExpressJS, Mosquitto (IoT)
- MySQL
### DevOps
- AWS EC2, AWS ELB, AWS Route 53, AWS ACM
- AWS RDS, AWS VCP, AWS CloudWatch
- Docker
### Tools
- Github
- Notion
- Figma

## UI
<img width="763" alt="image" src="https://github.com/ha-ccoon/basilfarm-backend/assets/86749331/880ac7fe-3f96-4eec-9d03-ba08bd57c810">

## 화면 흐름도 (Flow Chart)
![화면 흐름도](https://github.com/ha-ccoon/basilfarm-backend/assets/86749331/0778b15c-e153-4f1a-b370-bb39bec22f78)

## Infra Architecture
![인프라](https://github.com/ha-ccoon/basilfarm-backend/assets/86749331/a40ad2bb-7d86-4aa0-8be7-08e17a2e193e)

## Team: 바질농부단 (BNS)
### Frontend
#### 김정연
- 메인페이지
- 로그인
- 회원가입
- 마이페이지(유저정보 확인/디바이스 목록 확인)
#### 정수아
- 대시보드와 제어관련 페이지 레이아웃 구성
- 센서 데이터를 서버로부터 받아서 가공하여 페이지에 노출
- 제어명령을 수동과 자동으로 분리하여 서버로 명령 전송
### Backend
#### 손민하
- 프로젝트 셋팅과 문서 작업 담당
- 로그인/로그아웃 구현
- RefreshToken을 구현하여 토큰에 대한 보안 강화
- AWS 클라우드 서비스를 사용하여 HTTPS로 프로토콜 변경
- 백엔드, 프론트엔드 배포 및 관리 (Docker)
- 서버와 Mosquitto 브로커 연결 및 스마트팜 수동 제어 명령 담당
#### 이경은
- 서버, 데이터베이스 셋업
- 스마트팜 자동화 시스템 명령 담당 
### Device
#### 윤현수
- 디바이스 센서 구성 및 비즈니스 로직 작성
- 회로도 및 센서 제작
- 스마트팜 제작
#### 김태윤
- MQTT 프로토콜을 통한 서버와의 연결
- 멀티 스레드 및 클라이언트 충돌 문제 해결
- 코드 최적화
