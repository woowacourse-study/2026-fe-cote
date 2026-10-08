## 11일차: 스택/큐 - 주식가격

### 걸린 시간: 00:00 ~ 00:40 (40분)

### 문제 풀기

```ts
1. prices 배열을 순회하면서, t 시각의 가격정보와 떨어지지 않은 기간 카운트를 0으로 객체로 초기화한다.
2. 그와 동시에 현재 인덱스 시각 이전 가격 정보를 업데이트한다.
  - 만약 이전 가격 정보가 더 높다면 해당 가격 정보에 대한 카운트를 -1한다.
  - 그렇지 않다면 카운트 +1한다.
3. 만약 마지막 인덱스라면 순회를 종료한다. (해당 가격정보는 무조건 0)
```

코드로 짜보다보니까 로직이 좀 이상한 것 같다. 다른 방법은 없을까?

흠.. 아무래도 스택 문제니까 스택으로 풀 수 있을 것 같은데..

다시 문제를 읽으면서 생각해보자.

'가격이 떨어지지 않은 구간'이라는 것은 '가격이 떨어진 인덱스'에서 '해당 값 인덱스'를 뺴는 것이다.

prices 배열을 순회하면서, 현재 보고 있는 값 p가 스택의 마지막 인덱스의 값보다 작으면 가격이 떨어진 것이므로 p의 인덱스에서 stack에서 pop한 인덱스를 뺀 값을 answer 배열에 pop한 인덱스 위치에 넣는다.

위 방법으로 3, 2, 1인 경우가 처리가 될까? (실제로 답은 [1, 1, 0])

1. 현재 값 2일 때: stack = [0(인덱스)], 현재 값인 2이 stack의 마지막 인덱스 값인 3보다 작으므로 가격이 떨어짐 -> answer[0] = 1-0 = 1

2. 이후 1(인덱스) push

3. 현재 값 1일 때: stack = [1(인덱스)], 현재 값인 1이 stack의 마지막 인덱스 값인 2보다 작으므로 가격이 떨어짐 -> answer[1] = 2-1 = 1

4. 이후 2(인덱스) push

5. 순회를 마쳤으므로 stack에 들어 있는 값인 2(인덱스)를 빼서, answer[2] = 2(prices 길이-1) - 2(인덱스) = 0

### 최종 제출 코드

```ts
function solution(prices) {
  let answer = prices.map((_) => 0);
  let stack = [];

  prices.forEach((p, index) => {
    while (prices[stack[stack.length - 1]] > p) {
      const startIndex = stack.pop();
      answer[startIndex] = index - startIndex;
    }

    stack.push(index);
  });

  while (stack.length !== 0) {
    const startIndex = stack.pop();
    answer[startIndex] = prices.length - 1 - startIndex;
  }

  return answer;
}
```

### 다른 사람 풀이 보기

```ts
function solution(prices) {
  const answer = new Array(prices.length).fill(0);
  const stack = [];
  let length = prices.length;

  for (let i = 0; i < length; i++) {
    while (stack.length && prices[i] < prices[stack[stack.length - 1]]) {
      let temp = stack.pop();
      answer[temp] = i - temp;
    }
    stack.push(i);
  }

  while (stack.length) {
    let temp = stack.pop();
    answer[temp] = length - temp - 1;
  }

  return answer;
}
```

똑같이 풀었네..

### 반성

0으로 채운 배열을 만드는 법을 몰라서 `prices.map(_=>0)`로 썼는데, Array 클래스에서 제공하는 fill 메서드가 있었구나!

첫 while문 돌릴 때 stack이 비어 있는 걸 처리를 안해도 돌아가길래 그냥 안했는데, stack[-1]이 undefined이라서 prices[undefined]도 undefined, 그래서 undefined > p를 비교하면 false이기 때문에 자동으로 처리되었다.

이런 건 명시적으로 보여주는 게 맞긴 해서, stack.length가 0이 아님을 검사하는 것도 좋을 것 같다.

문제를 읽으면서 의사코드를 작성하지 말자. 한 번 쭉 읽고 나서 작성하자.

### 다시 코드 작성해보기

...
