---
title: zsh, bash에서 파일의 권한 설정하는방법
date: 2021-07-21
tags: [bash]
---

터미널을 열고 `cd ~` 명령어를 입력해서 홈으로 이동한 뒤 `ls -l` 명령어를 입력해보자

그러면 아래처럼 디렉토리 내의 파일, 폴더에 대한 정보를 표기하고 있는 리스트를 볼 수 있을 것이다.

![파일 리스트와 권한](../../static/media/210721/permission_list_1.png)

현 디렉토리에서 `touch new-file.sh` 를 입력해서 스크립트 파일을 하나 생성한 뒤에 다시 한번 `ls -l` 명령어를 입력하면 new-file.sh에 대한 정보도 추가되어있는 것을 확인할 수 있다.


![파일권한](../../static/media/210721/permission_setting.png)

`-rw-r—r—`

맨 왼쪽의 `-` 기호는 해당 파일이 폴더가 아닌 파일임을 지칭한다. 맨 왼쪽의 기호가 `d` 라면 그것이 폴더임을 나타낸다.

`rw-` : User가 해당 파일에 대해 읽기(read), 쓰기(write) 권한이 있음을 나타낸다.

`r--` : staff group에 속한 사람은 해당 파일에 대해 읽기(read) 권한이 있음을 나타낸다.

`r--` : staff group에 속하지도 않으며 User도 아닌 경우 해당 파일에 대해 읽기(read) 권한이 있음을 나타낸다.

파일에 대한 접근권한을 바꾸기 위해서는 chmod 명령어를 숫자를 사용해서 실행시켜주어야 한다. 

1 = execute

2 = write

4 = read

만약 어떤 파일의 권한이 - rwx rwx r— 이라면 rwx는 read, write, execute이므로 4 + 2 + 1 = 7, rwx는 read, write, execute이므로 4 + 2 + 1 = 7, r—은 read이므로 4. 최종적으로 774가 된다.

따라서 new-file에 대한 현재 권한은 644로 표현될 수 있을 것이다. 이 new-file을 774권한으로 바꾸고 싶다면 터미널에 `chmod 774 new-file.sh` 를 입력하면 된다. (유저, 그룹은 읽기, 쓰기, 실행 권한이 모두 있고 제3자는 읽기 권한만 있음)

![파일 리스트와 권한](../../static/media/210721/permission_list_3.png)

