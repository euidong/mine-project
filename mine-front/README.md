# 지뢰찾기

- 2020 - 1 React toy project

- Test : https://euidong.github.io/mine-collector

- Dockerhub : https://hub.docker.com/repository/docker/justicedong/mine-collector/general

- 🚫 gh page 자동 배포를 위해, package.json에 homepage:"https://euidong.github.io/mine-collector" 가 있는데, <br>
docker를 이용해서 배포 시에는 반드시 삭제해야한다. 그렇지 않으면 빌드가 제대로 되지 않음.

- docker는 multi를 이용하였고, CRA의 webpack을 이용하여 build를 한 후에, 이를 nginx 서버에 올려서 사용한다. 

- 진행 사항
    - [x] 일단 기능 모든 기능 구현  
    - [x] 눌렀을 때, 0인 거 한 번에 켜지기 구현
    - [x] 보드 높이, 너비, 지뢰 확률 받기
        - [x] 너비 / 확률
        - [x] 높이
    - [x] 지뢰 갯수 보여주기
    - [x] 승리 조건 다각화
        - [x] 모든 판을 열은 경우
        - [x] 지뢰만 빼고 모든 판을 연 경우
    - [x] 모바일 작업(우버튼 없이 플레이 할 수 있게 하기)
    - [x] 디자인 작업
