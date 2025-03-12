# 리엑트 배우기

npx create-react-app 프로젝트명 --template typescript --no-git

npm i chance luxon

npm i -D @types/chance @types/luxon

npm i -D postcss autoprefixer tailwindcss @tailwindcss/line-clamp daisyui

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

# key와 children 속성 이해하기

### key 속성 설정하기

```tsx
export default function App() {
  const texts1 = [<p>hello</p>, <p>world</p>]; //key 속성 미사용
  const texts2 = [<p key="1">hello</p>, <p key="2">world</p>]; //key 속성 사용
  return <div>{texts}</div>;
}

export default function App() {
  const texts = ["hello", "world"].map((text, index) => (
    <p key={index}>{text}</p>
  ));
  return <div>{texts}</div>;
}
```

key 속성은 같은 이름의 컴포넌트가 여러 개일 때 이들을 구분하려고 리액트 프레임워크가 만든 속성이다.
App은 <p> 요소를 2개 사용하므로 리액트 프레임 워크는 이 둘을 구분하려고 중복되지 않은 고유한 값의 key 속성 값을 요구한다.

---

### children 속성 설정하기

**children은** <div> 처럼 자식 요소를 포함할 수 있는 컴포넌트에서만 사용할 수 있다. 즉 `<img>,<input>` 처럼 자식 요소를 포함할 수 없는 컴포넌트에서 **children을** 사용할 수 없다. 다음 코드는 <p>와 <div> 요소의 **children** 속성에 자식 요소를 설정했다.

```tsx
export default function App() {
  const texts = ["hello", "world"].map((text, index) => (
    <p key={index} children={text} />
  ));
  return <div children={text} />;
}
```

---

### 컴포넌트 내부에서 children 속성 사용하기

```tsx
import type { FC, ReactNode } from "react";

export type PProps = {
  children?: ReactNode;
};

const P: FC<PProps> = (props) => {
  const { children } = props;
  return <p children={children} />;
};

export default P;
//-------------------------
//App.tsx P컴포넌트 사용
import P from "./P";

export default function App() {
  const texts = ["hello", "world"].map((text, index) => (
    <P key={index} children={text} />
  ));
  return <div children={texts} />;
}
```

---

### JSX `{...props}` 구문

JSX의 `{...props}` 구문은 객체를 확장할 때 사용하는 자바스크립트의 전개 연산자(spread operator)를 활용한다. 컴포넌트의 props에 포함된 여러 속성을 한번에 간단히 전달할 때 유용하다.

예시 코드:

```tsx
const P: FC<PProps> = (props) => {
  return <p {...props} />;
};
```

위 코드에서 `{...props}` 는 props가 가진 모든 속성을 한 번에 `<p>` 태그로 전달한다.

---

### PropsWithChildren 타입과 children 속성

리액트는 17 버전까지는 함수형 컴포넌트(FC)에 `children` 속성을 기본적으로 포함했지만, 리액트 18 버전부터는 제거되었다. 대신 리액트는 **PropsWithChildren** 이라는 새로운 제네릭 타입을 제공한다.

- `children?: ReactNode` 부분이 PropsWithChildren 타입으로 대체되었다.

다음은 **PropsWithChildren** 타입을 활용한 예제이다.

```tsx
import type { FC, PropsWithChildren } from "react";

export type PProps = {};

const P: FC<PropsWithChildren<PProps>> = (props) => {
  return <p>{props.children}</p>;
};

export default P;
```

이 방식을 사용하면 사용자 정의 컴포넌트에서 `children` 속성을 안전하게 사용할 수 있다.

---

# 이벤트 속성 이해하기

- 모든 HTML 요소는 `onmouseenter, onmouseover` 처럼 'on'으로 시작하는 속성을 제공하는데, 이를 **이번트 속성**이라고 한다.

### 이벤트란?

- 리액트를 비롯해 화면 UI를 다루는 모든 프레임워크는 사용자가 화면 UI에서 버튼을 누르거나 텍스트를 입력하는 등의 행위가 발생하면 이를 화면 UI를 구현한 코드 쪽에 알려 줘야 한다. 이 처럼 마우스 클릭 텍스트 입력과 같은 사용자 행위가 일어날 떄 **이벤트가** 발생했다고 한다.

