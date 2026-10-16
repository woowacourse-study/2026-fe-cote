# 디스크 컨트롤러

```js
// 다시푼다 쓔밤바
// time, quest, number
class Heap {
  constructor() {
    this.list = [];
  }
  peek() {
    return this.list[0];
  }
  size() {
    return this.list.length;
  }
  swap(a, b) {
    [this.list[a], this.list[b]] = [this.list[b], this.list[a]];
  }
  less(a, b) {
    // a가 b보다 작은가? - 여기서 작은가는 우선순위가 낮은가임
    if (a.quest !== b.quest) {
      return a.quest < b.quest;
    } else if (a.time !== b.time) {
      return a.time < b.time;
    }
    return a.number < b.number;
  }
  push(v) {
    this.list.push(v);
    let cur = this.list.length - 1;
    while (0 < cur) {
      const p = Math.floor((cur - 1) / 2);
      if (this.less(this.list[p], this.list[cur])) break;
      this.swap(p, cur);
      cur = p;
    }
  }
  pop() {
    if (this.list.length === 0) return undefined;
    if (this.list.length === 1) return this.list.pop();

    const min = this.list[0];
    this.list[0] = this.list.pop();
    let cur = 0;

    while (true) {
      const left = cur * 2 + 1;
      const right = cur * 2 + 2;
      let small = cur;

      if (left < this.list.length && this.less(this.list[left], this.list[small])) small = left;
      if (right < this.list.length && this.less(this.list[right], this.list[small])) small = right;
      if (small === cur) break;
      this.swap(cur, small);
      cur = small;
    }
    return min;
  }
}

function solution(jobs) {
  const heap = new Heap();

  const queue = [...jobs].sort((a, b) => {
    return a[0] - b[0];
  });

  let index = 0;
  const result = [];

  let sec = 0;
  let nextSec = 0;

  let test = 0;
  while (true) {
    if (result.length === jobs.length) break;

    while (sec <= nextSec) {
      // ㅅㅂ 이거진짜 어떡하지
      while (index < queue.length && queue[index][0] <= sec) {
        heap.push({
          // 맨날 헷가림 1이랑 0 아 ;;
          quest: queue[index][1],
          time: queue[index][0],
          number: index,
        });
        index++;
      }
      if (sec === nextSec) break;
      sec++;
    }

    const temp = heap.pop();
    if (temp === undefined) {
      nextSec++;
      continue;
    }
    const { time, quest, number } = temp;
    nextSec += quest;
    result.push(nextSec - time);
  }

  const sum = result.reduce((a, c) => a + c, 0);
  return Math.floor(sum / result.length);
}

```

## 풀이

와 코드 개더럽다..
