---
title: 자바스크립트 This, call / apply / bind 메서드에 대해 정리
date: 2020-11-14
tags: [javascript]
description: "코어 자바스크립트를 읽고 this에 대해 다시 정리해보았다"
---

본 포스팅은 정재남씨의 코어자바스크립트를 읽고 정리한 내용입니다.

# This

자바스크립트의 this는 실행 컨텍스트가 생성될 때 함께 결정된다. 실행 컨텍스트는 함수를 호출할 때 생성되므로 결국 this는 함수를 호출할 때 결정된다.

### 전역 공간에서의 this

전역 공간에서 this는 전역 객체를 가리킨다. 브라우저 환경에서 전역 객체는 window이고 Node.js 환경에서는 global이다.

- 전역 공간에서의 this(브라우저 환경)

```jsx
console.log(this === window); // true
```

- 전역 공간에서의 this(Node.js 환경)

```jsx
console.log(this === global); // true
```

자바스크립트의 모든 변수는 실은 특정 객체의 프로퍼티로서 동적하는데, 사용자가 var 연산자를 이용해 변수를 선언하더라도 실제 자바스크리븥 엔진은 어떤 특정 객체의 프로퍼티로 인식하기 때문이다. 여기서 특정 객체란 실행 컨텍스트의 Lexical Environment를 일컫는다. 실행 컨텍스트는 변수를 수집해서 Lexical Environment의 프로퍼티로 저장한다.

### 메서드로 호출할 때 그 메서드 내부에서의 this

함수를 실행하는 방법 중 가장 일반적인 방법 두 가지는 함수로서 호출하는 경우와 메서드로서 호출하는 경우이다. 함수는 그 자체로 독립적인 기능을 수행하는 반면, 메서드는 자신을 호출한 대상 객체에 관한 동작을 수행한다.

```jsx
var func = function (x) {
  console.log(this, x);
};
func(1); // (1) Window { ... } 1

var obj = { method: func };
obj.method(2); // (2) {method: f } 2
```

(1)과 (2) 모두 var로 선언된 함수 func을 참조한다. 그러나 this가 가리키는 객체는 각각 window와 obj로 달라진다. 어떤 함수를 메서드로서 호출하는 경우 호출 주체는 함수명(프로퍼티명) 앞의 객체이다. 따라서 this가 해당 객체를 가리키게 된다.

### 함수로서 호출할 때 그 함수 내부에서의 this

어떤 함수를 함수로서 호출할 경우에는 객체 지향 언어에서의 객체를 명시하지 않고 개발자가 직접 코드에 관여해서 실행한 것이기 때문에 호출 주체의 정보를 알 수 없다. 따라서 this가 지정되지 않는다. this가 지정되지 않은 경우 this는 전역 객체를 바라본다. 예를 통해 이해해보자.

```jsx
var obj1 = {
  outer: function () {
    console.log(this); // obj1
    var innerFunc = function () {
      console.log(this); // window
    };
    innerFunc();

    var obj2 = {
      innerMethod: innerFunc,
    };
    obj2.innerMethod(); // obj2
  },
};

obj1.outer();
```

이렇듯 메소드로서가 아니라 함수로서 this가 호출되게 되면 전역 객체를 가리켜버리기 때문에 변수를 지정하여 this를 우회하는 방법이 대중적으로 쓰이고 있다.

```jsx
var obj = {
  outer: function() {
    console.log(this); // obj
    var innerFunc1 = function() {
      console.log(this); // window
    }
    innerFunc1();

    var self = this;
    var innerFunc2 = function {
      console.log(self);
    }
    innerFunc2(); // obj
  }
}

obj.outer();
```

ES6에서는 화살표함수가 도입되어 위와 같이 self 같은 변수를 사용하지 않고도 상위 스코프의 this를 그대로 활용할 수 있는 방법이 마련되었다. 화살표 함수는 실행 컨텍스트를 생성할 때 this 바인딩 과정 자체가 빠지게 되어 상위 스코프의 this를 그대로 활용할 수 있다.

```jsx
var obj = {
  outer: function() {
    console.log(this); // obj
    var innerFunc1 = () => {
      console.log(this); // obj
    }
    innerFunc1();
}

obj.outer();
```

### 명시적으로 this를 바인딩하는 방법

- call 메서드

  call 메서드의 첫 번째 인자를 this로 바인딩하고 이후의 인자들을 호출할 함수의 매개변수로 사용한다.

  ```jsx
  var func = function (a, b, c) {
    console.log(this, a, b, c);
  };

  func(1, 2, 3); // window 1 2 3
  func.call({ x: 1 }, 4, 5, 6); // { x: 1 } 4 5 6
  ```

  메서드에 대해서도 마찬가지로 call 매서드를 이용하여 임의의 객체를 this로 지정할 수 있다.

  ```jsx
  var obj = {
    a: 1,
    method: function (x, y) {
      console.log(this.a, x, y);
    },
  };

  obj.method(2, 3); // 1 2 3
  obj.method.call({ a: 4 }, 5, 6); // 4 5 6
  ```

