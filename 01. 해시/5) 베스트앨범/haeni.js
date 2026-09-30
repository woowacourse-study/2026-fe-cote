function solution(genres, plays) {
  const total = {};
  const songs = {};

  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    if (!total[genre]) {
      total[genre] = 0;
      songs[genre] = [];
    }
    total[genre] += plays[i];
    songs[genre].push({ id: i, play: plays[i] });
  }

  const genreOrder = Object.keys(total).sort((a, b) => total[b] - total[a]);
  const answer = [];

  for (const genre of genreOrder) {
    const list = songs[genre].sort((a, b) => {
      if (a.play === b.play) return a.id - b.id;
      return b.play - a.play;
    });

    answer.push(list[0].id);
    if (list.length > 1) answer.push(list[1].id);
  }

  return answer;
}
