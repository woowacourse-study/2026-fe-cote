## 8일차: 스택/큐 - [올바른 괄호](https://school.programmers.co.kr/learn/courses/30/lessons/12909)

걸린 시간: 00:10 ~ 00:20 (10분)

### 문제 풀기

스택 배열을 만들어서 '('인 경우 top+1, ')'인 경우 top-1

전체 길이 순회 후 스택 배열이 빈 경우는 쌍이라는 의미이므로 true, 아니면 false

```ts
function solution(s) {
  let stack = [];
  let top = -1;

  for (const c of s.split('')) {
    if (c === '(') {
      stack.push(c);
      top += 1;
    }
    if (c === ')' && stack.length === 0) {
      return false;
    } else {
      stack.pop();
      top -= 1;
    }
  }

  return top === -1;
}
```

답이 다 false로 나오는 것 같은데? 이유가 뭘까?

첫 번째 조건문에서 push하고, 바로 else에서 pop되기 때문에 모두 false가 발생한 것이다.

첫 번째 조건문 마지막 라인에 continue 작성하니까 풀렸다.

### 최종 제출 코드

```ts
function solution(s) {
  let stack = [];
  let top = -1;

  for (const c of s.split('')) {
    if (c === '(') {
      stack.push(c);
      top += 1;
      continue;
    }
    if (c === ')' && stack.length === 0) {
      return false;
    } else {
      stack.pop();
      top -= 1;
    }
  }

  return top === -1;
}
```

### 다른 사람 풀이 보기

```ts
function solution(s) {
  let cum = 0;
  for (let paren of s) {
    cum += paren === '(' ? 1 : -1;
    if (cum < 0) {
      return false;
    }
  }
  return cum === 0 ? true : false;
}
```

### 반성

사실 내 코드에서 stack 배열은 필요 없다. 알고리즘 문제 변형을 고려해서 의도적으로 배열로 풀어봤다.

코드 좀 깔끔하게 푸는 방법 없나..

### 다시 코드 작성해보기

```ts
function solution(s) {
  let top = -1;

  for (const c of s.split('')) {
    if (c === ')' && top === -1) {
      return false;
    }

    c === '(' ? (top += 1) : (top -= 1);
  }

  return top === -1;
}
```

더 줄이는 방법은 모르겠다.
