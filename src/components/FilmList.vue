<template>
    <div class="row q-col-gutter-md">
        <div v-for="film in films" :key="film.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
            <q-card class="product-card cursor-pointer" @click="$emit('edit', film.id)">
                <q-img :src="film.poster" :ratio="2 / 3" />
                <q-card-section>
                    <div class="text-subtitle1 text-weight-medium">
                        {{ film.title }}
                    </div>
                    <div class="text-caption text-grey-7">
                        {{ film.genre }} - {{ film.year }}
                    </div>
                </q-card-section>
                <q-card-section class="row items-center justify-between q-pt-none">
                    <div class="text-caption text-grey-8">
                        {{ film.director }}
                    </div>
                    <q-rating :model-value="film.rating" size="16px" color="amber" readonly />
                </q-card-section>
                <q-card-actions align="between">
                    <q-btn flat color="primary" icon="edit" label="Edit" @click.stop="$emit('edit', film.id)" />
                    <q-btn flat color="negative" icon="delete" label="Delete" @click.stop="$emit('delete', film.id)" />
                </q-card-actions>
            </q-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Film } from '@/store';

defineProps<{
    films: Film[];
}>();

defineEmits<{
    (e: 'edit', id: number): void;
    (e: 'delete', id: number): void;
}>();
</script>

<style scoped>
.product-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(32, 66, 214, 0.2);
}
</style>
