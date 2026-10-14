## 힙 - 디스크 컨트롤러

### 걸린 시간: 1시간

### 문제 풀기

#### 로직 생각해보기

1. jobs를 우선순위 높은 순으로 정렬
2. 반복문에서 time += 1
   - 요청 시간에 맞게 jobs에서 해당 작업 대기 큐에 넣기 (우선순위가 낮은 작업부터 추가됨)
   - 하드 작업이 없으면 바로 작업 시작 + 시작 시간 기록
   - 하드 작업이 있으면 대기 큐에 대기
   - 작업이 끝나면 sum 변수에 (time - 시작 시간) 더하기, 대기 큐에서 pop (우선순위가 제일 높은 작업 pop)
3. jobs 배열이 빌때까지 반복
4. sum을 jobs 길이로 나눠서 평균 계산

하지만 위 로직은 치명적인 함정이 있다. 우선순위대로 최초에 정렬한 배열이라도 시간에 따라서 항상 앞에서부터 대기 큐에 담는 것이 아니기 때문에, 대기 큐에 들어가고 나서도 매 time마다 우선순위를 정렬해야 한다.

-> 힙 사용 강추..

이전 문제 힙 코드를 가져와서 사용해보자. 아래는 힙 코드이고, 이걸 조건에 맞게 수정해보자.

```ts
// 소요 시간, 요청 시간, 번호 3가지 비교하는 공통 메서드
const compareJobs = (a, b) => {
  if (a.reqTime !== b.reqTime) return a.reqTime - b.reqTime;
  if (a.startAt !== b.startAt) return a.startAt - b.startAt;
  return a.id - b.id;
};

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);

    let index = this.heap.length - 1;
    while (index > 0) {
      const pIndex = Math.floor((index - 1) / 2);

      // 부모가 우선순위가 높으면 break
      if (this.compare(this.heap[pIndex], this.heap[index]) < 0) break;
      else {
        // 부모가 우선순위가 낮으면 자리 변경 후 인덱스 갱신
        [this.heap[pIndex], this.heap[index]] = [
          this.heap[index],
          this.heap[pIndex],
        ];

        index = pIndex;
      }
    }
  }

  pop() {
    if (this.heap.length === 0) return;
    if (this.heap.length === 1) return this.heap.pop();

    // 루트 값을 보관
    const root = this.heap[0];

    // 마지막 값을 루트로 이동
    this.heap[0] = this.heap.pop();

    // 더 작은 자식과 교환하며 아래로 이동
    let index = 0;
    while (true) {
      const lIndex = index * 2 + 1;
      const rIndex = index * 2 + 2;

      if (lIndex > this.heap.length) break;
      let smallIndex = lIndex;

      // 오른쪽 자식이 있고 왼쪽 자식보다 우선이면 변경
      if (
        rIndex < this.heap.length &&
        this.compare(this.heap[rIndex], this.heap[lIndex]) < 0
      ) {
        smallIndex = rIndex;
      }

      // 부모의 우선순위가 더 높으면 종료
      if (this.compare(this.heap[index], this.heap[smallIndex]) < 0) {
        break;
      }

      // 더 작은 자식의 위치와 교환
      [this.heap[index], this.heap[smallIndex]] = [
        this.heap[smallIndex],
        this.heap[index],
      ];
      index = smallIndex;
    }

    // 보관한 루트 반환
    return root;
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}
```

위 코드가 문제가 있어서 점검해봄

```ts
if (lIndex >= this.heap.length) break;
let smallIndex = lIndex;

// 오른쪽 자식이 있고 왼쪽 자식보다 우선이면 변경
if (
  rIndex <= this.heap.length &&
  this.compareJobs(this.heap[rIndex], this.heap[lIndex]) <= 0
) {
  smallIndex = rIndex;
}
```

위 코드에서 왼쪽 자식 인덱스가 힙 길이와 같아도 break하도록 추가, 오른쪽 자식도 마찬가지로 추가하니까 일부 정답 -> 근데 1~16번 케이스가 런타임 에러 발생

코드 보니까 왼쪽 자식은 break의 조건이여서 length 포함이지만, 아래 조건문의 오른쪽 자식 인덱스는 포함되지 않아야 정상적으로 진행되므로 `rIndex <= this.heap.length`에서 등호를 뺴야 한다.

### 최종 제출 코드

