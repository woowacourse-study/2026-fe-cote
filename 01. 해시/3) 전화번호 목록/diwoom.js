// 시간 초과
function solution(phone_book) {
  phone_book.sort((a, b) => a.length - b.length);

  for (i = 0; i < phone_book.length; i++) {
    for (j = i + 1; j < phone_book.length; j++) {
      if (phone_book[j].startsWith(phone_book[i])) return false;
    }
  }
  return true;
}

// 성공
function solution(phone_book) {
  phone_book.sort();

  for (i = 0; i < phone_book.length - 1; i++) {
    if (phone_book[i + 1].startsWith(phone_book[i])) return false;
  }
  return true;
}
