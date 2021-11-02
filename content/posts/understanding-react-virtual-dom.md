---
title: React Virtual DOM 이해하기
date: 2021-01-17
tags: [react, virtual-dom]
description: 왜 가상돔이 효율적인지 그리고 리액트의 기본 구조가 어떻게 동작하는지에 대해 정리
---

_본 포스팅은 우아한 테크 코스의 김민태님 강의를 듣고 정리하였습니다._

+왜 가상돔이 효율적인지에 대해

리액트는 현대 모던 웹 개발 프레임워크 중에 가장 유명하고, 가장 많이 쓰이는 도구이다. 흔히들 별다른 고민 없이 제일 많이 쓰이니까, 내 회사에서 사용하는 프레임워크라서 리액트를 사용하고 있지만, 리액트의 사상을 제대로 이해하고 나서 리액트를 사용하는 것과 그러지 않는 것 사이의 간극은 분명히 존재할 것이다.

우아한 테크 러닝 2주차 강의에서는 이러한 리액트의 사상을 이해하기 위해 핵심적인 부분만 직접 구현해보는 소중한 시간을 가질 수 있었다.

우선 리액트는 Virtual DOM이라는 구조를 가지고 real DOM과 비교하여 변화가 일어나는 부분만 업데이트를 치기 때문에 효율적이라는 설명은 다들 한번쯤 들어보았으리라 생각한다. 하지만 좀 더 자세히 왜 리액트의 가상 돔 구조가 효율적인지 우선 정리해보도록 하자.

DOM을 직접 조작하기 위해 노드를 더하거나 제거하게 되면 DOM이 변화할 때마다 브라우저는 배치(Layout) 작업을 수행해야 한다. DOM이 변화할 때마다 브라우저는 CSS를 다시 계산하고 레이아웃을 그리고 페이지를 다시 색칠해야 한다. 이 과정에 시간이 든다. **화면을 다시 그리게 만드는 돔의 변화를 최소화하려는 고민이 추상화되어 리액트의 가상돔 아이디어로 발전하였다.**

### React Virtual DOM 이해하기

리액트의 기본적인 구조는 아래와 같다.

```jsx
import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <div>
      <h1>Hello?</h1>
      <ul>
        <li>React</li>
        <li>Redux</li>
        <li>MobX</li>
        <li>Typescript</li>
      </ul>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

ReactDOM의 메서드 render에는 두 개의 인자가 들어가는데, 첫째 인자는 렌더링할 요소(element)이며 두번째 인자는 해당 요소가 들어갈 컨테이너이다. 그런데 첫째 줄에 `React`를 임포트하고 있지만 코드 어느 부분에도 React를 활용하는 부분이 없어 보인다. 과연 그럴까?

위 코드를 바벨([https://babeljs.io/repl](https://babeljs.io/repl))에 들어가서 트랜스컴파일 해보면 아래 코드로 변환된다.

```jsx
"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function App() {
  return /*#__PURE__*/ _react.default.createElement(
    "div",
    null,
    /*#__PURE__*/ _react.default.createElement("h1", null, "Hello?"),
    /*#__PURE__*/ _react.default.createElement(
      "ul",
      null,
      /*#__PURE__*/ _react.default.createElement("li", null, "React"),
      /*#__PURE__*/ _react.default.createElement("li", null, "Redux"),
      /*#__PURE__*/ _react.default.createElement("li", null, "MobX"),
      /*#__PURE__*/ _react.default.createElement("li", null, "Typescript")
    )
  );
}

_reactDom.default.render(
  /*#__PURE__*/ _react.default.createElement(App, null),
  document.getElementById("root")
);
```

JSX 문법이 createElement 함수로 변환되었고, 자식 태그는 부모 createElement의 세번째 인자로 트리구조로 들어가면서 계속 상위 createElement함수가 createElement함수를 품고 있는 형태이다. 즉, 각각의 `JSX` 요소들은 `createElement` 를 호출하기 위한 syntactic sugar일 뿐이다. createElement 함수는 첫번째 인자로 태그 요소를 받고, 두번째 인자로 props를 받으며, 세 번째 인자로 요소에 포함될 요소를 받는다.

이번에는 StudyList라는 컴포넌트를 따로 생성하고 JSX에 넣어주었다.

```jsx
import React from "react";
import ReactDOM from "react-dom";

function StudyList() {
  return (
    <ul>
      <li>React</li>
      <li>Redux</li>
      <li>MobX</li>
      <li>Typescript</li>
    </ul>
  );
}

