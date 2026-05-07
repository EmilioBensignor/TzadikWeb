<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Schema.org global: 5 sucursales como LocalBusiness independientes (cada una
// con @id único), asociadas a la Organization declarada en nuxt.config.ts.
useSchemaOrg([
  defineLocalBusiness({
    '@id': 'https://www.tzadik.com.ar/#sucursal-resistencia',
    name: 'Tzadik - Casa Central Resistencia',
    address: {
      streetAddress: 'Ruta N 11 - Km 1006.2',
      addressLocality: 'Resistencia',
      addressRegion: 'Chaco',
      addressCountry: 'AR'
    },
    geo: { latitude: -27.418540879713515, longitude: -59.11149044705953 },
    telephone: '+5493624130496',
    openingHours: ['Mo-Fr 09:00-18:00']
  }),
  defineLocalBusiness({
    '@id': 'https://www.tzadik.com.ar/#sucursal-corrientes',
    name: 'Tzadik - Sucursal Corrientes',
    address: {
      addressLocality: 'Corrientes',
      addressRegion: 'Corrientes',
      addressCountry: 'AR'
    },
    geo: { latitude: -27.4697, longitude: -58.8306 },
    telephone: '+5493764229506',
    openingHours: ['Mo-Fr 09:00-18:00']
  }),
  defineLocalBusiness({
    '@id': 'https://www.tzadik.com.ar/#sucursal-saenz-pena',
    name: 'Tzadik - Sucursal Sáenz Peña',
    address: {
      addressLocality: 'Presidencia Roque Sáenz Peña',
      addressRegion: 'Chaco',
      addressCountry: 'AR'
    },
    geo: { latitude: -26.7854, longitude: -60.4389 },
    telephone: '+5493644222208',
    openingHours: ['Mo-Fr 09:00-18:00']
  }),
  defineLocalBusiness({
    '@id': 'https://www.tzadik.com.ar/#sucursal-villa-angela',
    name: 'Tzadik - Sucursal Villa Ángela',
    address: {
      addressLocality: 'Villa Ángela',
      addressRegion: 'Chaco',
      addressCountry: 'AR'
    },
    geo: { latitude: -27.5713, longitude: -60.7143 },
    telephone: '+5493735449730',
    openingHours: ['Mo-Fr 09:00-18:00']
  }),
  defineLocalBusiness({
    '@id': 'https://www.tzadik.com.ar/#sucursal-posadas',
    name: 'Tzadik - Sucursal Posadas',
    address: {
      addressLocality: 'Posadas',
      addressRegion: 'Misiones',
      addressCountry: 'AR'
    },
    geo: { latitude: -27.3621, longitude: -55.9006 },
    telephone: '+5493764651520',
    openingHours: ['Mo-Fr 09:00-18:00']
  })
])
</script>
