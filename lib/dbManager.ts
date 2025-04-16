/**
 * Retrieves an item from localStorage by key or sets it if it doesn't exist.
 * 
 * @param key - The key to retrieve or set in localStorage.
 * @param value - The value to set if the key does not exist.
 * @returns The parsed value from localStorage if the key exists, otherwise the provided value.
 */
export function getOrSetItem(key: string, value: unknown) {
	const db = localStorage;
	if(key && typeof key === "string") {
        if (db.getItem(key) === null) {
		db.setItem(key, JSON.stringify(value));
	} else {
		const item = db.getItem(key);
		return item !== null ? JSON.parse(item) : null;
	}
    }
	return value;
}

/**
 * Retrieves the value associated with the specified key from localStorage.
 * Parses the value as JSON if it exists.
 *
 * @param key - The key of the item to retrieve.
 * @returns The parsed value if the key exists, or null otherwise.
 */
export function getItemValue(key: string) {
	const db = localStorage;
	if (db.getItem(key) !== null) {
		const item = db.getItem(key);
		return item !== null ? JSON.parse(item) : null;
	}
	return null;
}

/**
 * Stores a value in localStorage under the specified key.
 *
 * @param key - The key under which the value will be stored. Must not be null.
 * @param value - The value to store. Defaults to an empty string if not provided.
 * @returns The stored value, or null if the key is null.
 */
export function setItemValue(key: string, value: unknown = "")  {
	if (key !== null) {
		localStorage.setItem(key, JSON.stringify(value));
		return value;
	} 
     return null;
}

/**
 * Clears all data from the local storage.
 * 
 * @returns {null} Always returns null.
 */
export function clearDB(): null {
	localStorage.clear();
	return null;
}