# Pollloop Frontend

<div align="center">

동적으로 업데이트되는 설문 & QnA 플랫폼

</div>

## 📚 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [팀 소개](#-팀-소개)
- [프로젝트 산출물](#-프로젝트-산출물)
- [실행 방법](#-실행-방법)
- [Git 규칙](#-Git-규칙)
- [체인지로그](#-체인지로그)

## 📝 프로젝트 소개

Pollloop은 동적으로 업데이트되는 설문 & QnA 플랫폼입니다. 사용자는 다양한 유형의 설문을 쉽게 생성하고 관리할 수 있으며, 실시간성 소통이 가능한 애스크 보드를 운영할 수 있습니다.

### 배포
- 배포 환경: Vercel
- 배포 방법: Vercel의 자체 CI/CD 파이프라인을 통한 자동 배포
  - main 브랜치 push 시 자동 배포
  - PR 생성 시 프리뷰 배포
- 배포 주소: [https://pollloop.vercel.app/](https://pollloop.vercel.app/)

### 개발 기간

- 2024.12.18 ~ 2024.01.16 (20일)

## 🎯 주요 기능

### 폼(Form)

- 다양한 유형의 질문 템플릿 제공
  - 단답형, 장문형, 체크박스, 라디오, 드롭다운
  - 범위 선택, 별점, 이미지 선택, 숫자, 날짜, 이메일
  - 파일 업로드 (이미지, PDF, 스프레드시트)
- 임시 저장 및 발행 기능
- 폼 결과 통계 및 시각화
- 참여자 관리 및 참여 요청 메일 발송

### 애스크(Ask)

- 실시간성 질문 작성 및 관리
- 질문 좋아요 기능
- 익명/실명 선택 가능
- 공지사항 등록 및 관리
- 질문 고정 및 숨김 기능
- 종료 후 통계 제공

## 🛠 기술 스택

- Framework/Library: React + Vite
- Language: TypeScript
- State Management: Redux (Redux Toolkit)
- Styling: TailwindCSS
- Routing: React Router
- Form Management: React Hook Form + Zod
- HTTP Client: Axios
- Package Manager: pnpm

## 👥 팀 소개

### Frontend (4명)

- 김소희(팀장) - 폼 만들기, 폼 참여, 폼 미리 보기
- 이햇님 - 회원가입, 로그인, 비밀번호 찾기/재설정/변경, 프로필
- 이혜민 - 홈, 폼 상세 조회_요약 및 통계
- 최푸른 - 나의 폼, 폼 상세 조회_참여자 목록 조회/관리

## 📋 프로젝트 산출물

### 기획/설계

- [사용자 요구사항 정의서](link)
- [와이어프레임](link)
- [플로우차트](link)
- [화면 정의서](link)

### API 연동

- [API 명세서](link)

### 배포

- [배포 링크](link)
- [데모데이 발표자료](link)

## 💻 실행 방법

```bash
# 저장소 클론
git clone https://github.com/soheekimdev/Pollloop.git

# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

## 🔄 Git 규칙

### 브랜치 네이밍
- `main`: 배포용 브랜치
- `develop`: 개발용 브랜치
- `feature/*`: 기능 개발 브랜치

### 커밋 메시지
```bash
type: subject

body
```

- Type
  - feat: 새로운 기능 추가
  - fix: 버그 수정
  - docs: 문서 수정
  - style: 코드 포맷팅
  - refactor: 코드 리팩토링
  - design: CSS 등 사용자 UI 변경
  - rename: 파일/폴더명 수정 또는 위치 이동
  - test: 테스트 코드
  - chore: 빌드 업무 수정, 패키지 매니저 수정
 
예시:
```bash
feat: 로그인 기능 구현

- 이메일/비밀번호 유효성 검사 추가
- 로그인 API 연동
- 로그인 후 토큰 저장 구현
```

## ✨ 체인지로그
<details>
  <summary><strong>[1주차] 2024-12-26 ~ 2025-01-03</strong></summary>
  
  <details>  
  <summary><strong>[폼 만들기] 김소희</strong></summary>
  
  ### ✅ Done
  
  - 프로젝트 초기 환경 구성
    - React + TypeScript + Vite 기본 세팅
    - 기본 라이브러리 설치 및 설정
    - 폴더 구조 설정
    - React Router 라우팅 설정
    - Tailwind CSS 설정
    - README.md 작성
  - 공통 컴포넌트 제작 및 css 설정
    - Layout 컴포넌트 초기 구조 구현 및 라우팅 설정
    - Input, Button, Switch, Checkbox, Select, Textarea, Label, InputWithLabel, Breadcrumbs
    - 공통 css 및 tailwind.config.js 설정
    - 폰트 설정
  - 폼 만들기 UI 및 기능 구현
    - 기본 UI 레이아웃 구현
    - 질문 카드 유형 별 UI 구현
    - 질문 추가 기능 구현
  
  ### ⚙️ in Progress
  
  - 폼 만들기 기능 구현
    - 폼 데이터 전역 상태 관리
    - 발행 기능 구현
    - 임시 저장 기능 구현

  ### 📚 Next
  
  - 미리 보기 기능 구현
  - 참여 폼 구현
  
  </details>
</details>
