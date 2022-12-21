<template>
  <div class="flex flex-wrap">
    <section class="relative mx-auto">
      <!-- navbar -->
      <nav class="flex justify-between shadow w-screen">
        <div class="px-5 xl:px-12 py-3 flex w-full items-center">
          <!-- Nav Links -->
          <router-link
            class="text-xl font-bold font-heading"
            :to="{ name: 'Home' }"
          >
            <!-- <img class="h-9" src="logo.png" alt="logo"> -->
            dini<span class="text-cyan-300">store.</span>
          </router-link>
          <input
            type="text"
            placeholder="Search Here..."
            class="py-2 px-4 w-1/2 rounded-full border ml-5 shadow font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-200 duration-100 shadow-gray-100"
          />
          <!-- Header Icons -->
          <div class="hidden xl:flex items-center ml-auto">
            <div
              class="flex items-center hover:text-gray-500 cursor-pointer mr-4"
            >
              <font-awesome-icon
                icon="fa-regular fa-heart"
                class="text-xl transition-all duration-200"
                title="Add to Favorites"
              />
              <span class="flex absolute -mt-5 ml-4">
                <span
                  class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"
                >
                </span>
              </span>
            </div>
            <div
              class="flex items-center hover:text-gray-500 cursor-pointer mr-4"
              @click="toggleModal"
            >
              <font-awesome-icon icon="fa-solid fa-cart-shopping" />
              <span class="flex absolute -mt-5 ml-4">
                <span
                  class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"
                >
                </span>
              </span>
            </div>
            <!-- Sign In / Register      -->
            <div v-if="storeAuth.user" class="flex gap-3">
              <router-link
                :to="{ name: 'Profile', params: { id: storeAuth.profileId } }"
                class="border-[1px] py-2 px-[10px] cursor-pointer font-semibold border-gray-500 rounded-full"
              >
                {{ storeAuth.profileInitials }}
              </router-link>
              <button @click="logout" class="font-semibold hover:underline">
                Logout
                <!-- <font-awesome-icon icon="fa-regular fa-circle-user" /> -->
              </button>
            </div>
            <div v-if="!storeAuth.user">
              <router-link
                :to="{ name: 'Login' }"
                class="font-semibold hover:underline"
              >
                Login
                <!-- <font-awesome-icon icon="fa-regular fa-circle-user" /> -->
              </router-link>
            </div>
          </div>
        </div>
        <!-- Responsive navbar -->
        <a class="xl:hidden flex mr-6 items-center" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 hover:text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span class="flex absolute -mt-5 ml-3">
            <span
              class="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-pink-400 opacity-75"
            ></span>
            <span
              class="relative text-white inline-flex rounded-full h-5 w-5 bg-pink-500"
            >
            </span>
          </span>
        </a>
      </nav>
    </section>
    <CartModal
      v-if="showModal"
      @close-modal="toggleModal"
      :id="storeAuth.getProfileId"
    />
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import CartModal from './CartModal.vue';
import { useAuthStore } from '../stores/useAuth';
import { onUpdated } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

const storeAuth = useAuthStore();
const showModal = ref(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const logout = () => {
  storeAuth.logout();
  useRouter().back();
};
</script>
