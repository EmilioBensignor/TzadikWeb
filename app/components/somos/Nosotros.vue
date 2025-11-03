<template>
    <DefaultSection class="py-8 md:py-12 lg:pt-14 xxl:pt-20 lg:pb-0 px-5 md:px-11 lg:px-20">
        <div class="max-w-[1200px] flex flex-col gap-3 md:gap-8">
            <div class="flex flex-col items-center md:items-start text-center md:text-left gap-3">
                <HeadingH2>SOMOS TU ALIADO ESTRATEGICO</HeadingH2>
                <p class="lg:max-w-[55.75rem] text-xs md:text-sm lg:text-base md:font-medium">
                    En Tzadik entendemos que detrás de cada máquina hay un proyecto, un esfuerzo y una inversión que
                    cuidar. Por
                    eso trabajamos con pasión y compromiso, ofreciendo servicios integrales que garantizan el máximo
                    rendimiento
                    de la maquinaria vial y agropecuaria. Nuestra experiencia, cobertura y dedicación nos convierten en
                    un socio
                    confiable para productores y empresas en todo el país.
                </p>
            </div>
            <div class="flex flex-col md:flex-row lg:items-center gap-3 md:gap-5 lg:gap-8">
                <NuxtImg src="/images/somos/Equipo-Tzadik.jpg" alt="Equipo Tzadik"
                    class="w-full md:w-1/2 h-52 sm:h-64 md:h-auto xxl:h-[27.5rem] md:self-stretch rounded-xl shadow-md shadow-black/30 object-cover" />
                <div ref="numerosRef" class="md:w-1/2 flex flex-col gap-1.5 md:gap-4 lg:gap-6">
                    <div v-for="(dato, index) in datos" :key="index" class="flex flex-col">
                        <p class="text-5xl lg:text-[3.25rem] font-teko text-primary font-bold">{{ displayValues[index] }}</p>
                        <p class="text-xs lg:text-sm font-medium">{{ dato.texto }}</p>
                    </div>
                </div>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
const datos = [
    {
        numero: "+10",
        texto: "Años de experiencia respaldando a empresas y productores en todo el país.",
    },
    {
        numero: "+500",
        texto: "Equipos mantenidos con garantía de seguridad y máxima eficiencia.",
    },
    {
        numero: "+20",
        texto: "Provincias alcanzadas, respaldando a clientes en todo el territorio argentino.",
    },
    {
        numero: "100%",
        texto: "Repuestos originales para asegurar rendimiento y durabilidad en cada máquina.",
    },
];

const numerosRef = ref(null);
const displayValues = ref(datos.map(() => '0'));
const hasAnimated = ref(false);

const animateNumber = (targetValue, index, duration = 2000) => {
    const hasPrefix = targetValue.startsWith('+');
    const hasSuffix = targetValue.endsWith('%');
    const numericValue = parseInt(targetValue.replace(/[+%]/g, ''));

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.round(startValue + (numericValue - startValue) * easeOutQuart);

        let displayValue = currentValue.toString();
        if (hasPrefix) displayValue = '+' + displayValue;
        if (hasSuffix) displayValue = displayValue + '%';

        displayValues.value[index] = displayValue;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
};

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasAnimated.value) {
                    hasAnimated.value = true;
                    datos.forEach((dato, index) => {
                        setTimeout(() => {
                            animateNumber(dato.numero, index);
                        }, index * 100);
                    });
                }
            });
        },
        {
            threshold: 0.3,
        }
    );

    if (numerosRef.value) {
        observer.observe(numerosRef.value);
    }

    onUnmounted(() => {
        observer.disconnect();
    });
});
</script>