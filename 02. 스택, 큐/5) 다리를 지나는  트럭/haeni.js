function solution(bridge_length, weight, truck_weights) {
  let time = 0;
  let bridge = [];
  for (let i = 0; i < bridge_length; i++) {
    bridge.push(0);
  }
  let sum = 0;

  while (truck_weights.length || sum > 0) {
    time++;
    sum -= bridge.shift();

    if (truck_weights.length && sum + truck_weights[0] <= weight) {
      const t = truck_weights.shift();
      bridge.push(t);
      sum += t;
    } else {
      bridge.push(0);
    }
  }

  return time;
}
s;
