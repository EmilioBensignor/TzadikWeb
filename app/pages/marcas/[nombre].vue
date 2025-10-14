<template>
    <DefaultMain>
        <div v-if="marca" class="marca-container">
            <h1>{{ marca.nombre }}</h1>

            <div class="marca-image">
                <img :src="marca.img" :alt="marca.nombre" />
            </div>

            <div class="caracteristicas">
                <h2>Características</h2>
                <ul class="caracteristicas-list">
                    <li v-for="(caracteristica, index) in marca.caracteristicas" :key="index" class="caracteristica-item">
                        <Icon :name="caracteristica.icono" class="caracteristica-icon" />
                        <span>{{ caracteristica.texto }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>
            <h1>Marca no encontrada</h1>
        </div>
    </DefaultMain>
</template>

<script setup>
import marcas from '~/shared/marcas.js';

const route = useRoute();
const marca = computed(() => {
    return marcas.find(m => m.slug === route.params.nombre);
});
</script>

<style scoped>
.marca-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.marca-container h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
}

.marca-image {
    width: 100%;
    max-width: 600px;
    margin: 0 auto 3rem;
}

.marca-image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.caracteristicas h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
}

.caracteristicas-list {
    list-style: none;
    padding: 0;
    display: grid;
    gap: 1.5rem;
}

.caracteristica-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    transition: transform 0.2s;
}

.caracteristica-item:hover {
    transform: translateX(5px);
}

.caracteristica-icon {
    font-size: 1.5rem;
    color: #28a745;
    flex-shrink: 0;
}

.caracteristica-item span {
    font-size: 1rem;
    line-height: 1.5;
}
</style>