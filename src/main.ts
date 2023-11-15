import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { VueFire, VueFireAuth } from 'vuefire'
import App from './App.vue'
import router from './router'

import { firebaseApp } from './firebase'

import './assets/main.css'
import './assets/tailwind.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})
app.use(autoAnimatePlugin)

app.mount('#app')
