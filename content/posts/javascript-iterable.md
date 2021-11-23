---
title: JavaScript Iterable
date: 2021-11-23
tags: [javascript, iterable]
description: 객체에 Symbol.iterator 속성을 적용하여 자바스크립트의 어떤 콜렉션도 반복 가능한 객체로 만들 수 있다.
---
Iterable은 ES6의 등장과 함께 자바스크립트의 어떤 콜렉션도 for..of loop를 사용하여 반복 가능한 객체로 만들어주는 유용한 기능이다.

객체의 `Symbol.iterator` 키값에 특정 형태의 함수가 들어있다면, 이를 반복 가능한 객체(iterable object) 혹은 줄여서 iterable이라 부르고, 해당 객체는 iterable protocol을 만족한다고 말한다.

자바스크립트에서 built-in으로 내장 iterable 특징을 갖고 있는 자료구조들은 다음과 같다.

- String
- Array
- TypedArray
- Map
- Set

어떤 객체가 Iterable이라면, 그 객체에 대해서 아래의 기능을 사용할 수 있다.

- for...of loop
- spread 연산자
- 구조분해
- 기타 iterable을 인수로 받는 함수

위에 언급한 built-in iterable에 해당되지 않는 오브젝트에서 이터러블을 만드는 방법은 아래와 같다.

### Iteration Protocol

- 오브젝트에 Symbol.iterator 메서드를 추가한다.
- Symbol.iterator 메서드는 **next 메서드를 포함하는 iterator(오브젝트)를 리턴**한다**.**
- next()가 리턴하는 밸류는 반드시 `{done: Boolean, value: any}` 형태를 갖춰야 한다. `value`는 현재 값의 상태를 나타내며, `done` 은 반드시 불리언 값을 지닌다. `done=true` 일 경우는 iteration이 끝났다는 뜻이다.
- for...of 루프가 시작되면, 이 루프는 위 메서드를 한번 호출한다. 이제 for..of는 리턴된 오브젝트 상에서 작동한다.

```js
let range = {
  from: 1,
  to: 5
}

range[Symbol.iterator] = function() {
  return {
    current: this.from,
    last: this.to,
    next() {
      if (this.current <= this.last) {
        return {
          done: false,
          value: this.current++
        }
      } else {
        return {
          done: true
        }
      }
    }
  }
}

// 1) for..of
for (let num of range) {
  console.log(num);
}

// 1
// 2
// 3
// 4
// 5

// 2) spread 연산자
const newRange = {...range, middle: '3'}
console.log(newRange); 
// { from: 1, to: 5, middle: '3', [Symbol(Symbol.iterator)]: [Function] }
const newArr = [...range, 10, 11];
console.log(newArr);
// [1, 2, 3, 4, 5, 10, 11]

// 3) 구조분해할당
const {from: beginning, to: last} = range
console.log(beginning, 'beginning'); // 1 'beginning'

// 4) 기타 iterable을 인수로 받는 함수
Array.from(range); // [1, 2, 3, 4, 5]
```

위의 Symbol.iterator 속성에 저장되어 있는 함수는 iterator 객체를 반환하고 있다. 여기서 iterator 객체는 **특별한 조건(iteratation protocol)**을 만족하는 객체이다.

### 다른 예시
```js
// menu 오브젝트의 메뉴 이름만 반복해서 돌리고 싶을때
const menu = {
  salads: ['Quinoa Chicken Salad', 'Santa Fe Spicy', 'Capri Paradise'],
  burger: ['Crab Heaven', 'Classic Burger', 'Spicy Chicken Burger'],
  juice: ['Orange Juice', 'Carrot & Apple Juice']
};

menu[Symbol.iterator] = function() {
  const keysArr = Object.keys(this);
  const flattened = keysArr.reduce((acc, cur) => acc.concat(this[cur]), [])
  return {
    current: 0,
    to: flattened.length,
    next() {
      if (this.current < flattened.length) {
        return {
          done: false,
          value: flattened[this.current++]
        }
      } else {
        return { done: true }
      }
    }
  }
}
// looping through menu
for (let m of menu) {
  console.log(m)
}

/*
'Quinoa Chicken Salad'
'Santa Fe Spicy'
'Capri Paradise'
'Crab Heaven'
'Classic Burger'
'Spicy Chicken Burger'
'Orange Juice'
'Carrot & Apple Juice'
*/
```

<br>
<br>

참조한 사이트
<br>
[https://javascript.info/iterable](https://javascript.info/iterable)
<br>
[https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e](https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e)