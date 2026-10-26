## 풀이 과정

반복되는 패턴이 존재하기 때문에 패턴대로 비교하면 될 듯

1번 수포자 : [1,2,3,4,5]
2번 수포자 : [2,1,2,3,2,4,2,5]
3번 수포자 : [3,3,1,1,2,2,4,4,5,5]

각각 비교해서 결과 배열에 넣으면 될 듯

```js
function solution(answers) {
  const result = [];
  const one = [1, 2, 3, 4, 5];
  const two = [2, 1, 2, 3, 2, 4, 2, 5];
  const three = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  let count = [0, 0, 0];

  for (let i = 0; i < answers.length; i += one.length) {
    const arr = answers.slice(i, i + one.length);

    count[0] += one.filter((value, index) => value === arr[index]).length;
  }

  for (let i = 0; i < answers.length; i += two.length) {
    const arr = answers.slice(i, i + two.length);

    count[1] += two.filter((value, index) => value === arr[index]).length;
  }

  for (let i = 0; i < answers.length; i += three.length) {
    const arr = answers.slice(i, i + three.length);

    count[2] += three.filter((value, index) => value === arr[index]).length;
  }

  const max = Math.max(...count);

  return count.reduce((acc, value, index) => {
    if (value === max) acc.push(index + 1);
    return acc;
  }, []);
}
```

딱봐도 가독성이 좋지 않음 -> 순회를 너무 많이 함

### 최적화 해보기
