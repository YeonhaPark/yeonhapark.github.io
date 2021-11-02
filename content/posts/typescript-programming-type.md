---
title: TypeScript Programming - 1) 타입
date: 2020-08-25
tags: [typescript]
description: "타입스크립트 프로그래밍을 읽고 안정적인 자바스크립트 활용을 위한 타입스크립트 활용 방법에 대해 정리하기"
---

_본 내용은 보리스 체르니의 [타입스크립트 프로그래밍](http://www.yes24.com/Product/Goods/90265564)을 읽고 내용을 정리한 것입니다._

타입스크립트의 장점

- 흔히 발생하는 실수를 방지한다
- 리팩토링을 쉽게 만든다
- 자신과 미래의 개발자들에게 문서화를 제공한다
- 단위 테스트의 숫자를 반으로 줄인다.

타입스크립트와 자바스크립트를 구별하는 가장 큰 차이는 바로 에러를 알려주는 시점이다. 자바스크립트는 프로그램을 실행하는 시점에 개발자의 실수를 알려준다. 반면 타입스크립트가 에러를 알려주는 시점은 코드를 개발자가 텍스트 편집기에 코드를 입력하는 시점이다.

개발자가 작성한 소스 코드는 컴파일러라는 특별한 프로그램이 파싱하여 추상 문법 트리(Abstract Syntax Tree, AST)라는 자료 구조로 변환한다. 그리고 컴파일러는 다시 AST를 바이트코드(bytecode)라는 하위 수준의 표현으로 변환한다. 바이트 코드는 이제 런타임(runtime)이라는 다른 프로그램에 의해 평가하고 결과를 얻는다.

타입스크립트가 타 언어와 다른 점은 컴파일러가 코드를 바이트코드가 아닌 자바스크립트 코드로 변환한다는 점이다. 그리고 타입스크립트 컴파일러는 변환한 코드를 내놓기 전에 타입 확인을 거치는데, 이 타입 확인 덕분에 코드의 안정성을 더 확보할 수 있다.

TS → JS 컴파일 과정

TS

1. 타입스크립트 소스 → 타입스크립트 AST
2. 타입 검사기가 AST를 확인
3. 타입스크립트 AST → 자바스크립트 소스

JS

4. 자바스크립트 소스 → 자바스크립트 AST

5. AST → 바이트코드

6. 런타임이 바이트코드를 평가

자바스크립트와 타입스크립트의 차이를 더욱 명확히 정리하면 다음과 같다.

| 타입 시스템 기능            | 자바스크립트   | 타입스크립트        |
| :-------------------------- | :------------- | :------------------ |
| 타입 결정 방식              | 동적           | 정적                |
| 타입이 자동으로 변환되는가? | O              | X(대부분)           |
| 언제 타입을 확인하는가?     | 런타임         | 컴파일 타임         |
| 언제 에러를 검출하는가?     | 런타임(대부분) | 컴파일 타임(대부분) |

# Type

### 타입(Type)

→ 값과 이 값으로 할 수 있는 일의 집합

Boolean 타입은 모든 불(참과 거짓 중 하나)과 불에 수행할 수 있는 모든 연산(||, &&, !등)의 집합이다.

number 타입은 모든 숫자와 숫자에 적용할 수 있는 모든 연산(+, -, \*, /, %, ||, &&, ? 등), 숫자에 호출할 수 있는 모든 메서드(.toFixed, .toPrecision, .toString등)의 집합이다.

string 타입은 모든 문자열과 문자열에 수행할 수 있는 모든 연산(+, ||, && 등), 문자열에 호출할 수 있는 모든 메서드(.concat, .toUpperCase등)의 집합이다.

때문에 타입을 알면, 그 값을 가지고 어떤 일을 할 수 있고 없는지도 알수 있다. 중요한 점은 타입 검사기(typechecker)를 이용해 유효하지 않은 동작이 실행되는 일을 예방하는 것이다.

최신 언어는 저마다의 타입 시스템을 갖추고 있다. 여기서 타입 시스템(type system)이란 타입 검사기가 프로그램에 타입을 할당하는 데 사용하는 규칙 집합을 말한다.

타입 시스템은 **어떤 타입을 사용하는지를 컴파일러에 명시적으로 알려주는 타입 어노테이션(type annotation**)과 **자동으로 타입을 추론하는 타입 인퍼런스(type inference)**로 나뉘어진다.

어노테이션을 이용하면 타입스크립트에 명시적으로 타입을 지정하며, 어노테이션을 사용하지 않으면 타입스크립트가 알아서 타입을 추론한다. 이제 이런 타입 시스템이 타입스크립트 상에서 어떻게 작동하는 지 보자.

타입스크립트를 적용하지 않았을 때

```jsx
function squareOf(n) {
  return n * n;
}

squareOf(2); // 4
squareOf("a"); // NaN
```

타입스크립트를 적용할 때

```jsx
function squareOf(n: number) {
  return n * n;
}

squareOf(2); // 4
squareOf("a");
// 에러 TS2345: '"a"'라는 타입의 인수는
// number 타입의 매개변수에 할당할 수 없음
```

이처럼 숫자가 아닌 타입을 매개변수로 전달하면 타입스크립트가 바로 에러를 발생시킨다.

### 타입스크립트가 지원하는 타입

1. any

모든 타입을 아우른다. 무엇이든 할 수 있지만 불가피한 상황이 아는 경우라면 사용하지 않는 것이 좋다. any는 모든 값의 집합이므로 모든 타입의 연산과 메서드를 활용 가능하지만 이는 곧 자바스크립트처럼 작동함을 뜻하므로 타입 검사기의 마법이 더 이상 작동하지 않게 된다.

2. unknown

타입을 미리 알 수 없는 어떤 값이 있을 때 any 대신 unknown을 사용하자. any 처럼 unknown도 모든 값을 대표하지만, unknown 타입을 검사해 정제하기 전까지는 코드가 unknown 타입의 값을 사용할 수 없도록 강제한다.

```jsx
let a: unknown = 30;
let b = a === 123;
let c = a + 10; // 에러 TS2571: 객체 타입이 'unknown'임
```

타입스크립트가 타입을 unknown이라고 추론하는 상황은 없으므로, 이 타입을 사용하고자 한다면 개발자가 명시적으로 설정해야 한다.

3. boolean

boolean 타입은 true, false 두 가지 값을 갖는다.

```jsx
let a = true; // boolean
let b = false; // boolean
let c: true = true;
c = false;
// Type 'false' is not assignable to type 'true'.ts(2322)
```

c는 타입에 true라는 타입을 할당해주었는데, 이렇게 값을 타입으로 사용하는 경우 c에 사용할 수 있는 값은 boolean 타입이 가질 수 있는 값 중 특정한 하나의 값으로 한정된다. 이 기능을 **타입 리터럴(type literal, 오직 하나의 값을 나타내는 타입)**이라 부른다.

4. number

number 타입은 모든 숫자(정수, 소수, 양수, 음수, Infinity, NaN 등)의 집합이다. 모든 숫자 관련 연산을 수행할 수 있다.

```jsx
const a = 281;
let b = 10;
let c = a < b; // boolean
let d: 25.124 = 25.124; // 25.124
let e: 25.124 - 11;
// TS2322: '11'타입을 '25.124'에 할당할 수 없음
```

5. bigint

bigint를 이용하면 오버플로에 대한 걱정없이 정수를 처리할 수 있다. `Number` 원시값은 $2^{53}-1$ 이 최대치이다. 따라서 이보다 큰 정수를 사용하려면 bigint를 사용해야 한다. 아래처럼 정수 리터럴 뒤에 n을 덧붙여 생성할 수 있다.

```jsx
let a = 1234n // bigint
const b - 5678n // 5678n
var c = a + b; // bigint
let d = a < 1235 // boolean
let e = 88.5n // 에러 TS1353: bigint literal은 반드시 정수어야 함
let h: bigint = 100 // 에러 TS2322: '100' 타입은 'bigint' 타입에 할당할 수 없음
```

가능하면 타입스크립트가 bigint의 타입을 추론하게 만들자.

6. string

string은 모든 문자열의 집합으로 연결(+), 슬라이스(.slice)등의 연산을 수행할 수 있다.

```jsx
let a = "hello"; // string
let b = "billy"; // string
const c = "!"; // '!'
let d: string = "zoom"; // string
let f: "john" = "john"; // john (타입스크립트에 값이 특정 string임을 명시적으로 알림)
let g: "john" = "zoe"; // 에러 TS2322: "zoe" 타입을 "john" 타입에 할당할 수 없음
```

이또한 가능하면 a, b처럼 타입스크립트가 string 타입을 추론하도록 두는 것이 좋다.

7. symbol

symbol은 ES2015에 새로 추가된 기능이다. 실무에서 많이 쓰이지는 않지만 Symbol.iterator 를 활용하여 이터레이터를 활용하거나 객체가 어떤 인스턴스인지 (Symbol.hasInstance) 런타임에 오버라이딩 하는 것과 비슷한 기능을 제공한다.

```jsx
let first = Symbol("symbol");
let second = Symbol("symbol");
console.log(first === second); // false
```

자바스크립트에서 Symbol("symbol")은 주어진 이름으로 새로운 symbol을 만들겠다는 의미다. 만들어진 symbol은 고유하기 때문에 비교 혹은 동등연산자로 비교시 같지 않다고 판단된다.

```jsx
const e = Symbol('e'); // typeof e
const f: unique symbol = Symbol('f'); // typeof f
let g: unique symbol = Symbol('f'); // 에러 TS1332, unique symbol은 반드시 const 여야함
let h = e === e; // boolean
let i = e === f; // 에러 TS2367: unique symbol 타입은 서로 겹치는 일이 없으므로 항상 결과는 false
```

8. 객체

타입스크립트에서 객체를 서술하는 데 타입을 이용하는 방식은 여러가지다. 첫 번째 방법은 값을 object로 선언하는 것이다.

```jsx
let a: object = {
  b: "x",
};

a.b; // Property 'b' does not exist on type 'object'.ts(2339)
```

Oops, 프로퍼티에 접근할 수 없다는 에러 메시지가 뜬다. 왜냐하면 object는 서술하는 값에 관한 정보를 거의 알려주지 않으며, 값 자체가 자바스크립트 객체이며 null이 아니라고 알려줄 뿐이다.

두 번째 방법은 타입스크립트가 추론하도록 하게 하는 것이다.

```jsx
// 1)
let a = {
  b: "x",
};

a.b; // string

// 2)
let b: { c: number } = {
  c: 12,
};
```

1. 케이스처럼 타입스크립트가 형태를 추론하게 하거나 2)처럼 중괄호 안에서 명시적으로 타입을 지정할 수 있다.

