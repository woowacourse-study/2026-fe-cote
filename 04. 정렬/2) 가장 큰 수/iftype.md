# 가장 큰 수

// 10분
// 1 시간
// 6, 10 , 2
// 35, 34 , 3, 32 34332 34323 < 아 3

```js
function solution(numbers) {
    const result = [...numbers]
        .map(n=>String(n))
        .sort((a,b)=> a+b<=b+a?1:-1)
    
    if(result.every(e=>e==="0")) return "0"
    return result.join("")
}
```
