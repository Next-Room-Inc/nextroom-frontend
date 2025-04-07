import {useState, useEffect} from "react";

export function useLocalStorage(key: string, initialValue = "") {
    const readValue = () => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState(readValue);

    // Save to localStorage and dispatch event
    const setValue = (value:any) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
            window.dispatchEvent(new CustomEvent("local-storage-change", {detail: {key, value: valueToStore}}));
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    useEffect(() => {
        const handleStorageChange = (event:any) => {
            if (event.detail?.key === key)
                setStoredValue(event.detail.value);
        };

        const handleNativeStorage = (event:any) => {
            if (event.key === key)
                setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
        };

        window.addEventListener("local-storage-change", handleStorageChange);
        window.addEventListener("storage", handleNativeStorage);

        return () => {
            window.removeEventListener("local-storage-change", handleStorageChange);
            window.removeEventListener("storage", handleNativeStorage);
        };
    }, [initialValue, key]);

    return [storedValue, setValue];
}