### Event 타입

- 웹 브라우저의 자바스크립트 엔진은 Event 타입을 제공한다.

| 종류              | 설명                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| **type**          | 이벤트 이름으로 대소 문자를 구분하지 않습니다.                                                      |
| **isTrusted**     | 이벤트가 웹 브라우저에서 발생한 것인지(`true`), 프로그래밍으로 발생한 것인지(`false`)를 판단합니다. |
| **target**        | 이벤트가 처음 발생한 **HTML 요소**입니다.                                                           |
| **currentTarget** | 이벤트의 현재 대상, 즉 이벤트 버블링 중에서 이벤트가 현재 위치한 객체입니다.                        |
| **bubbles**       | 이벤트가 **DOM**을 타고 버블링될지 여부를 결정합니다.                                               |

아래 코드는 이름이 click(type 속성값이 'click')인 Event 객체를 생성하는 예

```tsx
new Event("click", { bubbles: true });
```

---

### EventTarget 타입

모든 HTML 요소는 `HTMLElement` 상속 타입을 가지며, `HTMLElement`는 최상위 `EventTarget` 타입을 시작으로 `Node`, `Element`와 같은 타입을 상속받는다. 즉, 모든 HTML 요소는 `EventTarget` 타입이 정의하는 속성과 메서드를 포함하고 있다. 또한, 브라우저 객체 모델(BOM)에서 `Window` 타입도 `EventTarget`을 상속한다.

```
EventTarget
   |
   v
Node
   |
   v
Element
   |
   v
HTMLElement
```

---

### 이벤트 처리기 (Event Handling)

`EventTarget`은 다음과 같은 3개의 메서드를 제공한다:

- `addEventListener`
- `removeEventListener`
- `dispatchEvent`

### `addEventListener`

이름에서 알 수 있듯이 `addEventListener`는 *이벤트 + 귀를 기울여 듣기*라는 의미를 가진다. 프로그래밍에서 이런 *귀 기울여 듣기*를 구현하는 메커니즘은 **콜백 함수**를 사용한다. 이러한 이벤트를 기다리는 콜백 함수를 **이벤트 처리기(event handler)** 라고 한다.

이벤트 처리기는 특정 이벤트가 발생할 때까지 대기하고 있다가, 이벤트가 발생하면 해당 이벤트를 코드로 전달하는 역할을 한다. `addEventListener` 메서드는 하나의 이벤트에 여러 개의 이벤트 처리기를 부착할 수 있도록 지원한다.

#### `addEventListener` 사용법

```javascript
DOM_객체.addEventListener(이벤트_이름: string, 콜백_함수: (e: Event) => void)
```

### Window 객체와 `addEventListener`

브라우저 객체 모델(BOM)에서 `window` 객체는 `Window` 타입이며, `Window` 타입은 `EventTarget`을 상속합니다. 따라서 `window` 객체에서도 `addEventListener` 메서드를 사용할 수 있다.

예제 코드:

```javascript
window.addEventListener("resize", (event) => {
  console.log("윈도우 크기가 변경되었습니다.", event);
});
```

---

### 이벤트 리스너 (Event Listener)

### 기본 이벤트 리스너 예제

```javascript
window.addEventListener("click", (e: Event) =>
  console.log("mouse click occurs.")
);
```

이벤트 리스너는 특정 이벤트(예: `click`)가 발생했을 때 실행되는 코드를 정의한다.

---

### `getElementById`를 이용한 이벤트 리스너 등록

리액트 프로젝트에서는 `public` 디렉터리의 `index.html` 파일에 `<div id="root">` 태그를 포함하고 있으므로, 아래처럼 이벤트 리스너를 등록할 수 있다.

```javascript
document.getElementById("root")?.addEventListener("click", (e: Event) => {
  const { isTrusted, target, bubbles } = e;
  console.log("mouse click occurs.", isTrusted, target, bubbles);
});
```

### 옵션 체이닝(Optional Chaining)

위 코드에서 `?.` 연산자는 **옵셔널 체이닝(Optional Chaining)** 연산자로, `getElementById('root')`가 `null`을 반환할 경우 `addEventListener`를 호출하지 않도록 방지한다.

---

#### `src/pages/EventListener.tsx` 파일의 이벤트 리스너 코드

