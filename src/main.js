import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

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

import 'primeicons/primeicons.css'

const app = createApp(App)
const pinia = createPinia()

app.use(ToastService)
app.use(ConfirmationService)

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
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
})

app.mount('#app')
