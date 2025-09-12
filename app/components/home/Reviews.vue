<template>
    <DefaultSection
        class="xxl:max-w-[1200px] lg:flex-row xxl:justify-between xxl:!gap-8 relative pb-8 md:pb-12 lg:pb-0 lg:pl-20 xxl:px-0 mx-auto">
        <div
            class="lg:w-1/2 flex flex-col justify-between items-center lg:items-start text-center gap-2 lg:gap-6 px-5 lg:px-0">
            <div class="flex flex-col items-center lg:items-start text-center gap-2 lg:gap-6">
                <HeadingH1 class="flex md:block xxl:flex flex-col lg:text-left fade-up">
                    MÁS QUE CLIENTES,
                    <span class="font-teko">SOCIOS EN EL CAMINO</span>
                </HeadingH1>
                <p class="text-xs md:text-sm lg:text-xl fade-up">Mira lo que nuestros clientes dicen sobre nosotros.</p>
                <div class="flex lg:flex-col items-center lg:items-start gap-2 text-sm lg:text-xl font-medium fade-up">
                    <p>Excelente</p>
                    <div class="flex items-center gap-1 lg:gap-2">
                        <p class="lg:hidden">4.8</p>
                        <div
                            class="w-4 lg:w-12 h-4 lg:h-12 flex justify-center items-center bg-terciary rounded-full p-1 mb-1">
                            <Icon name="tabler:star-filled" class="w-2 lg:w-6 h-2 lg:h-6 flex-shrink-0" />
                        </div>
                        <div
                            class="w-12 h-12 hidden lg:flex justify-center items-center bg-terciary rounded-full p-1 mb-1">
                            <Icon name="tabler:star-filled" class="w-2 lg:w-6 h-2 lg:h-6 flex-shrink-0" />
                        </div>
                        <div
                            class="w-12 h-12 hidden lg:flex justify-center items-center bg-terciary rounded-full p-1 mb-1">
                            <Icon name="tabler:star-filled" class="w-2 lg:w-6 h-2 lg:h-6 flex-shrink-0" />
                        </div>
                        <div
                            class="w-12 h-12 hidden lg:flex justify-center items-center bg-terciary rounded-full p-1 mb-1">
                            <Icon name="tabler:star-filled" class="w-2 lg:w-6 h-2 lg:h-6 flex-shrink-0" />
                        </div>
                        <div
                            class="w-12 h-12 hidden lg:flex justify-center items-center bg-terciary rounded-full p-1 mb-1">
                            <Icon name="tabler:star-half-filled" class="w-2 lg:w-6 h-2 lg:h-6 flex-shrink-0" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="hidden lg:flex items-center gap-3 absolute bottom-0 self-end">
                <button @click="handleScrollLeft"
                    class="w-10 h-10 flex justify-center items-center bg-light hover:bg-primaryHover text-primary hover:text-light rounded-full primary-shadow transition-colors duration-300"
                    aria-label="Anterior">
                    <Icon name="material-symbols:chevron-left-rounded" size="2rem" />
                </button>
                <button @click="handleScrollRight"
                    class="w-10 h-10 flex justify-center items-center bg-light hover:bg-primaryHover text-primary hover:text-light rounded-full primary-shadow transition-colors duration-300"
                    aria-label="Siguiente">
                    <Icon name="material-symbols:chevron-right-rounded" size="2rem" />
                </button>
            </div>
        </div>
        <div class="w-screen lg:w-1/2 relative">
            <CarouselStatic :slides-per-view="{ base: 1.4, sm: 2.5, md: 3.5, lg: 1.8, xl: 1.8, xxl: 2.5 }"
                :gap="{ base: 12, lg: 16, xl: 16, xxl: 16 }" :show-arrows="false" ref="carousel" class="fade-up">
                <ReviewCard v-for="review in reviews" :key="review.id" :review="review"
                    class="first:md:ml-11 last:md:mr-11" />
            </CarouselStatic>
            <div
                class="hidden lg:block absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-light to-transparent pointer-events-none z-10">
            </div>
            <div
                class="hidden xxl:block absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-light to-transparent pointer-events-none z-10">
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
const { reviews, loading, error, fetchReviews } = useReviews()
const carousel = ref(null)

useFadeUp()

const handleScrollLeft = () => {
    if (carousel.value) {
        carousel.value.scrollLeft()
    }
}

const handleScrollRight = () => {
    if (carousel.value) {
        carousel.value.scrollRight()
    }
}

onMounted(async () => {
    await fetchReviews(6)
})
</script>