아래 코드는 `<div id="root">` 태그에 두 개의 `click` 이벤트 리스너를 등록한다.

```tsx
// src/pages/EventListener.tsx

document.getElementById("root")?.addEventListener("click", (e: Event) => {
  const { isTrusted, target, bubbles } = e;
  console.log("mouse click occurs.", isTrusted, target, bubbles);
});

document.getElementById("root")?.addEventListener("click", (e: Event) => {
  const { isTrusted, target, bubbles } = e;
  console.log("mouse click also occurs.", isTrusted, target, bubbles);
});

export default function EventListener() {
  return <div>EventListener</div>;
}
```

이 코드에서는 `<div id="root">` 요소에 두 개의 `click` 이벤트 리스너를 부착하여 클릭 이벤트가 발생할 때마다 두 개의 콘솔 로그가 실행된다.

---

### 물리 DOM 객체의 이벤트 속성

앞에서 살펴본 `addEventListener` 메서드는 사용법이 조금 번거롭다. 이 때문에 `window`를 포함한 대부분의 HTML 요소는 `onclick`처럼 `on`뒤에 이벤트 이름을 붙인 속성을 제공한다. 이벤트 속성은 `addEventListener`의 사용법을 간결하게 하는 게 목적이므로 이벤트 속성값에는 항상 이벤트 처리기를 설정해야 한다.

아래 코드는 onclick 이벤트 속성으로 다시 구현한 예

```javascript
window.onclick = (e: Event) => console.log("mouse click occurs");
```

<div id = "root">에서 DOM 객체의 onclick 속성값을 구현할 수 있다.
옵셔널 체이닝 연산자는 `document.getElementById('root')?.onclick = 콜백_함수` 처럼 값을 설정하는 구문에는 사용할 수 없으므로 다음과 같은 형태로 구현해야 한다

```javascript
const rootDiv = document.getElementById("root");
if (rootDiv) {
  rootDiv.onclick = (e: Event) => console.log("mouse click occurs.");
}
```

---

### 리액트 프레임워크의 이벤트 속성

- 리액트 컴포넌트도 **on이벤트명**형태로 된 HTML 요소의 이벤트 속성들을 제공합니다. 그런데 한 가지 큰 차이는 HTML 요소의 이벤트 속성은 모두 소문자지만, 리액트 코어 컴포넌트의 속성은 `onClick, onMouseEnter`처럼 소문자로 시작하는 카멜 표기법을 사용합니다.
- 그리고 리액트 컴포넌트의 이벤트 속성에 설정하는 콜백함수는 매개변수 e의 타입이 `Event`가 아니라 리액트가 제공하는 `SyntheicEvent` 타입을 설정해야 한다는 차이가 있다.

### SyntheticEvent in React

### `SyntheticEvent` 선언문

```tsx
interface SyntheticEvent<T = Element, E = Event>
  extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {}
```

리액트 컴포넌트 관점에서 **synthetic** 이라는 용어는 _모든 종류의 이벤트를 종합한_ 개념으로 이해할 수 있다.

리액트의 `SyntheticEvent`는 `BaseSyntheticEvent`를 상속하는 타입으로, `BaseSyntheticEvent`의 주요 내용은 다음과 같다.

### `BaseSyntheticEvent` 인터페이스

```tsx
interface BaseSyntheticEvent<E = object, C = any, T = any> {
  nativeEvent: E;
  currentTarget: C;
  target: T;
  preventDefault(): void;
  stopPropagation(): void;
}
```

### 설명

- **`nativeEvent`**: 원래의 브라우저 이벤트 객체
- **`currentTarget`**: 현재 이벤트가 실행된 요소 (이벤트 핸들러가 바인딩된 요소)
- **`target`**: 실제 이벤트가 발생한 요소
- **`preventDefault()`**: 기본 이벤트 동작을 막음
- **`stopPropagation()`**: 이벤트 전파를 중단함

### `SyntheticEvent`의 역할

리액트는 브라우저의 기본 이벤트 객체를 직접 사용하지 않고 `SyntheticEvent`로 감싸서 일관된 이벤트 처리를 제공합니다. `SyntheticEvent`는 여러 브라우저에서 동일한 API를 유지하도록 추상화되어 있으며, 이벤트 객체의 성능 최적화를 위해 **이벤트 풀링(Event Pooling)** 기법을 사용한다.

