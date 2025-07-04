import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import LoadingModal from '@/components/common/LoadingModal.vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  RiMouseLine,
  RiMouseFill,
  BiPersonCircle,
  RiErrorWarningFill,
  BiCheckAll,
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  RiNumber5,
  RiNumber6,
  RiNumber7,
  RiNumber8,
  RiNumber9
} from 'oh-vue-icons/icons';

addIcons(
  RiMouseLine,
  RiMouseFill,
  BiPersonCircle,
  RiErrorWarningFill,
  BiCheckAll,
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  RiNumber5,
  RiNumber6,
  RiNumber7,
  RiNumber8,
  RiNumber9
);

const app = createApp(App);
const pinia = createPinia();

app.component('LoadingModal', LoadingModal).component('v-icon', OhVueIcon).use(router).use(pinia);

app.mount('#app');
