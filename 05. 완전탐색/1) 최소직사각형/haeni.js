function solution(sizes) {
  // 명함마다 긴 변을 가로로 눕히고
  // 긴 변의 최댓값은 가로로
  // 짧은 변의 최댓값은 세로로 잡음
  // 지갑 넓이 = 가로 × 세로
  let maxW = 0;
  let maxH = 0;

  for (const [w, h] of sizes) {
    maxW = Math.max(maxW, Math.max(w, h));
    maxH = Math.max(maxH, Math.min(w, h));
  }
  return maxW * maxH;
}
