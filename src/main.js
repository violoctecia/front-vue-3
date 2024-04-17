import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import axios from 'axios';

const app = createApp(App);

// Глобальное событие для обновления количества товаров в корзине
app.config.globalProperties.$updateCartItemCount = new Event('updateCartItemCount');

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

app.use(router).mount('#app');
