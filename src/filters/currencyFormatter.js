export default function currencyFormatter (value) {
    return `€ ${parseFloat(value).toFixed(2)}`
}