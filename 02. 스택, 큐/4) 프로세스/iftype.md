# 프로세스

걸린시간 20분

## 내 코드

```js
function solution(priorities, location) {
  const queue = priorities.map((p, i) => {
    return { name: i, pri: p };
  });

  const result = [];
  while (queue.length > 0) {
    const target = queue.shift();

    if (queue.some((q) => target.pri < q.pri)) {
      queue.push(target);
    } else {
      result.push(target);
    }
  }

  return result.findIndex((r) => r.name === location) + 1;
}
```

## 생각

처음 생각은 예제를 보며 문제를 이해했습니다.

첫 예제 ABCD 기준

1. A들어왔는데 BCD검사함 , 어라 C가 높네 ? -> BCDA
2. CDAB -> C투입
3. C다음 D, -> C,D

그렇다면 처음 인덱스와 우선순위를 묶고, 앞에서부터 계속해서 뒤로 넘기면 되겠구나

그래서 맨 앞에건 무조건 shift하고 (뒤로 넘기거나, 결과배열로 이동위해)  
뺏으니 뺀것과 남아있는 것들의 우선순위를 비교할 수 있고
그럼 정답을 구할 수 있다

정답엔 순서를 구해야하니까 +1

## 다른사람 코드

```js
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

내 코드가 더 이쁜듯?ㅋ
