export function generateRandomId() {
    return Math.floor(Math.random() * 10) + 1;
}

export function getRandomDate(start, end) {
        const startTimestamp = new Date(start).getTime()
        const endTimestamp = new Date(end).getTime()
        const randomTimestamp = Math.floor(Math.random() * (endTimestamp - startTimestamp + 1) + startTimestamp)
        return new Date(randomTimestamp).toISOString().split('T')[0]
}

export function generateCategory(array) {
    if (!Array.isArray(array) || array.length === 0) {
        throw new Error('Invalid input: Please provide a non-empty array.')
    }

    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}