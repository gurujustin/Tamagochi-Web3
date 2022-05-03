import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import TheLoader from './components/TheLoader.vue';

const app = createApp(App);

app.use(store);
app.use(router);

app.component('the-header', TheHeader);
app.component('the-footer', TheFooter);
app.component('the-loader', TheLoader);

app.mount('#app');
