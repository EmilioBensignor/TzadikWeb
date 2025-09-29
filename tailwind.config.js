export default {
    theme: {
        screens: {
            'sm': '480px',
            'md': '768px',
            'lg': '1080px',
            'xl': '1280px',
            'xxl': '1440px',
        },
        extend: {
            colors: {
                primary: "#FF541C",
                primaryHover: "#FF710C",
                secondary: "#B82D18",
                terciary: "#FCC008",
                dark: "#352631",
                light: "#EFEFEF",
                whatsapp: "#25D366",
                gray: {
                    extraLight: "#EFE0DB",
                    mid: "#E3DEDE",
                    dark: "#7C797A",
                },
                error: "#F03A36",
            },
            fontFamily: {
                teko: ['Teko', 'sans-serif'],
                vazirmatn: ['Vazirmatn', 'sans-serif']
            },
            boxShadow: {
                '1': '0px 1px 4px 0px rgba(12, 12, 13, 0.15)',
            },
        }
    }
}