export const setStorage = (id, value) => localStorage.setItem(id, value)

export const removeStorage = id => localStorage.removeItem(id)

export const fetchStorage = id => localStorage.getItem(id)