```ts
class MinHeap {
  constructor() {
    this.heap = [];
  }

  compareJobs(a, b) {
    if (a.reqTime !== b.reqTime) return a.reqTime - b.reqTime;
    if (a.startAt !== b.startAt) return a.startAt - b.startAt;
    return a.id - b.id;
  }

  push(value) {
    this.heap.push(value);

    let index = this.heap.length - 1;
    while (index > 0) {
      const pIndex = Math.floor((index - 1) / 2);

      // 부모가 우선순위가 높으면 break
      if (this.compareJobs(this.heap[pIndex], this.heap[index]) <= 0) break;
      else {
        // 부모가 우선순위가 낮으면 자리 변경 후 인덱스 갱신
        [this.heap[pIndex], this.heap[index]] = [
          this.heap[index],
          this.heap[pIndex],
        ];

        index = pIndex;
      }
    }
  }

  pop() {
    if (this.heap.length === 0) return;
    if (this.heap.length === 1) return this.heap.pop();

    // 루트 값을 보관
    const root = this.heap[0];

    // 마지막 값을 루트로 이동
    this.heap[0] = this.heap.pop();

    // 더 작은 자식과 교환하며 아래로 이동
    let index = 0;
    while (true) {
      const lIndex = index * 2 + 1;
      const rIndex = index * 2 + 2;

      if (lIndex >= this.heap.length) break;
      let smallIndex = lIndex;

      // 오른쪽 자식이 있고 왼쪽 자식보다 우선이면 변경
      if (
        rIndex < this.heap.length &&
        this.compareJobs(this.heap[rIndex], this.heap[lIndex]) <= 0
      ) {
        smallIndex = rIndex;
      }

      // 부모의 우선순위가 더 높으면 종료
      if (this.compareJobs(this.heap[index], this.heap[smallIndex]) <= 0) {
        break;
      }

      // 더 작은 자식의 위치와 교환
      [this.heap[index], this.heap[smallIndex]] = [
        this.heap[smallIndex],
        this.heap[index],
      ];
      index = smallIndex;
    }

    // 보관한 루트 반환
    return root;
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}

function solution(jobs) {
  // 각 작업을 객체로 만든 후 작업 요청 오름차순 순으로 정렬
  const objs = jobs
    .map((job, i) => ({
      id: i,
      startAt: job[0],
      reqTime: job[1],
    }))
    .sort((a, b) => a.startAt - b.startAt);

  let time = 0;
  let total = 0;

  let jobIndex = 0;
  let completed = 0;
  let queue = new MinHeap();

  // 모든 작업이 완료될 때까지 반복
  while (completed < jobs.length) {
    // 요청 시간이 time 이하인 작업을 모두 힙에 담기
    while (jobIndex < objs.length && objs[jobIndex].startAt <= time) {
      queue.push(objs[jobIndex++]);
    }

    // disk를 검사해 작업이 하나라도 있으면 작업 시작
    if (queue.size() > 0) {
      const job = queue.pop();

      // 지금까지 time + 앞으로 작업에 걸리는 시간 reqTime 을 total에 더하기
      total += time + job.reqTime - job.startAt;

      // 시간 + 1
      time += job.reqTime;

      // 완료 횟수 + 1
      completed += 1;
    } else {
      // 대기 큐에 작업이 없으면 time + 1
      time += 1;
    }
  }

  return Math.floor(total / jobs.length);
}
```

### 다른 사람 풀이 보기

```ts
function solution(jobs) {
  jobs.sort(([a, b], [c, d]) => a - c || b - d);
  const waiting = [];
  const count = jobs.length;
  let processed_time = 0;
  let time = 0;
  while (jobs.length + waiting.length) {
    let in_process;
    while (jobs.length && jobs[0][0] <= time) {
      waiting.push(jobs[0] && jobs.shift());
    }
    if (waiting.length) {
      in_process = waiting.sort(([a, b], [c, d]) => b - d || a - c).shift();
    } else {
      in_process = jobs.shift();
      time = in_process[0];
    }
    time += in_process[1];
    processed_time += time - in_process[0];
  }
  return Math.floor(processed_time / count);
}
```

아니 힙을 안쓰고도 성능 문제가 없다고..? <- 아 성능 테스트 케이스가 없다... 내가 처음 구상한 방법으로 풀어도 되는 거였네

### 반성

코테 문제를 볼 떄 미리 시간복잡도를 따져야하는 조건이 있는지도 확인하자.

힙 반복문 탈출의 조건, 인덱스 조건 등을 잘 파악해야 한다. 에러 추적이 힘들다..

### 다시 코드 작성해보기

```ts
function solution(jobs) {
  // 우선 요청 순서대로 정렬
  jobs.sort(([a1, a2], [b1, b2]) => a1 - b1 || a2 - b2);

  const length = jobs.length;

  const queue = [];
  let time = 0;
  let total = 0;

  // 대기 큐와 작업 목록 모두 빌 때까지 반복
  while (queue.length + jobs.length) {
    // 현재 time 이하의 작업을 순서대로 대기 큐에 push
    while (jobs.length && jobs[0][0] <= time) {
      queue.push(jobs[0] && jobs.shift());
    }

    // 대기 큐에 작업이 있으면 다시 우선순위대로 정렬해서 하나 shift
    if (queue.length) {
      // 소요 시간, 작업 요청 시각 순으로 우선순위 정렬
      // 정렬한 대기 큐에서 맨 앞 요소 꺼내기 (shift)
      const diskJob = queue.sort(([a, b], [c, d]) => b - d || a - c).shift();
      // 작업을 꺼냈다는 것이 곧 디스크에 올라가서 처리된다는 의미이므로
      // time에 소요 시간만큼 시간을 더하고
      time += diskJob[1];
      // total에 현재 시간 - 요청 시간 더하기 <- (time - diskJob[0])
      total += time - diskJob[0];
    } else {
      // 대기 큐에 작업이 없으면 time에 1초씩 더하기
      time += 1;
    }
  }

  return Math.floor(total / length);
}
```

알고 보니 크게 어렵지 않은 문제였다.. 성능 문제때문에 힙 가져오느라 애썼는데 허무하네
