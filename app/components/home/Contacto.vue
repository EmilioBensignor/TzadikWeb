<template>
    <DefaultSection class="bg-gradient-to-r from-dark to-primary py-6 px-5">
        <HeadingH2 class="text-light">ENCONTRÁ LA SOLUCIÓN IDEAL PARA VOS</HeadingH2>
        <ButtonPrimary @click="showContactForm = true">Contactanos</ButtonPrimary>
        <ContactForm :is-open="showContactForm" @close="showContactForm = false" />
    </DefaultSection>
</template>

<script setup>
import { ref } from 'vue'

const showContactForm = ref(false)
</script>