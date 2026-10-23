## 완전탐색 - [최소직사각형](https://school.programmers.co.kr/learn/courses/30/lessons/86491)

### 걸린 시간: 5분

### 문제 풀기

가로, 세로 중 더 큰 수를 가로 / 더 작은 수를 세로로 기준을 잡고 최대일때마다 업데이트해주면 그게 최종 최소값이다.

### 최종 제출 코드

```ts
function solution(sizes) {
  let w = 0;
  let h = 0;
  for (const s of sizes) {
    const width = s[0] >= s[1] ? s[0] : s[1];
    const height = s[0] < s[1] ? s[0] : s[1];

    if (w < width) w = width;
    if (h < height) h = height;
  }

  return w * h;
}
```

### 다른 사람 풀이 보기

```ts
function solution(sizes) {
  const [hor, ver] = sizes.reduce(
    ([h, v], [a, b]) => [
      Math.max(h, Math.max(a, b)),
      Math.max(v, Math.min(a, b)),
    ],
    [0, 0],
  );
  return hor * ver;
}
```

reduce 써서 작업했구나.. 이해는 안된다.

### 반성

### 다시 코드 작성해보기
