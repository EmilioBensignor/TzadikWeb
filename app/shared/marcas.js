const marcas = [
    {
        nombre: "Hanomag",
        slug: "hanomag",
        img: "",
        alt: "Hanomag palas autoelevadores tractores",
        caracteristicas: [
            { icono: "papiro", texto: "Casi 150 años de historia en maquinaria pesada" },
            { icono: "argentina", texto: "Ingeniería alemana con presencia local en Argentina desde los años 50" },
            { icono: "fabrica", texto: "Producción nacional y red de más de 78 concesionarios" },
            { icono: "herramienta", texto: "Reconocida por su robustez, trayectoria e innovación técnica" },
            { icono: "pala-cargadora", texto: "Portafolio moderno de palas, autoelevadores y tractores" }
        ]
    },
    {
        nombre: "Michigan",
        slug: "michigan",
        img: "Michigan-Pala-Cargadora",
        alt: "Michigan equipos robustos obra agrícola",
        caracteristicas: [
            { icono: "Siglo", texto: "Más de un siglo de trayectoria en maquinaria vial y agrícola" },
            { icono: "Mundo", texto: "Reconocimiento histórico internacional por su origen estadounidense e innovaciones pioneras." },
            { icono: "Valorada", texto: "Valorada por empresas constructoras y agroindustriales argentinas." },
            { icono: "Repuestos", texto: "Amplia disponibilidad de repuestos y soporte técnico inmediato." },
            { icono: "Equipos-Maquinaria", texto: "Equipos robustos y potentes para obra y campo" }
        ]
    },
    {
        nombre: "Husqvarna",
        slug: "husqvarna",
        img: "",
        alt: "Husqvarna motosierras cortadoras césped",
        caracteristicas: [
            { icono: "fabrica", texto: "Herencia sueca desde 1689, originalmente fábrica de armas reales" },
            { icono: "arbol", texto: "Más de 325 años de evolución en motos, herramientas y jardín" },
            { icono: "evolucion", texto: "Líder mundial en motosierras, cortadoras de césped y desmalezadoras" },
            { icono: "ubicacion", texto: "Presente en todo el país con soporte y distribuidores oficiales" },
            { icono: "robot", texto: "Pionera en tecnología inteligente y robótica aplicada al jardín" }
        ]
    },
    {
        nombre: "AgroChery",
        slug: "agrochery",
        img: "",
        alt: "AgroChery tractores potentes agrícolas",
        caracteristicas: [
            { icono: "mundo", texto: "Nacida de Chery y potenciada por Zoomlion, gigante de maquinaria china" },
            { icono: "tractor", texto: "Línea de tractores de 25 a 245 HP para múltiples tareas agrícolas" },
            { icono: "argentina", texto: "Operación en Argentina desde 2017" },
            { icono: "evolucion", texto: "Más de 4.000 unidades vendidas, reflejo de su rápida expansión" },
            { icono: "herramienta", texto: "Alta tecnología Zoomlion, diseño moderno y servicio postventa local" }
        ]
    },
    {
        nombre: "Fema",
        slug: "fema",
        img: "",
        alt: "Fema equipos robustos locales",
        caracteristicas: [
            { icono: "argentina", texto: "Marca argentina con sello industrial y equipos robustos" },
            { icono: "caja-herramientas", texto: "Ofrece autoelevadores, minicargadoras, compresores y herramientas" },
            { icono: "herramienta", texto: "Fuerte soporte técnico y repuestos disponibles en todo el país" },
            { icono: "mundo", texto: "Reconocida por calidad local e integración de tecnología global" },
            { icono: "grua", texto: "Soluciones completas para pymes, municipios y agroindustria" }
        ]
    },
    {
        nombre: "Grosspal",
        slug: "grosspal",
        img: "",
        alt: "Grosspal maquinaria agrícola profesional",
        caracteristicas: [
            { icono: "calendario", texto: "Más de 60 años fabricando maquinaria agrícola y vial" },
            { icono: "rueda", texto: "Amplio catálogo de palas, acoplados, tolvas, fertilizadoras y más" },
            { icono: "cereal", texto: "Pionera en el primer recolector de cereal argentino" },
            { icono: "barco", texto: "Exporta a países de Sudamérica, África y Europa" },
            { icono: "herramienta", texto: "Equipos de gran resistencia y soporte técnico asegurado" }
        ]
    },
    {
        nombre: "Luqstoff",
        slug: "luqstoff",
        img: "",
        alt: "Luqstoff herramientas equipos modernos",
        caracteristicas: [
            { icono: "evolucion", texto: "Marca joven con rápida expansión" },
            { icono: "herramienta", texto: "Portafolio de más de 3000 productos entre herramientas, generadores y más" },
            { icono: "caja-herramientas", texto: "Catálogo amplio con productos como soldadoras, hidrolavadoras y compresores" },
            { icono: "soporte", texto: "Soporte técnico certificado" },
            { icono: "pacto", texto: "Innovadora en logística, marketing y expansión digital" }
        ]
    },
    {
        nombre: "Montecor",
        slug: "montecor",
        img: "",
        alt: "Montecor equipos agroganadería innovadores",
        caracteristicas: [
            { icono: "argentina", texto: "Empresa cordobesa con 50 años de historia en agroganadería" },
            { icono: "vaca", texto: "N°1 en mixers para alimentación animal en Argentina" },
            { icono: "tractor", texto: "También produce tolvas, moledoras, compostadores y más" },
            { icono: "herramienta", texto: "Líder en innovación con pesajes de precisión y diseño modular" },
            { icono: "mundo", texto: "Exporta a América, África y Oceanía con fuerte servicio local" }
        ]
    },
    {
        nombre: "Yomel",
        slug: "yomel",
        img: "",
        alt: "Yomel implementos agrícolas sostenibles",
        caracteristicas: [
            { icono: "herramienta", texto: "50 años fabricando implementos agrícolas en 9 de Julio" },
            { icono: "cereal", texto: "Más de 120 modelos: enfardadoras, segadoras, pulverizadores, etc." },
            { icono: "sol", texto: "Planta industrial abastecida en 70% con energía solar" },
            { icono: "mundo", texto: "Exporta a más de 20 países en América, Europa y África" },
            { icono: "fabrica", texto: "Calidad artesanal con procesos industriales y mejora continua" }
        ]
    }
];

export default marcas;