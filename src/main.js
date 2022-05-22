import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import globalComponents from '@/plugins/globalComponents';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(globalComponents);

app.mount('#app');