프로퍼티를 추가하거나 필요한 프로퍼티를 제공하지 않으면 어떤 일이 일어나는지 확인해보자.

```jsx
let a: { b: number };
a = {}; // Property 'b' is missing in type '{}' but required in type '{ b: number; }'.ts(2741)
a = { b: 1, c: 2 };
// Type '{ b: number; c: number; }' is not assignable to type '{ b: number; }'.
// Object literal may only specify known properties, and 'c' does not exist in type '{ b: number; }'.ts(2322)
```

첫번째 줄에서 a 객체에 대한 프로퍼티를 지정해 주었기 때문에 두번째 줄에 프로퍼티가 지정되지 않은 것을 에러로 뱉는다. 그리고 세번째 줄에서 지정되지 않은 c 프로퍼티를 넣는 것도 용납하지 않는다.

그럼 어떤 프로퍼티는 선택형이고 예정에 없던 프로퍼티가 추가될 수 있다고 타입스크립트에 알려줄 수 있을까?

다음을 확인하자.

```jsx
let a: {
  b: number, // number 타입의 프로퍼티 b를 포함한다.
  c?: string, // 스트링 타입의 프로퍼티 c를 포함할 수도 있다.
  [key: number]: boolean, // boolean 타입의 값을 갖는 number 타입의 프로퍼티를 여러개 포함할 수 있다.
};
```

이렇게 프로퍼티의 타입 지정에 자유도를 줄 수 있다.

필요하면 readonly 한정자를 이용해 특정 필드를 읽기 전용으로 정의할 수 있다.(즉, 정의한 필드에 초깃값을 할당한 다음에는 그 값을 바꿀 수 없다.)

```jsx
let user: {
  readonly firstName: string
} = {
  firstName: 'Park'
}

user.firstName = 'Kim';
// Cannot assign to 'firstName' because it is a read-only property.ts(2540)
```
