export const formatCurrency = (amount) => {
    if (!amount) return 'Precio a consultar'
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(amount)
}