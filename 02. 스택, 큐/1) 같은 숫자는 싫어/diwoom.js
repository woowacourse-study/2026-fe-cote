function solution(arr) {
  const stack = [];

  for (const item of arr) {
    const top = stack.length - 1;

    if (top === -1 || stack[top] !== item) {
      stack.push(item);
    }
  }
  return stack;
}
