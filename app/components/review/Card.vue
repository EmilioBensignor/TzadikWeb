<template>
    <div class="flex flex-col gap-3 rounded-xl md:rounded-[20px] orange-shadow p-3">
        <NuxtImg :src="review.img" :alt="`Opinion de ${review.autor}`" class="w-full h-24 object-cover rounded-xl" />
        <div class="h-full flex flex-col justify-between gap-2.5">
            <p class="font-semibold">{{ review.titulo }}</p>
            <p class="text-xs">{{ review.comentario }}</p>
            <div class="flex items-center gap-1">
                <div v-for="star in 5" :key="star"
                    class="w-6 h-6 flex justify-center items-center bg-terciary rounded-full">
                    <Icon :name="star <= review.rating ? 'tabler:star-filled' : 'tabler:star'"
                        :class="star <= review.rating ? 'text-accent' : 'text-dark'" class="w-3 h-3" />
                </div>
            </div>
            <p class="text-xs">
                - <span>{{ review.autor }}, {{ review.ciudad }}, {{ review.provincia }}</span>
            </p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    review: {
        type: Object,
        required: true
    }
})
</script>