---
title: React-redux) 리액트-리덕스에서 비동기 액션을 처리하는 방법
date: 2019-09-22
tags: [react, redux]
description: Redux에서 비동기 처리를 위해 미들웨어를 사용해야 하는 이유
---

비동기를 redux에서 사용하려면 redux-thunk등의 비동기 처리를 위한 미들웨어를 추가로 사용해주어야 한다.

코드를 예로 들면서 왜 비동기 처리가 redux 미들웨어를 필요로 하는지 차근차근 이해해 보자.

```javascript

// src/actions/index.js

// 이 코드는 맞지 않는 코드이다.

import someAPIaddr from '../apis/jsonPlaceholder';

export const fetchPosts = async () => {
  const res = await someAPIaddr.get('/posts');
  return {
    type: 'FETCH_POSTS',
    payload: res
  });
};
```

API 호출하는 함수를 action creator로 정의하였다. 하지만 위 코드는 에러를 발생시킨다. 리덕스의 액션(actions)은 순수한 자바스크립트 객체를 리턴해야하는 것이 원칙이지만 위의 값이 리턴하는 것은 순수한 자바스크립트 객체가 아니기 때문이다.

분명히 `{}` 로 둘러쌓여 있는 객체 형태인데, 왜 순수한 자바스크립트 객체가 아니라고 하는 걸까?

그 이유는 위 코드가 async await syntax로 쓰여져 있기 때문이다.

ES6 이후 버젼으로 쓰여진 코드를 Babel을 이용하여 ES5 버젼으로 컴파일해보자. (우리가 쓰는 코드는 그 형태 그대로 브라우저에 올라가는 것이 아니고 Babel 이라는 컴파일 도구를 통해 브라우저가 이해할 수 있는 ES5 버젼으로 변환되어 올라간다.)

![babeles5](../../static/media/09-22.png)

위 코드를 복사하여 ES2015 버전으로 변환해보았다. 왼쪽의 10줄 남짓한 코드가 실제로는 오른쪽의 암호같은 복잡한 코드로 이해되는 것이다. ([https://babeljs.io/repl](https://babeljs.io/repl) 에서 실제로 확인 가능하다)

오른쪽의 코드를 자세히 보면 switch문이 있고 case 0, case 2라고 적힌 코드가 보인다. case 0에서 리턴하는 값은 오브젝트가 아니라 `_jsonPlaceholer.default.get('/posts');` 라고 적힌 호출 코드이다. 따라서 비동기 함수를 그대로 쓴다면 action creator가 리턴하는 값에는 api 호출(request)가 있는 것이고, 순수한 객체가 아니기 때문에 에러를 발생시키는 것이다. (Error: Actions must be plain objects. Use custom middleware for async actions.)

그럼 async await 를 코드에서 제거하면 에러가 사라지고 앱이 잘 동작할까?

```javascript

// src/actions/index.js

// async await를 제거하고, 그냥 promise를 리턴하는 action creator

import someAPIaddr from '../apis/jsonPlaceholder';

export const fetchPosts = () => {
  const promise = someAPIaddr.get('/posts');
  return {
    type: 'FETCH_POSTS',
    payload: promise
  });
};
```

답은 '그렇지 않다' 이다. 컴포넌트 단에서 action creator가 호출되고, action creator에서 action이 리턴되고 reducer에 전달되는 순간에 아직 프로미스는 pending 상태이기 때문이다.

**action creator → action → dispatch → reducers → state**

이즘에서 액션 크리에이터는 다음 두 가지로 분류해 볼 수 있을 것 같다.

1. Synchronous action creator
2. Asynchronous action creator

asynchronous action creator를 리덕스에서 작동하고 싶다면 미들웨어를 사용하면 된다.

**미들웨어란?**

- 미들웨어는 액션이 디스패치되는 모든 순간 호출되는 함수이다.
- 액션을 수정하거나, 멈추거나 등등 액션을 가지고 장난을 칠 수 있다 (모든 디스패치되는 액션을 콘솔로 찍는다거나)
- 엄청나게 많은 선택지의 미들웨어가 존재한다.
- 미들웨어를 쓰는 가장 큰 이유는 비동기 처리를 위해서이다. (즉 다른 종류의 미들웨어도 존재)

가장 많이 쓰이는 미들웨어는 redux-thunk이고, 여기서도 redux-thunk를 쓸 것이다.

redux-thunk의 기능은 생각외로 매우 간단한데, 실질적인 기능은 action이 객체면 객체를 리턴하고, action이 함수 형태면 그 함수를 실행하는 역할이 다라고 할 수 있다.

아래 코드는 redux-thunk github에서 redux-thunk의 한 파일 전체를 복사한 것이다. 아래 링크로 들어가면 src 폴더 밑에 파일은 두개밖에 없다.

[https://github.com/reduxjs/redux-thunk/tree/master/src](https://github.com/reduxjs/redux-thunk/tree/master/src)

```javascript
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === "function") {
      // 함수이면 실행
      return action(dispatch, getState, extraArgument);
    }

    return next(action); // 아닌 경우 다른 처리
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

redux-thunk는 주어진 액션이 함수인 경우 `dispatch` 함수와 `getState` 함수에 해당 함수를 아규먼트로 보내서 호출한다. 그리고 redux-thunk 함수 안에서 비동기 호출의 리스폰스가 결정되기를 기다린다. 리스폰스를 받으면 마침내 그 결과(액션)을 가지고 직접 디스패치 함수를 호출할 수 있다.(action creator가 다시 생성) 이 새로운 action creator는 이제 순수한 자바스크립트 객체를 리턴할 것이고 위의 코드와 같은 로직 덕분에 해당 객체는 리듀서로 전달될 것이다.
