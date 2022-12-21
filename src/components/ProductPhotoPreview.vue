<template>
  <div class="flex items-center justify-center h-full">
    <div class="bg-white shadow-2xl p-6 rounded-2xl border-2 border-gray-50">
      <div class="flex flex-col">
        <div class="my-6">
          <div class="flex flex-row space-x-4 items-center">
            <div id="temp">
              <img :src="store" alt="image" />
            </div>
          </div>
        </div>
        <div
          class="w-full place-items-end text-right border-t-2 border-gray-100 mt-2"
        >
          <button
            @click="closePreview"
            class="text-indigo-600 text-xs font-medium"
          >
            close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '../stores/useProduct';

const store = useProductStore();

const emit = defineEmits(['close-preview']);
function closePreview() {
  emit('close-preview');
}
</script>
