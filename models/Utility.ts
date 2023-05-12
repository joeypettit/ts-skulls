export default class Utility{

    private constructor(){}

     static generateId(idLength: number): string {
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
}