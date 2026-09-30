## 5일차: 베스트앨범

### 문제 풀기

[장르 > 앨범별 > 고유 번호 낮음] <- 순서로 앨범에 추가되어야 한다.

Map을 사용하는 것은 맞는 것 같은데.. i와 genres[i], plays[i]를 하나로 묶어야 한다.

```ts
const map = new Map();

for (let i = 0; i < genres.length; i++) {
  map.set(i, { genre: genres[i], play: plays[i] });
}
```

그 뒤에는..? Map의 key로 어떤 게 들어가야 할까?

장르 별 재생 횟수를 합칠 수도 있어야 하고, 합칠 때 어떤 곡인지 i와 각각의 회수 또한 기록되어야 한다.

```ts
const map = new Map();

for (let i = 0; i < genres.length; i++) {
  const gerneData = map.get(genres[i]) ?? [];

  gerneData.push({ id: i, play: plays[i] });

  map.set(genres[i], gerneData);
}

// 데이터 생긴 모습
// ["classic", "pop", "classic", "classic", "pop"]
// [500, 600, 150, 800, 2500]

// Map
// "classic": [{id: 0, play: 500}, {id: 2, play: 150}, {id: 3, play: 800}]
// "pop": [{id: 1, play: 600}, {id: 4, play: 2500}]
```

이렇게 정리해봤다. map에 장르별 총 재생 횟수도 포함되어야 할까? 필요한 것 같은데 어떻게 추가해야 할 지 모르겠다. 필드를 하나 더 늘려보자.

```ts
const map = new Map();

for (let i = 0; i < genres.length; i++) {
  const genreData = map.get(genres[i]) ?? {
    totalPlay: 0,
    songs: [],
  };

  genreData.totalPlay += plays[i];
  gerneData.songs.push({ id: i, play: plays[i] });

  map.set(genres[i], genreData);
}
```

이렇게 필드 depths를 하나 늘리면 총 재생 횟수와 노래 목록을 관리할 수 있다.

그럼 이제 순회하면서 totalPlay로 정렬, 각 play로 정렬 후 정답을 계산해보자.

```ts
function solution(genres, plays) {
  const map = new Map();

  for (let i = 0; i < genres.length; i++) {
    const genreData = map.get(genres[i]) ?? {
      totalPlay: 0,
      songs: [],
    };

    genreData.totalPlay += plays[i];
    genreData.songs.push({ id: i, play: plays[i] });

    map.set(genres[i], genreData);
  }

  // 총 재생 횟수로 장르 정렬
  const sortedGenres = [...map.entries()].sort(
    ([genreA, dataA], [genreB, dataB]) => dataB.totalPlay - dataA.totalPlay,
  );

  // 각 장르별 곡 재생횟수로 정렬
  for (const [genre, genreData] of sortedGenres) {
    genreData.songs.sort((songA, songB) => {
      if (songA.play !== songB.play) {
        return songB.play - songA.play;
      }
    });
  }

  // 정답 계산
  let answer = [];

  for (const [genre, genreData] of sortedGenres) {
    const selectedSongs = genreData.songs.slice(0, 2);
    for (const song of selectedSongs) {
      answer.push(song.id);
    }
  }

  return answer.slice(0, 4);
}
```

테스트의 3/2가 실패한다. play가 같은 경우를 처리하지 않아서 그런가?

추가해서 돌려보니 여전히 실패한다.

이유를 찾았다... 문제를 잘 읽자.

앨범은 무조건 4곡이 아니다 <- 테스트 케이스로 인해 헷갈렸음

마지막 slice 로직을 제거하자

### 최종 제출 코드

```ts
function solution(genres, plays) {
  const map = new Map();

  for (let i = 0; i < genres.length; i++) {
    const genreData = map.get(genres[i]) ?? {
      totalPlay: 0,
      songs: [],
    };

    genreData.totalPlay += plays[i];
    genreData.songs.push({ id: i, play: plays[i] });

    map.set(genres[i], genreData);
  }

  // 총 재생 횟수로 장르 정렬
  const sortedGenres = [...map.entries()].sort(
    ([genreA, dataA], [genreB, dataB]) => dataB.totalPlay - dataA.totalPlay,
  );

  // 각 장르별 곡 재생횟수로 정렬
  for (const [genre, genreData] of sortedGenres) {
    genreData.songs.sort((songA, songB) => {
      if (songA.play !== songB.play) {
        return songB.play - songA.play;
      }
    });
  }

  // 정답 계산
  let answer = [];
  for (const [genre, genreData] of sortedGenres) {
    const selectedSongs = genreData.songs.slice(0, 2);
    for (const song of selectedSongs) {
      answer.push(song.id);
    }
  }

  return answer;
}
```

### 다른 사람 풀이 보기

```ts
function solution(genres, plays) {
  var dic = {};
  genres.forEach((t, i) => {
    dic[t] = dic[t] ? dic[t] + plays[i] : plays[i];
  });

  var dupDic = {};
  return genres
    .map((t, i) => ({ genre: t, count: plays[i], index: i }))
    .sort((a, b) => {
      if (a.genre !== b.genre) return dic[b.genre] - dic[a.genre];
      if (a.count !== b.count) return b.count - a.count;
      return a.index - b.index;
    })
    .filter((t) => {
      if (dupDic[t.genre] >= 2) return false;
      dupDic[t.genre] = dupDic[t.genre] ? dupDic[t.genre] + 1 : 1;
      return true;
    })
    .map((t) => t.index);
}
```

흠..... 일단 이해가 안되더라도 분석해보자.

dic은 totalPlay의 역할(genres 정렬에서 필요한 장르별 총 재생 횟수), 정렬 시 아래 순서에 따른다.

서로 다른 장르라면 장르 전체 재생 횟수 내림차순

같은 장르라면 노래 재생 횟수 내림차순

재생 횟수까지 같다면 고유 번호 오름차순

이후 정렬된 객체 배열을 filter해서 dupDic에 장르별로 최대 2곡까지 있게 하고, 이후 map으로 인덱스만 꺼내 배열을 만든다.

### 반성

sort 어떻게 동작하는지 헷갈려서 다시 정리했다.

```ts
const numbers = [4, 2, 9, 1];
numbers.sort((a, b) => b - a); // [9, 4, 2, 1]
```

콜백 함수의 반환 값에 따라 위치가 바뀐다.

0보다 작은 경우 a를 b보다 앞에 정렬

0인 경우 그대로

0보다 큰 경우 b를 a보다 앞에 정렬

문제좀 제발 잘 읽자. 테스트에 혼란이 왔다지만 실수를 빨리 찾지 못했으면 망하는 지름길이다..

장르별 최대 2개라는 말은 있어도 최대 4개라는 말은 어디에도 없었다.

정렬하는 메서드를 for문 말고 사용할 수 있는 방법이 있지 않을까?

### 다시 코드 작성해보기
