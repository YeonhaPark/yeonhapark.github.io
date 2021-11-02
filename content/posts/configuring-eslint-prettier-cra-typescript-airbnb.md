---
title: ESLint + Prettier + React(CRA) + TypeScript + AirBnB 설정하기
date: 2021-01-07
tags: [typescript, eslint]
description: "ESLint + Prettier 타입스크립트 기반 리액트 프로젝트에서 설정하기"
---

우선, eslint와 prettier의 기능에 대해서 간단히 짚고 넘어가자 (타입스크립트, 리액트는 이 포스팅의 메인이 아니므로 패스하겠다)

### ESLint

ESLint는 ECMAScript에 기반한 자바스크립트 코드 상의 버그를 개선하고 일관성 있는 코드 작성을 위한 리포팅 도구이다. 특징 중 하나는 사용자가 원하는 방식대로 플러그인을 이용하여 다양한 룰을 적용할 수 있다는 점이다. (Create React App에서는 `react-scripts` 를 통해 이미 eslint가 포함되어 있기 때문에 패키지 매니저로 따로 설치할 필요가 없다!)

### Prettier

Prettier는 파일들을 스캔하고 사용자가 설정한 룰에 부합하도록 코드를 포맷팅하는 툴이다. Prettier는 jsx, TypeScript 뿐만 아니라 scss, less, JSON, markdown 등 다양한 언어를 지원한다.

### ESLint와 Prettier 함께 셋팅하기

Prettier는 ESLint의 플러그인 중 하나로 prettier를 적용함으로써 설정한 룰에 포맷팅을 적용할 수 있다. `prettier` 나 `@typescript-eslint/parser` 같이 필수 패키지 등을 제외하고 일부는 개인 취향에 맞춰서 플러그인을 적용할 수 있기 때문에 각자 원하는 스타일에 따라서 플러그인을 가감하여 설치하면 되겠다.

