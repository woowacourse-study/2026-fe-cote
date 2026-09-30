# 같은 숫자는 싫어

## 풀이

```js
function solution(arr) {
  const result = [];
  arr.forEach((a) => {
    if (a !== result.tail) {
      result.push(a);
      result.tail = a;
    }
  });
  return result;
}
```

첫번쨰 생각한방법. 두번째 방법이 오류날것같아 안전하게 풀음
마지막값과 비교해서 다를경우에만 푸시 아래 방법이 더좋아보임

## 두 번째 풀이

```js
function solution(arr) {
  return arr.filter((a, i) => a !== arr[i + 1]);
}
```

처음 생각한 방법, i+1에서 참조오류가 날 것이라고 생각했는데, undefined로 나오니 필터링 되지않음

처음부터 두번째방법으로 풀껄..
