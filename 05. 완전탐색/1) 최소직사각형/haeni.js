function solution(sizes) {
  let maxW = 0;
  let maxH = 0;

  for (const [w, h] of sizes) {
    const long = Math.max(w, h);
    const short = Math.min(w, h);

    maxW = Math.max(maxW, long);
    maxH = Math.max(maxH, short);
  }

  return maxW * maxH;
}
