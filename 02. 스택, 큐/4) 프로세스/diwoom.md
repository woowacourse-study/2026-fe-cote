## 풀이 과정

priorities는 우선순위, location은 인덱스 번호
priorities에 따라 인덱스 값을 배열에 차례대로 push하면 될 것 같다.
중간에 location과 인덱스 값이 같다면 early return
push한 요소의 값은 0으로 변경하면 될 것 같다.

```js
function solution(priorities, location) {
  const arr = [];
  // 단순 N번 반복
  for (let i = 0; i < priorities.length; i++) {
    const maxIndex = priorities.indexOf(Math.max([...priorities]));
    if (maxIndex === location) return arr.length + 1;
    arr.push(maxIndex);
    priorities[maxIndex] = 0;
  }

  return arr.indexOf(location);
}
```

priorities가 같은 경우를 대처하지 못한다는 걸 깨달았다. 그럼 maxIndex를 기준으로 배열을 회전시켜보자

```js
function solution(priorities, location) {
  const arr = [];
  // 단순 N번 반복
  for (let i = 0; i < priorities.length; i++) {
    const maxIndex = priorities.indexOf(Math.max([...priorities]));
    if (maxIndex === location) return arr.length + 1;
    arr.push(maxIndex);
    priorities[maxIndex] = 0;
    // 배열 회전
    priorities = [
      ...priorities.slice(maxIndex),
      ...priorities.slice(0, maxIndex),
    ];
  }

  return arr.indexOf(location);
}
```

이 경우 location을 사용하지 못한다 -> 위치가 변하기 때문
그럼 객체 배열을 만들어서 location을 가지고 가게 하자.

```js
function solution(priorities, location) {
  let objectArr = priorities.map((p, i) => ({
    priority: p,
    index: i,
  }));

  const indexArr = [];

  // 단순 N번 반복
  for (let i = 0; i < priorities.length; i++) {
    // 제일 큰 우선순위 찾기
    const maxPriority = Math.max(...objectArr.map((item) => item.priority));

    // 제일 큰 우선순위 인덱스 찾기
    const maxIndex = objectArr.findIndex(
      (item) => item.priority === maxPriority,
    );

    // location과 같다면 early return
    if (objectArr[maxIndex].index === location) {
      return indexArr.length + 1;
    }

    // 같지 않다면 배열에 push
    indexArr.push(objectArr[maxIndex].index);

    // push한 원소를 제외하고 배열 재배치
    objectArr = [
      ...objectArr.slice(maxIndex + 1),
      ...objectArr.slice(0, maxIndex),
    ];
  }

  return indexArr.indexOf(location);
}
```

풀고나니 너무 더럽게 푼 것 같다.
