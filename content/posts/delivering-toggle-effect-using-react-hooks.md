---
title: 리액트 최신기능 Hooks를 이용하여 네비게이션 바 토글 기능 구현하기
date: 2019-07-02
tags: [react,hooks]
description: 클래스형 컴포넌트에서만 가능하던 state 기능을 Hooks를 이용하여 함수형 컴포넌트에서 구현할 수 있다.
---

### 리액트 최신기능 Hooks를 이용하여 네비게이션 바 토글 기능 구현해보자!

기존에는 이벤트에 따라 버튼의 상태를 바꾸거나 메뉴바를 보였다가 사라지게 할 때 this.state를 이용해왔었다. 그러다가 이번에 React Hooks를 접하게 되면서 함수형 컴포넌트에서도 state관리와 라이프 사이클 방식을 운용할 수 있다는 사실을 알게 되었다. 그 동안 state를 사용하기 위해서는 필수적으로 class형 컴포넌트를 사용해야 했던 제약에서 벗어나 함수형 컴포넌트를 보다 적극적으로 사용할 수 있는 길이 열린 것이다. Hooks가 소개되기 이전에는 함수형 컴포넌트는 stateless components라고도 불리었는데 이제 그 정의는 더이상 유효하지 않게 되었다. 

이 포스팅에서는 Hooks를 이용해 함수형 컴포넌트에서 불린형 state 값을 제어하고 그에 따라 다른 css클래스를 적용하는 방식을 정리해 보았다. 

 **구현하고자 하는 기능은 클릭 할때마다 네비게이션 바가 보였다가 사라졌다가 하는 것이다. Hooks를 사용하기 위해서는 우선 useState 함수(여러 Hook 함수 중의 하나)를 import 해주어야 한다.**

```jsx
import React, { useState } from 'react'
import styles from '../css/navbar.module.css'
import { FaAlignRight } from 'react-icons/fa'

// 중략 ...

const Navbar = () => {
  const [isOpen, setNav] = (useState(false))  //useState의 기능은 this.state와 유사하다
  const toggleNav = () => {
    setNav(isOpen => !isOpen)
  }

  return(
    <div>
      <button type="button" className={styles.logoBtn} onClick={toggleNav}>
        <FaAlignRight className={styles.logoIcon} />
      </button>
      <ul className={isOpen? `${styles.navLinks} ${styles.showNav}` : `${styles.navLinks}`}>
        <li>About</li>
        <li>Location</li>
        <li>Contacts</li>
        <li>Vision</li>
      </ul>
    </div>
  )



```
Hooks를 사용하는 가장 간단한 부분만 추려보았다. button 태그가 onClick 이벤트를 받으면 toggleNav로 연결되고, isOpen 값의 boolean형을 반대로 바꾸어준다.(true이면 false, false이면 true)

useState의 기능은 클래스형 컴포넌트의 this.state가 제공하는 기능과 유사하다. 

const [isOpen, setNav] = (useState(false))

-> setNav라는 함수를 사용하며 그 함수가 업데이트 하는 변수 이름이 isOpen이라는 정의를 해준 것이다. isOpen의 초깃값은 false이다. useState는 오직 하나의 아규먼트를 받고, 그것이 초기값이 된다. 

isOpen값이 true일때는 showNav 클래스가 적용되어 네비게이션 바가 화면에 나타난다. 

```css
.nav-links {
  list-style-type: none;
  transition: var(--mainTransition);
  height: 0;
  overflow: hidden;
}
.show-nav {
  height: 216px;
}
```

