## 풀이과정

### 사고 과정

그냥 단순하게 생각해서 하나씩 순회하면서 체크하면 될 것 같은데 효율성 테스트에서 떨어질 것 같다.

효율성을 어떻게 챙길 수 있을까?

-> 오름차순 정렬을 먼저 한 후 앞에서부터 순회해보자

순회하면서 findIndex를 사용하면 될 것 같다.

```js
function solution(citations) {
  // 오름차순 정렬
  const copy = citations.sort((a, b) => a - b);

  let h = 0;

  for (let i = 0; i < copy.length; i++) {
    const index = copy.findIndex((c) => c >= copy[i]);

    if (copy[i] <= copy.length - index && h < copy[i]) {
      h = copy[i];
      continue;
    }
    if (copy[i] > copy.length - index) {
      break;
    }
  }

  return h;
}
```

문제점 : H-index가 실제 인용 횟수와 같을 필요는 없다. `h = copy[i]` 부분이 문제이다.

### 최종 코드

```js
function solution(citations) {
  const copy = citations.sort((a, b) => a - b);

  let h = 0;

  while (h <= copy.length) {
    const index = copy.findIndex((c) => h <= c);
    const count = index === -1 ? 0 : copy.length - index;

    if (h > count) break;

    h++;
  }

  return h - 1;
}
```
