import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import NotFound from '../views/NotFound.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import CreateProduct from '../views/CreateProduct.vue';
import ProductDetails from '../views/ProductDetails.vue';

import { getAuth } from 'firebase/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Dashboard',
        description: 'Index Page, Dashboard Page',
        requiresAuth: false,
      },
    },
    {
      path: '/create-product',
      name: 'CreateProduct',
      component: CreateProduct,
      meta: {
        title: 'CreateProduct',
        requiresAuth: true,
      },
    },
    {
      path: '/products/:id',
      name: 'ProductDetails',
      component: ProductDetails,
      props: true,
      meta: {
        title: 'Product Detail',
        requiresAuth: false,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login',
        requiresAuth: false,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: 'Register',
        requiresAuth: false,
      },
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        title: 'ForgotPassword',
        requiresAuth: false,
      },
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile,
      props: true,
      meta: {
        title: 'Profile',
        requiresAuth: false,
      },
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: 'Not Found',
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.state ? `${to.params.city}, ${to.params.state}` : to.meta.title
  } - Dini Store`;
  next();
});

router.beforeEach(async (to, from, next) => {
  let user = getAuth().currentUser;
  if (user) {
    let token = await user.getIdTokenResult();
  }
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      return next();
    }
    return next({ name: 'Home' });
  }
  return next();
});

export default router;
