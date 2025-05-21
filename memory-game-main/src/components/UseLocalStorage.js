import { useEffect, useState } from "react";

export default function useLocalStorage(keyName, initialValue) {

  const [value, setValue] = useState(() => {

    const storedValue = localStorage.getItem(keyName);
    if (storedValue != null) {
      try {
        return JSON.parse(storedValue);
      }
      catch (e) {
        return initialValue;
      }
    }
    else
      return initialValue;
  });

  useEffect(() => {
   localStorage.setItem(keyName, JSON.stringify(value))
    }, [keyName, value]);

  return [value, setValue];
}//end function