function solution(numbers) {
  const list = numbers.split("").map(Number);
  const max = +list.sort((a, b) => b - a).join("");

  const room = Array.from({ length: max + 1 }, (n) => 0);
  for (let i = 2; i <= max; i++) {
    for (let j = i; j <= max; j += i) {
      if (j !== i) room[j] = 1;
    }
  }

  const sosu = [];
  for (let i = 2; i <= max; i++) {
    if (room[i] === 0) sosu.push(i);
  }

  const strSosu = sosu.map((s) => String(s).split(""));

  return strSosu.reduce((acc, sosu) => {
    const room2 = Array.from({ length: Math.max(...list) + 1 }, (n) => 0);
    list.forEach((l) => room2[l]++);
    for (let i = 0; i < sosu.length; i++) {
      const target = Number(sosu[i]);
      if (target >= room2.length) return acc;
      room2[+sosu[i]]--;
    }
    if (room2.some((r) => r < 0)) return acc;
    return acc + 1;
  }, 0);
}
