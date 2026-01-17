import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export type Film = {
    id: number;
    title: string;
    genre: string;
    year: number;
    director: string;
    rating: number;
    poster: string;
};

const storageKey = 'film_watchlist';

const defaultFilms: Film[] = [
    {
        id: 1,
        title: 'Blue Horizon',
        genre: 'Drama',
        year: 2021,
        director: 'Lena Koh',
        rating: 4,
        poster: 'https://cdn.quasar.dev/img/parallax2.jpg',
    },
    {
        id: 2,
        title: 'Midnight Circuit',
        genre: 'Sci-Fi',
        year: 2023,
        director: 'Omar Voss',
        rating: 5,
        poster: 'https://cdn.quasar.dev/img/quasar.jpg',
    },
    {
        id: 3,
        title: 'Harbor Lights',
        genre: 'Romance',
        year: 2019,
        director: 'Mina Park',
        rating: 4,
        poster: 'https://cdn.quasar.dev/img/parallax1.jpg',
    },
    {
        id: 4,
        title: 'Echoes of Atlas',
        genre: 'Adventure',
        year: 2020,
        director: 'Ravi Sen',
        rating: 4,
        poster: 'https://cdn.quasar.dev/img/mountains.jpg',
    },
    {
        id: 5,
        title: 'Lunar Echo',
        genre: 'Thriller',
        year: 2022,
        director: 'Ava Quinn',
        rating: 5,
        poster: 'https://cdn.quasar.dev/img/parallax2.jpg',
    },
    {
        id: 6,
        title: 'The Last Signal',
        genre: 'Mystery',
        year: 2018,
        director: 'Hugo Reyes',
        rating: 4,
        poster: 'https://cdn.quasar.dev/img/quasar.jpg',
    },
    {
        id: 7,
        title: 'Cobalt City',
        genre: 'Crime',
        year: 2021,
        director: 'Sasha Lee',
        rating: 4,
        poster: 'https://cdn.quasar.dev/img/parallax1.jpg',
    },
    {
        id: 8,
        title: 'Hidden Orchard',
        genre: 'Family',
        year: 2017,
        director: 'Noah Ellis',
        rating: 4,
        poster: 'https://cdn.quasar.dev/img/mountains.jpg',
    },
    {
        id: 9,
        title: 'Amber Skyline',
        genre: 'Action',
        year: 2024,
        director: 'Priya Das',
        rating: 3,
        poster: 'https://cdn.quasar.dev/img/parallax2.jpg',
    },
    {
        id: 10,
        title: 'Silver Dust',
        genre: 'Western',
        year: 2016,
        director: 'Miles Carter',
        rating: 5,
        poster: 'https://cdn.quasar.dev/img/quasar.jpg',
    },
    {
        id: 11,
        title: 'Paper Moons',
        genre: 'Comedy',
        year: 2020,
        director: 'Zoe Lin',
        rating: 4,
        poster: 'https://cdn.quasar.dev/img/parallax1.jpg',
    },
    {
        id: 12,
        title: 'Wild Tide',
        genre: 'Documentary',
        year: 2019,
        director: 'Theo Vance',
        rating: 4,
        poster: 'https://cdn.quasar.dev/img/mountains.jpg',
    },
    {
        id: 13,
        title: 'Sunrise Lines',
        genre: 'Drama',
        year: 2022,
        director: 'Iris Bell',
        rating: 4,
        poster: 'https://cdn.quasar.dev/img/parallax2.jpg',
    },
    {
        id: 14,
        title: 'Glass Reef',
        genre: 'Fantasy',
        year: 2021,
        director: 'Eli Monroe',
        rating: 4,
        poster: 'https://cdn.quasar.dev/img/quasar.jpg',
    },
    {
        id: 15,
        title: 'Neon Harbor',
        genre: 'Noir',
        year: 2018,
        director: 'Carla Yates',
        rating: 5,
        poster: 'https://cdn.quasar.dev/img/parallax1.jpg',
    },
    {
        id: 16,
        title: 'Starlit Road',
        genre: 'Road',
        year: 2017,
        director: 'Jonas Pike',
        rating: 4,
        poster: 'https://cdn.quasar.dev/img/mountains.jpg',
    },
    {
        id: 17,
        title: 'Crimson Vale',
        genre: 'Horror',
        year: 2023,
        director: 'Nina Drax',
        rating: 4,
        poster: 'https://cdn.quasar.dev/img/parallax2.jpg',
    },
    {
        id: 18,
        title: 'Riverstone',
        genre: 'Drama',
        year: 2020,
        director: 'Caleb Rhys',
        rating: 5,
        poster: 'https://cdn.quasar.dev/img/quasar.jpg',
    },
    {
        id: 19,
        title: 'Aurora Bloom',
        genre: 'Animation',
        year: 2019,
        director: 'Yuki Amano',
        rating: 4,
        poster: 'https://cdn.quasar.dev/img/parallax1.jpg',
    },
    {
        id: 20,
        title: 'Terminal 7',
        genre: 'Action',
        year: 2022,
        director: 'Marco Ellis',
        rating: 4,
        poster: 'https://cdn.quasar.dev/img/mountains.jpg',
    },
];

const loadFilms = (): Film[] => {
    if (typeof localStorage === 'undefined') {
        return [...defaultFilms];
    }

    const stored = localStorage.getItem(storageKey);
    if (!stored) {
        return [...defaultFilms];
    }

    try {
        const parsed = JSON.parse(stored) as Film[];
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...defaultFilms];
    } catch {
        return [...defaultFilms];
    }
};

export const useFilmStore = defineStore('film', () => {
    const films = ref<Film[]>(loadFilms());

    const filmCount = computed(() => films.value.length);

    const addFilm = (film: Omit<Film, 'id'>) => {
        const id = Date.now();
        films.value.unshift({ id, ...film });
    };

    const updateFilm = (id: number, updates: Partial<Omit<Film, 'id'>>) => {
        const index = films.value.findIndex((film) => film.id === id);
        if (index === -1) return;
        films.value[index] = { ...films.value[index], ...updates };
    };

    const deleteFilm = (id: number) => {
        films.value = films.value.filter((film) => film.id !== id);
    };

    const getFilmById = (id: number) => {
        return films.value.find((film) => film.id === id) ?? null;
    };

    watch(
        films,
        (value) => {
            if (typeof localStorage === 'undefined') return;
            localStorage.setItem(storageKey, JSON.stringify(value));
        },
        { deep: true }
    );

    return {
        films,
        filmCount,
        addFilm,
        updateFilm,
        deleteFilm,
        getFilmById,
    };
});
