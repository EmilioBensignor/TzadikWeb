<template>
    <div class="flex items-center gap-2">
        <input
            :id="id"
            type="checkbox"
            :value="value"
            :checked="checked"
            @change="$emit('update:checked', $event.target.checked)"
            class="w-4 h-4 border-2 border-primary rounded appearance-none cursor-pointer transition-all duration-200 hover:border-primaryHover checked:bg-primary checked:border-primary checked:hover:bg-primaryHover checked:hover:border-primaryHover"
        />
        <label :for="id" class="text-sm cursor-pointer">
            <slot>{{ label }}</slot>
        </label>
    </div>
</template>

<script setup>
defineProps({
    id: {
        type: String,
        required: true
    },
    value: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    checked: {
        type: Boolean,
        default: false
    }
})

defineEmits(['update:checked'])
</script>

<style scoped>
input[type="checkbox"]:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}
</style>