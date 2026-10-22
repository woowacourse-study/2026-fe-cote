function solution(citations) {
  // 풀이
  // 내림차순 정렬 -> i번째 논문의 인용 수가 i+1 이상이면 h 갱신 -> 조건이 깨지면 종료
  const c = citations.sort((a, b) => b - a);
  let h = 0;

  for (let i = 0; i < c.length; i++) {
    if (c[i] >= i + 1) h = i + 1;
    else break;
  }
  return h;
}
