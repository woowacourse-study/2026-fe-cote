// 최종 제출 코드
function solution(participant, completion) {
  const countP = new Map();

  for (const p of participant) {
    countP.set(p, (countP.get(p) ?? 0) + 1);
  }

  const countC = new Map();
  for (const p of completion) {
    countC.set(p, (countC.get(p) ?? 0) + 1);
  }

  for (const key of countP.keys()) {
    if (countP.get(key) !== countC.get(key)) return key;
    if (!countC.has(key)) return key;
  }
}

// 풀이 후 정리한 코드
function solution(participant, completion) {
  const counts = new Map();

  for (const name of completion) {
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }

  for (const name of participant) {
    const count = counts.get(name) ?? 0;

    if (count === 0) {
      return name;
    }

    counts.set(name, count - 1);
  }
}
