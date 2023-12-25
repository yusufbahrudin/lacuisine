import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '772910927297-mu7hk0t4a6qikc5slb6og33ubt1s52dc.apps.googleusercontent.com'
})

app.mount('#app')
