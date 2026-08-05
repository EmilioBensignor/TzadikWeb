export const formatCurrency = (amount) => {
    if (!amount) return ''
    return new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 0
    }).format(amount)
}