const generateUniqueId = () => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 10000)
    generateUniqueId.counter = (generateUniqueId.counter || 0) + 1
    const uniqueId = timestamp.toString() + random.toString() + generateUniqueId.counter.toString()
    return uniqueId
}

export default { generateUniqueId }
