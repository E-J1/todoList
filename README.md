# My Todo App (Next.js App Router)

## 프로젝트 개요

Next.js App Router 기반의 간단한 할 일 관리 애플리케이션입니다.

- **할 일 목록** 조회/추가/완료 토글
- **할 일 상세** 수정(텍스트·상태·메모·이미지)·삭제

## 설치 및 실행

```bash
git clone https://github.com/yourname/my-todo-app.git
cd my-todo-app
npm install

# start
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 주요 구조

app/ : 라우팅 페이지 (App Router)

components/ : 재사용 UI 컴포넌트

hooks/useLocalStorage : 로컬스토리지 연동 훅

types/ : TypeScript 타입

public/ : 이미지 업로드 등 정적 자원

## 사용 방법

메인 페이지에서 할 일을 입력 후 추가하기 또는 Enter

각 항목 좌측 체크박스로 완료/진행 상태 토글

항목 클릭 시 상세 페이지로 이동

상세 페이지에서 수정·삭제 가능

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
