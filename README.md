# RN_Template

React Native + Expo + Supabase 보일러플레이트.
**Expo Go 로 바로 실행**되는 가벼운 시작점이며, FSD 에서 영향받은 **레이어드 아키텍처**와 인증 흐름이 미리 구성되어 있습니다.

> 고급 네이티브 모듈(MMKV·Sentry·블루투스·NFC 등)이 필요해지면 클론 후 추가하고 **dev build 로 전환**하면 됩니다. (아래 "dev build 전환" 참고)

---

## 🧱 기술 스택

| 영역 | 사용 |
|------|------|
| 코어 | Expo SDK 56, React Native 0.85, expo-router(파일 기반 라우팅) |
| 언어 | TypeScript |
| UI | React Native Paper (MD3) + @expo/vector-icons |
| 클라이언트 상태 | Zustand (+ persist) |
| 서버 상태 | TanStack Query |
| 영구 저장소 | @react-native-async-storage/async-storage (zustand persist 엔진) |
| 백엔드 | Supabase (Auth / DB) |
| 폼/검증 | react-hook-form + zod |
| 보안 저장소 | expo-secure-store (세션) |

> 서버 상태는 TanStack Query, 클라이언트 상태는 Zustand 로 분리합니다.
> 포함된 라이브러리는 **모두 Expo Go 호환**입니다.

---

## ⚠️ 사전 요구사항

- **Node.js ≥ 20.19.4** (RN 0.85 요구사항). 낮으면 실행이 실패할 수 있습니다.
- 모바일에서 **Expo Go 앱** 설치 (App Store / Google Play) — 기본 실행에 사용합니다.
  - 이 프로젝트는 **Expo SDK 56** 이라 **최신 버전 Expo Go** 가 필요합니다.
    `Project is incompatible with this version of Expo Go` 에러가 나면 스토어에서 Expo Go 를 업데이트하세요.

---

## 🚀 시작하기 (Expo Go)

```bash
# 1) 의존성 설치
npm install

# 2) 환경변수 설정
cp .env.example .env
#   → .env 의 EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY 를 채웁니다.

# 3) 개발 서버 실행
npx expo start
#   → 터미널 QR 코드를 Expo Go 앱으로 스캔하면 앱이 뜹니다.
#   → 안드로이드 에뮬레이터/ iOS 시뮬레이터로 열려면 a / i 키
```

코드를 수정하면 **즉시 리로드(Fast Refresh)** 됩니다.

### Supabase 설정

