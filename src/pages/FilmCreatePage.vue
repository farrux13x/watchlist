<template>
    <div class="market-page">
        <q-toolbar class="market-header text-white q-px-md q-py-sm">
            <q-btn flat round icon="arrow_back" aria-label="Back" @click="goBack" />
            <q-toolbar-title>Add Film</q-toolbar-title>
        </q-toolbar>

        <div class="q-pa-md">
            <FilmForm v-model="form" submit-label="Save film" @submit="submit" @cancel="goBack" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFilmStore } from '@/store';
import FilmForm from '@components/FilmForm.vue';

const router = useRouter();
const filmStore = useFilmStore();

const form = ref({
    title: '',
    genre: '',
    year: new Date().getFullYear(),
    director: '',
    rating: 3,
    poster: '',
});

const submit = () => {
    filmStore.addFilm({
        title: form.value.title,
        genre: form.value.genre,
        year: form.value.year,
        director: form.value.director,
        rating: form.value.rating,
        poster: form.value.poster || 'https://cdn.quasar.dev/img/mountains.jpg',
    });
    router.push('/');
};

const goBack = () => {
    router.push('/');
};
</script>

<style scoped>
.market-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #f2f7ff 0%, #ffffff 45%, #f6f8f7 100%);
}

.market-header {
    background: linear-gradient(100deg, #2042d6 0%, #1fb6a6 100%);
}
</style>
