import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {
  faUserCircle,
  faEye,
  faStar,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';

import App from './App.vue';
import router from './router';

import './assets/main.css';

let app;

library.add(
  faGoogle,
  faFacebook,
  faCartShopping,
  faUserCircle,
  faEye,
  faStar,
  faHeart
);

onAuthStateChanged(getAuth(), () => {
  if (!app) {
    createApp(App)
      .use(createPinia())
      .use(router)
      .component('font-awesome-icon', FontAwesomeIcon)
      .mount('#app');
  }
});
