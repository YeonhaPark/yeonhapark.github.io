---
title: useCallback과 React.memo를 통한 리액트 성능 최적화
date: 2021-11-15
tags: [react, optimization]
---

# React

### useCallback을 통한 성능 최적화


eslint문법을 적용하고 개발을 하다보면 한번씩 react-hooks/exhaustive-deps 에러를 맞닦뜨리는 경험을 하게 된다.

```jsx
const getAllPosts = async () => {
	try {...} catch {...}
}

useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
```

`eslint`가 `dependency` 넣으라고 해서 넣었는데, 위 코드는 infinite loop를 불러일으킨다 ☹️ infinite loop는 왜 생기는걸까?

```jsx
function common() {
  return (a, b) => a * b;
}
const multiply1 = common();
const multiply2 = common();

multiply1 === multiply2; // false 다른 참조값
multiply1 === multiply1; // true 같은 참조값
```

`multiply1`과 `multiply2`는 `common`이라는 같은 함수에서 출발했지만 엄연히 다른 함수 오브젝트이다. 

위의 코드에서도 컴포넌트가 렌더 할때마다 `getAllPosts`라는 함수가 재생성되어 `useEffect`의 실행을 trigger한다. 그리고 이것이 다시 렌더를 일으키고 `getAllPosts`라는 함수가 재생성되고, `useEffect` 실행을 trigger하는 과정이 반복된다. ⇒ Infinite Loop로 이어진다

```jsx
const getAllPosts = async () => {
	try {...} catch {...}
}

useEffect(() => {
    getAllPosts();
  }, [getAllPosts]); // 렌더마다 function이 재생성된다.
```

이런 상황에서 `useCallback`을 쓸 수 있다.

```jsx
const getAllPosts = useCallback(async () => {
    try {
     // ...
    } catch (err) {
     // ...
    }
  }, [searchTag, searchWords]); // dependencies
```

`useCallback`을 사용하면 getAllPosts라는 변수는 리렌더링 중에도 항상 같은 콜백 함수로, 렌더 시마다 재생성되지 않아 useEffect를 트리거하지 않는다. 다만 dependency를 두번째 인자로 넘길 수 있는데, 이 dependency가 바뀔때마다 바뀐다.

`useCallback(fn, deps)` 은 `useMemo(() => fn, deps)` 와 같다.

### React.memo를 통한 성능 최적화

리액트 컴포넌트의 prop이나 state가 바뀔 때 re-rendering이 발생한다. 그리고 그 컴포넌트의 자식들(children)도 리렌더가 된다. 함수형 컴포넌트에서는 자식 컴포넌트가 불필요하게 리렌더링 되는 현상을 방지하기 위해 `React.memo()` 를 쓸 수 있다. (클래스형 컴포넌트에서는 `shouldComponentUpdate()` 로 라이프사이클 제어가 가능하다)

프로그래밍에서 이런 memoization 은 최적화 테크닉으로 자주 쓰인다. 

```jsx
function multiply(a, b) {
	return a * b;
}
```

위 함수에서 a, b 값으로 2, 3 이라는 동일한 값을 입력한다면 어느 시점에 값을 입력하던지 항상 같은 결과가 나올 것이다. memoization은 **같은 인풋**이 반복되는 사항에 대해 **캐시된 결과값**을 리턴한다. 

`Button` 컴포넌트는 `Note` 컴포넌트의 `state`값이 변할때마다 리렌더된다.

```jsx
//...
import Buttom from './Button';

export default function Note() {
	const [words, setWords] = useState('');
	return (
		<div>
			<input onChange={(e) => setWords(e.target.value)} type="text" />
			<Button />
		</div>
	)

}
```

아래 링크에서 `React.memo()` 를 사용한 컴포넌트와 그렇지 않은 컴포넌트의 차이를 확인할 수 있다.

[https://codesandbox.io/s/2x5z13y4p?file=/src/index.js:344-356](https://codesandbox.io/s/2x5z13y4p?file=/src/index.js:344-356)

리액트 컴포넌트의 prop 이나 state가 바뀔 때 리렌더가 된다. 그리고 그 컴포넌트의 자식들도 리렌더가 된다. 클래스형 컴포넌트에서는  shouldComponentUpdate()로 라이프사이클 제어가 가능했는데, 함수형 컴포넌트를 이를 대신하기 위해 React.memo()를 쓸 수 있다. 

참고한글

[https://velog.io/@cjh951114/직무-관련-질문-06.-프런트엔드-성능-최적화란](https://velog.io/@cjh951114/%EC%A7%81%EB%AC%B4-%EA%B4%80%EB%A0%A8-%EC%A7%88%EB%AC%B8-06.-%ED%94%84%EB%9F%B0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94%EB%9E%80)
[https://mingule.tistory.com/66](https://mingule.tistory.com/66)
[https://dmitripavlutin.com/dont-overuse-react-usecallback/](https://dmitripavlutin.com/dont-overuse-react-usecallback/)
[https://reactjs.org/docs/hooks-reference.html#usecallback](https://reactjs.org/docs/hooks-reference.html#usecallback)