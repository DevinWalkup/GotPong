export function generateGameCode() {
  const nums = new Set();
  while(nums.size !== 6) {
    nums.add(Math.floor(Math.random() * 9) + 1);
  }

  return Array.from(nums).join("");
}
