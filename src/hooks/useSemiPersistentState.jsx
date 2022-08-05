import { useEffect, useState } from 'react';

const tryParseJson = value => {
  if (value == null) return undefined;

  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

export const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(tryParseJson(localStorage.getItem(key)) || initialState);

  useEffect(() => {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }, [value]);

  return [value, setValue];
};
