## 풀이과정

처음부터 순회해서 findIndex로 자기보다 작은 수인 인덱스를 찾아서
인덱스 값을 비교하면 될 것 같음

```js
function solution(prices) {
  const seconds = [];

  for (let i = 0; i < prices.length; i++) {
    let small = prices.slice(i).findIndex((price) => price < prices[i]);

    const second = small > -1 ? small : prices.length - i - 1;
    seconds.push(second);
  }
  return seconds;
}
```

효율성 테스트 5개 다 실패 -> for문 안에서 findIndex를 사용해서 그런 것 같음

```js
function solution(prices) {
  const seconds = [];

  for (let i = 0; i < prices.length; i++) {
    let second = 0;

    for (let j = i + 1; j < prices.length; j++) {
      second++;

      if (prices[j] < prices[i]) {
        break;
      }
    }

    seconds.push(second);
  }

  return seconds;
}
```

그래서 단순 이중 for문을 사용해봤더니 성공함. 이유가 뭘까

-> 시간 복잡도는 똑같이 O(N^2)이지만, 실제 수행하는 연산의 양이 줄어들기 때문이라고 함

`slice`로 요소들을 복사해서 새로운 배열을 생성하는 과정이 없어져서 성공한 것 같음.
