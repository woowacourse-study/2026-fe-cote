# H - index

// n편중 h이상 인용된 논문이 h 편 이상이고
// h편 이하 인용되었다면 h 의 최대값?
// 1~1000편이하 , 0회잇ㅇ 10000회미만

// 그럼 이건 h를 기준으로, 최대한 많이나온걸 ?
// 걍 오름차순 정렬한다음에 h는 index - 인용수 하면 h아닌가?

## 1차풀이

```js
function solution(citations) {

   return [...citations]
        .sort((a,b)=>a-b)
        .map((c,index)=>{ return {h: citations.length-index, c}})
        .filter(({c,h})=>h<=c)
        .sort((a,b)=>b.h-a.h)[0].h
    
}
```

## 처음 solved

오류가 났음 설마 0 0 0 ?

```js
function solution(citations) {
    
    const test =  [...citations]
        .sort((a,b)=>a-b)
        .map((c,index)=>{ return {h: citations.length-index, c}})
        .filter(({c,h})=>h<=c)

    return test.length === 0? 0 : test.sort((a,b)=>b.h-a.h)[0].h
    
}
```

## 재 수정

알고 보니 내림차순으로 하면 편해짐

```js
function solution(citations) {
  return [...citations]
    .sort((a, b) => b - a)
    .filter((c, i) => c >= i + 1).length;
}
```

## 찾아보니누적합 방법이

```js
function solution(citations) {
  const n = citations.length;
  const count = new Array(n + 1).fill(0);

  for (const c of citations) {
    count[Math.min(c, n)]++;
  }

  let papers = 0; // h회 이상 인용된 논문 수
  for (let h = n; h >= 0; h--) {
    papers += count[h];
    if (papers >= h) return h;
  }
}
```

```bash
인용수|  0 1 2 3 4 5
논문수|  1 1 0 1 0 2
```

시간 | O(n log n) |O(n)
공간 | O(n) (복사본)|O(n)
