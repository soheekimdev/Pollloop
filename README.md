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

## 📝 프로젝트 소개

Pollloop은 동적으로 업데이트되는 설문 & QnA 플랫폼입니다. 사용자는 다양한 유형의 설문을 쉽게 생성하고 관리할 수 있으며, 실시간성 소통이 가능한 애스크 보드를 운영할 수 있습니다.

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
