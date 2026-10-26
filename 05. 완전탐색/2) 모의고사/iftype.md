# 모의고사

```js
function solution(answers) {
    const f= [1,2,3,4,5]
    const s= [2,1,2,3,2,4,2,5]
    const t= [3,3,1,1,2,2,4,4,5,5]

    const index = {
        f:0,
        s:0,
        t:0,
    }
    const result = {
        a:0,b:0,c:0
    }
    answers.forEach(n=>{
        if(f[index.f] === n) result.a++;
        if(s[index.s] === n) result.b++;
        if(t[index.t] === n) result.c++;
        
        index.f = (index.f+1)%f.length
        index.s = (index.s+1)%s.length
        index.t = (index.t+1)%t.length
    })
    
    const maxArr = [result.a,result.b,result.c];
    const max = Math.max(...maxArr);
    return maxArr.map((e,i)=>max<=e?i+1:"").filter(e=>e!=="")
}
```
