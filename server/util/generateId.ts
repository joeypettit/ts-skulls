// this function will generate a random five charactar id to be used
// for player and room ids

export default function generateId(idLength: number): string {
    let id = "";
    const letters = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < idLength; i++) {
      if (Math.floor(Math.random() * 2) < 1) {
        const nextChar = letters.charAt(
          Math.floor(Math.random() * letters.length)
        );
        id += nextChar;
      } else {
        const nextChar = Math.floor(Math.random() * 10);
        id += nextChar;
      }
    }
    return id;
  }