## 7일차: 스택/큐 - [기능개발](https://school.programmers.co.kr/learn/courses/30/lessons/42586)

### 문제 풀기

모든 기능의 퍼센트는 같이 올라간다. 그러나 앞 작업이 완료되지 않으면 뒤 작업이 완료되지 않는다.

위 조건을 만족하기 위한 로직이 뭘까?

```ts
// 1. for문으로 배열 순회하면서 speeds를 각각 더해 100이 될 때까지 기다린다.
// 2. index를 고정시켜서 100이 된 것들만 배열로 만들어 2차원 배열에 추가한다.
// 3. 순회 완료 후 2차원 배열의 각 원소의 length를 배열로 만들어 출력한다.
```

```ts
function solution(progresses, speeds) {
  let index = 0;
  let answer = [];

  while (true) {
    if (index > progresses.length) break;

    // 각 속도만큼 진행도에 추가
    progresses = progresses.map((p, i) => p + speeds[i]);

    // 진행도가 100인지 검사 후 answer 배열에 추가
    let count = 0;
    for (const progress of progresses) {
      if (progress >= 100) count += 1;
      else if (progress < 100 && count !== 0) {
        answer.push(count);
      }
    }
    index += count;
  }
  return answer;
}
```

결과가 제대로 나오지 않는다. 흠..

while문 안에서 각 속도만큼을 추가해버린 것이 문제인 것 같다.

각 기능이 완료되는지를 먼저 계산하고, 그 날짜 배열을 바탕으로 조건을 계산하는 방법을 적용해보자.

```ts
function solution(progresses, speeds) {
  // 각 작업이 며칠 남았는지 배열로 만들기
  const leftDays = progresses.map((p, i) => {
    return Math.ceil((100 - p) / speeds[i]);
  });

  // 남은 날짜를 기준으로 현재 index의 날짜 이하인 경우 카운팅해서 추가하기
  // ex) [7, 3, 9]
  // [5, 10, 1, 1, 20, 1]
  let answer = [];
  let index = 0;
  let count = 0;
  for (const day of leftDays) {
    if (leftDays[index] >= day) {
      count += 1;
      if (leftDays.length === index) answer.push(count);
    } else {
      answer.push(count);
      index += count;
      count = 0;
    }
  }
  return answer;
}
```

디버깅이 안된다.. 어디가 문제지? 도움을 받아보자.

goat

```ts
function solution(progresses, speeds) {
  // 각 작업이 며칠 남았는지 배열로 만들기
  const leftDays = progresses.map((p, i) => {
    return Math.ceil((100 - p) / speeds[i]);
  });

  // 남은 날짜를 기준으로 현재 index의 날짜 이하인 경우 카운팅해서 추가하기
  // [7, 3, 9]
  // [5, 10, 1, 1, 20, 1]
  let answer = [];
  let index = 0;
  let count = 0;
  for (const day of leftDays) {
    if (leftDays[index] >= day) {
      count += 1;
    } else {
      answer.push(count);
      index += count;
      count = 1;
    }
  }
  answer.push(count);
  return answer;
}
```

### 최종 제출 코드

### 다른 사람 풀이 보기

### 반성

미리 안 풀어온 죄

### 다시 코드 작성해보기
