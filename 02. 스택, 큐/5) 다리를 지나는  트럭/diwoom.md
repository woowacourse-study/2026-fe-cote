## 풀이 과정

while문 사용하면 될 거 같음
대기 중인 트럭이 있거나, 다리 위에 트럭이 있으면 계속 반복
time 1초씩 증가시키면서 다리에 올라간 시간과 건너는 데 걸리는 시간을 더한 exitTime 저장

```js
function solution(bridge_length, weight, truck_weights) {
  let time = 0;
  let currentWeight = 0;
  let truckIndex = 0;

  const onBridge = [];

  while (truckIndex < truck_weights.length || onBridge.length > 0) {
    time++;

    // 1. 다리를 다 건넌 트럭 제거
    if (onBridge.length > 0 && onBridge[0].exitTime === time) {
      currentWeight -= onBridge.shift().weight;
    }

    // 2. 다음 트럭이 다리에 올라갈 수 있는지 확인
    const nextTruck = truck_weights[truckIndex];

    if (currentWeight + nextTruck <= weight) {
      onBridge.push({
        weight: nextTruck,
        exitTime: time + bridge_length,
      });

      currentWeight += nextTruck;
      truckIndex++;
    }
  }

  return time;
}
```
