import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './firebase';

import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { createHead } from '@vueuse/head';

import './assets/main.css';
import './assets/tailwind.css';

const head = createHead();
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});
app.use(head);
app.use(autoAnimatePlugin);

app.mount('#app');
