---
title: encodeURI VS encodeURIComponent
date: 2022-05-06
tags: [encode, encoding, encodeURI, encodeURIComponent]
---

**`encodeURI()`**
 함수는 [URI](https://developer.mozilla.org/ko/docs/Glossary/URI)의 특정한 문자를 UTF-8로 인코딩해 하나, 둘, 셋, 혹은 네 개의 연속된 이스케이프 문자로 나타낸다. 

```jsx
const uri = 'https://mozilla.org/?x=шеллы';
const encoded = encodeURI(uri);
console.log(encoded);
// expected output: "https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"

try {
  console.log(decodeURI(encoded));
  // expected output: "https://mozilla.org/?x=шеллы"
} catch (e) { // catches a malformed URI
  console.error(e);
}
```

```
이스케이프 하지 않는 문자:

    A-Z a-z 0-9 ; , / ? : @ & = + $ - _ . ! ~ * ' ( ) #
```

### encodeURI

```jsx
var set1 = ";,/?:@&=+$#"; // 예약 문자, 이스케이프 하지 않는다
var set2 = "-_.!~*'()";   // 비예약 표식, 이스케이프 하지 않는다
var set3 = "ABC abc 123"; // 알파벳 및 숫자, 공백, 이스케이프 한다.

console.log(encodeURI(set1)); // ;,/?:@&=+$#
console.log(encodeURI(set2)); // -_.!~*'()
console.log(encodeURI(set3)); // ABC%20abc%20123 (공백은 %20으로 인코딩)

```

### encodeURIComponent

URI의 특정한 문자를 UTF-8로 인코딩해 하나, 둘, 셋, 혹은 네 개의 연속된 이스케이프 문자로 나타낸다.

```jsx

var set1 = ";,/?:@&=+$#"; // 예약 문자, 이스케이프 한다.
var set2 = "-_.!~*'()";   // 비예약 표식, 이스케이프 하지 않는다
var set3 = "ABC abc 123"; // 알파벳 및 숫자, 공백, 이스케이프 한다.

console.log(encodeURIComponent(set1)); // %3B%2C%2F%3F%3A%40%26%3D%2B%24%23
console.log(encodeURIComponent(set2)); // -_.!~*'()
console.log(encodeURIComponent(set3)); // ABC%20abc%20123 (공백은 %20으로 인코딩)

```

encodeURI는 GET과 POST 요청에 적합하지 않다. GET과 POST에서 특별한 문자로 취급한는 `"&"`, `"+"`, `"="`를 인코딩 하지 않기 때문이다. 따라서 서버에 요청을 보내거나 네이티브 앱으로 url을 전달할 때는  `encodeURIComponent()` 을 사용하도록 한다.

예를 들어 쿼리 스트링 밸류 값에 넘겨지는 값이 아래와 같다면 `encodeURI`와 `encodeURIComponent`를 썼을때의 결과는 달라지게 된다.

```jsx
const title = "안녕하세요?여러분 ;) 반갑습니다"
encodeURIComponent(title); // ?와 ;를 이스케이프한다
// '%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94%3F%EC%97%AC%EB%9F%AC%EB%B6%84%20%3B)%20%EB%B0%98%EA%B0%91%EC%8A%B5%EB%8B%88%EB%8B%A4'
encodeURI(title); // ?와 ;를 이스케이프하지 않는다.
// '%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94?%EC%97%AC%EB%9F%AC%EB%B6%84%20;)%20%EB%B0%98%EA%B0%91%EC%8A%B5%EB%8B%88%EB%8B%A4'
```

encodeURIComponent는 이런 특수한 문자들을 모두 이스케이프 시키기 때문에 감쌀때 모든 uri를 감싸면 &, = 같은 쿼리스트링을 구성하는 문자도 이스케이핑 처리된다. 따라서 밸류 값에만 encodeURIComponent를 감싸주도록 하자

예를 들어서 다음과 같은 url을 전달한다고 할 때

```
https://yeonhapark.github.io/blog/?location=서울&title=헬로?&하_이!^^
```

query string을 구성하는 예약어(=, ?)까지 이스케이핑을 하면 안된다. 따라서 쿼리 스트링의 밸류 값에 해당하는 값만 encodeURIComponent를 사용해 이스케이핑한다.

```jsx
const url = "https://yeonhapark.github.io/blog/?";
const locationVal = "서울";
const titleVal = "헬로?&하_이!^^"
const wholeUrl = `${url}location=${encodeURIComponent(locationVal)}&title=${encodeURIComponent(titleVal)}`;

console.log(wholeUrl);
// 'https://yeonhapark.github.io/blog/?location=%EC%84%9C%EC%9A%B8&title=%ED%97%AC%EB%A1%9C%3F%26%ED%95%98_%EC%9D%B4!%5E%5E'
```

encodeURI는 예약문자에 대해 이스케이프 하지 않기 때문에 url 전체에 대해서 적용할 수 있다. 그러나 params 값에 이스케이핑 할 문자가 포함되지 않는지 주의해서 사용하도록 한다.