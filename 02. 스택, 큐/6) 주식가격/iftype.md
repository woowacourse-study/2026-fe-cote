# 주식가격

````js
// 04:02 잠이안와서시작
// 초단위 가격 / 떨어지지않은 기간
// 모든 가격에 대해서 시간초를 재자

// 결국 나보다 작은 수를 만날떄 까지의 거리네
function solution(prices) {
    const temp = prices.map((p,idx)=>{
        for(let i =idx;i<prices.length;i++){
            if(p>prices[i]) return i -idx;
        }
        return prices.length - (idx +1 )
    })
    return temp
}


```

뭔가 야매로 푼 느낌이..

[1, 2, 3, 2, 3]이 주어진다면 모든 배열을 다시계산하여

끝 날떄까지 거리 or 총길이와 현재까지 거리 라고생각해서 풀었음

````