- apply 메서드

  call 메서드와 기능적으로 동일하다. 단지 apply의 경우는 두 번째 인자를 배열로 받아 그 배열의 요소들을 호출할 함수의 매개변수로 지정한다는 점에서 차이가 있다.

  ```jsx
  var func = function (a, b, c) {
    console.log(this, a, b, c);
  };

  func.apply({ x: 1 }, [4, 5, 6]); // {x: 1} 4 5 6

  var obj = {
    a: 1,
    method: function (x, y) {
      console.log(this, x + y);
    },
  };

  obj.method(2, 3); // {a: 1} 5
  obj.method.apply({ b: 2 }, [3, 4]); // {b:2} 7
  ```

### call / apply 메서드의 활용

객체에는 배열 메서드를 직접 적용할 수 없다. 하지만 키가 0 또는 양의 정수인 프로퍼티가 존재하고 length 프로퍼티의 값이 0 또는 양의 정수인 객체, 즉 array-like 객체의 경우 call 또는 apply 메서드를 이용해 배열 메서드를 차용할 수 있다.

```jsx
var obj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

Array.prototype.push.call(obj, "d");
console.log(obj); // { '0': 'a', '1': 'b', '2': 'c', '3': 'd', length: 4 }

var arr = Array.prototype.slice.call(obj);
console.log(arr); // ['a', 'b', 'c', 'd']
```

함수 내부에서 접근할 수 있는 arguments 객체도 유사배열객체이므로 위의 방법으로 배열로 전환해서 사용할 수 있다.

```jsx
function a() {
  var argv = Array.prototype.slice.call(arguments);
  argv.forEach((el) => console.log(el));
}

a(1, 2, 3); // 1 2 3
```

querySelectorAll, getElementsByClassName 등의 Node 선택자로 선택한 결과인 NodeList도 마찬가지이다.

```jsx
document.body.innerHTML = "<div>a</div><div>b</div><div>c</div>";
var nodeList = document.querySelectorAll("div"); // nodeList는 array-like 객체
var nodeArr = Array.prototype.slice.call(nodeList);
nodeArr.forEach(function (node) {
  console.log(node);
});
```

배열처럼 인덱스와 length 프로퍼티를 갖는 문자열에 대해서도 마찬가지인데, 문자열의 경우 length 프로퍼티가 읽기 전용이기 때문에 원본 문자열에 변경을 가하는 메서드(push, pop, shift, unshift, slice 등)는 에러를 던지며 concat 처럼 대상이 반드시 배열이어야 하는 경우 에러는 나지 않지만 제대로된 결과를 얻을 수 없다.

```jsx
const str = "abcde efg";

const arr = Array.prototype.slice.call(str);
console.log(arr); // [ 'a', 'b', 'c',  'd', 'e', ' ',  'e', 'f', 'g' ];
Array.prototype.every.call(str, (el) => el !== ""); // true
```

이런 식으로 this의 call / apply 메서드를 이용하여 유사배열객체를 배열로 변환하는 방법이 종종 이용되지만 ES6에서 유사배열객체 또는 순회 가능한(iterable) 모든 종류의 데이터 타입을 배열로 전환(얕은 복사)하는 Array.from 메서드를 사용하면 간편하게 개발자의 목적을 달성할 수 있다.

```jsx
console.log(Array.from("foo"));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], (x) => x + x));
// expected output: Array [2, 4, 6]
```

### bind 메서드

바로 this를 넘겨받아 호출하는 call과는 달리 bind는 넘겨받은 this 및 인수들을 바탕으로 새로운 함수를 반환하기만 한다. 예를 통해 살펴보자.

```jsx
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};
func(1, 2, 3, 4); // Window {...} 1 2 3 4
var bindFunc1 = func.bind({ x: 1 });
bindFunc1(5, 6, 7, 8); // {x:1} 5 6 7 8
```

### 화살표 함수

ES6에 도입된 화살표 함수에는 실행 컨텍스트 생성 시 this를 바인딩하는 과정이 제외되었다. 따라서 화살표 함수 내에서 this에 접근하고자 하면 스코프체인 상 가장 가까운 this에 접근하게 된다.

```jsx
var obj = {
  outer: function () {
    console.log(this); // { outer: [Function: outer] }
    var innerFunc = () => {
      console.log(this); // { outer: [Function: outer] }
    };
    innerFunc();
  },
};

obj.outer();
```
