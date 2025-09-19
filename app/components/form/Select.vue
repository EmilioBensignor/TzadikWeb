<template>
    <div class="relative">
        <button @click="isOpen = !isOpen" :class="[
            'flex items-center gap-2 text-xs font-bold bg-transparent border-none outline-none appearance-none transition-colors duration-200 cursor-pointer',
            selectClass
        ]">
            {{ selectedLabel }}
            <div class="w-6 h-6 flex justify-center items-center bg-primary rounded-full shadow-md shadow-dark/20 text-light">
                <Icon name="tabler:chevron-down" class="w-4 h-4 transition-transform duration-200"
                    :class="isOpen ? 'rotate-180' : ''" />
            </div>
        </button>

        <Transition enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 transform -translate-y-2" enter-to-class="opacity-100 transform translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 transform translate-y-0" leave-to-class="opacity-0 transform -translate-y-2">
            <div v-if="isOpen"
                class="absolute top-full mt-1 right-0 bg-light border border-gray-200 rounded-lg shadow-lg z-50 min-w-40">
                <button v-for="option in options" :key="option.value" @click="selectOption(option)"
                    class="w-full block text-left text-xs font-bold first:rounded-t-lg last:rounded-b-lg transition-colors duration-150 px-3 py-2 "
                    :class="{ 'text-primary': option.value === modelValue }">
                    {{ option.label }}
                </button>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    options: {
        type: Array,
        required: true,
        validator: (options) => {
            return options.every(option =>
                typeof option === 'object' &&
                'value' in option &&
                'label' in option
            )
        }
    },
    selectClass: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const selectedLabel = computed(() => {
    const selected = props.options.find(option => option.value === props.modelValue)
    return selected ? selected.label : ''
})

const selectOption = (option) => {
    emit('update:modelValue', option.value)
    isOpen.value = false
}

const handleClickOutside = (event) => {
    if (!event.target.closest('.relative')) {
        isOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>