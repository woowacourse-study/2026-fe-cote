function solution(nums) {
  const selectNum = nums.length / 2;
  const ponkemonHash = new Map();
  nums.forEach((num) => {
    ponkemonHash.set(num, ponkemonHash.get(num) || 0 + 1);
  });

  return ponkemonHash.size > selectNum ? selectNum : ponkemonHash.size;
}