---

## EventTarget의 `dispatchEvent` 메서드

### `dispatchEvent` 메서드 정의

DOM의 최상위 타입인 `EventTarget`은 다음과 같은 `dispatchEvent` 메서드를 제공한다.

```typescript
dispatchEvent(event: Event): boolean;
```

이 메서드를 이용하면 특정 `Event` 객체를 생성하여 원하는 요소에서 직접 이벤트를 발생시킬 수 있다..

---

### 이벤트 객체 생성 및 `dispatchEvent` 활용

아래와 같이 `Event` 객체를 생성할 수 있다.

```typescript
new Event("click", { bubbles: true });
```

이렇게 생성된 `Event` 객체를 특정 DOM 요소의 `dispatchEvent` 메서드를 호출하여 이벤트를 발생시킬 수 있다.

```typescript
document
  .getElementById("root")
  ?.dispatchEvent(new Event("click", { bubbles: true }));
```

> 위 코드는 `#root` 요소에서 `click` 이벤트를 발생시키며, `bubbles: true` 옵션을 통해 이벤트 버블링이 허용된다.

---

### `click` 메서드와 `dispatchEvent`의 관계

모든 DOM 객체의 부모 타입인 `HTMLElement`는 `click()` 메서드를 제공하며, 이는 `dispatchEvent(new Event('click'))`과 동일하게 동작한다.

```typescript
document.getElementById("root")?.click();
```

즉, `click()` 메서드는 내부적으로 `dispatchEvent(new Event('click'))`을 호출하는 방식으로 구현되어 있다.

---

### `src/pages/DispatchEvent.tsx` 구현

아래 코드는 `dispatchEvent`와 `click` 메서드를 직접 호출하는 예제

```tsx
// src/pages/DispatchEvent.tsx

export default function DispatchEvent() {
  const onCallDispatchEvent = () => {
    console.log("onCallDispatchEvent");
    document
      .getElementById("root")
      ?.dispatchEvent(new Event("click", { bubbles: true }));
  };

  const onCallClick = () => {
    console.log("onCallClick");
    document.getElementById("root")?.click();
  };

  return (
    <div>
      <p>DispatchEvent</p>
      <button onClick={onCallDispatchEvent}>call dispatchEvent</button>
      <button onClick={onCallClick}>call click</button>
    </div>
  );
}
```

### 실행 결과

1. **첫 번째 버튼 (`call dispatchEvent`)** 클릭 시:

   - `dispatchEvent`를 이용하여 `click` 이벤트를 발생
   - 콘솔에 `'onCallDispatchEvent'`이 출력
   - 이벤트 버블링이 활성화된 상태로 `click` 이벤트가 실행

2. **두 번째 버튼 (`call click`)** 클릭 시:
   - `click()` 메서드를 호출하여 직접 `click` 이벤트를 실행
   - 콘솔에 `'onCallClick'`이 출력
   - 내부적으로 `dispatchEvent(new Event('click'))`과 동일한 동작을 수행

---

### 이벤트 버블링 (Event Bubbling)

**이벤트 버블링**이란, 자식 요소에서 발생한 이벤트가 가까운 부모 요소에서 점점 상위 요소까지 전달되는 현상을 의미합니다.

### 이벤트 버블링 흐름

```html
window ├─
<body>
  ├─
  <div>├─ <button>(이벤트 발생)</button></div>
</body>
```

이벤트는 **가장 깊은 요소**에서 발생한 후, **상위 요소(부모 요소)를 거쳐 최상위(window)까지 전달**됩니다.

---

### 이벤트 버블링 예제

아래 코드에서 `<button>`을 클릭하면, **버튼뿐만 아니라 부모 요소인 `<div>`에서도 `click` 이벤트 처리기가 실행**됩니다.

```tsx
export default function BubblingExample() {
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button clicked", e.currentTarget);
  };

  const onDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("Div clicked", e.currentTarget);
  };

  return (
    <div
      onClick={onDivClick}
      style={{ padding: "20px", backgroundColor: "#f0f0f0" }}
    >
      <button onClick={onButtonClick}>Click me</button>
    </div>
  );
}
```

