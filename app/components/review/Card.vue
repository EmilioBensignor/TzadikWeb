<template>
    <div class="review flex flex-col gap-3 rounded-xl md:rounded-[20px] p-3 lg:p-5">
        <NuxtImg :src="imageUrl" :alt="`Opinion de ${review.autor}`" class="w-full h-24 md:h-32 lg:h-40 object-cover rounded-xl" />
        <div class="h-full flex flex-col justify-between gap-2.5">
            <p class="font-semibold lg:text-[1.125rem]">{{ review.titulo }}</p>
            <p class="text-xs lg:text-sm">{{ review.comentario }}</p>
            <div class="flex items-center gap-1">
                <div v-for="star in 5" :key="star"
                    class="w-6 h-6 flex justify-center items-center bg-terciary rounded-full">
                    <Icon :name="star <= review.rating ? 'tabler:star-filled' : 'tabler:star'"
                        :class="star <= review.rating ? 'text-accent' : 'text-dark'" class="w-3 h-3" />
                </div>
            </div>
            <p class="text-xs lg:text-sm">
                - <span>{{ review.autor }}, {{ review.ciudad }}, {{ review.provincia }}</span>
            </p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    review: {
        type: Object,
        required: true
    }
})

const imageUrl = computed(() => {
    return props.review.img || '/images/placeholder-review.jpg'
})
</script>

<style scoped>
.review {
    box-shadow: 0px 0px 4px 0px #F44B1066;
}

@media (width >=1080px) {
    .review {
        box-shadow: 0px 2px 8px 0px #0000004D;
    }
}
</style>