---
title: JavaScript 프로토타입
date: 2021-01-16
tags: [prototype, javascript]
description: 자바스크립트의 함수 원형(prototype)이 어떻게 프로퍼티와 메서드를 인스턴스에 전달하는지에 대해
---

본 포스팅은 정재남씨의 코어자바스크립트를 읽고 정리한 내용입니다.

### 자바스크립트와 프로토타입

자바스크립트는 프로토타입(prototype) 기반 언어이다. 클래스 기반 언어에서는 '상속'을 사용하지만 프로토타입 기반 언어에서는 어떠한 객체를 원형(prototype)으로 삼고 이를 참조함으로써 상속과 비슷한 효과를 얻는다. 프로토타입은 메서드나 프로퍼티를 넘겨주기 위해 자바스크립트가 이용하는 방법이며, 모든 자바스크립트 오브젝트는 프로토타입 프로퍼티를 지닌다.

어떤 생성자 함수(Constructor)를 new 연산자와 함께 호출하면 → Constructor에서 정의된 내용을 바탕으로 새로운 인스턴스instance가 생성된다 → 이때 instance에는 `__proto__` 라는 프로퍼티가 자동으로 부여되는데, 이 프로퍼티는 Constructor의 prototype이라는 프로퍼티를 참조한다.

```jsx
function Person(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
}

const john = new Person("john", 1988, "teacher");
console.log(john);
// Person {
//  name: 'john',
//  yearOfBirth: 1988,
//  job: 'teacher',
//  ___proto__: Person { constructor: ƒ Person() }
// }

Person.prototype.introduceMySelf = function () {
  return `Hello, my name is ${this.name}. I was born in ${this.yearOfBirth} and I am working as a ${this.job}`;
};
console.log(john);
// Person {
//  name: 'john',
//  yearOfBirth: 1988,
//  job: 'teacher',
//  ___proto__: Person { constructor: ƒ Person(), introduceMySelf: ƒ () }
// }
john.introduceMySelf();
// 'Hello, my name is john. I was born in 1988 and I am working as a teacher'
```

여기서 Person의 인스턴스인 john은 `__proto__` 프로퍼티를 통해 introduceMySelf를 호출하는 매커니즘이다. 여기서 이런 의문이 들 수 있다. Person의 인스턴스인 john은 생성될(instantiated) 때 `__proto__` 라는 프로퍼티를 부여받고, 이 `__proto__` 프로퍼티는 다시 원형 Person을 참조한다. 그럼 `john.__proto__.introduceMySelf()` 를 호출하면 어떤 결과가 나올까?

```jsx
function Person(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
}

const john = new Person('john', 1988, 'teacher');
console.log(john);
// Person {
//  name: 'john',
//  yearOfBirth: 1988,
//  job: 'teacher',
//  ___proto__: Person { constructor: ƒ Person() }
// }

Person.prototype.introduceMySelf = function() {
  return `Hello, my name is ${this.name}. I was born in ${this.yearOfBirth} and I am working as a ${this.job}`
}
console.log(john);
// Person {
//  name: 'john',
//  yearOfBirth: 1988,
//  job: 'teacher',
//  ___proto__: Person { constructor: ƒ Person(), introduceMySelf: ƒ () }
}
john.introduceMySelf();
// 'Hello, my name is john. I was born in 1988 and I am working as a teacher'

john.___proto__.introduceMySelf()
// 'Hello, my name is undefined. I was born in undefined and I am working as a undefined'
```

이렇게 리턴하는 값이 `undefined`이 되는 이유는 메서드를 호출할 때는 메서드명 바로 앞의 객체가 곧 this가 되기 때문이다. `john.__proto__.introduceMySelf()` 에서 introduceMySelf가 참조하는 this는 john이 아니라 john.`__proto__` 가 되고 이 객체 내부에는 name, yearOfBirth, job 값이 없으므로 undefined가 반환된 것이다. ('찾고자 하는 식별자가 정의되어 있지 않을 경우에는 Error 대신 undefined를 반환한다'라는 자바스크립트 규약에 의함)

introduceMySelf라는 메서드는 자바스크립트의 `__proto__` 프로퍼티가 선행되어야만 존재할 수 있는 것이 맞지만, 호출될 때 `__proto__` 를 명시해버릴 경우에 의도하는 this가 변경되어 결국은 의도하는 바에서 멀어진다는 사실이 조금은 아이러니하게 느껴진다. 하지만 `__proto__` 는 자바스크립트가 탄생할 때부터 생략가능한 프로퍼티로 고안되었으며, **따라서 인스턴스에서 바로 원형인 생성자 함수의 메서드나 프로퍼티에 접근할 수 있다.**

### 프로토타입 체인

특정 메서드가 호출되면, 탐색은 해당 오브젝트에서부터 시작하여, 해당 오브젝트에서 찾아지지 않으면 그 오브젝트의 프로토타입 오브젝트로 올라가고, 이는 메서드가 최종적으로 찾아질 때까지 지속된다. 이것이 **프로토타입 체인**이다.

만약에 인스턴스가 prototype 객체가 갖고 있는 메서드와 동일한 메서드를 가지고 있다면, 메서드가 호출됨과 동시에 탐색은 해당 오브젝트부터 시작하므로 프로토타입 객체의 메서드가 아닌 인스턴스의 메서드가 호출될 것이다.

### Instanciation

여기서 new 키워드는 Person 함수 안의 this가 글로벌 오브젝트가 아닌 Person의 빈 오브젝트를 참조하도록 한다. 정확히 말하면, new 키워드가 있어야 먼저 빈 오브젝트를 생성하고, Person안의 this가 전역 객체(global object)가 아니라 새로(new) 생성된 오브젝트를 가리키게 한다.

### 프로토타입 상속(prototype inheritance)을 하는 여러가지 방법

```jsx
// 상속해줄 포로토타입
const personProto = {
  calculateAge() {
    return 2021 - this.yearOfBirth;
  },
};

// 방식 1. 이렇게 직접적으로 프로토타입 할당 가능
const john = Object.create(personProto);
john.name = "John";
john.yearOfBirth = 1990;
john.job = "teacher";
john.calculateAge(); // 31

// 방식 2. 두번째 인자에 오브젝트 할당 가능.
const jane = Object.create(personProto, {
  name: { value: "Jane" },
  yearOfBirth: { value: 1980 },
  job: { value: "designer" },
});

// 방식 3. ___proto__ 키에 할당 가능.
const mark = {
  name: "mark",
  yearOfBirth: 1967,
  job: "carpenter",
};
mark.___proto__ = personProto;
mark.calculateAge(); // 54
```

**1) 방식1**

Object.create 메서드를 이용하여 직접적으로 프로토타입을 할당할 수 있다.

**2) 방식2**

Object.create 메서드의 두번째 인자로 프로토타입을 할당해줄 오브젝트를 넘겨줄 수 있다.
([https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create))

**3) 방식3**

`__proto__` 에 직접 프로토타입을 할당하는 방법도 있다.

<br/>
<br/>

추가적으로 new 키워드와 Constructor 함수에 대한 자바스크립트 아티클을 첨부한다. 읽어보면 왜 new 키워드를 사용해야하는지 이해하는데 도움이 될 것 같다.

[https://javascript.info/constructor-new](https://javascript.info/constructor-new)
