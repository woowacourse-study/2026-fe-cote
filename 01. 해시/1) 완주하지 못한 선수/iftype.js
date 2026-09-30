function solution(participant, completion) {
  const participantMap = new Map();

  participant.forEach((c) => {
    if (!participantMap.has(c)) {
      participantMap.set(c, 1);
      return;
    }
    participantMap.set(c, participantMap.get(c) + 1);
  });

  completion.forEach((c) => {
    participantMap.set(c, participantMap.get(c) - 1);
  });

  return participant.filter((p) => participantMap.get(p) !== 0)[0];
}
