export const shortenString = (string, cutFrom = 100) => {
    if(string.length < cutFrom) {
        return string
    }

    const firstDot = string.indexOf('.', cutFrom) + 1
    if(firstDot < 0) {
        return string
    }
    return string.substring(0, firstDot)
}