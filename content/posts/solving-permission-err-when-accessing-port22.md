---
title: SSH port 22 gitlab 접속 시 permission error 해결방법
date: 2020-09-27
tags: [ssh]
description: "port 22 차단되었을 때 해결 방법"
---

주말에 카페에서 회사 gitlab 리포지토리를 pull 받으려고 했는데 다음과 같은 에러가 떴다.

```bash
ssh: connect to host gitlab.com port 22: Operation timed out
fatal: Could not read from remote repository.
```

이 문제를 해결하기 위해 아래의 문서를 참고했다.

[https://about.gitlab.com/blog/2016/02/18/gitlab-dot-com-now-supports-an-alternate-git-plus-ssh-port/](https://about.gitlab.com/blog/2016/02/18/gitlab-dot-com-now-supports-an-alternate-git-plus-ssh-port/)

위 문서에 나와있는대로 `./ssh` 폴더 밑에 config 파일을 생성한 뒤, 파일 안에 아래 내용을 삽입했다.

```bash
Host gitlab.com
  Hostname altssh.gitlab.com
  User git
  Port 443
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/gitlab
```

맨 처음에 저렇게 똑같이 붙여넣고 나니 여전히 `no such identity: /Users/bag-yeonha/.ssh/gitlab: No such file or directory` 라는 에러가 떠서, 아래와 같이 변경해주었다.

```bash
Host gitlab.com
  Hostname altssh.gitlab.com
  User git
  Port 443
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa.pub
```

그런데 이번에는 또 이런 에러가 떴다.

```bash
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0644 for '/Users/bag-yeonha/.ssh/id_rsa.pub' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "/Users/bag-yeonha/.ssh/id_rsa.pub": bad permissions
git@altssh.gitlab.com: Permission denied (publickey).
```

찾아보니 .pub을 삭제해주어야 한다고 한다.

```bash
Host gitlab.com
  Hostname altssh.gitlab.com
  User git
  Port 443
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa
```

이제 `ssh -T git@gitlab.com` 로 확인을 해보니 드디어 엑세스가 얻어졌다!

Happy coding!
