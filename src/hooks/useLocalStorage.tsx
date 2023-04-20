import { useEffect, useState } from "react";

// this hook will take a value (string) and place it into local storage
// if there is already a value with that key in local storage,
// it will return that value instead (string).

// this PREFIX is useful when you have multiple apps using local
// storage from the same url (eg localhost:3000)
// the prefix allows you to keep each one seperate, and
// avoid conflicts with keys
const PREFIX = "skulls-";

type ReturnType = [string, React.Dispatch<React.SetStateAction<string>>];

function useLocalStorage(key: string, initialValue: string): ReturnType {
  // combine key with the PREFIX
  const prefixedKey: string = PREFIX + key;

  // ~~~~~ set state ~~~~~
  const [value, setValue] = useState<string>(() => {
    // grab value from local storage using prefixed key (null it it doesn't exist)
    const jsonValue = localStorage.getItem(prefixedKey);

    if (jsonValue !== null) {
      // if the value DOES exist in local storage, set to default state value
      return JSON.parse(jsonValue);
    } else {
      // if it is not already in local storage, set initialValue to state
      return initialValue;
    }
  });
  // ~~~~~ end initial state value function ~~~~

  // when the prefixed key or value changes, set this new value to
  // local storage
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);

  return [value, setValue];
}

export default useLocalStorage;
