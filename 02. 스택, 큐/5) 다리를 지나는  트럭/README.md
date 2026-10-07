```js
function solution(bridge_length, weight, truck_weights) {
  const truckCount = truck_weights.length;
  let arrivedCount = 0;
  let time = 0;
  const onBridgeTrucks = [];
  while (arrivedCount < truckCount) {
    if (onBridgeTrucks.length !== 0 && onBridgeTrucks[0].remainLength === 0) {
      onBridgeTrucks.shift();
      arrivedCount++;
    }
    if (arrivedCount === truckCount) break;

    const headTruck = truck_weights.shift();
    const nowBridgeWeight = onBridgeTrucks.reduce(
      (acc, cur) => acc + cur.weight,
      0,
    );
    if (headTruck + nowBridgeWeight > weight) {
      // 못건너
      truck_weights.unshift(headTruck);
    } else {
      onBridgeTrucks.push({ weight: headTruck, remainLength: bridge_length });
    }

    onBridgeTrucks.forEach((truck) => truck.remainLength--);
    time++; // 시간은 무조건 셈
  }

  return time + 1;
}

// 47분 시작

// 1차선 다리를 모든 트럭이 건너려면 최소 몇 초가 걸릴까
// bridge_length -> 트럭이 올라갈 수 있는 최대 숫자
// weight 이하까지 다리가 무게 견디기 가능
// * 다리에 완전히 오르지 않은 트럭의 무게는 "무시"

// 아 bridge_length가 초구나.. 불친절한건가 내가 멍청한건가 이거만 8분 봤네

// 의사코드

// 1. 다리를 지난 트럭 수가 트럭 count가 되면 종료
// 2. 일단 꺼내고 건너는 트럭에 자기를 넣으면 초과하는지 확인
// 3. 초과하면 일단 대기
// 4. 초과하지 않으면 나도 넣음
// 5. 다리를 건너는 트럭들 전체 1칸 이동
```
