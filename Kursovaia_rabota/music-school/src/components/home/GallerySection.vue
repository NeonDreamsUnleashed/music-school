<template>
  <section class="py-20 px-4 relative">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400 custom-font">
        Наша галерея
      </h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(photo, index) in photos" 
          :key="index"
          class="group relative overflow-hidden rounded-xl shadow-2xl cursor-pointer h-64"
          @click="openModal(index)"
        >
          <img
            :src="photo"
            :alt="'Фото ' + (index + 1)"
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>
    </div>

    <div 
      v-if="showModal" 
      class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      @click.self="closeModal"
    >
      <div class="relative max-w-4xl w-full">
        <button 
          @click="closeModal"
          class="absolute -top-12 right-0 text-white text-3xl hover:text-yellow-400"
        >
          &times;
        </button>
        <img 
          :src="photos[currentPhotoIndex]" 
          class="w-full h-auto max-h-[80vh] object-contain rounded-lg"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  photos: {
    type: Array as () => string[],
    required: true
  }
});

const showModal = ref(false);
const currentPhotoIndex = ref(0);

const openModal = (index: number) => {
  currentPhotoIndex.value = index;
  showModal.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  showModal.value = false;
  document.body.style.overflow = '';
};
</script>