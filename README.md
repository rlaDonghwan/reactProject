# 리엑트 배우기

npx create-react-app 프로젝트명 --template typescript --no-git

npm i chance luxon

npm i -D @types/chance @types/luxon

<details>
<summary><strong>1. 리액트 동작 원리 </strong></summary>

# 가상 DOM 이해하기

### react와 react-dom 패키지

- 리액트는 항상 react와 react-dom 패키지가 필요하다. 이 가운데 react는 다음 그림에서 보듯이 리액트 앱이 동작하는 환경과 무관하게 공통으로 사용하는 기능을 제공하는 패키지이다. 반면에 react-dom/client를 비롯하여 react-dom/server, react_native등 이른바 **렌더러**라고 하는 패키지 앱이 동작하는 플랫폼에 종속적인 기능을 제공하는 패키지이다.

- CSR(client-side-rendering): react
- SSR(server-side-rendering): react와 react-dom/server
- 모바일 앱: react와 react-native 조합

---

### 문서 객체 모델이란?

- HTML 형식의 문자열을 화면에 출력할 때, 문자열을 분석하여 자바스크립트 객체 조합으로 변환합니다. 이 자바스크립트 객체 조합을 **문서 객체 모델(DOM)**이라고 한다.
- 웹 브라우저의 자바스크립트 엔진은 `window`라는 전역 변수를 기본으로 제공합니다. `window` 객체는 웹 브라우저의 특정 웹 페이지를 의미하며, `Window` 타입 객체로서 브라우저 객체 모델(BOM)을 구성한다.

### document 객체

- HTML 문서를 화면에 출력할 때 window 객체는 document라는 이름의 속성 객체로 HTML 문서 기능을 사용할 수 있게 해줍니다. HTML 문서의 HTML 요소는 오직 1개만 있어야 하므로, window.document(혹은 줄여서 그냥 document)는 html 요소를 의미한다.

### document.head와 document.body 객체

- html 요소는 head와 body 태그를 1개씩만 가질 수 있다. document 객체는 이런 조건에 맞추어 `head` 요소를 의미하는 `head` 속성 객체와 `body` 요소를 의미하는 `body` 속성 객체를 제공한다.

### document.createElement 메서드

- DOM은 다양한 인터페이스를 각각의 목적에 맞게 구현한 객체로 생성할 수 있도록 document.createElement 메서드를 제공한다. 다음은 MDN(Mozilla development network)에서 발췌한 createElement의 사용법이다.

```javascript
  let element = document.createElement(tagName[, options]);

  // 밑에 코드는 div 요소를 자바 스크립트 코드로 생성하는 예시
  let newDiv = document.createElement('div');
```

### HTMLElement 인터페이스

위 코드에서 `newDiv` 변수의 타입은 무엇일까 `HTMLElement`는 모든 종류의 HTML 요소가 구현하는 인터페이스입니다. 일부 요소는 이 인터페이스를 직접 구현하지만, 대부분의 요소는 `HTMLElement`를 상속한 자신들의 인터페이스를 구현합니다. 인터페이스 이름은 `HTML요소명Element` 형태의 규칙을 따릅니다. 따라서 `newDiv` 객체의 타입은 `HTMLDivElement`입니다.

---

## 컴포넌트란?

**컴포넌트(component)** 는 객체지향 언어의 원조인 **스몰토크(Smalltalk)** 에서 유래한 매우 오래된 용어입니다. 스몰토크에서 컴포넌트는 화면 UI를 처리하는 클래스를 의미합니다. 스몰토크 설계 이론에 따르면 컴포넌트는 **모델-뷰-컨트롤러(model-view-controller, MVC)** 설계 지침에 따라 구현된 클래스여야 합니다.

- **모델(Model)**: 앱의 데이터 부분을 의미합니다.
- **뷰(View)**: 모델을 화면에 렌더링하는 부분입니다.
- **컨트롤러(Controller)**: 사용자의 키보드와 마우스 입력을 수신받아 모델과 뷰에 적절한 형태로 반영하는 역할을 합니다.

스몰토크 컴포넌트 개념은 매우 일반적이어서 사실 거의 모든 프로그래밍 언어와 프레임워크는 이 개념을 그대로 빌려서 사용하고 있습니다. 리액트에서 컴포넌트 또한 스몰토크의 컴포넌트와 개념적으로 같습니다.

다만 리액트는 16.8 버전 이후 **리액트 훅(react hooks)** 이라는 새로운 메커니즘을 고안해 내면서 객체지향 언어에서 의미하는 클래스가 아니라 단순한 함수 형태로도 컴포넌트를 구현할 수 있게 되었습니다. 또한 리액트 팀은 가능한 한 함수 컴포넌트와 리액트 훅을 사용하라고 권장합니다.

---

### JS만 사용하는 프런트엔드 개발(물리 DOM)

자바스크립트로만 DOM을 다룰 때는 요소를 직접 생성하고 제어하는 작업을 수행합니다. 이를 **물리 DOM** 이라고 한다.

