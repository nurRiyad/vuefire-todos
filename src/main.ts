import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './firebase';

import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

import './assets/main.css';
import './assets/tailwind.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});
app.use(autoAnimatePlugin);

app.mount('#app');
