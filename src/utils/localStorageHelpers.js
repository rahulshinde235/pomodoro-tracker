export function loadDataIntoLocalStorage(id, data) {
  localStorage.setItem(id, JSON.stringify(data));
}

export function readDataFromLocalStorage(id) {
  try {
    const raw = localStorage.getItem(id);
    return raw ? raw : null;
  } catch (e) {
    console.warn(`Failed to parse localStorage key "${id}":`, e);
    return null;
  }
}
export function removeDataFromLocalStorage(id) {
  localStorage.removeItem(id);
}
