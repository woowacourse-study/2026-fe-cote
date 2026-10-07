## 9일차: 스택/큐 - 프로세스

걸린 시간: 12:30 ~ 01:00 (30분)

### 문제 풀기

```
1. 실행 대기 큐(Queue)에서 대기중인 프로세스 하나를 꺼냅니다.
2. 큐에 대기중인 프로세스 중 우선순위가 더 높은 프로세스가 있다면 방금 꺼낸 프로세스를 다시 큐에 넣습니다.
3. 만약 그런 프로세스가 없다면 방금 꺼낸 프로세스를 실행합니다.
  3.1 한 번 실행한 프로세스는 다시 큐에 넣지 않고 그대로 종료됩니다.
```

Array의 shift 연산자를 사용하면 풀리지 않을까?
location 값을 계속 변경시켜서 해당 인덱스에서 shift되면 그 때 카운트를 계산해서 반환해보자.

```ts
function solution(priorities, location) {
  let count = 0;
  while (priorities.length > 0) {
    // 맨 첫번째 요소만 검사 (우선순위 높음)
    if (priorities[0] > Math.max(priorities)) {
      priorities.shift();

      location--;
      if (location < 0) return count;
    } else {
      const tmp = priorities.shift();
      priorities.push(tmp);

      location--;
      if (location < 0) location = priorities.length - 1;
    }

    count++;
  }
  return count;
}
```

무한 루프가 걸리는 듯 하다.. 왤까?
0번째 인덱스 값을 제외한 나머지 값들 중 최대값과 비교해야 if문을 통과한다. 지금은 항상 false이다..
그리고 count는 1부터 시작하는 게 계산하기 편하다

```ts
function solution(priorities, location) {
  let count = 1;
  while (priorities.length > 0) {
    // 맨 첫번째 요소만 검사 (우선순위 높음)
    if (priorities[0] >= Math.max(...priorities.slice(1))) {
      priorities.shift();

      location--;
      if (location < 0) return count + 1;
    } else {
      const tmp = priorities.shift();
      priorities.push(tmp);

      location--;
      if (location < 0) location = priorities.length - 1;
    }

    count++;
  }
  return count;
}
```

찾아보니까 Math.max의 인자로 그냥 배열을 넘기면 NaN이 나온다고 해서 나머지로 뿌려줘야 한다고 한다.
무한루프는 해결했지만 값이 이상하게 나온다.
이유를 찾아봤는데, 어떤 작업이든 다 count + 1해서 그런 것 같다. 프로세스가 나간 경우에만 +1해주자.
그러려면 다시 count를 0부터 시작하고, shift() 후 count +1을 한 뒤 return해주면 순서가 맞다. 다시 0으로 초기화하자.

### 최종 제출 코드

```ts
function solution(priorities, location) {
  let count = 0; // 첫 번째부터 시작
  while (priorities.length > 0) {
    // 맨 첫번째 요소만 검사 (우선순위 높음)
    if (priorities[0] >= Math.max(...priorities.slice(1))) {
      priorities.shift();

      count++;
      location--;
      if (location < 0) return count;
    } else {
      const tmp = priorities.shift();
      priorities.push(tmp);

      location--;
      if (location < 0) location = priorities.length - 1;
    }
  }
  return count;
}
```

### 다른 사람 풀이 보기

```ts
function solution(priorities, location) {
  var list = priorities.map((t, i) => ({
    my: i === location,
    val: t,
  }));
  var count = 0;
  while (true) {
    var cur = list.splice(0, 1)[0];
    if (list.some((t) => t.val > cur.val)) {
      list.push(cur);
    } else {
      count++;
      if (cur.my) return count;
    }
  }
}
```

뭔 코드지 이게 흠.. 나도 객체로 풀어봐야곘다.

### 반성

`Math.max()`에 배열 넣지 말자.. 꼭 원소 나머지 연산자로 풀어서 넣자..
항상 이런 문제 풀 때 count나 index 따로 관리하다가 문제 푸는 시간이 늦어지는 것 같은데.. 동기화 잘하는 법 있을까?

### 다시 코드 작성해보기

```ts
function solution(priorities, location) {
  // 프로세스마다 location 여부를 boolean으로 묶어서 객체로 관리
  const obj = priorities.map((p, idx) => ({
    my: idx === location,
    val: p,
  }));

  let count = 0;
  while (true) {
    // 우선 왼쪽 값 뺴기
    let c = obj.shift();

    // 해당 값이 최대값이 아니면 다시 push
    if (c.val < Math.max(...obj.map((o) => o.val))) obj.push(c);
    else {
      // 최대값이면 빠져야하므로 count + 1
      count++;
      if (c.my) return count; // 근데 그 값이 location이면그 때 count 리턴
    }
  }
}
```

내가 원하던 게 바로 이런 것이다.. 필요한 것끼리 동기화시켜서 배열 순회 시 같이 찾게 하는 장점이 있다.
근데 꼭 장점만 있는 건 아니고, 자료형을 새로 만들어야 하는 리소스 + 이해하는 데 드는 리소스가 단점일 수 있다.
