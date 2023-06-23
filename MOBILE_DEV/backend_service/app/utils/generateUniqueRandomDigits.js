export const generateUniqueRandomDigits = (length) => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * Math.pow(10, length))
    const uniqueId =
        timestamp.toString() +
        random.toString().padStart(length - 1, '0')
    return uniqueId.slice(0, length)
}