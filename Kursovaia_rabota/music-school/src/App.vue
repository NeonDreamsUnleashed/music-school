<template>
  <div id="app" class="min-h-screen flex flex-col">
    <!-- Контент страницы -->
    <main class="flex-grow">
      <router-view />
    </main>

  </div>
</template>

<script lang="ts" setup>
import TeachersPage from './pages/TeachersPage.vue'
import Footer from './components/Footer.vue'; 
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}
</style>