1. [supabase.com](https://supabase.com) 에서 프로젝트 생성 → URL / anon key 를 `.env` 에 입력.
2. **Authentication → URL Configuration → Redirect URLs** 에 앱 scheme 추가:
   ```
   rntemplate://
   ```
3. 소셜 로그인을 쓰려면 **Authentication → Providers** 에서 Google 등을 활성화하세요.

### DB 타입 동기화

```bash
npx supabase gen types typescript --project-id <PROJECT_ID> > src/shared/types/database.types.ts
```

---

## 🗂 폴더 구조 & 아키텍처

```
src/
├── app/                      # expo-router 라우트 전용 (화면 조립만)
│   ├── _layout.tsx           #   Provider 트리 + 인증 가드
│   ├── index.tsx             #   진입점(로딩) — 가드가 그룹으로 리다이렉트
│   ├── (auth)/               #   비로그인 그룹
│   │   └── login.tsx         #     → views/login 렌더
│   └── (app)/                #   로그인 그룹(보호 라우트)
│       └── home.tsx          #     → views/home 렌더
│
├── views/                    # [Presentation] 기능(화면)별 콜로케이션
│   ├── login/
│   └── home/
│
└── shared/                   # 앱 전체 공용
    ├── components/           #   전역 공통 컴포넌트
    ├── hooks/                #   [Application] 전역 훅 (useAuth …)
    ├── store/                #   [State] Zustand (authStore, appStore)
    ├── service/              #   [Service] Supabase 호출 전담
    ├── lib/                  #   라이브러리 초기화 (supabase/storage/queryClient)
    ├── providers/            #   Provider 묶음 (Query/Paper/SafeArea/Gesture)
    ├── theme/                #   Paper 테마 + 토큰
    ├── utils/                #   전역 유틸
    ├── constants/            #   전역 상수
    └── types/                #   전역 타입 (database.types.ts, env.d.ts)
```

### 의존성 방향 (단방향)

```
app  →  src/views  →  src/shared
```

- `shared/` 는 특정 도메인을 모릅니다 (`shared` → `views` import 금지).
- `views/[기능]/` 내부 자원은 그 화면 안에서만 사용 → 다른 곳에서 쓰이면 `shared/` 로 승격.
- Supabase 호출은 **`shared/service/` 에만** 둡니다 (호출 지점 단일화).

### `views/` 네이밍 규칙 (평탄 슬라이스 + 풀 경로 prefix)

route 가 깊어져도 `views/` 는 **평탄**하게 유지합니다. route 의 모든 실제 세그먼트를
`-` 로 이어 폴더명으로 사용합니다.

| 라우트 | view 슬라이스 |
|--------|---------------|
| `app/(app)/settings/profile.tsx` | `views/settings-profile/` |
| `app/(app)/settings/security/two-factor.tsx` | `views/settings-security-two-factor/` |
| `app/(app)/feed/[id].tsx` | `views/feed-detail/` |

규칙:
- 라우트 그룹 `()` 은 이름에서 **제외** (URL 에 없는 레이아웃 장치).
- 동적 세그먼트 `[x]` 는 의미어로 (`[id]` → `detail`).
- view 폴더 안은 파일을 평탄하게. 화면 하나가 비대해질 때만 `components/`·`hooks/` 를 **1단계만** 추가.

---

## 🔐 인증 흐름

1. `app/_layout.tsx` 에서 `useAuthListener()` 가 앱 시작 시 세션을 복원하고
   `supabase.auth.onAuthStateChange` 를 구독해 `authStore` 에 동기화합니다.
2. 세션 복원이 끝날 때까지 스플래시를 유지하고, 끝나면 인증 상태에 따라
   `(auth)` ↔ `(app)` 그룹으로 리다이렉트합니다.
3. 소셜 로그인은 **시스템 브라우저 + PKCE** 방식입니다 (`shared/service/auth.service.ts`).

> SecureStore 는 키당 약 2KB 제한이 있습니다. 세션이 커져 경고가 발생하면
> `shared/lib/supabase.ts` 의 어댑터를 암호화 대용량 어댑터로 교체하세요.

---

## 📦 데이터 흐름 예시 (service → useQuery → view)

홈 화면에 레이어드 데이터 패칭 패턴 예시가 들어 있습니다.

```
shared/service/post.service.ts   # Supabase 호출 (순수 async)
views/home/hooks/usePosts.ts     # TanStack Query 래핑
views/home/HomeView.tsx          # 로딩/에러/빈 상태 렌더
```

동작시키려면 Supabase 에 `posts` 테이블을 만드세요:

```sql
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  created_at timestamptz not null default now()
);
```

테이블이 없으면 홈 화면에 에러 메시지가 표시됩니다(패턴 데모용이라 의도된 동작).

---

## 🛠 dev build 로 전환 (고급 네이티브 모듈 추가 시)

이 템플릿은 **Expo Go 호환 모듈만** 포함합니다. 아래처럼 **Expo Go 에 없는 네이티브 모듈**을
추가하는 순간부터는 **development build** 가 필요합니다.

| 추가하려는 것 | 모듈 | Expo Go |
|---|---|---|
| 빠른 영구 저장 | `react-native-mmkv` | ❌ → dev build |
| 에러 추적 | `@sentry/react-native` | ❌ → dev build |
| 키보드 제어 | `react-native-keyboard-controller` | ❌ → dev build |
| 블루투스 | `react-native-ble-plx` | ❌ → dev build |
| NFC | `react-native-nfc-manager` | ❌ → dev build |
| 카메라·위치·센서 등 | `expo-camera`·`expo-location`·`expo-sensors` … | ✅ Expo Go OK |

dev build 만드는 법(둘 중 하나):

```bash
# 로컬 빌드 (Android SDK 필요, RAM 여유 권장)
npx expo run:android        # 또는 run:ios (macOS)

# 클라우드 빌드 (EAS, 로컬 빌드 도구 불필요)
npm install -g eas-cli && eas login
eas build --profile development --platform android
```

> 예: 저장소를 더 빠른 MMKV 로 바꾸려면 dev build 전환 후
> `src/shared/lib/storage.ts` 의 AsyncStorage 를 MMKV 어댑터로 교체하면 됩니다.

---

## 🧩 옵션 라이브러리 (필요 시 설치)

기본 템플릿에는 포함되지 않습니다. 필요할 때만 설치하세요
(안 쓰는 모듈은 설치하지 마세요 — 매니페스트에 권한이 선언되어 스토어 심사에 영향을 줍니다).

### 권한 모듈

| 용도 | 패키지 | Expo Go |
|------|--------|---------|
| 카메라 | `expo-camera` | ✅ |
| 갤러리 선택 | `expo-image-picker` | ✅ |
| 미디어 저장 | `expo-media-library` | ✅ |
| 위치 | `expo-location` | ✅ |
| 마이크/오디오 | `expo-audio` | ✅ |
| 연락처 | `expo-contacts` | ✅ |
| 캘린더 | `expo-calendar` | ✅ |
| 모션 센서 | `expo-sensors` | ✅ |
| ATT(추적 동의) | `expo-tracking-transparency` | ✅ (iOS) |
| 블루투스 | `react-native-ble-plx` | ❌ dev build |
| NFC | `react-native-nfc-manager` | ❌ dev build |

### 기능 모듈

| 용도 | 패키지 |
|------|--------|
| 애플 로그인 | `expo-apple-authentication` |
| 네이티브 구글 로그인 | `@react-native-google-signin/google-signin` |
| PG 결제 | `@portone/react-native-sdk` |
| 파일 선택 | `expo-document-picker` |
| 다국어 | `expo-localization` + `i18next` |
| 제품 분석 | `posthog-react-native` |
| 고급 토스트 | `burnt` |
| 지도 | `react-native-maps` |

설치 예시:

```bash
npx expo install expo-camera          # Expo 모듈은 expo install 로 호환 버전 매칭
npm install react-native-maps         # 비-Expo 패키지
```

---

## 📋 권한 레퍼런스

권한 모듈을 추가하면 `app.json` 의 `plugins` 와 권한 문구를 설정해야 합니다.

```jsonc
// app.json 예시 (expo-camera)
{
  "expo": {
    "plugins": [
      ["expo-camera", { "cameraPermission": "사진 촬영을 위해 카메라 접근이 필요합니다." }]
    ]
  }
}
```

| 모듈 | iOS 권한 문구 키 | Android 권한 |
|------|------------------|--------------|
| expo-camera | `NSCameraUsageDescription` | `CAMERA` |
| expo-image-picker | `NSPhotoLibraryUsageDescription` | `READ_MEDIA_IMAGES` |
| expo-media-library | `NSPhotoLibraryAddUsageDescription` | `WRITE_EXTERNAL_STORAGE` |
| expo-location | `NSLocationWhenInUseUsageDescription` | `ACCESS_FINE_LOCATION` |
| expo-audio | `NSMicrophoneUsageDescription` | `RECORD_AUDIO` |
| expo-contacts | `NSContactsUsageDescription` | `READ_CONTACTS` |
| expo-calendar | `NSCalendarsUsageDescription` | `READ_CALENDAR` |
| expo-tracking-transparency | `NSUserTrackingUsageDescription` | — |
| expo-notifications | — | `POST_NOTIFICATIONS` |

> 권한은 **설치가 아니라 요청 함수 호출 시점**에 팝업이 뜹니다.
> (예: `Camera.requestCameraPermissionsAsync()`)

---

## 📜 스크립트

```bash
npm start            # 개발 서버 (Expo Go / QR)
npm run android      # 안드로이드 에뮬레이터로 열기
npm run ios          # iOS 시뮬레이터로 열기 (macOS)
npm run lint         # ESLint
npx tsc --noEmit     # 타입 체크
npx expo-doctor      # 의존성/설정 검증
```
