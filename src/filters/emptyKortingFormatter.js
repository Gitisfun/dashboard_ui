export default function emptyKortingFormatter (value) {
    if(value) return `${value * 100} %`
    return "..."
}