# 해시-베스트앨범-콘티

## 풀이

```js
function solution(genres, plays) {
  // 우선 장르와 재생시간을 하나로 정리한뒤 재생시간으로 정렬한다
  const album = genres.map((genre, index) => {
    return {
      index,
      genre,
      play: plays[index],
    };
  });
  album.sort((a, b) => b.play - a.play);

  // 합계와 리스트를 가지는 요약 맵을 둠
  const summary = new Map();
  album.forEach(({ index, genre, play }) => {
    if (!summary.has(genre)) {
      summary.set(genre, {
        sum: 0,
        list: [],
      });
    }
    // 합계는 전부 계산하되 두개까지 제한
    summary.get(genre).sum += play;
    if (summary.get(genre).list.length < 2) {
      summary.get(genre).list.push({ index, play });
    }
  });
  // 합계 다 구한뒤엔 다시 정렬해서 순서정리
  const result = [...summary].sort((a, b) => {
    return b[1].sum - a[1].sum;
  });

  // 차례차례 계산 (더러운 부분🫠)
  let answer = [];
  result.forEach((d) => {
    d[1].list.forEach((f) => {
      answer.push(f.index);
    });
  });
  return answer;
}
```

## 생각의 흐름

```bash
1. 장르별로 두개씩 뽑는구나
2. 그럼 장르의 순서 정렬 해야겠군
3. 장르에 키 값 고유번호 재생수를 둔다??
4. 배열로 둬야 정렬이 가능할텐데 Map은 구린데 ? 그렇다고 배열쓰기엔 index조회가..
5. 아 못봤는데 장르를 다 더해야하는구나!!
6. 구현해보자
7. 어.. 구현이 어렵네.. 점점 코드가 더러워진다
8. 일단 맞추자 ..
```

우선 재생수가 두 개씩(또는 한개)인 것에 집중했고, 인덱스를 가져와야하기 때문에 재생 횟수와 장르,인덱스를 같은 레벨로 그룹화시켜야됐습니다.
저 멤버가 다같이 이동하기 떄문에 정렬은 그 이후에 이뤄져야합니다.

합계를 구한뒤 정렬을 해야됐을까 의문이 들긴합니다..

## 인상깊게 본 코드

```js
1;
2;
3;
4;
5;
6;
7;
8;
9;
10;
11;
12;
13;
14;
15;
16;
17;
18;
19;
20;
21;
22;
function solution(genres, plays) {
  var dic = {};

  // 재생수의 합 부터 구하는 부분
  genres.forEach((t, i) => {
    dic[t] = dic[t] ? dic[t] + plays[i] : plays[i];
  });

  // 복사된 딕셔너리

  var dupDic = {};
  return (
    genres
      .map((t, i) => ({ genre: t, count: plays[i], index: i }))
      // 맵이 끝난 직후(이건 나랑 똑같은디.. 크큭 계산용 배열을 만든다)
      // [
      //   { genre: "classic", count: 500, index: 0 },
      //   { genre: "pop", count: 600, index: 1 },
      //   { genre: "classic", count: 150, index: 2 },
      //   { genre: "classic", count: 800, index: 3 },
      //   { genre: "pop", count: 2500, index: 4 },
      // ];
      .sort((a, b) => {
        if (a.genre !== b.genre) return dic[b.genre] - dic[a.genre];
        if (a.count !== b.count) return b.count - a.count;
        return a.index - b.index;
      })
      // 어라 정렬 개잘하네..
      // 총 재생수를 다른 배열 소트에 사용할 줄 몰랐는데..
      // 1. 총 재생수에 따른 장르 내림차순 정렬(아까계산한걸로)
      // 2. 같은 장르의 경우 재생횟수로 내림차순 정렬
      // 3. 다 같으면 인덱스로 정렬
      .filter((t) => {
        if (dupDic[t.genre] >= 2) return false;
        dupDic[t.genre] = dupDic[t.genre] ? dupDic[t.genre] + 1 : 1;
        return true;
      })
      // 필터링, 아까 정렬했으니까 두개씩 끊을 수 있네
      .map((t) => t.index)
  );
}
```

선언적으로짠 코드보니까 현타온다 기본기 부족인듯... ㅠㅠ
