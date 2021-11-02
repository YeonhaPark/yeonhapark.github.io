---
title: 간단한 예제를 통해 함수형 프로그래밍 알아가기
date: 2020-04-12
tags: [javascript, functional-programming]
description: 함수형 프로그래밍은 성공적인 프로그래밍을 위해 순수함수를 만들고  모듈화 수준을 높이는 프로그래밍 패러다임이다.
---

*본 포스팅은 유인동님의 강의를 듣고 정리하였습니다.*

함수형 프로그래밍은 성공적인 프로그래밍을 위해 순수함수를 만들고  모듈화 수준을 높이는 프로그래밍 패러다임이다.

### 순수함수란 무엇인가?

- 동일한 인자를 넣으면, 동일한 결과를 리턴한다.
- 평가시점이 중요하지 않다.

```javascript
// 순수함수
function add (a, b) {
  return a + b;
}

// 동일한 인자를 주면 동일한 결과를 리턴한다.
console.log(add(10, 5));
console.log(add(10, 5));
console.log(add(10, 5));
// 부수 효과가 없다. 

// 비순수함수
var c = 10;
function add2(a, b) {
  return a + b + c;
}
console.log('c is 10', add2(2, 2)) // 'c is 10' 14
c = 20; // c 가 상수가 아니라 변수로서 함수 바깥에서 부수효과를 일으킨다.

console.log(add2(2, 2));
console.log(add2(2, 2));
console.log(add2(2, 2));

function add3(a, b) {
  c = b;
  return a + b;
}

// 결과 자체는 동일하지만, 리턴값 외에 다른 방식으로 외부의 상태에 관여한다. 이런 함수를 부수효과가 있는 함수라 한다.
console.log('c:', c);
console.log(add3(20, 30));
console.log('c:', c);
```

### 함수형 프로그래밍을 하는 방식

- Don't

초기 주어진 변수의 값을 함수에서 직접 변화시킨다.

```javascript
  var obj1 = { val: 10 }
  function add4(obj, b) {
    obj1.val += b;
  }
  add4(obj1, 20);
  console.log('obj1', obj1); // 'obj1' { val: 30 }
```

- Do

함수형 프로그래밍에서는 원래의 값은 그대로 두고, 새로운 값을 리턴하는 방식으로 프로그래밍을 한다.
```javascript
  var obj2 = { val: 10 }
  function add5(obj, b) {
    return { val: obj.val + b } // obj.val을 참조만 한다.
  }
  
  add5(obj2, 10); // { val: 20 }
  console.log(obj2.val); // { val: 10 }
```

### 일급함수

자바스크립트에서는 함수가 일급함수이다. 이 말인 즉슨, 함수를 값으로 다룰 수 있다는 뜻이다. 함수를 런타임에서 정의할 수 있고, 들고다닐 수 있고, 인자로 보낼 수 있고, 원할 때 평가할 수 있다.

언제 평가해도 상관이 없는 함수들을 만들고, 그를 들고 다니면서 적절한 시점에 해당 로직을 사용할 수 있는 것이 함수형 프로그래밍이다.
```javascript
  var f1 = function(a) {
    return a * a;
  }
  
  f1(2);
  
  function f3(f) {
    return f();
  }
  
  f3(function() {
    return 10
    }
  ); // 10
  /* f3은 함수를 받아서 함수 내부에서 함수를 평가하고 그 결과를 리턴한다. */
```
```javascript
function add_maker(a) {
  return function(b) { // 1)
    return a + b;
  }
}

var add10 = add_maker(10); 
add10(5); // 15

var add5 = add_maker(5);
add5(7); // 12;
```
이 함수는 클로저이기도 하다. add10이 선언되는 순간 이는 function(b) { ...} 만을 포함하지만, 상위 스코프인 a를 참조하기 때문이다. a를 사용하고 있지만, a를 변경하지 않고 항상 동일한 값의 a를 이용하므로 add_maker는 순수함수이다.
```javascript

function f4(f1, f2, f3) {
  return f3(f1() + f2());
}

f4(
  function() { return 2; },
  function() { return 1; },
  function(a) { return a * a } // f3은 인자를 받으므로
)
````

함수가 어떤 함수들을 인자로 받아서 **원하는 로직대로 원하는 시점에 평가**하고 **원하는 인자를 적용**하면서 로직을 완성해 나가는 것이 함수형 프로그래밍의 특징이다.

객체지향 프로그래밍 VS 함수형 프로그래밍 간단한 비교
```javascript
  // OOP
  duck.moveLeft();
  duck.moveRight();
  dog.moveLeft();
  dog.moveLeft();
  
  // FP
  moveLeft(dog);
  moveRight(duck);
  moveLeft({ x: 5, y: 2 });
  moveRight(dog);
```

### 예제를 통한 함수형 프로그래밍 학습
다음과 같이 유저들의 id, name, age 정보를 지닌 객체가 있다. 이 객체를 가공하는 프로그램을 함수형과 함수형이 아닌 예제로 비교해보자. 다음과 같이 5명의 유저 정보를 담은 객체 어레이가 있다고 하자. 이 객체를 주어진 조건에 맞게 필터하거나, 매핑하는 함수를 만들어 볼 것이다. 
```javascript
    var users = [
      { id: 1, name: 'ID', age: 36 },
      { id: 2, name: 'BJ', age: 24 },
      { id: 3, name: 'RM', age: 19 },
      { id: 4, name: 'V', age: 30 },
      { id: 5, name: 'CL', age: 26 },
    ]
```
- 비함수형
함수형 프로그래밍을 적용하지 않은 경우에는 다음과 같이 전개될 것이다.

```javascript
// 1. 30세 이상인 users를 거른다.
const temp_users = [];

