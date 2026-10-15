class MinHeap {
  constructor(compare) {
    this.heap = [];
    // a가 b보다 앞서야 하면 음수 반환
    this.compare = compare;
  }

  size() {
    return this.heap.length;
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return top;
  }

  bubbleUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.compare(this.heap[parentIndex], this.heap[currentIndex]) <= 0)
        break;

      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
    }
  }

  bubbleDown() {
    let currentIndex = 0;
    const heapLength = this.heap.length;

    while (true) {
      const leftChildIndex = currentIndex * 2 + 1;
      const rightChildIndex = currentIndex * 2 + 2;
      let smallestIndex = currentIndex;

      if (
        leftChildIndex < heapLength &&
        this.compare(this.heap[leftChildIndex], this.heap[smallestIndex]) < 0
      ) {
        smallestIndex = leftChildIndex;
      }
      if (
        rightChildIndex < heapLength &&
        this.compare(this.heap[rightChildIndex], this.heap[smallestIndex]) < 0
      ) {
        smallestIndex = rightChildIndex;
      }
      if (smallestIndex === currentIndex) break;

      this.swap(smallestIndex, currentIndex);
      currentIndex = smallestIndex;
    }
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

function solution(jobs) {
  // 작업마다 번호 붙이고, 요청이 빨리 들어온 순서대로 줄 세움
  // [요청 시각, 걸리는 시간] -> [요청 시각, 걸리는 시간, 작업 번호]
  // 정렬하면 원래 순서가 섞이니까, 섞이기 전에 번호를 적어둠
  const sortedJobs = jobs
    .map(([requestTime, duration], jobNumber) => [
      requestTime,
      duration,
      jobNumber,
    ])
    .sort((a, b) => a[0] - b[0]);

  //  빨리 끝나는 작업 먼저
  //  그게 같으면 먼저 요청한 작업 먼저
  //  그것도 같으면 번호 작은 작업 먼저
  const waitingJobs = new MinHeap(
    (a, b) => a[1] - b[1] || a[0] - b[0] || a[2] - b[2],
  );

  let currentTime = 0;
  let jobIndex = 0;
  let completedCount = 0;
  let totalTurnaroundTime = 0;

  // 모든 작업을 끝낼 때까지 반복
  while (completedCount < jobs.length) {
    // 지금 시각까지 요청이 들어온 작업은 전부 대기로 보내기
    while (
      jobIndex < sortedJobs.length &&
      sortedJobs[jobIndex][0] <= currentTime
    ) {
      waitingJobs.push(sortedJobs[jobIndex]);
      jobIndex++;
    }

    // 대기가 비었으면 다음 작업이 요청되는 시각으로 시간을 넘기기
    if (waitingJobs.size() === 0) {
      currentTime = sortedJobs[jobIndex][0];
      continue; // 다시 그 작업을 대기에 넣음
    }

    // 대기에서 1순위 작업을 꺼내 처리하기
    const [requestTime, duration] = waitingJobs.pop();

    currentTime += duration; // 작업하는 동안 시간이 흐름 -> 지금이 작업이 끝난 시각

    // 이 작업이 요청부터 끝날 때까지 걸린 시간을 합계에 더하기
    totalTurnaroundTime += currentTime - requestTime;

    completedCount++;
  }

  // 평균 구하고 소수점 버리기
  return Math.floor(totalTurnaroundTime / jobs.length);
}
