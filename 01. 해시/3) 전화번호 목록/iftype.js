// 못 풀었씁니다...
// function solution(phone_book) {
//   const phones = phone_book.sort((a, b) => a.length - b.length);

//   for (let i = 0; i < phones.length; i++) {
//     for (let j = i + 1; j < phones.length; j++) {
//       const start = phones[j].startsWith(phones[i]);
//       if (start === true) return false;
//     }
//   }
//   return true;
// }
// ------------------------------------------------------------
// 다시 푼 코드
function solution(phone_book) {
  const phone_hash = new Set(phone_book);

  return phone_book.every((phone) => {
    for (let i = 0; i < phone.length; i++) {
      if (phone_hash.has(phone.slice(0, i))) return false;
    }
    return true;
  });
}
