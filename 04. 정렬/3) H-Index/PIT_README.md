## 정렬 - 'H-Index'

### 걸린 시간: 20분?

### 문제 풀기

중앙값 문제 아닌가?
이상일 때 h, 이하일 때 h를 정한 후 max하면 될듯

```ts
function solution(citations) {
  citations.sort((a, b) => a - b);

  // 중앙값의 위치
  // n이 짝수이면 length/2 - 1, length/2 두 원소가 중앙
  // n이 홀수이면 (length-1)/2

  const l = citations.length;
  const index = l % 2 === 0 ? l / 2 : (l - 1) / 2;

  return citations[index];
}
```

흠
문제를 다시 읽어보니 h번 중 h편 이상 <- 내림차순 후 각 원소의 순번보다 인용 횟수가 작거나 같은 위치의 값을 주자. 문제 이해력 낮네 어떡하지..

### 최종 제출 코드

```ts
function solution(citations) {
  citations.sort((a, b) => b - a);

  let i = 0;
  while (i < citations.length && citations[i] > i) {
    i++;
  }

  return i;
}
```

### 다른 사람 풀이 보기

볼 필요 없네 다 다르게 풀음

### 반성

예외가 없을 줄 알았는데 많았다. [10, 10, 10]인 경우는 바로 끝까지 순회하지만 정답은 3
[0, 0, 0]인 경우때문에 인덱스는 0부터 시작해야 함
등등..

### 다시 코드 작성해보기
