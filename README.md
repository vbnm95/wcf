# 우리 아이 영양제 찾기

반려동물 보호자가 선택지 버튼을 눌러 질문에 답하면, 로컬 TypeScript 추천 트리를 따라 적합한 제품을 안내하는 Next.js MVP입니다.

현재 버전은 자유 입력 채팅, 외부 API, DB, 로그인, 결제 기능 없이 프론트엔드 내부 데이터만으로 동작합니다.

## 주요 기능

- 강아지와 고양이 대상 선택형 추천 플로우
- 나이, 체중, 주요 고민에 따른 제품 추천
- 1순위 추천 제품과 비교 제품 표시
- 제품별 이미지, 배지, 추천 이유, 급여 팁, 주의 문구 제공
- 모바일 화면을 기준으로 한 채팅형 UI

## 기술 스택

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열어 확인합니다.

프로덕션 빌드는 아래 명령으로 확인할 수 있습니다.

```bash
npm run build
```

빌드된 앱을 로컬에서 실행하려면 다음 명령을 사용합니다.

```bash
npm run start
```

## 주요 파일 구조

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    ChatApp.tsx
    ChatBubble.tsx
    OptionButton.tsx
    ProgressHeader.tsx
    ResultCard.tsx
    ProductCard.tsx
  data/
    products.ts
    recommendationTree.ts
  lib/
    tree.ts
  types/
    index.ts
public/
  images/
```

## 상품 데이터 수정

상품 정보는 `src/data/products.ts`에서 관리합니다.

새 상품을 추가할 때는 `Product` 타입에 맞춰 `id`, `name`, `category`, `description`, `image`, `badges`, `recommendReasons`, `feedingTip`, `caution` 등을 작성합니다.

상품 이미지는 `public/images` 폴더에 넣고, 상품 데이터의 `image` 경로를 `/images/파일명.png` 형식으로 연결합니다.

## 추천 플로우 수정

추천 질문과 결과 흐름은 `src/data/recommendationTree.ts`에서 관리합니다.

- 질문 노드는 `type: "question"`으로 작성합니다.
- 선택지는 `options` 배열에 넣고, 각 선택지의 `next` 값으로 다음 노드 id를 연결합니다.
- 결과 노드는 `type: "result"`로 작성하고 `primaryProductId`, `secondaryProductIds`, `careType`, `message`, `caution` 등을 설정합니다.

존재하지 않는 노드 id는 `start`로 fallback되고, 존재하지 않는 상품 id는 결과 비교 목록에서 제외됩니다.

## GitHub 업로드

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/사용자명/저장소명.git
git push -u origin main
```

이미 Git 저장소가 초기화되어 있다면 아래 세 명령만 사용하면 됩니다.

```bash
git add .
git commit -m "Update project"
git push
```

## Vercel 배포

1. 프로젝트를 GitHub 저장소에 업로드합니다.
2. Vercel에서 New Project를 선택합니다.
3. GitHub 저장소를 연결합니다.
4. Framework Preset이 Next.js인지 확인합니다.
5. 기본 빌드 명령 `npm run build`를 사용합니다.
6. Deploy를 실행합니다.

## 참고 사항

배포 전에 `.env`, API 키, 비밀번호 같은 민감한 파일이 GitHub에 올라가지 않도록 `.gitignore`를 확인해야 합니다.
