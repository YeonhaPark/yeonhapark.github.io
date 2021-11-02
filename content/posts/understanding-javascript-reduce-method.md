---
title: 자바스크립트 Reduce 메서드 뽀개기
date: 2020-09-02
tags: [javascript]
description: "자바스크립트 어레이 메서드 Reduce()를 이해해보자."
---

프론트엔드 개발을 시작한지 1년이 지났지만 아직도 reduce 메서드를 떠올리면 어떻게 활용해야 할 지 조금은 막막한 기분을 지울 수 없다. 정말 유용한 메서드임을 익히 들어서 알고 있는데도, 정작 활용은 어레이의 숫자들을 더하는 용도로 써본 적이 대부분이다ㅠ. 더이상 리듀스 메서드를 이해하는 것을 미루면 안될 것 같아 포스팅으로 정리하며 여러 예제와 함께 리듀스가 어떤 상황에서 유용하게 쓰일 수 있을지 고민해보았다

### Reduce() 메서드

어레이를 구성하는 각각 요소들에 대해 reducer 함수를 실행하고 하나의 결과(output)를 도출한다. reduce 메서드는 reducer함수를 필수 인자로 받고 옵셔널한 값으로 초깃값을 받는다.

reducer 함수는 네 개의 아규먼트를 받을 수 있다.

첫째, Accumulator(축적값): 콜백함수가 리턴하는 값을 **축적**한다. 초깃값이 주어졌다면 초깃값부터 시작하고, 그렇지 않다면 어레이의 첫번째 요소를 사용한다.

둘째, Current Value(현재값): 어레이에서 현재 사용되는 현재값이다. 초깃값이 주어지지 않았다면 현재값은 두번째 요소부터 사용된다.

셋째(옵셔널), Current Index(현재 인덱스): 초깃값이 주어지면 인덱스 0부터 시작하고, 주어지지 않았다면 1부터 시작한다. 따라서 어레이의 요소가 하나 뿐이고 초깃값이 주어지지 않은 상태이면 콜백 함수 호출 없이 하나의 값만 리턴된다.

넷째(옵셔널), Source Array: reduce()가 호출되는 어레이이다.

```jsx
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15

const array2 = [10];
console.log(array2.reduce(reducer));
// expected output: 10
```

물론 리듀스는 어레이에 담겨진 숫자를 더할때도 많이 쓰이지만 이 밖에도 대표적으로 리듀서를 응용할 수 있는 예제들을 살펴보겠다.

1. 어레이의 최대/최솟값 구하기

```jsx
const array1 = [100, 22, 3, -4];
const minReducer = (acc, cur) => Math.min(acc, cur);
const maxReducer = (acc, cur) => Math.max(acc, cur);

array1.reduce(minReducer); // -4
array1.reduce(maxReducer); // 100
```

2. 어레이 플래트닝(Flattening)

```jsx
const numArray = [1, 2, [3, 10, [11, 12]], [1, 2, [3, 4]], 5, 6];

function flattenArr(data) {
  const initialVal = [];
  return data.reduce(
    (acc, cur) => acc.concat(Array.isArray(cur) ? flattenArr(cur) : cur),
    initialVal
  );
}

flattenArr(numArray);
```

3. 자료 구조 바꾸기

```jsx
// 원래 데이터셋
const company = [
  { name: "facebook", type: "sns" },
  { name: "hyundai", type: "automobile" },
  { name: "medium", type: "blog" },
];

// 바뀔 데이터셋
const companyModified = {
  facebook: { type: "sns" },
  hyundai: { type: "automobile" },
  medium: { type: "blog" },
};

function modifier(arr) {
  return arr.reduce((acc, cur) => {
    acc[cur.name] = { type: cur.type };
    return acc;
  }, {});
}

modifier(company);
```

```jsx
// 원래 데이터셋
const movies = [
  { director: "Ridley Scott", name: "Blade Runner" },
  { director: "Ridley Scott", name: "Gladiator" },
  { director: "Cuentin Tarantino", name: "Pulp Fiction" },
  { director: "Alfonso Cuaron", name: "Gravity" },
];
// 바뀔 데이터셋 (이렇게 바꾸기)
const directors = {
  "Ridly Scott": ["Blade Runner", "Gladiator"],
  "Cuentin Tarantino": ["Pulp Fiction"],
  "Alfonso Cuaron": ["Gravity"],
};

function modifier(arr) {
  return arr.reduce((acc, cur) => {
    if (acc[cur.director]) {
      acc[cur.director] = [...acc[cur.director], cur.name];
    } else {
      acc[cur.director] = [cur.name];
    }
    return acc;
  }, {});
}

modifier(movies);
```

여러 예제들을 작성해보고 나니 백에서 오는 데이터를 클라이언트 상에 나타내기 위해 데이터를 가공하는 과정에서 reduce 메서드가 아주 유용하게 쓰일 수 있을 것 같다는 기대감이 든다. 기존에는 데이터를 가공하기 위해 거의 map, for loop등을 활용했는데 리듀스 메서드를 활용해서 로직을 더욱 깔끔하고 가독성 있게 작성하도록 시도해 보아야겠다. 화이팅!
