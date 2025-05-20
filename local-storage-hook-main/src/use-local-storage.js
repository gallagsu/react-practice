import { useEffect, useState } from "react";
export default function useLocalStorage(keyName, initialValue) {

  // Add your solution here
  const [value, setValue] = useState(() => {
      const storedValues = localStorage.getItem(keyName);
      if(storedValues != null)
        return JSON.parse(storedValues);
      else
        return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(value))
  }, [keyName,value]);

  return [value, setValue];
}