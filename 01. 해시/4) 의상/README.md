```js
function solution(array, r) {
  // array가 의상의 종류 배열이 됨, r이 몇개 선택할건지
  const map = new Map();
  array.forEach(([_, kind]) => {
    map.set(kind, map.has(kind) ? map.get(kind) + 1 : 1);
  });

  return map.values().reduce((acc, value) => acc * (value + 1), 1) - 1;
}
```
