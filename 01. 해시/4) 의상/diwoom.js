function solution(clothes) {
  const clothMap = new Map();

  for (let i = 0; i < clothes.length; i++) {
    clothMap.set(clothes[i][1], (clothMap.get(clothes[i][1]) ?? 0) + 1);
  }

  return (
    [...clothMap.values()].reduce((acc, count) => acc * (count + 1), 1) - 1
  );
}
