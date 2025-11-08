// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Импорты компонентов PrimeVue
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'
import ProgressSpinner from 'primevue/progressspinner'
import Textarea from 'primevue/textarea'

import App from './App.vue'
import router from './router'

import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
const pinia = createPinia()

// Регистрируем сервисы
app.use(ToastService)
app.use(ConfirmationService)

// Регистрируем компоненты глобально
app.component('Card', Card)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Button', Button)
app.component('Divider', Divider)
app.component('Toast', Toast)
app.component('ConfirmDialog', ConfirmDialog)
app.component('ProgressSpinner', ProgressSpinner)
app.component('Textarea', Textarea)

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')

window.addEventListener('beforeunload', () => {
  console.log('⚠️ beforeunload triggered — страница реально перезагружается')
})
