# reactProject

npx create-react-app 프로젝트명 --template typescript --no-git

npm i chance luxon

npm i -D @types/chance @types/luxon

<details>
<summary><strong>1. 리액트 동작 원리 </strong></summary>

## 가상 DOM 이해하기

### react와 react-dom 패키지

- 리액트는 항상 react와 react-dom 패키지가 필요하다. 이 가운데 react는 다음 그림에서 보듯이 리액트 앱이 동작하는 환경과 무관하게 공통으로 사용하는 기능을 제공하는 패키지이다. 반면에 react-dom/client를 비롯하여 react-dom/server, react_native등 이른바 **렌더러**라고 하는 패키지 앱이 동작하는 플랫폼에 종속적인 기능을 제공하는 패키지이다.

- CSR(client-side-rendering): react
- SSR(server-side-rendering): react와 react-dom/server
- 모바일 앱: react와 react-native 조합

---

### 문서 객체 모델이란?

- HTML 형식의 문자열을 화면에 출력할 때, 문자열을 분석하여 자바스크립트 객체 조합으로 변환합니다. 이 자바스크립트 객체 조합을 **문서 객체 모델(DOM)**이라고 합니다.
- 웹 브라우저의 자바스크립트 엔진은 `window`라는 전역 변수를 기본으로 제공합니다. `window` 객체는 웹 브라우저의 특정 웹 페이지를 의미하며, `Window` 타입 객체로서 브라우저 객체 모델(BOM)을 구성합니다.

#### document 객체

- HTML 문서를 화면에 출력할 때 window 객체는 document라는 이름의 속성 객체로 HTML 문서 기능을 사용할 수 있게 해줍니다. HTML 문서의 HTML 요소는 오직 1개만 있어야 하므로, window.document(혹은 줄여서 그냥 document)는 html 요소를 의미한다.

#### document.head와 document.body 객체

- html 요소는 head와 body 태그를 1개씩만 가질 수 있다. document 객체는 이런 조건에 맞추어 `head` 요소를 의미하는 `head` 속성 객체와 `body` 요소를 의미하는 `body` 속성 객체를 제공한다.

#### document.createElement 메서드

- DOM은 다양한 인터페이스를 각각의 목적에 맞게 구현한 객체로 생성할 수 있도록 document.createElement 메서드를 제공한다. 다음은 MDN(Mozilla development network)에서 발췌한 createElement의 사용법이다.

```javascript
  let element = document.createElement(tagName[, options]);

  // 밑에 코드는 div 요소를 자바 스크립트 코드로 생성하는 예시
  let newDiv = document.createElement('div');
```

#### HTMLElement 인터페이스

위 코드에서 `newDiv` 변수의 타입은 무엇일까요? `HTMLElement`는 모든 종류의 HTML 요소가 구현하는 인터페이스입니다. 일부 요소는 이 인터페이스를 직접 구현하지만, 대부분의 요소는 `HTMLElement`를 상속한 자신들의 인터페이스를 구현합니다. 인터페이스 이름은 `HTML요소명Element` 형태의 규칙을 따릅니다. 따라서 `newDiv` 객체의 타입은 `HTMLDivElement`입니다.

#### HTMLElement 부모 요소 상속 구조 58P

#### JS만 사용하는 프런트엔드 개발(물리 DOM)

```javascript
//물리 DOM에 직접 렌더링
let pPhysicalDOM = document.createElement("p");
pPhysicalDOM.innerText = "Hello physical DOM world!";
document.body.appendChild(pPhysicalDOM);
```

#### 리액트를 사용하는 프런트엔드 개발(가상 DOM)

```javascript
//가상 DOM에 렌더링
let pVirtualDOM = React.createElement('p', null, 'Hello, React!')
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(pVirtualDOM)
```

</details>

---

<details>
<summary><strong>2. 컴포넌트 CSS 스타일링 </strong></summary>
</details>

---

<details>
<summary><strong>3. 함수 컴포넌트와 리액트 훅 </strong></summary>
</details>

---

<details>
<summary><strong>4. 상태 관리와 리덕스 패키지 </strong></summary>
</details>

---

<details>
<summary><strong>5. 리액트 라우터 </strong></summary>
</details>

---

<details>
<summary><strong>6. DB와 API 서버 </strong></summary>
</details>
