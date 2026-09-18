function solution(nums) {
  const pocketmon = new Set(nums);
  const count = nums.length / 2;

  return pocketmon.size > count ? count : pocketmon.size;
}
