import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';

const paginas = [
    {
        name: "Productos",
        route: ROUTE_NAMES.PRODUCTOS
    },
    {
        name: "Servicios",
        route: ROUTE_NAMES.SERVICIOS
    },
    {
        name: "Marcas",
        route: ROUTE_NAMES.MARCAS
    },
    {
        name: "Quienes Somos",
        route: ROUTE_NAMES.QUIENES_SOMOS
    },
];

const contacto = [
    {
        icon: "brand-whatsapp",
        route: `https://wa.me/${ROUTE_NAMES.WHATSAPP.replace(/\s/g, '')}`,
        text: ROUTE_NAMES.WHATSAPP,
    },
    {
        icon: "mail",
        route: `mailto:${ROUTE_NAMES.MAIL}`,
        text: ROUTE_NAMES.MAIL,
    },
    {
        icon: "map-pin",
        route: '#',
        text: ROUTE_NAMES.UBICACION,
    },
];

const redes = [
    {
        name: "Instagram",
        route: ROUTE_NAMES.REDES.INSTAGRAM,
    },
    {
        name: "Facebook",
        route: ROUTE_NAMES.REDES.FACEBOOK,
    },
    {
        name: "TikTok",
        route: ROUTE_NAMES.REDES.TIKTOK,
    },
];

export {
    paginas,
    contacto,
    redes
};