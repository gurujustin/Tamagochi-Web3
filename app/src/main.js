import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import BaseLoader from './components/BaseLoader.vue';

const app = createApp(App);

app.use(store);
app.use(router);

app.component('base-loader', BaseLoader);

app.mount('#app');
