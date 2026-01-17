import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export type Film = {
    id: number;
    title: string;
    genre: string;
    year: number;
    director: string;
    rating: number;
    poster: string;
    createdAt?: string;
    updatedAt?: string;
};

type WatchlistCreate = {
    title: string;
    genre: string;
    year: number;
    director: string;
    rating: number;
    poster: string;
};

type WatchlistUpdate = Partial<WatchlistCreate>;

type ApiError = {
    error?: string;
};

const apiBase = (import.meta.env.VITE_WATCHLIST_API_URL ?? '').replace(/\/$/, '');

const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
    const response = await fetch(`${apiBase}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers ?? {}),
        },
    });

    if (!response.ok) {
        let message = 'Request failed';
        try {
            const data = (await response.json()) as ApiError;
            if (data?.error) {
                message = data.error;
            }
        } catch {
            // keep default message
        }
        throw new Error(message);
    }

    return (await response.json()) as T;
};

export const useFilmStore = defineStore('film', () => {
    const films = ref<Film[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const filmCount = computed(() => films.value.length);

    const fetchFilms = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            films.value = await request<Film[]>('/api/watchlist');
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to load films';
        } finally {
            isLoading.value = false;
        }
    };

    const addFilm = async (film: WatchlistCreate) => {
        try {
            const created = await request<Film>('/api/watchlist', {
                method: 'POST',
                body: JSON.stringify(film),
            });
            films.value = [created, ...films.value];
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to add film';
        }
    };

    const updateFilm = async (id: number, updates: WatchlistUpdate) => {
        try {
            const updated = await request<Film>(`/api/watchlist/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updates),
            });
            const index = films.value.findIndex((film) => film.id === id);
            if (index !== -1) {
                films.value[index] = updated;
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to update film';
        }
    };

    const deleteFilm = async (id: number) => {
        try {
            await request<Film>(`/api/watchlist/${id}`, {
                method: 'DELETE',
            });
            films.value = films.value.filter((film) => film.id !== id);
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to delete film';
        }
    };

    const getFilmById = (id: number) => {
        return films.value.find((film) => film.id === id) ?? null;
    };

    void fetchFilms();

    return {
        films,
        filmCount,
        isLoading,
        error,
        fetchFilms,
        addFilm,
        updateFilm,
        deleteFilm,
        getFilmById,
    };
});
