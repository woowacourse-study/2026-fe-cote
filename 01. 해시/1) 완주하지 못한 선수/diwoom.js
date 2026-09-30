function solution(participant, completion) {
  const participantDB = new Map();

  participant.forEach((p) => {
    if (participantDB.has(p)) {
      participantDB.set(p, participantDB.get(p) + 1);
    } else {
      participantDB.set(p, 1);
    }
  });

  completion.forEach((c) => {
    participantDB.set(c, participantDB.get(c) - 1);
  });

  return [...participantDB].find(([key, value]) => value !== 0)[0];
}
