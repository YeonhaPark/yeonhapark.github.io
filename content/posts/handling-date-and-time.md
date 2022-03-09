---
title: 자바스크립트 Date 오브젝트를 활용해서 시간과 날짜 개념 표현하기
date: 2022-03-09
tags: [javascript, date]
---

# Date object

시간을 나타내는 방법은 아주 다양하고 상대적이다. 이 글을 쓰고 있는 현재는 3월 7일 오후 11시지만, 3월 7일 23시라고 나타낼 수도 있다. 또 한국은 현재 오후 11시이지만 영국은 3월 7일 오후 2시이다. 나타내는 방식도 다양하다. 한국식으로는 2022/03/07이지만 미국에서는 03/07/2022라고 표현한다.

절대적인 방식이 아니라 현재 시간에 상대적으로 과거의 시간을 나타낼 때 5년 전, 10초 전, 10분 전.. 으로 나타낼 수도 있다.

자바스크립트의 `Date` 오브젝트는 플랫폼이나 기준에 관계없이 시간의 한 순간을 표현하게끔 사용될 수 있다. `Date` 오브젝트가 제공하는 다양한 메서드 기능을 활용하여 현재 날짜, 월, 혹은 연도만을 얻거나 사용자의 위치(Locale)에 기반한 타임 포맷을 얻을 수 있다.

## 현재시간 얻기

`new` 생성자를 덧붙여 사용하면 새로운 `Date` 오브젝트를 반환한다. 아무런 인자를 넣지 않으면 현재 시간을 반환한다.

```jsx
const d = new Date();
console.log(d); // Mon Mar 07 2022 21:30:35 GMT+0900 (한국 표준시)
console.log(d.getDate()); // 7
console.log(d.getMonth()); // 2
console.log(d.getFullYear()); // 2022
console.log(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()); // '2022-3-7'
```

`getDate`: `Date` 오브젝트의 일을 반환한다.  
`getMonth`: `Date` 오브젝트의 월(0-11)을 반환한다. 1월인 경우 0을 반환하고, 3월인 경우 2를 반환한다.  
`getFullYear`: `Date` 오브젝트의 년도를 반환한다.  
`getDay`: `Date` 오브젝트의 요일(0-6)을 반환한다. 일요일로 시작한다. 월요일인 경우 1을 반환한다.  
`getHours`: `Date` 오브젝트의 시(時)(0-23)를 반환한다.  
`getMinutes`: `Date` 오브젝트의 분(0-59)을 반환한다.  
`getSeconds`: `Date` 오브젝트의 초(0-59)를 반환한다.

아래처럼함수로 호출하면 현재 시간과 날짜를 나타내는 문자열을 반환한다. `new Date().toString()` 과 동일하다.

```jsx
Date(); // 'Mon Mar 07 2022 23:15:50 GMT+0900 (한국 표준시)'
// new Date().toString()와 동일
```

## 타임스탬프 얻기

```jsx
new Date().getTime();
```

`getTime` 메서드를 사용하면 타임스탬프를 얻을 수 있다. 타임스탬프는 1970년 1월 1일을 기준으로 현재 시간까지의 밀리 초(millisecond)가 경과한 숫자이다. `Date.now()` 를 사용해도 동일한 결과를 얻을 수 있는데, 다만 이는 IE8 버전 미만에서는 서포트 되지 않는다.

## 문자열을 Date 오브젝트로 변환하기

`Date` 오브젝트의 생성자는 다양하고 넓은 범위의 문자열을 아규먼트로 받아서 처리할 수 있다.

```jsx
const date1 = new Date("Wed, 27 July 2016 13:30:00");
const date2 = new Date("Wed, 27 July 2016 07:45:00 UTC");
const date3 = new Date("27 July 2016 13:30:00 UTC+05:45");
const strD = Date().toString();
const date4 = new Date(strD);
// date1 -> 2016-07-27T04:30:00.000Z
// date2 -> 2016-07-27T07:45:00.000Z
// date3 -> 2016-07-27T07:45:00.000Z
// date4 -> 2022-03-07T14:45:51.000Z
```

문자열 값에 요일을 추가해주지 않아도 자바스크립트가 날짜와 다른 정보를 가지고 요일을 찾아낼 수 있다.