```javascript
// 물리 DOM에 직접 렌더링
let pPhysicalDOM = document.createElement("p");
pPhysicalDOM.textContent = "Hello world!";
document.body.appendChild(pPhysicalDOM);
```

이 방식은 성능에 직접적인 영향을 주며 코드가 복잡해지기 쉽다.

---

### React를 사용하는 프런트엔드 개발 (가상 DOM)

```jsx
// 리액트의 가상 DOM을 활용하여 렌더링
const virtualDOM = <p>Hello, React!</p>;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(pVirtualDOM);
```

리액트는 가상 DOM(Virtual DOM)을 활용하여 성능을 최적화합니다. JSX 형태로 작성된 코드는 React.createElement를 통해 가상 DOM 객체로 변환되며, 리액트가 이를 물리 DOM에 효율적으로 반영해 준다.

---

# JSX 구문 이해하기

### React.createElement 호출의 복잡성 문제

```typescript
import ReactDOM from "react-dom/client";
const rootVirtualDOM = (
  <ul>
    <li>
      <a href="https://www.naver.com">네이버</a>
      <p>네이버 홈페이지</p>
    </li>
  </ul>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(rootVirtualDOM);
```

---

### JSX = JavaScript + XML

- JSX는 XML 구문에 자바스크립트 코드를 결합하여 용도로 만들어진 구문입니다. 앞서 언급한 대로 JSX는 **React.createElement** 호출 코드를 간결하게 하려고 고안했다.

---

# 컴포넌트 이해하기

- 컴포넌트는 가상 DOM, JSX와 함께 리액트의 핵심 기능이다. 리액트에서 컴포넌트는 두 종류로 **클래스 컴포넌트**와 **함수 컴포넌트**가 있다.

---

### 컴포넌트란?

**컴포넌트(component)** 는 객체지향 언어의 원조인 **스몰토크(Smalltalk)** 에서 유래한 매우 오래된 용어입니다. 스몰토크에서 컴포넌트는 화면 UI를 처리하는 클래스를 의미합니다. 스몰토크 설계 이론에 따르면 컴포넌트는 **모델-뷰-컨트롤러(model-view-controller, MVC)** 설계 지침에 따라 구현된 클래스여야 한다.

- **모델(Model)**: 앱의 데이터 부분을 의미한다.
- **뷰(View)**: 모델을 화면에 렌더링하는 부분이다.
- **컨트롤러(Controller)**: 사용자의 키보드와 마우스 입력을 수신받아 모델과 뷰에 적절한 형태로 반영하는 역할을 한다.

스몰토크 컴포넌트 개념은 매우 일반적이어서 사실 거의 모든 프로그래밍 언어와 프레임워크는 이 개념을 그대로 빌려서 사용하고 있습니다. 리액트에서 컴포넌트 또한 스몰토크의 컴포넌트와 개념적으로 같습니다.
다만 리액트는 16.8 버전 이후 **리액트 훅(react hooks)** 이라는 새로운 메커니즘을 고안해 내면서 객체지향 언어에서 의미하는 클래스가 아니라 단순한 함수 형태로도 컴포넌트를 구현할 수 있게 되었다. 또한 리액트 팀은 가능한 한 함수 컴포넌트와 리액트 훅을 사용하라고 권장한다.

### 리액트 컴포넌트와 사용자 컴포넌트

리액트에서 사용하는 **컴포넌트(Component)** 라는 용어는 다음과 같이 두 가지 의미를 포함합니다.

- **리액트 제공 컴포넌트(리액트 컴포넌트)**
- **사용자가 구현하는 사용자 정의 컴포넌트(사용자 컴포넌트)**

리액트 컴포넌트의 이름은 `div`, `h1`처럼 첫 글자를 소문자로 시작하는 반면, 사용자 컴포넌트의 이름은 **MyComponent**처럼 첫 글자를 대문자로 시작하는 **카멜 표기법(camel-case notation)** 을 따른다.

---

### 리액트 컴포넌트

리액트는 HTML5의 각 태그에 대응하는 리액트 컴포넌트를 제공한다.

예시 JSX 코드:

```jsx
const h1 = <h1>Hello world!</h1>;
```

위 코드는 사실 아래와 같은 코드로 변환된다.

```jsx
const h1 = React.createElement("h1", null, "Hello world!");
```

리액트는 HTML5 태그에 해당하는 컴포넌트 이름을 매번 임포트하지 않아도 되도록 설계되었다.

> **잘못된 예시 (이렇게 하면 번거롭습니다.)**
>
> ```jsx
> import { h1, h2, div, span } from "react";
> ```

---

### 사용자 컴포넌트

리액트는 사용자 정의 컴포넌트를 생성할 수 있도록 지원한다. 사용자 컴포넌트 이름은 반드시 **카멜 표기법(camel-case notation)** 을 따른다. (예: `MyComponent`)

사용자 컴포넌트의 이름은 대문자로 시작하는 카멜 표기법을 사용해야 한다.

예시:

```tsx
export default function App() {
  return (
    <ul>
      <li>
        <a href="http://www.google.com">
          <p>go to Google</p>
        </a>
      </li>
    </ul>
  );
}
```

