import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/router';
import App from './App.vue';

import { Quasar } from 'quasar'

import '@quasar/extras/material-icons/material-icons.css'

import "quasar/src/css/index.sass";
import '@style/index.css';

const app = createApp(App);
const pinia = createPinia(); 

app.use(pinia); 
app.use(Quasar, {
    plugins: {}, 
});
app.use(router);
app.mount('#app');