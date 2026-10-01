# [콘티] 스택, 큐 - 기능 개발

```js
// 풀기 시작 02:11
// 배포되어야 하는 작업이 들어오고 하루에 할수있는만큼 스피드가 나옴
// 100이 되는 시점을 구해야지
// 그런데 앞에기능이안되면 출력할수없음
// 그럼 날짜만구하고 패턴을찾아보자
// 7 3 9 일경우 2, 1?
// 5 10 1, 1, 20 ,1 이니까 132?
// 큰 숫자 나어ㅗ고나면 나보다 큰 숫자만날떄가지 다잡아먹네
// [5], [10,1,1]. [20,1] 로나누고 length 구하면 됨
function solution(progresses, speeds) {
  const completes = progresses.map((p, index) => {
    return Math.ceil((100 - p) / speeds[index]);
  });

  const result = [];
  let max = 0;
  for (let i = 0; i < completes.length; i++) {
    if (completes[i] > max) {
      result.push([completes[i]]);
      max = completes[i];
    } else result[result.length - 1].push(completes[i]);
  }
  return result.map((r) => r.length);
}
```

로직은 바로 구했는데 구현을 제대로 못한 케이스
체이닝으로 깔끔하게 풀고 싶었는데 너무슬프다
