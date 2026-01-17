<template>
    <q-card class="q-pa-md">
        <q-form ref="formRef" @submit.prevent="handleSubmit">
            <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                    <q-input v-model="model.title" label="Title" filled :rules="[rules.required]" />
                </div>
                <div class="col-12 col-md-6">
                    <q-input v-model="model.director" label="Director" filled :rules="[rules.required]" />
                </div>
                <div class="col-12 col-md-6">
                    <q-select v-model="model.genre" label="Genre" filled :options="genreOptions"
                        :rules="[rules.required]" />
                </div>
                <div class="col-12 col-md-3">
                    <q-input v-model.number="model.year" type="number" label="Year" filled :rules="yearRules" />
                </div>
                <div class="col-12 col-md-3">
                    <div class="text-caption text-grey-7 q-mb-xs">Rating</div>
                    <q-rating v-model="model.rating" size="20px" color="amber" />
                </div>
                <div class="col-12">
                    <q-input v-model="model.poster" label="Poster URL" filled
                        hint="Paste an image URL for the poster" />
                </div>
            </div>

            <div v-if="showDelete" class="row justify-between q-mt-md">
                <q-btn flat color="negative" icon="delete" :label="deleteLabel" @click="$emit('delete')" />
                <div class="row q-gutter-sm">
                    <q-btn flat label="Cancel" color="grey-7" @click="$emit('cancel')" />
                    <q-btn type="submit" color="primary" :label="submitLabel" />
                </div>
            </div>
            <div v-else class="row justify-end q-gutter-sm q-mt-md">
                <q-btn flat label="Cancel" color="grey-7" @click="$emit('cancel')" />
                <q-btn type="submit" color="primary" :label="submitLabel" />
            </div>
        </q-form>
    </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type FilmFormData = {
    title: string;
    genre: string;
    year: number;
    director: string;
    rating: number;
    poster: string;
};

const props = defineProps<{
    submitLabel: string;
    showDelete?: boolean;
    deleteLabel?: string;
}>();

const emit = defineEmits<{
    (e: 'submit'): void;
    (e: 'cancel'): void;
    (e: 'delete'): void;
}>();

const model = defineModel<FilmFormData>({ required: true });
const formRef = ref();

const genreOptions = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Thriller',
    'Western',
];

const rules = {
    required: (value: string) => !!value || 'Required',
};

const yearRules = [
    (value: number) => !!value || 'Required',
    (value: number) =>
        value >= 1900 && value <= new Date().getFullYear() + 1 || 'Enter a valid year',
];

const showDelete = props.showDelete ?? false;
const deleteLabel = props.deleteLabel ?? 'Delete';

const handleSubmit = async () => {
    const isValid = await formRef.value?.validate();
    if (isValid === false) return;
    emit('submit');
};
</script>
