<template>
    <DefaultSection class="pb-8">
        <div class="flex flex-col items-center text-center gap-2 px-5">
            <HeadingH1 class="flex flex-col">
                MÁS QUE CLIENTES,
                <span class="font-teko">SOCIOS EN EL CAMINO</span>
            </HeadingH1>
            <p class="text-xs">Mira lo que nuestros clientes dicen sobre nosotros.</p>
            <div class="flex items-center gap-2 text-sm font-medium">
                <p>Excelente</p>
                <div class="flex items-center gap-1">
                    <p>4.8</p>
                    <div class="w-4 h-4 flex justify-center items-center bg-terciary rounded-full p-1 mb-1">
                        <Icon name="tabler:star-filled" class="w-2 h-2 flex-shrink-0" />
                    </div>
                </div>
            </div>
        </div>
        <CarouselStatic :gap="{ base: 12, lg: 16, xl: 16, xxl: 16 }">
            <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
        </CarouselStatic>
    </DefaultSection>
</template>

<script setup>
const { reviews, loading, error, fetchReviews } = useReviews()

onMounted(async () => {
    await fetchReviews(6)
})
</script>