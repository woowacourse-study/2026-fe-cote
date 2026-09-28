## 4일차: 해시 - 의상

### 문제 풀기

최대 조합을 반환해야 한다. 동시에 같은 의상을 착용할 수 없다.

Map을 사용해서 종류를 정리하고, 경우의 수를 모두 곱하면 원하는 결과가 나올 것 같다.

```ts
function solution(clothes) {
  const map = new Map();

  for (const [name, key] of clothes) {
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  let answer = 1;
  for (const value of map.values()) {
    answer = answer * (value + 1);
  }

  return answer;
}
```

원하는 결과보다 1 높게 나왔다. 아무것도 착용하지 않는 경우를 제외하지 않았다.

### 최종 제출 코드

```ts
function solution(clothes) {
  const map = new Map();

  for (const [name, key] of clothes) {
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  let answer = 1;
  for (const value of map.values()) {
    answer = answer * (value + 1);
  }

  return answer - 1;
}
```

### 다른 사람 풀이 보기

```ts
function solution(clothes) {
  return (
    Object.values(
      clothes.reduce((obj, t) => {
        obj[t[1]] = obj[t[1]] ? obj[t[1]] + 1 : 1;
        return obj;
      }, {}),
    ).reduce((a, b) => a * (b + 1), 1) - 1
  );
}
```

Object랑 reduce를 써서 문제를 해결했다.

### 반성

아무것도 입지 않는다는 사실을 알면서도 `-1`하지 않은 부분 반성

### 다시 코드 작성해보기