function App() {
  return (
    <div>
      <h1>Hello?</h1>
      <StudyList />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

이를 바벨로 트랜스파일링 한 결과는 아래와 같다.

```jsx
"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function StudyList() {
  return /*#__PURE__*/ _react.default.createElement(
    "ul",
    null,
    /*#__PURE__*/ _react.default.createElement("li", null, "React"),
    /*#__PURE__*/ _react.default.createElement("li", null, "Redux"),
    /*#__PURE__*/ _react.default.createElement("li", null, "MobX"),
    /*#__PURE__*/ _react.default.createElement("li", null, "Typescript")
  );
}

function App() {
  return /*#__PURE__*/ _react.default.createElement(
    "div",
    null,
    /*#__PURE__*/ _react.default.createElement("h1", null, "Hello?"),
    /*#__PURE__*/ _react.default.createElement(StudyList, null)
  );
}

_reactDom.default.render(
  /*#__PURE__*/ _react.default.createElement(App, null),
  document.getElementById("root")
);
```

`App()` 함수에서 `<StudyList />` 를 변환하는 부분을 보면 태그가 들어간 다른 createElement 함수는 바벨에 의해 인자가 스트링 타입으로 변환되는 것과 달리 StudyList라는 함수를 그대로 전달해준다. 이는 바벨 상에서 React.createElement의 첫번째 인자가 대문자인 경우 함수로 넘기고, 소문자인 경우 문자열 태그라고 넘기는 정책을 가지고 있기 때문이다. **따라서 리액트의 컴포넌트는 반드시 대문자로 시작한다.**

추가로 이번엔 (바닐라) 자바스크립트와 리액트를 비교해보자.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
    <style>
      picture {
        display: flex;
        flex-direction: column;
        width: 100px;
        text-align: center;
        margin-bottom: 30px;
      }
      img {
        border-radius: 50%;
        width: 100px;
        height: auto;
        box-shadow: 0 0 15px #999;
        margin-bottom: 15px;
      }

      img.disabled {
        opacity: 0.3;
      }
    </style>
  </head>

  <body>
    <h1>Employees of this month</h1>
    <div id="app"></div>
    <script>
      var $app = document.getElementById("app");

      const Avatar = (params) => {
        const src = `https://randomuser.me/api/portraits/men/${params.id}.jpg`;
        return `<picture><img src="${src}" /></picture>`;
      };
      const avatarArr = [
        { id: 75, name: "Gale" },
        { id: 76, name: "Vincent" },
      ];
      avatarArr.forEach((avatar) => ($app.innerHTML += Avatar(avatar)));

      $app.querySelectorAll("img").forEach((img) => {
        img.addEventListener("click", () => {
          img.classList.toggle("disabled");
        });
      });
    </script>
  </body>
</html>
```

위 코드는 랜덤 유저들의 사진을 나열하는 단순한 웹 페이지이다. [codesandbox](https://codesandbox.io/s/employees-of-this-month-vanilajs-uh7st?file=/index.html:0-1190)

JSX 없는 리액트로 작성하면 아래 코드와 같다. [codesandbox](https://codesandbox.io/s/employees-of-this-month-react-wxcye?file=/index.html:932-1016)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
    <style>
      picture {
        display: flex;
        flex-direction: column;
        width: 100px;
        text-align: center;
        margin-bottom: 30px;
      }
      img {
        border-radius: 50%;
        width: 100px;
        height: auto;
        box-shadow: 0 0 15px #999;
        margin-bottom: 15px;
      }

      img.disabled {
        opacity: 0.3;
      }
    </style>
    <script
      crossorigin
      src="https://unpkg.com/react@17/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"
    ></script>
  </head>

  <body>
    <h1>Employees of this month</h1>
    <div id="app"></div>

    <script>
      var $app = document.getElementById("app");
      const h = React.createElement;
      const handleClick = (e) => {
        e.target.classList.toggle("disabled");
      };
      const Avatar = (params) => {
        const src = `https://randomuser.me/api/portraits/men/${params.id}.jpg`;
        return h(
          "picture",
          null,
          h("img", { src, id: params.id, onClick: handleClick })
        );
      };
      ReactDOM.render(
        h("div", null, [h(Avatar, { id: 75 }), h(Avatar, { id: 76 })]),
        $app
      );
    </script>
  </body>
</html>
```

JSX가 자바스크립트와 html가 혼합된 형태라고 알고 있는 사람들이 많은데 이는 잘못된 생각이다. JSX는 자바스크립트이고 babel에 의해 React.createElement라는 함수로 트랜스파일된다. `React.createElement`에 대한 공식 설명은 [여기](https://reactjs.org/docs/react-api.html#createelement)에서 찾을 수 있다.
