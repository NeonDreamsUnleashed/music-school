<template>
  <section class="min-h-screen flex items-center justify-center px-4 text-center relative overflow-hidden">
    <div class="max-w-4xl mx-auto px-6 py-20">
      <h1 class="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 animate-gradient custom-font leading-tight">
        Добро пожаловать в <br>Музыкальную Школу <span class="text-red-500">РОК</span>!
      </h1>
      <p class="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
        Где рождаются легенды и зажигаются звёзды
      </p>
      <button 
        @click="scrollTo('about-section')"
        class="px-8 py-3 bg-gradient-to-r from-pink-600 to-yellow-500 rounded-full text-white font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/30"
      >
        Узнать больше
      </button>
    </div>
    <MusicalNotes />
  </section>
</template>

<script setup lang="ts">
import MusicalNotes from './MusicalNotes.vue';

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};
</script>