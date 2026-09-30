```js
function solution(progresses, speeds) {
  const result = [];
  while (progresses.length !== 0) {
    progresses = progresses.map((p, index) => p + speeds[index]);
    let head = progresses[0];

    let count = 0;
    while (head >= 100) {
      count++;
      progresses.shift();
      speeds.shift();
      head = progresses[0];
    }

    if (count !== 0) result.push(count);
  }

  return result;
}

// 1시 12분 시작, 1시 46분 끝
// 각 기능은 진도가 100%일 때 서비스에 반영 가능
// 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있다.
// 이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됩니다.

// progresses: 먼저 배포되어야 하는 순서대로 작업의 진도가 적혀있음 -> index가 순서?
// speeds: 각 작업의 개발 속도가 적힌 정수 배열
// 각 배포마다 몇 개의 기능이 배포되는지 return

// \* 배포는 하루에 한 번만 할 수 있음.

// 일단 첫 배포 순서가 빠른 애들이 병목임

// 의사코드
// 0. progress에 speed 더해줌
// 1. let day = 1;
// 2. progress 배열이 비워질 때까지 반복함
// 3. progress 제일 앞에있는 애가 100 이상인지 확인함
// 4. 그 뒤에 연속으로 100이상인 애가 있으면 계속 뺌 (여기서 카운트함)
// 5. 100미만인 애가 나오면 끊고
// 6. 카운트 한거를 result 배열에 넣음
```
