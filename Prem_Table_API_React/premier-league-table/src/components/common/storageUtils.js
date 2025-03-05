// src/components/common/storageUtils.js

// LocalStorage Funktionen
export const getLocalItem = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  };
  
  export const setLocalItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };
  
  export const removeLocalItem = (key) => {
    localStorage.removeItem(key);
  };
  
  // SessionStorage Funktionen
  export const getSessionItem = (key) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error accessing sessionStorage:', error);
      return null;
    }
  };
  
  export const setSessionItem = (key, value) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
    }
  };
  
  export const removeSessionItem = (key) => {
    sessionStorage.removeItem(key);
  };
  
  // Cookie Funktionen
  export const getCookie = (name) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    return null;
  };
  
  export const setCookie = (name, value, days = 7) => {
    if (typeof document === 'undefined') return;
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
  };
  
  export const removeCookie = (name) => {
    document.cookie = `${name}=; Max-Age=0; path=/`;
  };
  
  // React Hook für LocalStorage
  export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = getLocalItem(key);
        return item !== null ? item : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });
  
    const setValue = (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        setLocalItem(key, valueToStore);
      } catch (error) {
        console.error(error);
      }
    };
  
    return [storedValue, setValue];
  };