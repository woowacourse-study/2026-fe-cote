function solution(nums) {
  const map = new Map();
  nums.forEach((num) => map.set(num, (map.get(num) || 0) + 1));
  if (map.size > nums.length / 2) {
    return nums.length / 2;
  } else {
    return map.size;
  }
}
