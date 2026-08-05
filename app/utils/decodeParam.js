// Los params de ruta pueden llegar codificados varias veces: cada navegación
// sobre una URL con caracteres especiales agrega una capa
// ("Ferretería" -> "Ferreter%C3%ADa" -> "Ferreter%25C3%25ADa" -> ...).
// Decodifica hasta que el valor se estabiliza.
export const decodeParam = (value) => {
    if (typeof value !== 'string') return ''

    let current = value

    for (let i = 0; i < 10; i++) {
        let next
        try {
            next = decodeURIComponent(current)
        } catch {
            return current
        }
        if (next === current) return current
        current = next
    }

    return current
}
