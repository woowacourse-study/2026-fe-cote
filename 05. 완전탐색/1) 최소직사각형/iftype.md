# 완전 탐색

```js
// 아 문제졸라기네
// 가로랑 길이 들어오는데, 제일 긴 가로랑 제일 긴 세로 찾았는데
// 하나씩 기울여보면 4000으로 줄어들어요
// 가로를 제일 큰걸로 바꿔서 쟀을떄 세로길이?

function solution(sizes) {
    const result = sizes.map(([w,h])=>{return w<h? [h,w]:[w,h] })

    const maxW = Math.max(...result.map(r=>r[0]))
    const maxH = Math.max(...result.map(r=>r[1]))
    return maxW * maxH
}

```
