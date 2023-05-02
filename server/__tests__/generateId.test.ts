import generateId from "../util/generateId";

describe("generateId", ()=>{
    test("Return ID with length of argument", () => {
      expect(generateId(3).length).toBe(3);
      expect(generateId(1).length).toBe(1);
      expect(generateId(0).length).toBe(1);
      expect(generateId(-1).length).toBe(1);
      expect(generateId(10).length).toBe(9);
    });

})
