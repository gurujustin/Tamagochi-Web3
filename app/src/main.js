import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import TheHeader from './components/TheHeader.vue';

const app = createApp(App);

app.use(store);
app.use(router);

app.component('the-header', TheHeader);

app.mount('#app');
