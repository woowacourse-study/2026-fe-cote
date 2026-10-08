function solution(phone_book) {
  const set = new Set(phone_book);
  for (const phone of phone_book) {
    for (let len = 1; len < phone.length; len++) {
      if (set.has(phone.slice(0, len))) return false;
    }
  }
  return true;
}
