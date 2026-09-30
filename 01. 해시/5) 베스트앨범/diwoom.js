function solution(genres, plays) {
  const map = new Map();
  const album = [];

  // 장르를 key로 가지고 value로는 재생 횟수와 고유 번호를 저장
  for (let i = 0; i < genres.length; i++) {
    map.set(genres[i], {
      plays: (map.get(genres[i])?.plays ?? 0) + plays[i],
      unique: [...(map.get(genres[i])?.unique ?? []), i],
    });
  }

  // 장르 정렬
  const sortedMap = new Map(
    [...map.entries()].sort(([, a], [, b]) => b.plays - a.plays),
  );

  // 노래 정렬
  for (const [genre, data] of sortedMap) {
    sortedMap.set(genre, {
      ...data,
      unique: [...data.unique]
        .sort((a, b) => plays[b] - plays[a] || a - b)
        .slice(0, 2),
    });
  }

  for (const data of sortedMap.values()) {
    album.push(...data.unique);
  }

  return album;
}
