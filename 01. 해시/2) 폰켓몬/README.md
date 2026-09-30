```js
function solution(nums) {
  const numsLength = nums.length;
  const set = new Set(nums);

  if (numsLength / 2 <= set.size) return numsLength / 2;

  return set.size;
}

// 포켓몬 N
// 절반을 가져가도 된다

// 포켓몬 종류의 최댓값
// 최대한 많은 종류의 포켓몬을 포함해서 N/2 선택
// 항상 짝수

// 1 2 3 4 5 6
// map에 담으면

// 1. set으로 중복제거를 한다.
// 2. set 길이 L을 계산한다.
// 3. map의 길이가 2/n 이상이면 2/n을 return한다
// 4. map의 길이가 2/n보다 작으면, 길이를 return한다.
```