```bash
yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

_create-react-app을 사용하지 않는 경우는 eslint를 추가로 설치해준다._

`@typescript-eslint/parser` : TypeScript 코드를 linting할 수 있도록 한다.

`@typescript-eslint/eslint-plugin` : TypeScript를 위한 ESLint 룰을 포함하는 플러그인이다.

그 다음 프로젝트 루트 디렉토리에 `.eslintrc.js` 파일을 생성한다.

```bash
yarn add eslint-plugin-react eslint-config-airbnb eslint-config-airbnb-typescript
eslint-plugin-jsx-a11y eslint-plugin-import prettier eslint-config-prettier eslint-plugin-prettier -D
```

- 타입스크립트를 리액트와 함께 사용한다면 [`eslint-plugin-react`](https://github.com/yannickcr/eslint-plugin-react) dev dependency를 설치해주어야 한다.
- [`eslint-config-airbnb`](https://www.npmjs.com/package/eslint-config-airbnb) :airbnb 의 리액트 관련 규칙을 적용하기 위한 플러그인이다.
- [`eslint-config-airbnb-typescript`](https://github.com/iamturns/eslint-config-airbnb-typescript) :위의 플러그인의 적용 범위를 타입스크립트까지 확대하기 위한 플러그인으로, 별도의 규칙을 갖고 있진 않다.
- `eslint-plugin-jsx-a11y` : eslint-config-airbnb와 함께 설치해주어야 하는 플러그인이다(`eslint-plugin-import`, `eslint-plugin-react` 도 마찬가지)
- `prettier` : prettier를 적용하기 위한 코어 라이브러리
- `eslint-plugin-prettier` : ESLint 룰로 프리티어를 실행한다.
- [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier): prettier와 중복, 충돌되는 ESLint 룰을 비활성화한다. ESLint에도 포맷팅을 하는 기능이 있는데 이것이 prettier와 충돌하여 에러를 발생시킬 수 있으므로 해당 패키지를 통해 이런 오류를 사전에 방지하는 것이다.


```jsx
//.eslintrc.js
module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'plugin:react/recommended', // eslint-plugin-react에서 추천하는 리액트 린팅 설정
    'plugin:@typescript-eslint/recommended',  // @typescript-eslint/recommended의 추천 룰 사용
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'react', '@typescript-eslint', 'react-hooks'], // 해당 플러그인을 사용할것이라고 등록
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,  // jsx 활성화
    },
    ecmaVersion: 2021,
    sourceType: 'module', // import 사용
    project: './tsconfig.json',
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
  },
};
```

eslint 설정이 어떻게 된 것인지 설명해보겠다. 
### Extends

- `airbnb` , `airbnb-typescript`: 에어비엔비 플러그인을 적용하기 위한 설정
- `prettier` : eslint-config-prettier의 메인 설정을 활성화하며, prettier와 충돌하는 ESLint 코어 룰을 비활성화한다.
- `plugin:prettier/recommended` :eslint-config-prettier, eslint-plugin-prettier 설정을 적용하기 위한 셋팅. 반드시 마지막 익스텐션 순서로 넣어주어야 한다.
- `plugin:@typescript-eslint/recommended` : @typescript-eslint/recommended의 추천 룰 사용
- `prettier/@typescript-eslint` : prettier와 typescript-eslint를 함께 쓰기 위한 설정이다. 프리티어가 적용하는 포맷팅에 대해 ESLint가 추가로 포맷팅 관련 작업을 하지 않도록 한다. ([참고](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md#usage-with-prettier))

### plugins

- `prettier` , `react`: 해당 플러그인 사용을 등록한다.
- `@typescript-eslint` : eslint에게 해당 플러그인 패키지를 로드하라고 전달하는 역할

### ParserOptions

[`parserOptions.project`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#parseroptionsproject): eslint-config-airbnb-typescript 를 설치했다면 타입 규칙들이 작용하기 위해 해당 패키지에서 설정하도록 요구하는 항목이다. 해당 옵션을 설정하게되면 프로젝트의 `tsconfig.json` 으로 가는 path를 제공할 수 있다. (해당 옵션의 디폴트 값은 `undefined` 다.)

### rules
개발자가 사용하고자 하는 방식대로 옵션을 설정해주면 된다. 

- `react/react-in-jsx-scope` : 파일마다 React를 임포트하라고 뜨는 에러 방지를 위해 추가한 룰이다.
- `react/jsx-filename-extension` :  js확장자가 아닌 jsx 확장자만 허용되도록 하는 룰이다. extensions에 위와 같이 설정을 통해 js 확장자도 허용할 수 있다.

기타 룰은 각자 프로젝트를 진행하면서 원하는 룰에 맞춰서 취향껏 가감하면 되겠다.

### 적용된 ESLint Rule 리스트 확인하기

- `plugin:react/recommended`: https://eslint.org/docs/rules/
- `@typescript-eslint/eslint-plugin` : https://www.npmjs.com/package/@typescript-eslint/eslint-plugin / https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
- `eslint-config-airbnb` : https://github.com/airbnb/javascript/tree/master/react

끝으로 prettier 를 실행하기 위해서는 루트 디렉토리에 .prettierrc 파일을 생성해주어야 한다.

```jsx
// .prettierrc
{
	"singleQuote": true,
	"semi": true,
	"useTabs": false,
	"tabWidth": 2,
	"trailingComma": "all",
	"printWidth": 80
}
```



참고 블로그

[https://velog.io/@kyusung/eslint-config-2](https://velog.io/@kyusung/eslint-config-2)

[https://medium.com/@brygrill/create-react-app-with-typescript-eslint-prettier-and-github-actions-f3ce6a571c97](https://medium.com/@brygrill/create-react-app-with-typescript-eslint-prettier-and-github-actions-f3ce6a571c97)

[https://medium.com/javascript-scene/streamline-code-reviews-with-eslint-prettier-6fb817a6b51d](https://medium.com/javascript-scene/streamline-code-reviews-with-eslint-prettier-6fb817a6b51d)

[https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project)

[https://create-react-app.dev/docs/setting-up-your-editor/](https://create-react-app.dev/docs/setting-up-your-editor/)
