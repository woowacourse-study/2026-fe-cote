```js
function solution(s) {
  const stack = [];
  let top = -1;
  let result = true;
  s.split("").forEach((c) => {
    if (c === "(") {
      stack.push(c);
      top++;
    } else {
      if (top > -1) {
        // 스택에 짝이 있음
        top--;
      } else {
        result = false; // 짝이 없음 여기서
      }
    }
  });

  if (top > -1) result = false;

  return result;
}
```