for (let i = 0; i < users.length; i ++) {
  if (users[i].age >= 30) {
    temp_users.push(users[i]);
  }
}

console.log(temp_users);

// 2. 30세 이상인 users의 names를 수집한다.

var names = [];

for (var i = 0; i < temp_users.length; i++) {
  names.push(temp_users[i].name);
}

console.log(names);

// 3. 30세 미만인 user를 거른다.
var temp_users2 = [];

for (var i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    temp_users2.push(users[i]);
  }
}

console.log(temp_users2);

// 4. 30세 미만 유저의 나이를 수집한다.
var ages = [];

for (var i = 0; i < temp_users2.length; i++) {
  ages.push(temp_users2[i].age)
}

console.log(ages);
```

- 함수형
비함수형 프로그래밍에서 주어진 과제에 맞춰 그때마다 필요한 로직을 for문과 push 메서드를 통해 전개해나가는데, 한눈에 보기에도 중복되는 로직이 많이 보이며, DRY(Do Not Repeat Yourself) 원칙에 위배되는 것을 알 수 있다. 함수형 프로그래밍에서는 _filter 함수와 _map 함수를 정의하여 반복되는 로직을 최소화하고 재활용 가능성에 초점을 맞춘다. 

```javascript
function _filter(users, predi) {
  var newList = [];
  for (var i = 0; i < users.length; i++) {
    // 어떤 조건일때 넣을 것인지 완전히 위임
    if (predi(users[i])) {
      newList.push(users[i]);
    }
  }
  return newList;
}

function _map(users, mapper) {
  var newList = [];
  for (var i = 0; i < users.length; i ++) {
    newList.push(mapper(users[i])) // 무엇을 수집해서 넣을것인지 완전히 위임
  }
  return newList;
}

// 응용형 함수. 함수가 함수를 받아서 원하는 시점에 평가를 하면서 로직을 완성해나간다. 
// 1. 30세 이상인 users를 거른다.
const usersOver30 = _filter(users, function(val) {
  return val.age  >= 30;
})

// 2. 30세 이상인 users의 names를 수집한다.
_map(usersOver30, function(user) { return user.age });

// 3. 30세 미만인 user를 거른다.
const usersUnder30 = _filter(users, function(val) {
  return val.age < 30;
})

// 4. 30세 미만 유저의 나이를 수집한다.
_map(usersUnder30, function(user) {return user.age});
```

여기서 _filter, _map 함수의 중복되는 부분도 함수로 추상화할 수 있다.

```javascript
const _each = (list, each) => {
  for (let i = 0; i < list.length; i++ ) {
    each(list[i])
  }
  return list;
}

const _filter = (elements, predi) => {
  const arr = [];
  _each(elements, (el) => {
    if (predi(el)) {
      arr.push(el);
    }
  })
  return arr;
}

const _map = (elements, mapper) => {
  const arr = [];
  _each(elements, (el) => {
    arr.push(mapper(el));
  })
  return arr;
}

// 1. 30세 이상인 users를 거른다.
const usersOver30 = _filter(users, user => user.age >= 30);
// [ { id: 1, name: 'ID', age: 36 }, { id: 4, name: 'V', age: 30 } ]

// 2. 30세 이상인 users의 이름을 수집한다.
_map(usersOver30, user => user.name);

// 3. 30세 미만인 user를 거른다.
const usersUnder30 = _filter(users, user => user.age < 30);

// 4. 30세 미만 유저의 나이를 수집한다.
_map(usersUnder30, user => user.age);

```

### 다형성(Polymorphism)

위 예제를 맨 처음 접하면서 이런 생각도 잠시 들었다. map, filter 기능은 이미 자바스크립트에서 어레이 형태의 자료 구조에 제공하는 메서드로 구현할 수 있는데, 왜 _map, _filter 함수를 굳이 만드는 걸까?

스크립트에는 _map, _filter 기능을 하는 map, filter 메서드가 존재한다. 그러나 이들은 함수가 아닌 메서드이다. 메서드는 객체 상태에 따라 변화할 수 있고, 메서드는 객체지향 프로그래밍이다. (객체 지향 프로그래밍과 함수형 프로그래밍을 구분짓는 큰 특징은 상태(state)의 유무인데, 객체지향 프로그래밍의 취약점 중 하나가 객체가 상태를 지님에서 발생하는 버그 발생 가능성이다.)

```javascript
['한놈', '두시기','석삼','너구리','오징어'].map(el => el * 2); 
['한놈', '두시기','석삼','너구리','오징어'].filter(el => el % 2);
//map, filter는 ['한놈', '두시기','석삼','너구리','오징어']에 종속적인 메서드이다.
```

```javascript
console.log(document.querySelectorAll('*').map(node => node.nodeName)); 
// Uncaught TypeError: document.querySelectorAll(...).map is not a function
```
`document.querySelectorAll('*')` 을 실행할 때 어레이 형태의 response가 나오지만, 이에 map 메서드를 사용하고자 하려면 에러를 리턴한다. 왜냐하면 해당 객체는 어레이가 아닌 array-like 객체이기 때문이다. 이처럼 map 등의 메서드, 객체지향 프로그래밍은 형(type)에 제약성을 가진다.

위의 코드를 우리가 방금 생성한 _map 함수로 적용하면 문제를 깔끔히 없앨 수 있다.
```javascript
_map(document.querySelector('*'), node => node.nodeName)
```

_map은 들어오는 인자가 length가 있고 그에 맞는 값들이 달려져 있는 key-value 쌍의 객체라면, array-like고, array-like 면 _map, _filter, _each에서는 모두 동작하게 된다.