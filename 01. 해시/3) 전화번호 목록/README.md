```js
function solution(phone_book) {
  phone_book.sort();
  // const test = ["11","1211","13","14","15","16"].sort();
  // console.log(test);
  // let result = true;
  // for(let i = 0; i<test.length-1;i++){
  //     if(test[i+1].startsWith(test[i])){
  //         result = false;
  //     }
  // }
  // console.log(result);

  let result = true;
  for (let i = 0; i < phone_book.length - 1; i++) {
    if (phone_book[i + 1].startsWith(phone_book[i])) {
      result = false;
    }
  }

  return result;
}

/*
phone_book: 전화번호부 배열
어떤 번호가, 다른 번호의 접두어인 경우가 1개라도 있으면 false,없으면 true

같은 번호가 중복해서 들어있지 않음

<풀이 생각>
1개 잡고 다 비교 O(n^2) -> 절대안됨 백억 넘을듯
정렬 후에 비교하면, 금방 걸러져서 하면 될듯? 그리고 1개만 보면 되니까 return 하면 되는데,
아니다 정렬 안됨

일단 1개 잡고, a b있을때 a or b 서로 포함하는지 여부를 보면 될듯? 근데 이미 정렬되어있으니까 b.includes(a) 해도 되긴 할듯
설마 바로 뒤에거만 비교해도 되나? 정렬되어 있으니까?

일단 결론은 바로 뒤에꺼가 내거 포함하는지만 확인하면 된다는 거임
이렇게 해보자 이러면 O(n)으로 끝날듯?

처음 했을때 효율성 통과, 테스트 케이스 13번빼고 전부 통과
엣지 케이스 1개가 뭐지..

트러블슈팅: includes로 한게 잘못이었음..!!! 접두사다

*/
```
