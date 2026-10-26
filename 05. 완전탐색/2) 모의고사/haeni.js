function solution(answers) {
  //    1번: [1,2,3,4,5]
  //    2번: [2,1,2,3,2,4,2,5]
  //    3번: [3,3,1,1,2,2,4,4,5,5]

  // 수포자 한 명씩 돌면서, 문제를 처음부터 끝까지 채점한다
  //   수포자가 i번째 문제에 찍은 답 = 패턴[i % 패턴 길이]
  //   찍은 답 === answers[i] 이면 scores[p]++

  // scores에서 최고 점수 max를 구한다
  // scores를 돌면서 점수가 max와 같은 수포자 번호를 모두 answer에 담는다
  const patterns = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];
  const scores = [0, 0, 0];
  // 문제 번호 고르고
  for (let i = 0; i < answers.length; i++) {
    // 수포자 번호 고르고
    for (let p = 0; p < patterns.length; p++) {
      const pattern = patterns[p];
      if (answers[i] === pattern[i % pattern.length]) {
        scores[p]++;
      }
    }
  }
  const max = Math.max(...scores);
  const answer = [];
  for (let p = 0; p < scores.length; p++) {
    if (scores[p] === max) answer.push(p + 1);
  }
  return answer;

  return answer;
}
