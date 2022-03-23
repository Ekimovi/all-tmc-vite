import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
// import store from "./store";
import { Quasar } from "quasar";
import quasarLang from "quasar/lang/ru";

// Import icon libraries
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

const app = createApp(App);
app.use(createPinia());
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang,
});
app.mount("#app");