사용자 컴포넌트를 활용하는 이유는 JSX 문이나 React.createElement 호출을 통해 생성하는 가상 DOM 생성 코드를 사용자 컴포넌트 쪽으로 이동하여 코드를 간결화하기 위함

---

### 클래스 컴포넌트 만들기

리액트에서는 반드시 react 패키지가 제공하는 **Component 클래스**를 상속하여 클래스 기반 컴포넌트를 구현해야 한다.

```jsx
import React, { Component } from "react";
export default class ClassComponent extends Component {}
```

Component를 상속한 클래스 컴포넌트는 반드시 `render` 메서드를 포함해야 한다.

예시 코드:

```jsx
import { Component } from "react";

export default class ClassComponent extends Component {
  render() {
    return null;
  }
}
```

### 클래스 컴포넌트의 JSX 예시

```tsx
import {Component} from 'react'

export default class App extends Component {
  render() {
    return (
      <ul>
        <li>
          <a href="http://www.google.com">
            <p>go to Google</p>
          </a>
      </li>
    </ul>
  )
}
```

---

### JSX 구문과 조건부 렌더링

클래스 컴포넌트 내에서는 JSX뿐만 아니라 일반적인 타임스크립트 코드를 함께 작성할 수 있다.

예시 코드 (조건부 렌더링):

```tsx
import {Component} from 'react'

export default class App extends Component {
  render() {
    const isLoading = true

    if (isLoading) return <p>loading...</p>

    const children = (
      <li>
        <a href="http://www.google.com">
          <p>go to Google</p>
        </a>
      </li>
    )

    return (
      <div>
        {isLoading && <p>loading...</p>}
        {!isLoading && <ul>{children}</ul>}
      </div>
    )
}
```

혹은 삼항 연산자로 조건부 JSX 구문을 관리할 수도 있다.

```tsx
import { Component } from "react";

export default class App extends Component {
  render() {
    const isLoading = true;
    const children = isLoading ? (
      <p>loading...</p>
    ) : (
      <ul>
        <li>
          <a href="http://www.google.com">
            <p>go to Google</p>
          </a>
        </li>
      </ul>
    );

    return <div>{children}</div>;
  }
}
```

---

### 사용자 컴포넌트의 재사용성

사용자 컴포넌트는 재사용 가능성을 높여주는 핵심 기능

예시 (사용자 컴포넌트 사용):

```jsx
// App.tsx
import { Component } from "react";
import ClassComponent from "./ClassComponent";

export default class App extends Component {
  render() {
    return (
      <ul>
        <ClassComponent href="http://www.google.com" text="go to Google" />
        <ClassComponent href="https://twitter.com" text="go to Twitter" />
      </ul>
    );
  }
}
```

이러한 방식은 리액트 프레임워크가 제공하는 '속성(props)'을 사용하여, 사용자 컴포넌트의 유연성과 재사용성을 극대화할 수 있다.

---

# 속성이란?

객체 지향 프로그래밍에서 `속성(property)`은 클래스의 멤버 변수를 의미합니다. 컴포넌트 또한 화면 UI를 담당하는 클래스이므로 속성을 가질 수 있습니다. 그리고 클래스 속성은 그 값이 수시로 바뀔 수 있습니다. 이 처럼 수시로 값이 바뀔 수 있는 것은 `가변(mutable)`하다라고 한다. 반대로 값이 한번 설정되면 다시는 바뀌지 않는 것을 `불변(immutable)`하다 라고 한다. 그런데 리액트 프레임워크에서 속성은 객체지향 언어의 속성과는 다른 부분이 있어서 주의해야 한다.

---

# 함수 컴포넌트 만들기

다음은 앞서 구현한 클래스 방식의 App 컴포넌트 코드를 단순화한 것이다. 그런데 이 코드는 **render** 메서드만 의미가 있고 나머지느 코드는 **render** 메서드를 구현할 수 있게 하는 프로그래밍 언어의 문법을 갖추는 코드일 뿐이다.

```tsx
// 클래스형 컴포넌트
export default class App extends Component {
  render() {
    return <h1>class Component</h1>;
  }
}

// 함수형 컴포넌트
export default function App() {
  return <h1>class Component</h1>;
}

//화살표 방식 함수 컴포넌트
const App = () => {
  return <h1>function Component</h1>;
};
```

### 함수 컴포넌트의 타입

다음 `React.createElement` 선언문의 첫 번째 매개변수인 `type`의 타입은 `FunctionComponent<P>`, `ComponentClass<P>`, `string` 중 하나일 수 있습니다. 여기서 함수 컴포넌트의 타입은 `FunctionComponent<P>`이고 클래스 컴포넌트의 타입은 `ComponentClass<P>`입니다. 그런데 `FunctionComponent`라는 이름이 너무 길어서 리액트는 이를 짧게 줄인 `FC`라는 이름의 타입을 제공합니다. 결국 함수 컴포넌트의 타입은 `FC<P>`입니다.

---

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
