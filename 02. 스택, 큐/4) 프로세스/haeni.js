function solution(priorities, location) {
  const queue = priorities.map((priority, index) => ({ priority, index }));
  let order = 0;

  while (queue.length) {
    const current = queue.shift();
    const hasHigher = queue.some(({ priority }) => priority > current.priority);

    if (hasHigher) {
      queue.push(current);
      continue;
    }

    order++;
    if (current.index === location) return order;
  }
}
