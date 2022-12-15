---
title: React CRA에서 prop-types와 jsdoc 함께 사용해서 VS Code의 Auto Suggestion 기능 사용하기
date: 2022-12-15
tags: [VS Code, jsdoc, PropTypes, Auto Suggestion, React]
description: TypeScript를 못쓴다면 PropTypes를 활용하자
---

prop-types는 리액트에서 제공하는 라이브러리라서 따로 설치할 필요가 없다. TypeScript를 사용하지 않는다면 (혹은 사용할 수 없다면) prop-types로 타이핑 서포트가 가능하다.

jsdoc은 VS Code에서 별다른 설정 없이 사용할 수 있다. 

vscode extension이 있긴 한데 깔아도 별 효과가 없는 것 같다(?) 안깔아도 잘 된다..


js-doc과 prop-types를 사용하여 컴포넌트를 정의하고 사용하는 쪽에서 Auto Suggestion 기능을 활용할 수 있다.
<div align="center">
<video width="600" height="520" controls>
  <source src="../../static/media/blog/proptypes/jsdoc-autofill.mp4" type="video/mp4">
</video>
<figcaption align="center">
<small>출처 https://code.visualstudio.com/docs/editor/intellisense</small>
</figcaption>
</div>


### proptypes와 jsdoc을 사용하기 이전
<div align="center">
<video width="600" height="560" controls>
  <source src="../../static/media/blog/proptypes/before_proptypes.mov" type="video/mp4">
</video>
</div>

Hover를 해도 any 타입의 suggestion이 떠서 타입 미리보기를 할 수가 없다.

### proptypes와 jsdoc을 사용하고 난 후
<div align="center">
<video width="600" height="560" controls>
  <source src="../../static/media/blog/proptypes/after_proptypes.mov" type="video/mp4">
</video>
</div>

PropTypes로 지정해준 Prop 타입을 js-doc의 파람값에 지정하면 Destructuring해서 가져오는 프롭스의 키값에 해당하는 밸류의 타입을 알 수 있다.

[View Code](https://codesandbox.io/s/proptypes-9cw63w?file=/src/App.js)


PropTypes 자세한 사용법은 아래 참고
- [Typechecking With PropTypes – React](https://reactjs.org/docs/typechecking-with-proptypes.html)

js-doc 자세한 사용법은 아래 참고
- [Use JSDoc](https://jsdoc.app/index.html)
- [React props auto-complete in VS Code](https://dev.to/maxbvrn/react-props-auto-complete-in-vs-code-2ana)