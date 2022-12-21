<template>
  <div class="bg-white dark:bg-gray-900">
    <div class="flex justify-center h-screen">
      <div
        class="hidden bg-cover lg:block lg:w-2/3"
        style="
          background-image: url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80);
        "
      >
        <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 class="text-4xl font-bold text-white">Brand</h2>

            <p class="max-w-xl mt-3 text-gray-300">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem
              ipsa, nulla laboriosam dolores, repellendus perferendis libero
              suscipit nam temporibus molestiae
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div class="flex-1">
          <div class="text-center">
            <h2
              class="text-4xl font-bold text-center text-gray-700 dark:text-white"
            >
              Brand
            </h2>

            <p class="mt-3 text-gray-500 dark:text-gray-300">
              Sign up and access your account
            </p>
            <p class="text-red-500 mt-4" v-if="isAnyError">{{ errMsg }}</p>
          </div>

          <div class="mt-8">
            <form @submit.prevent="handleSubmit">
              <div class="flex gap-5">
                <div>
                  <label
                    for="firstName"
                    class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >First Name</label
                  >
                  <input
                    type="firstName"
                    v-model="firstName"
                    id="firstName"
                    placeholder="First Name"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label
                    for="lastName"
                    class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >Last Name</label
                  >
                  <input
                    type="lastName"
                    v-model="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>
              <div class="mt-6">
                <label
                  for="email"
                  class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >Email Address</label
                >
                <input
                  type="email"
                  v-model="email"
                  id="email"
                  placeholder="example@example.com"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div class="mt-6">
                <label
                  for="password"
                  class="text-sm text-gray-600 dark:text-gray-200"
                  >Password</label
                >

                <input
                  type="password"
                  v-model="password"
                  id="password"
                  placeholder="Your Password"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div class="mt-6">
                <label
                  for="cPassword"
                  class="text-sm text-gray-600 dark:text-gray-200"
                  >Confirm Password</label
                >

                <input
                  type="password"
                  v-model="cPassword"
                  id="cPassword"
                  placeholder="Confirm Your Password"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div class="mt-6">
                <button
                  class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p class="mt-6 text-sm text-center text-gray-400">
              Already have an account?
              <router-link
                to="/login"
                class="text-blue-500 focus:outline-none focus:underline hover:underline"
                >Sign in</router-link
              >.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/useAuth';
import { getAuth } from 'firebase/auth';
import { onMounted } from '@vue/runtime-core';

const storeAuth = useAuthStore();
const router = useRouter();

const email = ref('');
const firstName = ref('');
const lastName = ref('');
const password = ref('');
const cPassword = ref('');
const isAnyError = ref(null);
const errMsg = ref(null);

const handleSubmit = async () => {
  try {
    if (
      !email.value ||
      !firstName.value ||
      !lastName.value ||
      !password.value ||
      !cPassword.value
    ) {
      isAnyError.value = true;
      errMsg.value = 'Please fill all the fields';
      setTimeout(() => {
        isAnyError.value = null;
        errMsg.value = null;
      }, 5000);
    } else if (password.value !== cPassword.value) {
      isAnyError.value = true;
      errMsg.value = 'Password do not match!';
      setTimeout(() => {
        isAnyError.value = null;
        errMsg.value = null;
      }, 5000);
    } else {
      await storeAuth.register({
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
      });
      router.push({ name: 'Home' });
    }
  } catch (error) {
    isAnyError.value = true;
    errMsg.value = error.message;
    setTimeout(() => {
      isAnyError.value = null;
      errMsg.value = null;
    }, 5000);
  }
};

// onMounted(() => {
//   if (getAuth().currentUser) {
//     router.push({ name: 'Home' });
//   }
// });
</script>
