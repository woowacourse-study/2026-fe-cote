function solution(progresses, speeds) {
  // speeds를 더해 100이 되는 일자를 저장하는 배열을 만든 후
  // 일자를 계산해서 저장
  // 0번 인덱스부터 순회하면서 i < i + 1일 때 개수 반환
  // 반환된 개수를 저장하는 배열을 최종 반환

  const deployDays = progresses.map((p, i) => Math.ceil((100 - p) / speeds[i]));

  const answer = [];
  let deployDay = deployDays[0];
  let count = 1;

  for (let i = 1; i < deployDays.length; i++) {
    if (deployDays[i] <= deployDay) {
      count++;
    } else {
      answer.push(count);
      count = 1;
      deployDay = deployDays[i];
    }
  }
  answer.push(count);

  return answer;
}
