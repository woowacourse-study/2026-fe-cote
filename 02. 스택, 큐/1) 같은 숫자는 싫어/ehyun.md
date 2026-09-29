```js
function solution(arr) {
  const result = [];
  let topIndex = -1;
  arr.forEach((num) => {
    if (topIndex < 0 || result[topIndex] !== num) {
      result.push(num);
      topIndex++;
    }
    return;
  });

  return result;
}

// 8시 46분 시작, 8시 55분 끝
// 배열 arr에서 연속적으로 나타나는 숫자는 1개만 남기고 전부 제거
// 제거된 후 남은 수들을 반환할 때는 arr 원소들의 순서를 유지해야함

// 일단 1을 어디 저장해놨다가 다른 숫자가 나올 때까지 keep
// 일단 map을 쓰면, 전체 중복이 제거되니까 이건 안됨

// result라는 stack 1개를 둔다
// arr을 순회하면서 result의 top이 나랑 같은지 확인한다
// 같으면 나는 그냥 빠지기만 하고
// 다르다면 나를 넣는다.
```
