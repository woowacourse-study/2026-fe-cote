```js
function solution(participant, completion) {
  const map = new Map();
  completion.forEach((c) => {
    if (!map.has(c)) {
      map.set(c, 1);
    } else {
      map.set(c, map.get(c) + 1);
    }
  });

  const filteredPeople = participant.map((p) => {
    if (map.has(p)) {
      map.set(p, map.get(p) - 1);
      if (map.get(p) === 0) map.delete(p);
      return null;
    }
    return p;
  });

  return filteredPeople.find((p) => p);
}
```
