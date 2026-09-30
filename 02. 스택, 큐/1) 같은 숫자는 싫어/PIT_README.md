## 6일차: 스택/큐 - [같은 숫자는 싫어](https://school.programmers.co.kr/learn/courses/30/lessons/12906)

### 문제 풀기

answer 배열과 index로 검사하면서 숫자를 쌓으면 되지 않을까?

```ts
function solution(arr) {
  var answer = [];
  let index = 0;

  for (const num of arr) {
    if (index === 0) {
      answer.push(num);
    } else if (answer[index] !== num) {
      answer.push(num);
      index += 1;
    }
  }

  return answer;
}
```

의도대로 동작하지는 않는다. index를 따로 관리하는 것보다는 그냥 answer 배열 길이를 사용하자.

```ts
function solution(arr) {
  var answer = [];

  for (const num of arr) {
    if (answer.length === 0) {
      answer.push(num);
    } else if (answer[answer.length - 1] !== num) {
      answer.push(num);
    }
  }

  return answer;
}
```

index를 length로 변경하니 풀렸다. 왜일까?

### 최종 제출 코드

```ts
function solution(arr) {
  var answer = [];

  for (const num of arr) {
    if (answer.length === 0) {
      answer.push(num);
    } else if (answer[answer.length - 1] !== num) {
      answer.push(num);
    }
  }

  return answer;
}
```

### 다른 사람 풀이 보기

```ts
function solution(arr) {
  return arr.filter((val, index) => val != arr[index + 1]);
}
```

천잰가? 현재 배열의 값과 그 다음 값을 비교해서 다를 시에만 filter하는 로직..

### 반성

```ts
function solution(arr) {
  var answer = [];
  let index = 0;

  for (const num of arr) {
    if (index === 0) {
      answer.push(num);
    } else if (answer[index] !== num) {
      answer.push(num);
      index += 1;
    }
  }

  return answer;
}
```

왜 위 코드가 동작하지 않았을까?

우선 for문 안에서 index는 항상 0이여서 모두 push한다.

for문 안에 index += 1 로직이 있어도, answer[index]가 아니라 answer[index-1]와 비교해야 한다.

```ts
function solution(arr) {
  var answer = [];
  let index = 0;

  for (const num of arr) {
    if (index === 0) {
      answer.push(num);
      index += 1;
    } else if (answer[index - 1] !== num) {
      answer.push(num);
      index += 1;
    }
  }
  return answer;
}
```

이렇게 고치니까 통과한다. 그래도 일일히 동기화하는 것보다는 answer.length 속성을 사용하자.

### 다시 코드 작성해보기
