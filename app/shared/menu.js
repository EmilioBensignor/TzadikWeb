import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';

const paginas = [
    {
        name: "Servicios",
        route: ROUTE_NAMES.SERVICIOS
    },
    {
        name: "Marcas",
        route: `${ROUTE_NAMES.MARCAS}/michigan`
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
        text: "3624620042",
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
    {
        name: "Youtube",
        route: ROUTE_NAMES.REDES.YOUTUBE,
    },
];

export {
    paginas,
    contacto,
    redes
};