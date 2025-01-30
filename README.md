# Pollloop Frontend

<div align="center">

동적으로 업데이트되는 설문 플랫폼

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

Pollloop은 동적으로 업데이트되는 설문 플랫폼입니다. 사용자는 다양한 유형의 설문을 쉽게 생성하고 관리할 수 있습니다.

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

### 프로젝트 미리 보기

회원가입, 로그인
![회원가입_로그인](https://github.com/user-attachments/assets/32ab3c85-d66a-42db-8f6e-de2713650a0c)

로그인, 홈
![로그인_홈](https://github.com/user-attachments/assets/9c442226-81ec-48ae-b315-8ac29f4d77b1)

프로필 - 프로필 이미지 변경, 비밀번호 변경
![프로필](https://github.com/user-attachments/assets/b44cf6a2-b3fd-487a-9202-73c95a42cb92)

폼 만들기 - 기본 정보, 단답형, 장문형
![폼만들기_기본정보_단답형_장문형](https://github.com/user-attachments/assets/742f1549-96ac-45c4-ba53-3d99865b0582)

폼 만들기 - 체크박스, 옵션 추가, 기타 옵션, 필수 여부 선택
![폼만들기_체크박스_옵션_기타_필수](https://github.com/user-attachments/assets/b2ab2c63-94fb-430f-8efe-22ad8afc8bb7)

폼 만들기 - 라디오, 드롭다운, 범위 선택
![폼만들기_라디오_드롭다운_범위선택](https://github.com/user-attachments/assets/a58bcb50-e320-48b0-ab64-dbfcc3bf6d19)

폼 만들기 - 이미지 선택
![폼만들기_이미지선택](https://github.com/user-attachments/assets/4a462888-cb7e-40ed-a921-0103ce16c5f4)

폼 만들기 - 숫자, 날짜, 이메일, 파일 업로드
![폼만들기_숫자_날짜_이메일_파일업로드](https://github.com/user-attachments/assets/5ad4d65f-8640-4d1d-910b-b6fe63bb92fb)

폼 만들기 - 미리 보기
![폼만들기_미리보기](https://github.com/user-attachments/assets/1a7a2fd9-8d0b-468f-9371-10f2b00fce05)

폼 만들기 - 임시 저장
![폼만들기_임시저장](https://github.com/user-attachments/assets/613b8070-63ec-4469-ac3b-1e08bbf3670a)

폼 만들기 - 발행하기
![폼만들기_발행하기](https://github.com/user-attachments/assets/1bd89658-56d9-4da9-a8d4-3fe88c23337e)

참여 폼 - 폼 응답 및 제출하기
![참여폼](https://github.com/user-attachments/assets/806c45f1-0382-49c7-8444-7c7638e7c457)

결과 보기 - 요약
![결과보기_요약](https://github.com/user-attachments/assets/7da940cd-b047-48b2-8731-105f1dd4a06e)

결과 보기 - 참여자 목록
![참여자목록_참여요청](https://github.com/user-attachments/assets/085516d2-4e16-4477-8a04-7349f05df800)

나의 폼 - 폼 목록
![나의폼](https://github.com/user-attachments/assets/6aa55a6c-33f2-4b1f-97cd-952847a1084c)

### 기획/설계

- [사용자 요구사항 정의서](https://docs.google.com/spreadsheets/d/1cbOjzrG9eImTpaL68OsDOKNqIvixxpM4MQ7CLhkWSRY/edit?gid=841587565#gid=841587565)
- [와이어프레임](https://www.figma.com/design/0O0YiuuDlU8gU1rXqxBk9L/OZ_MERN_Team_1_Pollloop?node-id=99-673&t=CxUKCIKBE9Dco38p-1)
- [플로우차트](https://www.figma.com/board/rMwYPKN5wCwCQyDd5jwx9w/OZ_MERN_Team_1_Pollloop?node-id=0-1&t=ghuUdW8Afq6JorH2-1)
- [화면 정의서](https://docs.google.com/spreadsheets/d/1p3dYyMwH_zKKihMMGBp9cQM_y5V6N4eWuTLfLOpKYOA/edit?usp=sharing)

### API 연동

- [API 명세서](https://docs.google.com/spreadsheets/d/1R9Qn01BVr1VMkwzyEEENLLw3H0zJpmeFepmhopC9siA/edit?gid=1565530336#gid=1565530336)
- [API 명세서(스웨거)](https://api.pollloop.store/api/swagger/)

### 배포

- [배포 링크](https://pollloop.vercel.app/)

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
