```js
function solution(genres, plays) {
  const result = [];
  const musicCount = genres.length;
  const genreAndTotalPlaysMap = new Map();
  const genreMap = new Map();
  const playsMap = new Map();
  for (let i = 0; i < musicCount; i++) {
    const genre = genres[i];
    const playCount = plays[i];
    genreMap.set(i, genre);
    playsMap.set(i, playCount);
    genreAndTotalPlaysMap.set(
      genre,
      genreAndTotalPlaysMap.has(genre)
        ? genreAndTotalPlaysMap.get(genre) + playCount
        : playCount,
    );
  }

  const sortedMap = new Map(
    Array.from(genreAndTotalPlaysMap.entries()).toSorted((a, b) => b[1] - a[1]),
  );
  sortedMap.keys().forEach((genre) => {
    const tmp = [];
    for (let i = 0; i < musicCount; i++) {
      if (genreMap.get(i) === genre) tmp.push(i);
    }

    tmp.sort((a, b) => {
      const playCountA = playsMap.get(a);
      const playCountB = playsMap.get(b);
      if (playCountA === playCountB) {
        return a - b;
      }

      return playCountB - playCountA;
    });
    result.push(...tmp.slice(0, 2));
  });

  return result;
}
```
