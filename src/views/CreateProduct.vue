<template>
  <!-- component -->
  <div class="container mx-auto py-12">
    <!-- <ProductPhotoPreview v-show="imageUrl" /> -->
    <form
      @submit.prevent="uploadProduct"
      class="flex flex-col w-full p-10 px-8 pt-6 mx-auto my-6 mb-4 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-1/2"
    >
      <div class="relative mt-4">
        <label
          for="dropzone-file"
          class="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          <h2 class="mt-4 text-xl font-medium text-gray-700 tracking-wide">
            File gambar
          </h2>

          <p class="mt-2 text-gray-500 tracking-wide">
            Upload or darg & drop your file PNG, JPG or JPEG.
          </p>

          <input
            id="dropzone-file"
            ref="file"
            type="file"
            class="hidden"
            @change="fileChange"
            accept=".jpg, .png, .jpeg"
          />
        </label>
      </div>
      <div class="relative pt-4">
        <label for="name" class="text-base leading-7 text-blueGray-500"
          >Nama Barang</label
        >
        <input
          type="text"
          id="name"
          v-model="title"
          placeholder="name"
          class="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
        />
      </div>
      <div class="relative pt-4">
        <label for="number" class="text-base leading-7 text-blueGray-500"
          >Harga Barang</label
        >
        <input
          type="number"
          id="number"
          v-model="price"
          placeholder="Harga"
          class="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
        />
      </div>

      <div class="relative pt-4">
        <label for="categories" class="text-base leading-7 text-blueGray-500"
          >Kategori Barang</label
        >
        <input
          type="text"
          id="categories"
          v-model="tempCategories"
          @keyup.ctrl="addCategories"
          placeholder="Kategori"
          class="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
        />
        <div class="flex my-2">
          <p
            v-for="category in categories"
            :key="category"
            class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
          >
            {{ category }}
          </p>
        </div>
        <p
          id="helper-text-explanation"
          class="mt-2 text-sm text-gray-500 dark:text-gray-400"
        >
          Pencet
          <span
            class="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            tombol "ctrl" + koma(,)</span
          >
          jika ingin memasukkan kategori baru.
        </p>
      </div>

      <!-- <div class="relative mt-4">
        <label for="name" class="text-base leading-7 text-blueGray-500"
          ></label
        >
        <select
          class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
        >
          <option>Surabaya</option>
          <option>Bandung</option>
          <option>jakarta</option>
        </select>
      </div> -->
      <div class="flex flex-wrap mt-4 mb-6 -mx-3">
        <div class="w-full px-3">
          <label class="text-base leading-7 text-blueGray-500" for="description"
            >Deskripsi Barang
          </label>
          <textarea
            class="w-full h-32 px-4 py-2 mt-2 text-base text-blueGray-500 transition duration-500 ease-in-out transform bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 apearance-none autoexpand"
            id="description"
            type="text"
            v-model="desc"
            placeholder="Message..."
            required=""
          ></textarea>
        </div>
      </div>

      <div class="flex items-center w-full pt-4 mb-4">
        <button
          type="submit"
          class="w-full py-3 text-base text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800"
        >
          Upload your product
        </button>
      </div>
      <hr class="my-4 border-gray-200" />
      <span
        class="px-4 py-1 mx-auto -mt-8 text-xs text-black transition duration-500 ease-in-out transform bg-gray-200 rounded-lg"
        >Or continue with
      </span>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useProductStore } from '../stores/useProduct';
import ProductPhotoPreview from '../components/ProductPhotoPreview.vue';
import { mapActions, mapWritableState } from 'pinia';

export default {
  data() {
    return {
      fileName: null,
      image: null,
      imageUrl: null,
      title: '',
      price: '',
      desc: '',
      tempCategories: '',
      categories: [],
      showPreview: false,
    };
  },
  components: {
    ProductPhotoPreview,
  },
  methods: {
    ...mapActions(useProductStore, ['addProduct']),
    ...mapWritableState(useProductStore, [
      'productPhotoName',
      'productPhotoFileUrl',
    ]),
    fileChange(e) {
      const file = e.target.files[0];
      this.fileName = file.name;
      this.image = file;
      this.imageUrl = URL.createObjectURL(file);
    },
    addCategories(e) {
      if (e.key === ',' && this.tempCategories) {
        if (!this.categories.includes(this.tempCategories)) {
          this.categories.push(this.tempCategories);
        }
        this.tempCategories = '';
      }
    },
    async uploadProduct() {
      const upload = await this.addProduct({
        title: this.title,
        price: this.price,
        desc: this.desc,
        categories: this.categories,
        productPhotoName: this.fileName,
        productPhoto: this.image,
      });
      if (upload) {
        this.$refs.file = '';
        this.title = '';
        this.price = '';
        this.desc = '';
      }
    },
    toggleModal() {
      this.showPreview = !this.showPreview;
    },
  },
  setup() {
    const storeProduct = useProductStore();

    return { storeProduct };
  },
};
</script>
