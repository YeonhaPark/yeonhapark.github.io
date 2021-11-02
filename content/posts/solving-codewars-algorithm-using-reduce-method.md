---
title: CodeWars 알고리즘 문제 풀기
date: 2021-05-09
tags: [algorithms, javascript]
description: 자바스크립트 어레이 reduce 메서드를 활용한 알고리즘 풀이
---

최근에 [codewars](https://www.codewars.com/)를 통해 알고리즘 문제를 일주일에 한두개씩 풀고 있다. 그 중에 자바스크립트 reduce 메서드를 이용한 기억할만한 문제가 있어서 블로그에 따로 정리하고자 한다.

문제는 아래와 같다.

A format for expressing an ordered list of integers is to use a comma separated list of either

- individual integers
- or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'. The range includes all integers in the interval including both endpoints. It is not considered a range unless it spans at least 3 numbers. For example "12,13,15-17"

Complete the solution so that it takes a list of integers in increasing order and returns a correctly formatted string in the range format.

**Example:**

```js
solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
// returns "-6,-3-1,3-5,7-11,14,15,17-20"
```

**푸는 과정**

해당 문제는 어레이 형태의 자료 구조에 속한 엘러먼트들을 3개 이상의 연속된 숫자일 경우에 중간에 `'-'` 스트링을 추가하여 스트링으로 변환하고, 연속된 숫자가 아닐 경우 그냥 스트링으로 변환하며 각자의 엘러먼트 구분은 `,` 로 처리해야한다.

나는 처음에는 인자로 주어진 어레이를 한바퀴 돌면서 연속된 엘러먼트들이 들어간 sub 어레이와 그렇지 않은 sub 어레이로 변환해야 겠다고 생각했다. 그러다가 굳이 .map → .reduce를 거칠 필요 없이 한번에 .reduce 메서드를 통해서 연속된 엘러먼트들을 붙인 어레이를 생성한 후에 이를 스트링 형태로 바꿀 수 있지 않을까? 고민을 하게 되었고 아래와 같이 로직을 짰다.

자바스크립트 어레이 메서드 reduce에 관한 설명은 내 지난 [포스트](https://yeonhapark.github.io/posts/javascript-reduce/)를 참조하면 된다.

```js
const list = [-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17];
// 이 list를 "-6,-3-1,3-5,7-11,14,15,17" 으로 리턴하는 것이 과제이다.

let firstEl = true; // 처음으로 연속되는 숫자가 등장하는지에 대한 불린 값
let count = 1; // 연속되는 빈도 수
const moreList = list.reduce((acc, cur, idx) => {
  if (cur + 1 !== list[idx + 1]) {
    // 해당 조건은 -6처럼 다음 인덱스의 값이 연속으로 이어지는 지 여부를 판단한다.
    // 이 조건에 합당하다면 해당 cur 값의 다음 값은 cur 값과 연속되지 않는다.
    if (cur - 1 === list[idx - 1] && count > 2) {
      // 이 조건은 1과 같이 1 다음 인덱스는 1과 연속되지 않지만 1이 연속되는 숫자의 마지막 값임을 판별하기 위해 사용된다.
      // 3번 이상 연속되어야 함을 판별한다.
      acc.push(`-${cur}`); // -을 붙여서 어레이에 푸시한다.
    } else {
      acc.push(cur); // 연속되지 않으므로 그냥 푸시한다.
    }
    firstEl = true;
    count = 1;
    // 연속은 이제 끊겼으므로 firstEl, count를 초기화한다.
  } else {
    // 해당 조건은 -3과 같이 다음 인덱스가 cur의 숫자에 연속되는 경우이다.
    if (count === 1) {
      // 첫번째 연속되는 숫자가 등장한 경우
      acc.push(cur);
      count++;
      firstEl = false;
    } else {
      count++;
    }
  }
  return acc;
}, []); // 초깃값이 주어지면 인덱스는 0부터 시작함

console.log('moreList:', moreList);
// 'moreList:' [-6, -3, '-1', 3, '-5', 7, '-11', 14, 15, 17];
```

`[-6, -3, '-1', 3, '-5', 7, '-11', 14, 15, 17]` 이런 형태의 어레이가 나왔다. 이제 바라는 값에 좀 더 가까워졌다. 이 어레이에서 연속되는 값의 마지막 값은 string 형태이므로 이를 이용해서 로직을 짜면 될 것 같다.

```js
let str = moreList[0]; // str 초깃값 지정
moreList.forEach((el, idx) => {
  const nextIdx = idx + 1;
  if (moreList.indexOf(moreList[nextIdx]) !== -1) {
    if (typeof moreList[nextIdx] === 'string') {
      str += moreList[nextIdx];
    } else {
      str += `,${moreList[nextIdx]}`;
    }
  }
});

console.log(str); // '-6,-3-1,3-5,7-11,14,15,17'
```

위의 두 단계 솔루션을 이어붙여서 솔루션 도출에 성공했다.

```js
function solution(list) {
  let firstEl = true;
  let count = 1;
  const moreList = list.reduce((acc, cur, idx) => {
    if (cur + 1 !== list[idx + 1]) {
      if (cur - 1 === list[idx - 1] && count > 2) {
        acc.push(`-${cur}`); // 마지막임
      } else {
        acc.push(cur);
      }
      firstEl = true;
      count = 1;
    } else {
      if (count === 1) {
        acc.push(cur);
        count++;
        firstEl = false;
      } else {
        count++;
      }
    }
    return acc;
  }, []);

  let str = moreList[0];
  moreList.forEach((el, idx) => {
    const nextIdx = idx + 1;
    if (moreList.indexOf(moreList[nextIdx]) !== -1) {
      if (typeof moreList[nextIdx] === 'string') {
        str += moreList[nextIdx];
      } else {
        str += `,${moreList[nextIdx]}`;
      }
    }
  });
  return str;
}
```
