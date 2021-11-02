---
title: event.target과 event.currentTarget의 차이점은 무엇일까?
date: 2021-10-16
tags: [event-bubbling, html]
---
event.target과 event.currentTarget의 차이점은 event bubbling에 있다. Event bubbling은 어떤 엘러먼트에서 이벤트가 발생했을때 해당 엘러먼트의 이벤트 핸들러만 호출되고 끝나는게 아니고 그 엘러먼트의 부모 엘러먼트가 지닌 이벤트 핸들러까지 호출되는 현상을 말한다. 이벤트가 DOM 트리를 거품처럼 타고 올라가는 것이다(bubbling up) 하지만 모든 이벤트가 이벤트 버블링 현상에 속하지는 않는다. click 이벤트는 버블링되지만, focus 이벤트는 그렇지 않다. 이벤트가 이벤트 버블링 특징을 가지고 있는지 아닌지는 이벤트가 [bubbles 프로퍼티](https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles)를 가지고 있느냐 그렇지 않느냐에 따라 결정된다.

event.target은 이벤트가 발생한 바로 그 엘러먼트를 가리킨다.

event.currentTarget은 이벤트를 핸들링하는 엘러먼트를 가리킨다.

이벤트 버블링 확인해보기 ⇒ [https://codesandbox.io/s/long-rain-p5ml1?file=/src/index.js:24-712](https://codesandbox.io/s/long-rain-p5ml1?file=/src/index.js:24-712)

```js
document.getElementById("app").innerHTML = `
	<div class="container">
	  <div class="box">
	  <button id="btn" onclick={showTarget}>click</button>
	  <div class="target"><span>e.target:<span></div>
	  <div class="current-target"><span>e.currentTarget:<span></div>
	  </div>
	</div>
`;

const button = document.getElementById("btn");

button.onclick = (e) => {
  const target = document.createElement("span");
  const currentTarget = document.createElement("span");
  target.textContent = e.target;
  currentTarget.textContent = e.currentTarget;

  document.querySelector(".target").appendChild(target);
  document.querySelector(".current-target").appendChild(currentTarget);
  button.remove();
};
```

### 어떤 경우에 쓰일 수 있나?

이벤트가 발생한 root element를 명확히 하고 싶은 경우, 예를 들어 모달 창에서 모달이 뜨면 백그라운드는 어두워지고 그 백그라운드를 눌렀을때(click 이벤트가 발생했을 때) 모달 창을 없애고 싶을 때 사용할 수 있다. document에서 click 이벤트가 발생했을 시 모달 창을 꺼야 하지만, 모달 창 내부를 클릭했을 때는 모달 창이 꺼지면 안되기 때문이다. 이 경우는 event.target이 모달창인 경우 분기처리를 통해서 처리할 수 있다.