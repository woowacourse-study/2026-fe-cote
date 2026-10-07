## 10일차: 스택/큐 - 다리를 지나는 트럭

걸린 시간: 40분..?

### 문제 풀기

뜻을 좀 해석해보자. bridge_length가 곧 지날 길이이다.

기본적으로 한 카운트에 count+1, 각 트럭의 최대 길이 - 1

1. 대기 트럭의 맨 앞을 shift한다. 해당 트럭을 다리를 건너는 트럭을 최대 길이와 묶어 객체로 만들고, 다리 건너는 트럭 배열로 옮긴다.
2. 다리 건너는 트럭 무게가 weight보다 낮으면 1~2를 반복한다.
3. 다리 건너는 트럭 무게가 weight 초과이면 shift를 멈추고, 매 카운트마다 남은 무게를 확인해 무게가 남으면 shift한다.
4. 다리를 건너는 트럭 배열이 빈 배열이 되면 멈추고 count 반환

의사코드대로 한번 코드를 작성해보자.

```ts
function solution(bridge_length, weight, truck_weights) {
  let count = 0;
  let onBrigdeTrucks = [];

  // 대기 트럭 배열과 다리 건너는 트럭 배열이 모두 빌 때까지 반복
  while (onBrigdeTrucks.length > 0 || truck_weights.length > 0) {
    count++;
    // 다리 위 트럭들의 무게의 합 + 방금 뺸 트럭의 무게 합이 총 weight 이하면 다리 위에 추가
    const weightArray = onBrigdeTrucks.map((truck) => truck.truckWeight);
    const weightSum = weightArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );

    if (weight >= truck_weights[0] + weightSum) {
      // 하나 뺴서 weight 최대로 설정
      const leftTruck = {
        truckWeight: truck_weights.shift(),
        leftWeight: bridge_length,
      };

      onBrigdeTrucks.push(leftTruck);
    }
    // 다리 위 트럭들 남은 weight - 1
    // 남은 weight를 검사해서 0일시 배열에서 제거
    onBrigdeTrucks = onBrigdeTrucks
      .map((truck) => ({
        truckWeight: truck.truckWeight,
        leftWeight: truck.leftWeight - 1,
      }))
      .filter((truck) => truck.leftWeight > 0);
  }

  return count + 1;
}
```

로직 상 의외로 간단한 문제라고 생각했는데, js 내장 메서드들을 총집합으로 사용한 느낌이다. 하나라도 놓치면 디버깅이 힘든 환경,,?

### 최종 제출 코드

위 코드와 같음

### 다른 사람 풀이 보기

```ts
function solution(bridge_length, weight, truck_weights) {
  // '다리'를 모방한 큐에 간단한 배열로 정리 : [트럭무게, 얘가 나갈 시간].
  let time = 0,
    qu = [[0, 0]],
    weightOnBridge = 0;

  // 대기 트럭, 다리를 건너는 트럭이 모두 0일 때 까지 다음 루프 반복
  while (qu.length > 0 || truck_weights.length > 0) {
    // 1. 현재 시간이, 큐 맨 앞의 차의 '나갈 시간'과 같다면 내보내주고,
    //    다리 위 트럭 무게 합에서 빼준다.
    if (qu[0][1] === time) weightOnBridge -= qu.shift()[0];

    if (weightOnBridge + truck_weights[0] <= weight) {
      // 2. 다리 위 트럭 무게 합 + 대기중인 트럭의 첫 무게가 감당 무게 이하면
      //    다리 위 트럭 무게 업데이트, 큐 뒤에 [트럭무게, 이 트럭이 나갈 시간] 추가.
      weightOnBridge += truck_weights[0];
      qu.push([truck_weights.shift(), time + bridge_length]);
    } else {
      // 3. 다음 트럭이 못올라오는 상황이면 얼른 큐의
      //    첫번째 트럭이 빠지도록 그 시간으로 점프한다.
      //    참고: if 밖에서 1 더하기 때문에 -1 해줌
      if (qu[0]) time = qu[0][1] - 1;
    }
    // 시간 업데이트 해준다.
    time++;
  }
  return time;
}
```

시간 점프하는 건 생각만 했는데 이 사람은 구현까지 했네.. ㄷㄷ

### 반성

비교하기 전에 먼저 shift해서 else면 그 트럭이 날라가버린 문제

```ts
const leftTruck = {
  truckWeight: truck_weights.shift(),
  leftWeight: bridge_length
}

if (비교...) {
  onBrigdeTrucks.push(leftTruck);
}
else // else이면 leftTruck 증발..

```

마지막에 남은 weight를 검사해서 0이면 배열에서 제거

```ts
onBrigdeTrucks = onBrigdeTrucks.filter((truck) => truck.leftWeight > 0);
```

체이닝 써서 트럭들 weight-1와 동시에 0 검사 진행
처음에 배열 합 구할 때 Math.sum 썼는데 이런 건 존재하지 않는다.. 합 구할 때 제일 짧게 쓰는 건 reduce를 쓰자.

### 다시 코드 작성해보기

다시 짜기가 무서워요..

```ts
function solution(bridge_length, weight, truck_weights) {
  let count = 0;
  let onBrigdeTrucks = [];

  // 대기 트럭 배열과 다리 건너는 트럭 배열이 모두 빌 때까지 반복
  while (onBrigdeTrucks.length > 0 || truck_weights.length > 0) {
    count++;
    // 다리 위 트럭들의 무게의 합 + 방금 뺸 트럭의 무게 합이 총 weight 이하면 다리 위에 추가
    const weightArray = onBrigdeTrucks.map((truck) => truck.truckWeight);
    const weightSum = weightArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );

    if (weight >= truck_weights[0] + weightSum) {
      // 하나 뺴서 weight 최대로 설정
      const leftTruck = {
        truckWeight: truck_weights.shift(),
        leftWeight: bridge_length,
      };
      onBrigdeTrucks.push(leftTruck);
    } else {
      // 트럭이 다리에 올라오지 못하는 경우이므로 맨 앞 트럭의 남은 시간만큼 모두 뺴기
      const diff = onBrigdeTrucks[0].leftWeight;

      onBrigdeTrucks = onBrigdeTrucks
        .map((truck) => ({
          truckWeight: truck.truckWeight,
          leftWeight: truck.leftWeight - diff,
        }))
        .filter((truck) => truck.leftWeight > 0);

      // 남은 시간만큼 뺐으므로 그만큼 count에 더하기 (밖에서 1 더하므로 여기선 -1)
      count += diff - 1;

      continue;
    }

    onBrigdeTrucks = onBrigdeTrucks
      .map((truck) => ({
        truckWeight: truck.truckWeight,
        leftWeight: truck.leftWeight - 1,
      }))
      .filter((truck) => truck.leftWeight > 0);
  }

  return count + 1;
}
```

코드는 길어지긴 했는데 else에서 다리에 자리가 없는 경우 시간복잡도를 조금 줄이는 것에 의미를 뒀다..
