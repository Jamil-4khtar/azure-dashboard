/**
 * Custom hook for localStorage with SSR safety
 */
import { useState, useEffect } from 'react';
import { getFromStorage, setToStorage, removeFromStorage } from '../utils/helpers';

export const useLocalStorage = (key, initialValue = null) => {
  // Initialize state with a function to avoid SSR issues
  const [storedValue, setStoredValue] = useState(() => {
    return initialValue;
  });

  // Use useEffect to set the value after component mounts (client-side)
  useEffect(() => {
    const value = getFromStorage(key, initialValue);
    setStoredValue(value);
  }, [key, initialValue]);

  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      setToStorage(key, valueToStore);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      removeFromStorage(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
