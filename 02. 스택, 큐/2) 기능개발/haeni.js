function solution(progresses, speeds) {
  const answer = [];

  const days = progresses.map((progress, i) =>
    Math.ceil((100 - progress) / speeds[i]),
  );

  let deployDay = days[0];
  let count = 0;

  for (const day of days) {
    if (day <= deployDay) {
      count++;
    } else {
      answer.push(count);
      deployDay = day;
      count = 1;
    }
  }

  answer.push(count);
  return answer;
}