### 이벤트 흐름

- `<button>`을 클릭하면 `onButtonClick`이 실행됩니다.
- 이벤트 버블링으로 인해 **부모 요소인 `<div>`의 `onDivClick`도 실행**됩니다.

#### `currentTarget` 값 차이

- `onButtonClick`에서 `e.currentTarget`은 `<button>` 요소입니다.
- `onDivClick`에서 `e.currentTarget`은 `<div>` 요소입니다.

이벤트 버블링이 필요 없을 경우, `stopPropagation()`을 호출하여 버블링을 막을 수 있습니다.

```tsx
const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation(); // 이벤트 버블링 중단
  console.log("Button clicked");
};
```

---

### `<input>` 요소의 이벤트 처리

### 개요

`<input>` 요소는 `<button>`과 함께 이벤트 처리를 자주 구현해야 하는 대표적인 요소입니다. 하지만 `<input>` 요소는 `type` 속성값에 따라 동작 방식과 사용자 입력을 처리하는 방법이 다를 수 있습니다.

---

### `input` 요소의 주요 이벤트

`<input>` 요소에서 주로 사용되는 이벤트들은 다음과 같습니다:

- **`onChange`**: 입력값이 변경될 때 호출됨.
- **`onInput`**: 사용자가 입력할 때마다 호출됨 (`onChange`와 차이점 있음).
- **`onFocus`**: 입력 필드가 포커스를 받을 때 호출됨.
- **`onBlur`**: 입력 필드에서 포커스가 벗어날 때 호출됨.
- **`onKeyDown` / `onKeyUp`**: 키를 누르거나 뗄 때 호출됨.

---

### `onChange` vs `onInput`

두 이벤트는 비슷해 보이지만 동작 방식이 다릅니다.

- **`onChange`**: 입력이 완료되고 `focus`가 해제되었을 때 발생.
- **`onInput`**: 사용자가 입력할 때마다 즉시 발생.

```tsx
<input type="text" onChange={(e) => console.log("Changed:", e.target.value)} />
<input type="text" onInput={(e) => console.log("Input event:", e.target.value)} />
```

---

### 다양한 `type` 속성에 따른 이벤트 처리

각 `type`에 따라 입력 방식이 다르므로, 이벤트 처리 방법도 달라질 수 있습니다.

```tsx
export default function VariousInputs() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`Type: ${e.target.type}, Value: ${e.target.value}`);
  };

  return (
    <div>
      <p>다양한 input 요소</p>
      <input type="text" placeholder="텍스트 입력" onChange={handleChange} />
      <input
        type="password"
        placeholder="비밀번호 입력"
        onChange={handleChange}
      />
      <input type="number" placeholder="숫자 입력" onChange={handleChange} />
      <input
        type="checkbox"
        onChange={(e) => console.log("Checked:", e.target.checked)}
      />
      <input
        type="radio"
        name="group"
        onChange={(e) => console.log("Radio selected:", e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => console.log("파일 선택:", e.target.files)}
      />
    </div>
  );
}
```

---

### 추가적으로 알아야 할 사항

1. **제어 컴포넌트 vs 비제어 컴포넌트**

   - `useState`와 함께 상태를 관리하는 `<input>`은 **제어 컴포넌트**.
   - `ref`를 사용하여 직접 값을 참조하는 `<input>`은 **비제어 컴포넌트**.

2. **이벤트 취소 (Preventing Default Behavior)**

   ```tsx
   <input type="checkbox" onClick={(e) => e.preventDefault()} />
   ```

   위 코드는 체크박스를 클릭해도 선택되지 않도록 설정합니다.

3. **키보드 이벤트와 함께 사용 가능**

   - `onKeyDown`, `onKeyUp`을 사용하여 입력 이벤트와 조합 가능.

   ```tsx
   <input type="text" onKeyDown={(e) => console.log(`Key pressed: ${e.key}`)} />
   ```

---

### 드래그 앤 드롭 이벤트 처리

#### 개요

모든 `HTMLElement` 요소는 `draggable` 속성을 제공하며, 이를 `true`로 설정하면 해당 요소에서 **드래그 앤 드롭(drag & drop)** 관련 이벤트가 활성화된다.

