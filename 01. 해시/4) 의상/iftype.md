# 의상

## 내 코드

```js
function solution(clothes) {
  const clothesHash = [];

  clothes.forEach(([name, type]) => {
    clothesHash[type] = (clothesHash[type] ?? 1) + 1;
  });

  return (
    Object.values(clothesHash).reduce((acc, cur) => {
      return (acc *= cur);
    }, 1) - 1
  );
}
```

해시란 뭘까?

## 풀이

```bash
// 모자 2, 헤드기어 1 , 바지 1 일때
// 2 + 1 + 1

// 모자 x x
// 모자2 x x
// x 헤기 ㅌ
// 모자3  헤기2 바지2 12-1?
// 예제에서 헤기 3 x 썬글2 6-1 5
//
```

케이스들을 적어가면서 생각하다 그냥 세개 다 곱하면 되겠구나 해서 곱했다.
항목에 대해서 안입는 경우도 생각해서 초기값을 1로잡고, 전부 안입는 경우를 생각해서 결과에서 -1 해줬다

다들 이렇게 풀었을 듯? 근데 이게 해시인가..
