// Generate random ID
export function generateRandomId() {
    return Math.floor(Math.random() * 10) + 1;
}

export function getRandomDate(startDate, endDate) {
        const startTimestamp = new Date(startDate).getTime()
        const endTimestamp = new Date(endDate).getTime()
        const randomTimestamp = Math.floor(Math.random() * (endTimestamp - startTimestamp + 1) + startTimestamp)
        return new Date(randomTimestamp).toISOString().split('T')[0]
}