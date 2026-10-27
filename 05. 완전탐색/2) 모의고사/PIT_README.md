## 완전탐색 - 모의고사

### 걸린 시간: 10분

### 문제 풀기

ㄴ
패턴이 반복되는 걸 배열에서 캐치하는 게 핵심인듯?

### 최종 제출 코드

```ts
function solution(answers) {
  const f = [1, 2, 3, 4, 5];
  const s = [2, 1, 2, 3, 2, 4, 2, 5];
  const t = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  let fc = 0;
  let sc = 0;
  let tc = 0;

  answers.forEach((a, i) => {
    fc = fc + (a === f[i % 5] ? 1 : 0);
    sc = sc + (a === s[i % 8] ? 1 : 0);
    tc = tc + (a === t[i % 10] ? 1 : 0);
  });

  const maxScore = Math.max(fc, sc, tc);

  const result = [];
  if (fc === maxScore) result.push(1);
  if (sc === maxScore) result.push(2);
  if (tc === maxScore) result.push(3);

  return result;
}
```

### 다른 사람 풀이 보기

```ts
function solution(answers) {
  var answer = [];
  var a1 = [1, 2, 3, 4, 5];
  var a2 = [2, 1, 2, 3, 2, 4, 2, 5];
  var a3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  var a1c = answers.filter((a, i) => a === a1[i % a1.length]).length;
  var a2c = answers.filter((a, i) => a === a2[i % a2.length]).length;
  var a3c = answers.filter((a, i) => a === a3[i % a3.length]).length;
  var max = Math.max(a1c, a2c, a3c);

  if (a1c === max) {
    answer.push(1);
  }
  if (a2c === max) {
    answer.push(2);
  }
  if (a3c === max) {
    answer.push(3);
  }

  return answer;
}
```

어떤 조건에 맞는 값의 개수는 filter를 사용해도 좋을 듯?

### 반성

C로 푸는 느낌이 계속 드네

### 다시 코드 작성해보기
