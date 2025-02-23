# NEWS 애플리케이션

뉴스 API를 활용한 뉴스 조회 및 소셜 기능을 제공하는 웹 애플리케이션입니다.

## 📅 프로젝트 기간

2025.02.13 - 2025.02.16

## 🔗 배포 URL

[뉴스 애플리케이션 바로가기](https://news-app-one-tan-75.vercel.app/)

## 📝 기술 문서

- [Sentry 적용기](https://velog.io/@rooftop7788/Sentry)
- [Jest를 활용한 단위 테스트 적용기](https://velog.io/@rooftop7788/%EC%9C%A0%EB%8B%9B%ED%85%8C%EC%8A%A4%ED%8A%B8)

## 💡 주요 기능

### 메인 페이지

- 뉴스 API를 활용한 최신 뉴스 목록 제공
  <div>
  <img src="https://github.com/user-attachments/assets/b5be24cd-f906-47c7-93c8-f14e8c8356ca" width="600" />
  </div>

### 뉴스 상세 페이지

- 뉴스 전문 확인
- 댓글 작성, 수정, 삭제 기능
  <div>
  <img src="https://github.com/user-attachments/assets/4c1bc50d-c2bd-4d68-8a03-cd96ccb9c3e9" width="600" />
  </div>

### 사용자 인증

- 이메일 로그인
- 소셜 로그인 연동
<div style="display: flex; gap: 10px;">
<img src="https://github.com/user-attachments/assets/dec12390-2836-4319-b893-b26dcf088bc9" width="400" />
<img src="https://github.com/user-attachments/assets/0aed443b-69dd-4080-8c61-b6c7bb272b94" width="400" />
</div>

### 마이 페이지

- 프로필 이미지 수정
- 닉네임 수정
  <div>
  <img src="https://github.com/user-attachments/assets/724c810e-4e3a-4163-a17d-252747e7bdd5" width="600" />
  </div>

## 🛠 기술 스택

### Frontend

- **Framework & Language**

  - React
  - TypeScript

- **Styling**

  - Tailwind CSS

- **상태 관리 & 데이터 페칭**
  - React Context API
  - Custom Hooks
  - TanStack Query (React Query)
    - useQuery
    - useMutation
    - Optimistic Updates

### Backend as a Service

- **Supabase**
  - Authentication
  - Database
  - Real-time Subscriptions
  - Storage

### External API

- News API (뉴스 데이터 제공)

### DevOps

- Vercel (배포)
- Sentry (에러 모니터링)

### Testing

- Jest
