
<script setup lang="ts">
import { RouterLink } from 'vue-router';
import img from '@/assets/Smain.png'

</script>



<template>
  <header class="relative h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
    <!-- Затемнение с градиентом -->
    <!-- <div class="absolute inset-0 bg-black bg-opacity-60"></div> -->

    <div class="absolute inset-0  top-0 bottom-0 left-0 right-0">
    <img class="w-full h-full object-cover" :src="img" alt="">
  </div>
    <!-- Контент -->
    <div class="relative z-10 text-center px-6 max-w-screen-xl">
      <h1 class="text-5xl md:text-6xl font-extrabold mb-8 drop-shadow-lg animate-fade-in">
      Музыкальная школа "Рок" 🎶🎸🎻
      </h1>

      <nav class="mt-6 flex flex-wrap justify-center gap-6 text-xl md:text-2xl font-semibold">
        <RouterLink
          to="/"
          class="transition-transform duration-300 hover:scale-110 hover:text-gray-300 animate-slide-in"
        >
          Главная 🏠
        </RouterLink>
        <RouterLink
          to="/students"
          class="transition-transform duration-300 hover:scale-110 hover:text-gray-300 animate-slide-in"
        >
          Ученики 👨‍🎓
        </RouterLink>
        <RouterLink
          to="/teachers"
          class="transition-transform duration-300 hover:scale-110 hover:text-gray-300 animate-slide-in"
        >
          Преподаватели 👩‍🏫
        </RouterLink>
        <RouterLink
          to="/schedule"
          class="transition-transform duration-300 hover:scale-110 hover:text-gray-300 animate-slide-in"
        >
          Расписание 📅
        </RouterLink>
        <RouterLink
          to="/subjects"
          class="transition-transform duration-300 hover:scale-110 hover:text-gray-300 animate-slide-in"
        >
          Предметы 🎼
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Анимация для заголовка */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out both;
}

/* Анимация для элементов навигации */
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slide-in 1s ease-out both;
  animation-delay: 0.2s;
}

nav a:nth-child(2) {
  animation-delay: 0.4s;
}

nav a:nth-child(3) {
  animation-delay: 0.6s;
}

nav a:nth-child(4) {
  animation-delay: 0.8s;
}

nav a:nth-child(5) {
  animation-delay: 1s;
}
</style>
