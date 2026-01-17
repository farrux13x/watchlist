<template>
    <div class="row items-center q-col-gutter-md">
        <div class="col-12 col-md-7">
            <q-input v-model="localValue" filled dense debounce="250" clearable
                placeholder="Search films, genres, or directors" aria-label="Search films">
                <template #prepend>
                    <q-icon name="search" />
                </template>
            </q-input>
        </div>
        <div class="col-12 col-md-5 row items-center justify-between justify-md-end">
            <q-chip color="primary" text-color="white" icon="local_movies">
                {{ count }} films
            </q-chip>
            <q-btn color="primary" icon="add" label="Add film" class="q-ml-sm" @click="$emit('add')" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    modelValue: string;
    count: number;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'add'): void;
}>();

const localValue = computed({
    get: () => props.modelValue,
    set: (value: string) => emit('update:modelValue', value),
});
</script>