```html
<h1 draggable>Drag Me</h1>
```

위 코드는 `<h1>` 요소를 드래그할 수 있도록 설정한 예제

---

#### 드래그 앤 드롭 관련 이벤트

드래그 앤 드롭 이벤트는 `DragEvent` 타입의 이벤트 객체를 매개변수로 사용합니다.

| 종류          | 발생 시기                                       | 리액트 이벤트 속성 |
| ------------- | ----------------------------------------------- | ------------------ |
| **dragenter** | 드래그한 요소가 특정 드롭 대상 위로 올라갔을 때 | `onDragEnter`      |
| **dragstart** | 사용자가 요소를 드래그하기 시작했을 때          | `onDragStart`      |
| **drag**      | 요소가 드래그되는 동안 지속적으로 발생          | `onDrag`           |
| **dragover**  | 드래그 대상 위로 지나갈 때 (밀리초마다 발생)    | `onDragOver`       |
| **dragleave** | 드래그한 요소가 드롭 대상에서 벗어났을 때       | `onDragLeave`      |
| **dragend**   | 드래그가 완료되었을 때                          | `onDragEnd`        |
| **drop**      | 드래그한 요소가 드롭 대상 위에 놓였을 때        | `onDrop`           |

---

#### 드래그 앤 드롭 이벤트 예제 (React)

아래 예제는 `div` 요소에서 **드래그 앤 드롭 이벤트를 처리하는 코드**이다.

```tsx
import React, { useState } from "react";

export default function DragDropHandler() {
  const [droppedText, setDroppedText] = useState("");

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", "드래그된 텍스트");
    console.log("Drag Start");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text/plain");
    setDroppedText(text);
    console.log("Dropped: ", text);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // 기본 동작 방지 (drop 이벤트 허용)
  };

  return (
    <div>
      <div
        draggable
        onDragStart={handleDragStart}
        style={{ padding: "10px", background: "lightgray" }}
      >
        Drag Me
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "2px dashed black",
        }}
      >
        Drop Here: {droppedText}
      </div>
    </div>
  );
}
```

#### 설명

1. **`handleDragStart`**: 드래그 시작 시 `dataTransfer.setData`를 사용하여 데이터를 설정한다.
2. **`handleDragOver`**: 기본 동작을 막아 `drop` 이벤트가 정상 작동하도록 한다.
3. **`handleDrop`**: `dataTransfer.getData`를 사용하여 드래그된 데이터를 가져온다

---

</details>

---

<details>
<summary><strong>2. 리액트 컴포넌트 CSS 스타일링 </strong></summary>

# 컴포넌트 스타일링

- 리액트 컴포넌트는 어떤 시점에서는 HTML 요소로 바뀌므로 컴포넌트의 스타일링 또한 CSS를 사용해야 한다. 리액트 프로젝트도 큰 시각에서 보면 index.html 파일에 HTML 코드를 작성하고 <script> 태그 안에 자바 스크립트 코드를 작성하는 일반적인 웹 프런트엔드 개발과 크게 다르지 않다. 이때 CSS는 .css 파일에 담겨 `<link>` 태그의 href 속성에 설정하는 형태로 동작한다.

</details>

---

<details>
<summary><strong>3. 함수 컴포넌트와 리액트 훅 </strong></summary>

## 리액트 훅이란?

리액트 훅은 `useState`, `useEffect` 등 `use`라는 접두사가 포함된 함수들의 집합이다.
리액트 훅 함수는 반드시 **함수형 컴포넌트**에서만 사용해야 한다.

---

## 리액트 훅 종류

| 용도                        | 훅                | 설명   |
| --------------------------- | ----------------- | ------ |
| **컴포넌트 데이터 관리**    | `useMemo`         | 04-2절 |
|                             | `useCallback`     |        |
|                             | `useState`        | 04-3절 |
|                             | `useReducer`      | 07-2절 |
| **컴포넌트 생명 주기 대응** | `useEffect`       | 04-4절 |
|                             | `useLayoutEffect` |        |

---

## 참고

- `useState`, `useReducer` → 상태(state) 관리를 위한 훅
- `useEffect`, `useLayoutEffect` → 컴포넌트 생명주기 대응
- `useMemo`, `useCallback` → 성능 최적화용 훅

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
```
