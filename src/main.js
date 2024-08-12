import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import LoadingModal from '@/components/common/LoadingModal.vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { RiMouseLine, RiMouseFill, BiPersonCircle } from 'oh-vue-icons/icons';

addIcons(RiMouseLine, RiMouseFill, BiPersonCircle);

const app = createApp(App);
const pinia = createPinia();

app.component('LoadingModal', LoadingModal).component('v-icon', OhVueIcon).use(router).use(pinia);

app.mount('#app');
