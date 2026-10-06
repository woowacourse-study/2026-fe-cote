```js

function solution(priorities, location) {
    let count = 0;

    while(priorities.length!==0){
        // 일단 빼
        const head = priorities.shift();
        const restMax = Math.max(...priorities);

        if(head < restMax) {
            priorities.push(head);
            location = location === 0 ? priorities.length-1 : location-1;
        }else{
            // 프로세스 실행
            count++;
            if(location===0) return count;
            location--;

        }

    }

    // 내가 실수만 안하고 우선순위랑 location만 같이 잘 움직이면 됨
}


27분
```
