# 다리를 지나는 트럭

35~40분

## 풀이

```js
function solution(bridge_length, weight, truck_weights) {
  const watting = [...truck_weights];
  let bridege = [];
  const complete = [];

  let time = 0;
  while (bridege.length !== 0 || watting.length !== 0) {
    time++;

    // 경과시간에 따른
    if (bridege.length !== 0) {
      bridege = [...bridege]
        .map((truck) => {
          return {
            ...truck,
            overtime: truck.overtime - 1,
          };
        })
        .filter((truck) => truck.overtime !== 0);
    }
    // 다리 합구하기
    const sum = bridege.reduce((acc, cur) => acc + cur.weight || 0, 0);
    if (weight >= watting[0] + sum) {
      bridege.push({ weight: watting.shift(), overtime: bridge_length });
    }
  }

  return time;
}
```

### 풀기 전 생각

```bash
// 아 다리문제네.. ㅋㅋ
// 입력은 다리에 올라갈 수 있는 트럭 수, 다리가 버티는 무게(트럭 수 기준),
// 트럭 무게 배열이 들어옴
//
// 7,4, 5, 6 의 기준 7(2초)-> 4(1초), 5(2초)-> 6(2초)-> 지나고나면 끝
// 그럼 우선 대기 큐를 만들고, 그 큐에 초를 같이 넣음 {무게, 트럭번호}
// 다리큐도 만드는데 안에서 1씩 뺴줌,초도넣고
// 대기큐가들어가고 시작함,
// 이까지하고 풀어볼까
```
