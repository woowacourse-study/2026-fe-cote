function solution(nums) {
  const uniqueTypes = new Set(nums);
  const halfLength = nums.length / 2;

  return Math.min(uniqueTypes.size, halfLength);
}
