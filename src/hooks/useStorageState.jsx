import {useEffect, useState} from "react";

export const useStorageState = (key, initialState) => {
  const [value, SetValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem('value', value)
  }, [value, key]);

  return [value, SetValue];
}