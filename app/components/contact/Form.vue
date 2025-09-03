<template>
    <Transition enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="isOpen && !showConfirmation"
            class="flex items-center justify-center fixed inset-0 z-100 bg-dark/60 p-5" @click="closeModal">
            <div class="w-full max-w-md md:max-w-[40rem] flex flex-col gap-6 relative bg-light rounded-xl p-4 md:p-6 transition-transform duration-300 ease-out transform"
                :class="isOpen ? 'scale-100' : 'scale-80'" @click.stop>
                <button @click="closeModal"
                    class="w-6 h-6 flex justify-center items-center absolute top-4 md:top-6 right-4 md:right-6 text-primary">
                    <Icon name="tabler:plus" class="w-6 h-6 rotate-45 flex-shrink-0" />
                </button>

                <HeadingH2 class="!text-left text-xl">
                    ¡Dejá tus datos y nos pondremos en contacto!
                </HeadingH2>

                <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
                    <div class="flex flex-col md:flex-row gap-3 md:gap-4">
                        <div class="md:w-1/2 flex flex-col gap-1">
                            <label for="nombre" class="text-xs md:text-sm font-medium text-dark">
                                Nombre
                            </label>
                            <input type="text" id="nombre" v-model="form.nombre" placeholder="Ingrese su nombre"
                                class="w-full bg-transparent border rounded-md text-xs md:text-sm text-dark placeholder:text-xs md:placeholder:text-sm placeholder:text-gray-dark outline-none p-2"
                                :class="errors.nombre ? 'border-error' : 'border-primary'" required>
                            <ContactError v-if="errors.nombre">{{ errors.nombre }}</ContactError>
                        </div>

                        <div class="md:w-1/2 flex flex-col gap-1">
                            <label for="email" class="text-xs md:text-sm font-medium text-dark">
                                Correo electrónico
                            </label>
                            <input type="email" id="email" v-model="form.email"
                                placeholder="Ingrese su correo electrónico"
                                class="w-full bg-transparent border rounded-md text-xs md:text-sm text-dark placeholder:text-xs md:placeholder:text-sm placeholder:text-gray-dark outline-none p-2"
                                :class="errors.email ? 'border-error' : 'border-primary'" autocomplete="email" required>
                            <ContactError v-if="errors.email">{{ errors.email }}</ContactError>
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row gap-3 md:gap-4">
                        <div class="md:w-1/2 flex flex-col gap-1">
                            <label for="telefono" class="text-xs md:text-sm font-medium text-dark">
                                Número de teléfono
                            </label>
                            <label for="prefijo" class="sr-only">Prefijo</label>
                            <div class="flex gap-2">
                                <input type="text" id="prefijo" v-model="form.prefijo" placeholder="Prefijo"
                                    class="w-14 md:w-16 bg-transparent border border-primary rounded-md text-xs md:text-sm text-dark placeholder:text-xs md:placeholder:text-sm placeholder:text-gray-dark outline-none p-2">
                                <input type="tel" id="telefono" v-model="form.telefono"
                                    placeholder="Ingrese su número de teléfono"
                                    class="flex-1 bg-transparent border rounded-md text-xs md:text-sm text-dark placeholder:text-xs md:placeholder:text-sm placeholder:text-gray-dark outline-none p-2"
                                    :class="errors.telefono ? 'border-error' : 'border-primary'" required>
                            </div>
                            <ContactError v-if="errors.telefono">{{ errors.telefono }}</ContactError>
                        </div>

                        <div class="md:w-1/2 flex flex-col gap-1">
                            <label for="mensaje" class="text-xs md:text-sm font-medium text-dark">
                                Mensaje
                            </label>
                            <textarea id="mensaje" v-model="form.mensaje" placeholder="Ingrese su mensaje" rows="4"
                                class="w-full bg-transparent border border-primary rounded-md text-xs md:text-sm text-dark placeholder:text-xs md:placeholder:text-sm placeholder:text-gray-dark outline-none p-2 resize-none"></textarea>
                        </div>
                    </div>

                    <ButtonPrimary type="submit" class="md:self-end mt-3">
                        Enviar mensaje
                    </ButtonPrimary>
                </form>
            </div>
        </div>
    </Transition>

    <Transition enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="showConfirmation" class="flex items-center justify-center fixed inset-0 z-50 bg-dark/60 p-4"
            @click="closeConfirmation">
            <div class="w-full max-w-sm md:max-w-[40rem] flex flex-col gap-5 md:gap-6 relative bg-light rounded-xl transition-transform duration-300 ease-out transform p-4 md:p-6"
                :class="showConfirmation ? 'scale-100' : 'scale-80'" @click.stop>
                <button @click="closeConfirmation" class="absolute top-4 md:top-6 right-4 md:right-6">
                    <Icon name="tabler:plus" class="w-6 h-6 text-primary rotate-45" />
                </button>
                <p class="text-center font-teko text-xl md:text-2xl font-bold">
                    ¡Tus datos se enviaron correctamente!
                </p>
                <p class="text-center text-sm text-dark">
                    Nos pondremos en contacto con vos en la brevedad.
                </p>
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

const errors = reactive({
    nombre: '',
    email: '',
    telefono: ''
})

const showConfirmation = ref(false)

const closeModal = () => {
    emit('close')
}

const closeConfirmation = () => {
    showConfirmation.value = false
    closeModal()
}

const resetForm = () => {
    form.nombre = ''
    form.email = ''
    form.prefijo = ''
    form.telefono = ''
    form.mensaje = ''
}

const clearErrors = () => {
    errors.nombre = ''
    errors.email = ''
    errors.telefono = ''
}

const validateForm = () => {
    clearErrors()
    let isValid = true

    if (!form.nombre.trim()) {
        errors.nombre = 'El nombre es requerido'
        isValid = false
    } else if (form.nombre.trim().length < 2) {
        errors.nombre = 'El nombre debe tener al menos 2 caracteres'
        isValid = false
    }

    if (!form.email.trim()) {
        errors.email = 'El correo electrónico es requerido'
        isValid = false
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(form.email)) {
            errors.email = 'Ingrese un correo electrónico válido (ejemplo@dominio.com)'
            isValid = false
        }
    }

    if (!form.telefono.trim()) {
        errors.telefono = 'El número de teléfono es requerido'
        isValid = false
    } else if (!/^\d{6,15}$/.test(form.telefono.trim())) {
        errors.telefono = 'Ingrese un número de teléfono válido (6-15 dígitos)'
        isValid = false
    }

    return isValid
}

const handleSubmit = () => {
    if (!validateForm()) {
        return
    }

    console.log('Formulario enviado:', form)

    resetForm()
    clearErrors()
    showConfirmation.value = true
}
</script>