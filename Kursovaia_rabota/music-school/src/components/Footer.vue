<template>
  <footer class="relative text-black py-4 text-sm overflow-hidden bg-white">
    <!-- Фоновое изображение -->
    <div class="absolute inset-0 w-full h-full z-0">
      <img
        :src="systemImage"
        alt="Background"
        class="w-full h-full object-cover opacity-10 pointer-events-none"
      />
    </div>

    <!-- Контент футера -->
    <div class="relative z-10 container mx-auto text-center px-4">
      <!-- Название -->
      <div class="mb-2">
        <span class="text-xl font-semibold">Музыкальная Школа 🎶</span>
      </div>

      <!-- Контакты -->
      <div class="mb-2 space-y-1">
        <p>📧 <a href="mailto:makama350@gmail.com" class="hover:text-gray-700">makama350@gmail.com</a></p>
        <p>📞 <a href="tel:+375445995531" class="hover:text-gray-700">+375 44 599 55 31</a></p>
        <p>📍 Казинца</p>
      </div>

      <!-- Соцсети -->
      <div class="flex justify-center gap-4 my-2">
        <a href="https://facebook.com" target="_blank">
          <img src="../assets/Footer/facebook-logo.svg" alt="Facebook" class="w-5 h-5" />
        </a>
        <a href="https://instagram.com" target="_blank">
          <img src="../assets/Footer/instagram-logo.svg" alt="Instagram" class="w-5 h-5" />
        </a>
        <a href="https://github.com" target="_blank">
          <img src="../assets/Footer/github-logo.svg" alt="GitHub" class="w-5 h-5" />
        </a>
      </div>

      <!-- Копирайт -->
      <p class="text-gray-800 mt-2">© 2025 Музыкальная школа</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import systemImage from '@/assets/Footer/system.png';
</script>
