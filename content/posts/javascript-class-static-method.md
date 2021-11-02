---
title: JavaScript 클래스 정적 메서드에 대해 알아보자
date: 2021-07-07
tags: [javascript]
---

### Static method(정적 메서드)

정적 메서드는 **프로토타입이 아닌 함수 자체에 메서드를 설정**하는 것이다. 아래처럼 인스턴스를 통해 호출할 경우 에러가 난다. 인스턴스에서 메서드를 호출하지 않고 클래스 내부에서 메서드를 호출하는 경우 사용될 수 있다.

```jsx
class User {
  constructor(name) { this.name = name; }
  sayHi() { console.log(this.name); }
  static sayBye() {
    console.log('bye!')
  }
}

const user = new User('yeonha');

user.sayBye() // Uncaught TypeError: user.sayBye is not a function
```

유의해야 할 것은 static 메서드에서 this를 통해 상위 오브젝트에 접근할 수 없다는 점이다. static 메서드인 `selectLang` 은 함수 내부에서 `this.country` 로 국가명을 받아오지 않고 `sayHi` 함수 내에서 호출되면서 넘겨받은 아규먼트로 분기처리를 진행하고 있다. 

(static 메서드가 아닌) 일반 메서드에서 static 메서드에 접근하려면 인스턴스가 아닌 *클래스명.정적메서드* 로 접근하거나 아래처럼 *this.constructor.정적메서드* 형식을 사용해서 접근가능하다.

```jsx
class User {
  constructor(name, country) { 
    this.name = name;
    this.country = country;
  }
  sayHi() {
   return this.constructor.selectLang(this.country); // User.selectLang(this.country)도 동일
  }
  
  static selectLang(country) {
    if (country === 'korea') {
      return '안녕하세요!'
    } else {
      return 'Hi!'
    }
  }
}

const user = new User('yeonha', 'korea');
user.sayHi(); // '안녕하세요!'
```

동일한 클래스 내에서는 정적 메서드 내에서 this를 사용하여 다른 정적 메서드에 접근 가능하다.

```jsx
class User {
  constructor(name, country) { 
    this.name = name;
    this.country = country;
  }
  sayHi() {
   return this.constructor.selectLang(this.country);
  }
  
  static selectLang(country) {
    if (country === 'korea') {
      return '안녕하세요!'
    } else if (country === 'USA') {
      return 'Hi!'
    } else {
     return this.sayBye();
    }
  }
  
  static sayBye() {
    return 'Bye!'
  }
}

const user = new User('yeonha', 'japan');
user.sayHi(); // 'Bye!'
```

