function solution(clothes) {
  const count = {};

  for (const [, type] of clothes) {
    count[type] = (count[type] || 0) + 1;
  }

  let answer = 1;
  for (const type in count) {
    answer *= count[type] + 1;
  }

  return answer - 1;
}
