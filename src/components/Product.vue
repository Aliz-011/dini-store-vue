<template>
  <div
    class="flex flex-col min-w-full shadow-md cursor-pointer w-48 hover:-translate-y-1 duration-300"
  >
    <!-- Preview -->
    <div class="inline relative group h-48">
      <router-link
        :to="{ name: 'ProductDetails', params: { id: props.product.id } }"
      >
        <!-- Thumbnail -->
        <img
          class="absolute rounded-t object-cover hover:object-contain h-full w-full"
          :src="props.product.productImgUrl"
          alt="Product Preview"
        />

        <!-- Hover Bar -->
        <div
          class="flex flex-row absolute justify-end h-16 w-full bottom-0 px-3 space-x-2 bg-none opacity-0 group-hover:opacity-100 group-hover:bg-gradient-to-t from-black/20 via-gray-800/20 to-transparent transition-all ease-in-out duration-200 delay-100"
        >
          <!-- Add to Favorites Button -->
          <button
            class="bg-gray-50/10 rounded-full px-1 h-9 w-9 my-auto hover:bg-gray-50/20 transition-colors duration-200"
          >
            <font-awesome-icon
              icon="fa-regular fa-heart"
              class="text-xl text-gray-200 p-1 hover:text-white transition-all duration-200"
              title="Add to Favorites"
            />
          </button>
        </div>
      </router-link>
    </div>

    <!-- Body -->
    <div class="flex flex-col bg-white rounded-b p-3">
      <!-- Title -->
      <router-link
        :to="{ name: 'ProductDetails', params: { id: props.product.id } }"
      >
        <div
          class="text-sm font-semibold text-gray-900 hover:underline truncate"
        >
          {{ props.product.productTitle }}
        </div>

        <!-- Author - Category -->
        <div class="text-xxs text-gray-400 truncate mt-1">
          by

          <!-- Author -->
          <p class="font-semibold">EgoistDeveloper</p>
        </div>

        <!-- Price -->
        <div class="text-sm text-gray-600 font-bold mt-4 mb-1">
          Rp.{{ props.product.productPrice }}
        </div>
      </router-link>
      <!-- Body -->
      <div class="flex flex-row mt-2">
        <!-- Detail Column -->
        <div class="flex flex-col flex-auto">
          <!-- Rating -->
          <div class="flex flex-row group">
            <font-awesome-icon
              icon="fa-regular fa-star"
              title="Good"
              class="text-sm text-amber-400 hover:text-amber-500 transition-all duration-200"
            />

            <div class="text-xxs text-gray-400 ml-1 hover:underline">
              (45) reviews
            </div>
          </div>

          <div class="flex flex-row mt-2">
            <button
              @click="addToCart"
              class="flex w-full text-white justify-center items-center gap-3 text-xs px-3 my-auto py-2 mr-2 group bg-blue-500 hover:bg-blue-600 rounded-xss transition-all duration-200"
            >
              <!-- Icon -->
              <font-awesome-icon icon="fa-solid fa-cart-shopping" />
              <p class="font-semibold">Add to cart</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['product']);
</script>

<style>
.text-xxs {
  font-size: 0.7rem;
  line-height: 0.9rem;
}

.rounded-xss {
  border-radius: 2px !important;
}
</style>