ISO 8601 date format으로 문자열을 입력해도 문제없이 작동한다.

```jsx
const str = "2022-03-07T14:45:51.000Z";
const date5 = new Date(str);
console.log(date5); // 2022-03-07T14:45:51.000Z
```

여기서 [ISO 8601](https://ko.wikipedia.org/wiki/ISO_8601)은 은 날짜와 시간 데이터를 다룰 때 사용되는 국제표준이다.

타임존에 대해서 정보를 주지 않으면 로컬 타임 기준으로 00:00:00 으로 설정되니 시간에 대해 명시하는 것을 잊지 말자.

```jsx
const date1 = new Date("March 7, 2022"); // Mon Mar 07 2022 00:00:00 GMT+0900 (한국 표준시)
const date2 = new Date("2022-3-7"); // Mon Mar 07 2022 00:00:00 GMT+0900 (한국 표준시)
```

## 포맷팅 하기

각 언어마다 다른 날짜/시간 표시형식에 대응하기 위해 `Intl` 객체를 활용할 수 있다.

```jsx
const koFormatter = new Intl.DateTimeFormat("ko-KR");
koFormatter.format(date); // '2022. 3. 7.'

const enUSFormat = new Intl.DateTimeFormat("en-US");
enUSFormat.format(date); // '3/7/2022'

const koTwoDigitFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
});
koTwoDigitFormatter.format(date); // '22. 03. 07.'
```

`format` 메서드를 사용할 때 인자에 옵션 값을 주어서 나타나는 서식을 제어할 수 있다. (`year` , `month` , `day` 의 디폴트 값은 `“numeric”`)

```jsx
const options = { year: "numeric", month: "long", day: "numeric" };
const enLongUSFormat = new Intl.DateTimeFormat("en-US", options);
enLongUSFormat.format(date); // 'March 7, 2022'
```

`Date` 오브젝트에서 지원하는 `toLocaleDateString` 메서드를 활용해도 동일한 기능을 구현할 수 있다.

```jsx
date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
}); // 'March 7, 2022'
```

비슷한 기능을 구현하기 위해 활용할 수 있는 다른 메서드들도 있다.

```jsx
const now = new Date();
now.toLocaleTimeString(); // '오후 5:08:06'

now.toLocaleString(); // '2022. 3. 8. 오후 5:08:06'

date.toLocaleString("en-US", {
  month: "long",
  year: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
}); // 'March 7, 2022, 12:00 AM'

new Date().toLocaleDateString("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
("2022년 3월 8일 오후 05:06");
```

## 날짜 계산하기

`setDate` , `setHours` , `setMonth`, `setMinutes` 등의 메서드를 지원하여 현재 시간 기준으로 시간 요소들을 설정할 수 있다.

```jsx
const myDate = new Date();
console.log(myDate.toLocaleString()); // '2022. 3. 8. 오후 5:40:12'
const nextSevenDay = myDate.getDate() + 7;
myDate.setDate(nextSevenDay);
const newDate = myDate.toLocaleString();
console.log(newDate); // '2022. 3. 15. 오후 5:40:12'
```

`getDate` 로 현재 일(8일) 을 얻고 여기다 일주일치 7일을 더하여 다음주 시간으로 설정하는 방법이다.

```jsx
myDate.setHours(0);
myDate.setMinutes(0);
myDate.setSeconds(0);
myDate.toLocaleString();
console.log(myDate); // '2022. 3. 15. 오전 12:00:00'
const timeStamp = myDate.getTime(); // 타임스탬프 리턴
myDate.setTime(timeStamp + 1000 * 60 * 60); // 한시간 후로 설정
myDate.toLocaleString();
console.log(myDate); // '2022. 3. 15. 오전 1:00:00'
```

시간을 리셋할 때 위의 방식으로 0시, 0분, 0초로 설정할 수 있다.

좀 더 정확하고 정교한 시간 셋팅을 하려면 `setTime` 메서드를 활용해서 밀리세컨드 단위로 시간을 셋팅하면 된다.

## 시간 비교하기

비교연산자를 활용해서 좀 더 이른 시간대와 느린 시간을 판별할 수 있다.

```jsx
const date1 = new Date("17 July, 2022");
const date2 = new Date("24 Feb, 2000");
console.log(date1 > date2); // true
```

시간의 동등함을 판별하는 것은 좀 더 까다로운데, `Date` 오브젝트에 들어가는 포맷에 따라 겉으로는 같아 보이지만 실제로는 다른 결과가 나올 수도 있기 때문이다. 아래 예를 통해서 확인해보자.

```jsx
const date1 = new Date("17 July, 2022");
const date2 = new Date("2022-07-17");

console.log(date1 === date2);
```

`console.log`의 결과는 `true` 일까? `false` 일까?

```jsx
const date1 = new Date("17 July, 2022");
const date2 = new Date("2022-07-17");

console.log(date1 === date2); // false
console.log(date1.toString()); // 'Sun Jul 17 2022 00:00:00 GMT+0900 (한국 표준시)'
console.log(date2.toString()); // 'Sun Jul 17 2022 09:00:00 GMT+0900 (한국 표준시)'
```

답은 `false` 이다. `date2`는 ISO 포맷의 데이터를 사용했기 때문에 로컬 기준의 UTC를 사용할 수 있게 된다. `date1` 은 로컬타임에 대한 기준이 없기 때문에 00:00:00으로 설정된다.

시점 A와 시점B 사이의 차이를 계산하려면 `getTime` 타임스탬프를 활용할 수 있다.

```jsx
const myDate = new Date();
const dateFromAPI = "2022-03-04T09:00:00Z";
const diff = Math.abs(myDate.getTime() - new Date(dateFromAPI).getTime());
console.log(Math.round(diff / (1000 * 60 * 60 * 24))); // 4, 즉 4일의 차이
```

<br>
트위터나 링크드인 같은 플랫폼을 보면 포스트 제목 옆에 _1 day ago, 12분 전_ .. 등 상대적으로 과거의 시간을 나타낸다.

<p align="center"><img src="../../static/media/blog/date/twitter.webp" alt="twitter-capture"/></p>

비슷하게 피드를 업로드하고 현재시간으로부터 얼마나 시간이 경과했는지 나타내고 싶을 때는 아래의 코드를 참조하자. 다만, 실제 중요 서비스를 다룰 때는 `luxon` , `date-fns`, `dayjs` 같은 라이브러리를 사용하는 게 신뢰도와 안전성 면에서 훨씬 권장된다.

```jsx
const DATE_UNITS = [
  ["day", 1000 * 60 * 60 * 24],
  ["hour", 1000 * 60 * 60],
  ["minute", 1000 * 60],
  ["second", 1000],
];

export const getTimeAgo = (timestamp) => {
  const elapsed = Date.now() - timestamp;

  const rtf = new Intl.RelativeTimeFormat(navigator.language); // 브라우저의 언어 설정을 나타낸다. 한국의 경우 'ko-KR'
  for (const [unit, time] of DATE_UNITS) {
    if (elapsed > time || unit === "second") {
      return rtf.format(Math.round(elapsed / time) * -1, unit);
    }
  }
  return timestamp;
};
```

## 리마인드

👉 타임스탬프를 얻으려면 `getTime` 메서드를 활용하자  
👉 문자열 타입의 데이터를 `Date` 오브젝트로 변환할 때 로컬 시간을 빠뜨리는 실수를 하지 말자(아니면 ISO 형식으로 값을 넣어주자)  
👉 상용화되는 서비스에서 날짜와 시간을 조작할 때는 Date 오브젝트를 직접 사용하기보다 `luxon` , `date-fns` 같은 라이브러리를 사용해야 에러가 발생할 여지를 줄일 수 있다.(`moment.js` 는 상당히 deprecated되었으므로 사용을 추천하지 않는다.)

참고한 글  
[https://www.toptal.com/software/definitive-guide-to-datetime-manipulation#:~:text=Getting the Current Time Stamp,passed since January 1%2C 1970](https://www.toptal.com/software/definitive-guide-to-datetime-manipulation#:~:text=Getting%20the%20Current%20Time%20Stamp,passed%20since%20January%201%2C%201970).  
[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date)
