<template>
    <div class="row justify-center q-mt-lg">
        <q-pagination v-model="localValue" :max="max" max-pages="8" boundary-numbers direction-links />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    modelValue: number;
    max: number;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
}>();

const localValue = computed({
    get: () => props.modelValue,
    set: (value: number) => emit('update:modelValue', value),
});
</script>
