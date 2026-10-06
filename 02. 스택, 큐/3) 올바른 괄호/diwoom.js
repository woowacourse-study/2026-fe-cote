function solution(s) {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    stack.push(s[i]);
    if (s[i] === ')' && stack[stack.length - 2] === '(') {
      stack.pop();
      stack.pop();
    }
  }

  return stack.length === 0 ? true : false;
}
