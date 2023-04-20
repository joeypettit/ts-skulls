// this function will generate a random five charactar code to be used
// for player and room codes

export default function generateId(): string {
  let code = "";
  const letters = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 3; i++) {
    if (Math.floor(Math.random() * 2) < 1) {
      const nextChar = letters.charAt(
        Math.floor(Math.random() * letters.length)
      );
      code += nextChar;
    } else {
      const nextChar = Math.floor(Math.random() * 10);
      code += nextChar;
    }
  }
  return code;
}
