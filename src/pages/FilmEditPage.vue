<template>
    <div class="market-page">
        <q-toolbar class="market-header text-white q-px-md q-py-sm">
            <q-btn flat round icon="arrow_back" aria-label="Back" @click="goBack" />
            <q-toolbar-title>Edit Film</q-toolbar-title>
        </q-toolbar>

        <div class="q-pa-md">
            <q-banner v-if="missingFilm" class="bg-grey-2 text-grey-8">
                Film not found.
                <template #action>
                    <q-btn flat color="primary" label="Back to list" @click="goBack" />
                </template>
            </q-banner>

            <FilmForm v-else v-model="form" submit-label="Save changes" :show-delete="true"
                @submit="submit" @cancel="goBack" @delete="remove" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFilmStore } from '@/store';
import FilmForm from '@components/FilmForm.vue';

const route = useRoute();
const router = useRouter();
const filmStore = useFilmStore();

const filmId = Number(route.params.id);
const film = computed(() => (Number.isNaN(filmId) ? null : filmStore.getFilmById(filmId)));
const missingFilm = computed(() => !film.value);

const form = ref({
    title: '',
    genre: '',
    year: new Date().getFullYear(),
    director: '',
    rating: 3,
    poster: '',
});

watch(
    film,
    (value) => {
        if (!value) return;
        form.value = {
            title: value.title,
            genre: value.genre,
            year: value.year,
            director: value.director,
            rating: value.rating,
            poster: value.poster,
        };
    },
    { immediate: true }
);

const submit = () => {
    if (!film.value) return;
    filmStore.updateFilm(filmId, {
        title: form.value.title,
        genre: form.value.genre,
        year: form.value.year,
        director: form.value.director,
        rating: form.value.rating,
        poster: form.value.poster || 'https://cdn.quasar.dev/img/mountains.jpg',
    });
    router.push('/');
};

const remove = () => {
    if (!film.value) return;
    if (!window.confirm(`Delete "${film.value.title}"?`)) return;
    filmStore.deleteFilm(filmId);
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
