<template>
    <div class="market-page">
        <q-toolbar class="market-header text-white q-px-md q-py-sm">
            <q-toolbar-title>Film Watchlist</q-toolbar-title>
        </q-toolbar>

        <div class="q-pa-md">
            <FilmSearchBar v-model="search" :count="filteredFilms.length" @add="goToCreate" />

            <div v-if="filteredFilms.length === 0" class="q-mt-lg">
                <q-banner class="bg-grey-2 text-grey-8">
                    No films match your search. Try a different keyword.
                </q-banner>
            </div>

            <div v-else class="q-mt-md">
                <FilmList :films="pagedFilms" @edit="goToEdit" @delete="confirmDelete" />
            </div>

            <FilmPagination v-model="page" :max="pageCount" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useFilmStore } from '@/store';
import FilmList from '@/components/FilmList.vue';
import FilmPagination from '@/components/FilmPagination.vue';
import FilmSearchBar from '@/components/FilmSearchBar.vue';

const search = ref('');
const page = ref(1);
const pageSize = 8;

const router = useRouter();
const filmStore = useFilmStore();
const { films } = storeToRefs(filmStore);

const filteredFilms = computed(() => {
    const term = search.value.trim().toLowerCase();
    if (!term) return films.value;

    return films.value.filter((film) => {
        return (
            film.title.toLowerCase().includes(term) ||
            film.genre.toLowerCase().includes(term) ||
            film.director.toLowerCase().includes(term)
        );
    });
});

const pageCount = computed(() => {
    return Math.max(1, Math.ceil(filteredFilms.value.length / pageSize));
});

const pagedFilms = computed(() => {
    const start = (page.value - 1) * pageSize;
    return filteredFilms.value.slice(start, start + pageSize);
});

watch(search, () => {
    page.value = 1;
});

watch(filteredFilms, () => {
    if (page.value > pageCount.value) {
        page.value = pageCount.value;
    }
});

const goToEdit = (id: number) => {
    router.push(`/films/${id}`);
};

const goToCreate = () => {
    router.push('/films/new');
};

const confirmDelete = (id: number) => {
    const film = filmStore.getFilmById(id);
    const label = film ? `"${film.title}"` : 'this film';
    if (!window.confirm(`Delete ${label}?`)) return;
    filmStore.deleteFilm(id);
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
