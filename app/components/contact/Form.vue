<template>
    <Transition enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="isOpen" class="flex items-center justify-center fixed inset-0 z-50 bg-dark/60 p-5"
            @click="closeModal">
            <div class="w-full max-w-md flex flex-col gap-6 relative bg-light rounded-[20px] p-4 transition-transform duration-300 ease-out transform"
                :class="isOpen ? 'scale-100' : 'scale-80'" @click.stop>
                <button @click="closeModal"
                    class="w-6 h-6 flex justify-center items-center absolute top-4 right-4 text-primary">
                    <Icon name="tabler:plus" class="w-6 h-6 rotate-45 flex-shrink-0" />
                </button>

                <HeadingH2 class="!text-left text-xl">
                    ¡Dejá tus datos y nos pondremos en contacto!
                </HeadingH2>

                <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
                    <div class="flex flex-col gap-1">
                        <label for="nombre" class="text-xs font-medium text-dark">
                            Nombre
                        </label>
                        <input type="text" id="nombre" v-model="form.nombre" placeholder="Ingresá su nombre"
                            class="w-full bg-transparent border border-primary rounded-md text-xs text-dark placeholder:text-xs placeholder:text-gray-dark outline-none p-2"
                            required>
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="email" class="text-xs font-medium text-dark">
                            Correo electrónico
                        </label>
                        <input type="email" id="email" v-model="form.email" placeholder="Ingresá su correo electrónico"
                            class="w-full bg-transparent border border-primary rounded-md text-xs text-dark placeholder:text-xs placeholder:text-gray-dark outline-none p-2"
                            required>
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="telefono" class="text-xs font-medium text-dark">
                            Número de teléfono
                        </label>
                        <div class="flex gap-2">
                            <input type="text" v-model="form.prefijo" placeholder="Prefijo"
                                class="w-14 bg-transparent border border-primary rounded-md text-xs text-dark placeholder:text-xs placeholder:text-gray-dark outline-none p-2">
                            <input type="tel" id="telefono" v-model="form.telefono"
                                placeholder="Ingresá su número de teléfono"
                                class="flex-1 bg-transparent border border-primary rounded-md text-xs text-dark placeholder:text-xs placeholder:text-gray-dark outline-none p-2"
                                required>
                        </div>
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="mensaje" class="text-xs font-medium text-dark">
                            Mensaje
                        </label>
                        <textarea id="mensaje" v-model="form.mensaje" placeholder="Ingresá su mensaje" rows="4"
                            class="w-full bg-transparent border border-primary rounded-md text-xs text-dark placeholder:text-xs placeholder:text-gray-dark outline-none p-2 resize-none"></textarea>
                    </div>

                    <ButtonPrimary type="submit" class="mt-3">
                        Enviar mensaje
                    </ButtonPrimary>
                </form>
            </div>
        </div>
    </Transition>
</template>

<script setup>
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close'])

const form = reactive({
    nombre: '',
    email: '',
    prefijo: '',
    telefono: '',
    mensaje: ''
})

const closeModal = () => {
    emit('close')
}

const handleSubmit = () => {
    console.log('Formulario enviado:', form)


    form.reset()

    closeModal()
}
</script>