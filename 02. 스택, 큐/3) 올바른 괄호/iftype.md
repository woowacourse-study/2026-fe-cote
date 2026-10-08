# 올바른 괄호

## 코드

```js
function solution(s) {
  const stack = [];

  const left = "(";
  const right = ")";

  let check = false;
  s.split("").forEach((_s) => {
    if (_s === left) {
      stack.push(_s);
    } else if (_s === right) {
      if (stack.length === 0) {
        check = true;
        return;
      }
      stack.pop();
    }
  });
  if (check === true) return false;
  return stack.length === 0 ? true : false;
}
```

## 풀이

1. "(" 면넣고 ")"면 뺸다.
2. 빈 배열인데 ")" 들어오면 줴줴이야 ㅋㅋ

## 반성

레전드 멍청한 티 냄

아래와 같은 실수를 함.. ㅋㅋ 하 ㅋ

```js
const example = arr.forEach((e) => {
  if (true) {
    return false;
  }
});
```

### 다른사람 코드

```js
function solution(s) {
  let cum = 0;
  for (let paren of s) {
    cum += paren === "(" ? 1 : -1;
    if (cum < 0) {
      return false;
    }
  }
  return cum === 0 ? true : false;
}
```

얘좀 치네? ㅋ

굳이 배열 쓸 필요없이 숫자로 연산하면 빨랐는데 ㅋㅋ
다음부터 Pop 넌 국물도없다
