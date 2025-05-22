import { createApp } from "vue";
import { createPinia } from 'pinia';

import { i18n } from "./i18n.ts";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// 注册 Pinia
const pinia = createPinia();
app.use(pinia);
app.use(i18n);
app.mount('#app');