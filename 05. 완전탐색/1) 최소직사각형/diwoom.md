## 풀이 과정

회전시켜서 들어가는 경우도 생각해야 한다. 어떻게 풀면 될까?
각 카드의 w, h 중 더 큰 값들 중 최댓값, 작은 값들 중 최댓값을 구해서 곱하면 될 듯

ex. [[14, 4], [19, 6], [6, 16], [18, 7], [7, 11]]

각 카드의 w h 중 더 큰 값은 14, 19, 16, 18, 11 -> 최댓값 19
작은 값 4, 6, 6, 7, 7 -> 최댓값 7
곱하면 133.

### 코드

```js
function solution(sizes) {
  const maxW = Math.max(...sizes.map((s) => Math.max(...s)));
  const maxH = Math.max(...sizes.map((s) => Math.min(...s)));

  return maxW * maxH;
}
```
