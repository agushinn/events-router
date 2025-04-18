function isValidText(value, minLength = 1) {
    return typeof value === 'string' && value.trim().length >= minLength
}

function isValidDate(value) {
    const date = new Date(value)
    return !isNaN(date.getTime())
}

function isValidImageUrl(value) {
    const urlPattern =
        /^(https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?(?:\?.*)?)$/i

    return urlPattern.test(value)
}

function isValidEmail(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(value)
}

module.exports = {
    isValidText,
    isValidDate,
    isValidImageUrl,
    isValidEmail,
}
