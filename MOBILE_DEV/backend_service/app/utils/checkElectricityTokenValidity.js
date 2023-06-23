export const checkElectricityTokenValidity = (startDate, numberOfDays, currentDate) => {
    const expiryDate = new Date(startDate)
    expiryDate.setDate(expiryDate.getDate() + numberOfDays)

    const remainingDays = Math.ceil((expiryDate - currentDate) / (1000 * 60 * 60 * 24))

    return {
        days: remainingDays,
        valid: currentDate <= expiryDate
    }
}