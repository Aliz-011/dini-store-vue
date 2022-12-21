<template>
  <div
    class="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:items-center bg-gray-50 w-full h-full py-8 px-5 xl:px-12"
  >
    <div class="col-span-full">
      <h2 class="text-2xl font-semibold">For you</h2>
    </div>
    <Product
      v-for="(product, index) in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script>
import Product from './Product.vue';
import { useProductStore } from '../stores/useProduct';
import { mapActions } from 'pinia';

export default {
  data() {
    return {
      products: [],
    };
  },
  components: { Product },
  methods: {
    ...mapActions(useProductStore, ['getProducts']),
    async fetchProducts() {
      const data = await this.getProducts();
      this.products = data;
    },
  },
  async created() {
    await this.fetchProducts();
  },
};
</script>
