<template>
  <div
    class="w-full h-full z-50 bg-black dark:bg-gray-900 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
    id="chec-div"
  >
    <div
      class="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
      id="checkout"
    >
      <div
        class="flex items-end lg:flex-row flex-col justify-end relative"
        id="cart"
      >
        <div
          v-if="status"
          class="p-4 text-sm absolute top-10 right-10 text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span class="font-medium">Success bayar!</span> {{ statusMsg }}
        </div>
        <div
          class="lg:w-1/2 md:w-8/12 w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-white dark:bg-gray-800 overflow-y-hidden overflow-x-hidden lg:h-screen h-auto"
          id="scroll"
        >
          <div
            class="flex items-center text-gray-500 hover:text-gray-600 dark:text-white"
          >
            <svg
              @click="closeModal"
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-chevron-left cursor-pointer"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="15 6 9 12 15 18" />
            </svg>

            <p
              class="text-sm leading-none dark:hover:text-gray-200 cursor-pointer"
            >
              My Cart({{ carts.length }})
            </p>
          </div>

          <!-- Product item goes here -->
          <div v-if="carts.length > 0">
            <div
              class="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50"
              v-for="(item, index) in carts"
              :key="index"
            >
              <div class="md:w-4/12 2xl:w-1/4 w-full">
                <img
                  :src="item.product.productImgUrl"
                  alt="Black Leather Purse"
                  class="h-full object-center object-cover md:block hidden"
                />
                <img
                  :src="item.product.productImgUrl"
                  alt="Black Leather Purse"
                  class="md:hidden w-full h-full object-center object-cover"
                />
              </div>
              <div
                class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-around"
              >
                <div class="flex items-center justify-between w-full">
                  <p
                    class="text-base font-black leading-none text-gray-800 dark:text-white"
                  >
                    {{ item.product.productTitle }}
                  </p>
                  <div
                    class="py-1 px-3 border border-gray-200 mr-6 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                  >
                    {{ item.quantity }}
                  </div>
                </div>
                <p class="text-xs leading-3 text-gray-600 dark:text-white pt-2">
                  Rp.{{ item.product.productPrice }}
                </p>

                <p class="w-96 text-xs leading-3 text-gray-600 dark:text-white">
                  {{ item.product.productDesc }}
                </p>
                <div class="flex items-center justify-between pt-5">
                  <div class="flex itemms-center">
                    <p
                      class="text-xs leading-3 underline text-gray-800 dark:text-white cursor-pointer"
                    >
                      Add to favorites
                    </p>
                    <button
                      @click="removeProduct(item.id)"
                      class="text-xs leading-3 hover:underline text-red-500 pl-5 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                  <p
                    class="text-base font-black leading-none text-gray-800 dark:text-white"
                  >
                    Rp. {{ item.total }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <div class="flex flex-col items-center h-full mt-40">
              <div class="w-full xl:w-2/3 relative h-full">
                <div class="relative">
                  <div class="absolute top-20">
                    <div class="">
                      <h1
                        class="my-2 text-gray-800 dark:text-white font-bold text-2xl"
                      >
                        Looks like you've found the doorway to the great nothing
                      </h1>
                      <p class="my-2 text-gray-800 dark:text-white">
                        Sorry about that! Please visit our hompage to get where
                        you need to go.
                      </p>
                    </div>
                  </div>
                  <!-- <div>
                    <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                  </div> -->
                </div>
              </div>
              <div>
                <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
              </div>
            </div>
          </div>
          <!-- end product item -->
        </div>

        <div
          class="lg:w-96 md:w-8/12 w-full bg-gray-100 dark:bg-gray-900 h-full"
        >
          <div
            class="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto"
          >
            <div>
              <p
                class="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white"
              >
                Summary
              </p>
              <div class="flex items-center justify-between pt-16">
                <p class="text-base leading-none text-gray-800 dark:text-white">
                  Subtotal
                </p>
                <p class="text-base leading-none text-gray-800 dark:text-white">
                  {{ total }}
                </p>
              </div>
              <div class="flex items-center justify-between pt-5">
                <p class="text-base leading-none text-gray-800 dark:text-white">
                  Shipping
                </p>
                <p
                  class="text-base leading-none text-gray-800 dark:text-white"
                ></p>
              </div>
              <div class="flex items-center justify-between pt-5">
                <p class="text-base leading-none text-gray-800 dark:text-white">
                  Tax
                </p>
                <p
                  class="text-base leading-none text-gray-800 dark:text-white"
                ></p>
              </div>
            </div>
            <div>
              <div class="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                <p
                  class="text-2xl leading-normal text-gray-800 dark:text-white"
                >
                  Total
                </p>
                <p
                  class="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-white"
                >
                  {{ total }}
                </p>
              </div>
              <button
                @click="checkout"
                class="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useCartStore } from '../stores/useCart';
import { useAuthStore } from '../stores/useAuth';
import base64 from 'base-64';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      carts: [],
      productNameInCart: [],
      status: false,
      statusMsg: null,
      total: 0,
    };
  },
  props: ['id'],
  methods: {
    ...mapActions(useCartStore, ['getMyCart', 'deleteMyCartItem']),
    ...mapState(useAuthStore, [
      'profileFirstName',
      'profileLastName',
      'profileEmail',
    ]),
    closeModal() {
      this.$emit('close-modal');
    },
    async myCart() {
      const data = await this.getMyCart(this.id);
      this.carts = data;
      const nama = this.carts
        .map(({ ...product }) => ({
          ...product,
        }))
        .map((el) => el.product.productTitle);
      this.productNameInCart = nama;
      const sum = data.reduce((a, b) => a + b.total, 0);
      this.total = sum;
      return data;
    },
    async removeProduct(id) {
      const removing = await this.deleteMyCartItem(id);
      if (removing) {
        console.log(removing.msg);
        return;
      } else {
        console.log('bruh');
      }
    },
    async createToken() {
      const res = await fetch('http://localhost:3080/api/pesanan', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: base64.encode(
            import.meta.env.MIDTRANS_SERVER_KEY + ':'
          ),
        },
        body: JSON.stringify({
          transaction_details: {
            order_id:
              'dini-store-id-' + Math.round(new Date().getTime() / 1000),
            gross_amount: this.total,
          },
          item_details: {
            id: this.id,
            price: this.total,
            quantity: 1,
            name: this.productNameInCart.toString(),
          },
          customer_details: {
            first_name: this.profileFirstName,
            last_name: this.profileLastName,
            email: this.profileEmail,
          },
          enabled_payments: [
            'credit_card',
            'cimb_clicks',
            'bca_klikbca',
            'bca_klikpay',
            'bri_epay',
            'echannel',
            'permata_va',
            'bca_va',
            'bni_va',
            'bri_va',
            'other_va',
            'gopay',
            'indomaret',
            'danamon_online',
            'akulaku',
            'shopeepay',
            'kredivo',
            'uob_ezpay',
          ],
        }),
      });
      return res.json();
    },
    async checkout() {
      const data = await this.createToken();
      let tokenTransaction = data.token;
      snap.pay(tokenTransaction, {
        onSuccess: async function (result) {
          console.log(result);
          this.status = true;
          this.statusMsg = result;
          setTimeout(() => {
            this.status = false;
            this.statusMsg = null;
          }, 5000);
          useRouter().push({ name: 'Home' });
        },
        onPending: function (result) {
          alert(result.status_message);
        },
        onError: function (result) {
          console.log(result);
        },
        onClose: function () {
          alert('customer closed the popup without finishing the payment');
        },
      });
      // more code goes here
    },
  },
  created() {
    this.myCart();
  },
};
</script>

<style scoped>
/* width */
#scroll::-webkit-scrollbar {
  width: 1px;
}

/* Track */
#scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
#scroll::-webkit-scrollbar-thumb {
  background: rgb(133, 132, 132);
}
</style>
