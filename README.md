# 🛍️ SMOSCOMMERCE 패션 웹사이트

**Firebase와 Stripe를 활용한 패션 이커머스 웹 애플리케이션**

## 🌟 소개
이 프로젝트는 Firebase를 기반으로 한 서버리스 패션 쇼핑몰 웹 애플리케이션입니다. 사용자 인증, 결제 시스템, 제품 관리 등의 기능을 제공하여 사용자가 편리하게 쇼핑할 수 있는 환경을 구축하였습니다.

## 🔧 주요 기능
- **사용자 인증**: Firebase Authentication을 사용하여 이메일 및 Google 로그인을 구현
- **제품 관리**: Firestore를 이용해 제품 추가, 삭제, 조회 기능 제공
- **장바구니**: Zustand를 사용하여 장바구니 상태를 관리하고, 로컬 스토리지에 데이터를 저장하여 일관된 사용자 경험 제공
- **결제 시스템**: Stripe 결제 시스템을 Firebase Functions와 연동하여 안전한 결제 처리
- **페이지네이션 및 검색 필터**: 제품 검색 및 카테고리 필터링 기능 구현
![상품추가](https://github.com/user-attachments/assets/ab30587f-40c1-493a-9bfc-22b9849d2d4c)
![페이지네이션](https://github.com/user-attachments/assets/e602fa83-ae62-4808-b708-c7f523e74e79)
![결제](https://github.com/user-attachments/assets/a4a67420-fa3b-4c8d-903b-f00a55aa70df)

## 🛠️ 기술 스택
- **프론트엔드**: React, Zustand, Sass
- **백엔드 & 데이터베이스**: Firebase (Authentication, Firestore, Functions)
- **결제 시스템**: Stripe API
- **상태 관리**: Zustand
- **UI 라이브러리**: MUI (Material-UI)

## 🚀 배포 링크
[E-commerce 웹사이트](https://ecommerce-website-4a792.web.app/)

## 📂 프로젝트 구조
```bash
├── functions
├── public
├── src
│   ├── assets
│   ├── components
│   ├── firebase
│   ├── hoc
│   ├── hooks
│   ├── layouts
│   ├── pages
│   ├── stripe
│   ├── utils
│   └── zustand
├── App.js
├── default.scss
├── index.js
├── .firebaserc
├── .gitignore
├── firebase.json
├── README.md
├── package.json
└── package-lock.json
```

## 📦 설치 및 실행

1. **이 리포지토리 클론**
    ```bash
    git clone https://github.com/smosco/ecommerce.git
    ```

2. **의존성 설치**
    ```bash
    npm install
    ```

3. **프로젝트 실행**
    ```bash
    npm start
    ```
