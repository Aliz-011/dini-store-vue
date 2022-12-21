<template>
  <div class="py-14 px-5 xl:px-12 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
    <div
      class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0"
    >
      <div
        class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full"
      >
        <p
          class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800"
        >
          Detail {{ product.productTitle }}
        </p>
        <div
          class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
        >
          <div class="pb-4 md:pb-8 h-full w-full md:w-40">
            <img
              class="w-full h-full object-cover hidden md:block"
              :src="product.productImgUrl"
              alt="dress"
            />
            <img
              class="w-full h-full object-cover md:hidden"
              :src="product.productImgUrl"
              alt="dress"
            />
          </div>
          <div
            class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0"
          >
            <div
              class="w-full flex flex-col justify-start items-start space-y-8"
            >
              <h3
                class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800"
              >
                {{ product.productTitle }}
              </h3>
              <div class="flex justify-start items-start flex-col space-y-2">
                <div
                  class="text-sm dark:text-white leading-none text-gray-800 font-bold"
                >
                  <span class="dark:text-gray-400 text-gray-600 font-normal"
                    >Kategori:
                  </span>
                  <div
                    class="inline-grid"
                    v-for="(kategori, index) in product.productCategories"
                    :key="kategori"
                  >
                    <p class="mr-1">{{ (index += 1) }}.{{ kategori }}</p>
                  </div>
                </div>
                <p
                  class="text-sm dark:text-white leading-none text-gray-800 font-bold"
                >
                  <span class="dark:text-gray-400 text-gray-600 font-normal"
                    >Deskripsi:
                  </span>
                  {{ product.productDesc }}
                </p>
                <p
                  class="text-sm dark:text-white leading-none text-gray-800 font-bold"
                >
                  <span class="dark:text-gray-400 text-gray-600 font-normal"
                    >Diunggah pada:
                  </span>
                  {{ new Date(product.date).toLocaleDateString() }}
                </p>
              </div>
            </div>
            <div class="flex justify-end flex-col items-end w-full">
              <p
                class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800"
              >
                Rp.{{ product.productPrice }}
              </p>
              <div class="flex justify-end space-x-2">
                <input
                  type="number"
                  v-model="quantity"
                  @change="addQty"
                  class="border px-2 w-1/5"
                />
                <div v-if="user">
                  <button
                    @click="handleClick"
                    class="flex text-white justify-center items-center gap-3 text-xs px-3 my-auto py-2 mr-2 group bg-blue-500 hover:bg-blue-600 rounded-xss transition-all duration-200"
                  >
                    <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                    <p class="font-semibold">Add to cart</p>
                  </button>
                </div>
                <div v-else>
                  <router-link
                    :to="{ name: 'Login' }"
                    class="flex text-white justify-center items-center gap-3 text-xs px-3 my-auto py-2 mr-2 group bg-blue-500 hover:bg-blue-600 rounded-xss transition-all duration-200"
                  >
                    <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                    <p class="font-semibold">Add to cart</p>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="errMsg">{{ errMsg }}</div>
      </div>

      <div
        class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col"
      >
        <h3
          class="text-xl dark:text-white font-semibold leading-5 text-gray-800"
        >
          Toko
        </h3>
        <div
          class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0"
        >
          <div class="flex flex-col justify-start items-start flex-shrink-0">
            <div
              class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200"
            >
              <img
                src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                alt="avatar"
              />
              <div class="flex justify-start items-start flex-col space-y-2">
                <router-link
                  :to="{ name: 'Profile', params: { id: product.userId } }"
                  class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800"
                >
                  {{ product.user.firstName + ' ' + product.user.lastName }}
                </router-link>
              </div>
            </div>

            <div
              class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 7L12 13L21 7"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p class="text-sm leading-5">
                {{ product.user.email }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useCartStore } from '../stores/useCart';
import { useAuthStore } from '../stores/useAuth';
import { useProductStore } from '../stores/useProduct';
import { useRouter } from 'vue-router';
import { ref } from '@vue/reactivity';

export default {
  data() {
    return {
      product: null,
      quantity: 1,
      errMsg: null,
    };
  },
  props: ['id'],
  methods: {
    ...mapActions(useProductStore, ['getProduct']),
    ...mapActions(useCartStore, ['addToCart']),
    addQty(e) {
      this.quantity = e.target.value;
    },
    fetchProducts() {
      this.getProduct(this.id)
        .then((item) => {
          this.product = item;
          console.log(item);
        })
        .catch((err) => (this.errMsg = err.message));
    },
    async handleClick() {
      try {
        let sum = 0;
        sum += this.product.productPrice * this.quantity;
        const cart = await this.addToCart({
          product: this.product,
          quantity: this.quantity,
          total: sum,
        });
        if (cart) {
          useRouter().push({ name: 'Home' });
          return;
        } else {
          this.errMsg = 'Could not add item to cart.';
          setTimeout(() => {
            this.errMsg = null;
          }, 5000);
        }
      } catch (error) {
        this.errMsg = error.message;
        setTimeout(() => {
          this.errMsg = null;
        }, 5000);
      }
    },
  },
  created() {
    this.fetchProducts();
  },
  setup() {
    const user = ref(null);
    const storeAuth = useAuthStore();

    user.value = storeAuth.getProfileId;

    return { user, storeAuth };
  },
};
</script>
