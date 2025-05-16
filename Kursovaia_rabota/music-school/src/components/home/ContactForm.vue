<template>
  <section id="contact-form" class="py-20 px-4 bg-gray-900/80 backdrop-blur-sm">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold mb-8 text-center text-white">Записаться на занятие</h2>
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <input 
          type="text" 
          placeholder="Ваше имя" 
          v-model="form.name"
          required
          class="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
        >
        <input 
          type="email" 
          placeholder="Email" 
          v-model="form.email"
          required
          class="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
        >
        <textarea
          placeholder="Ваш музыкальный инструмент"
          v-model="form.instrument"
          class="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition min-h-[120px]"
        ></textarea>
        <button 
          type="submit" 
          class="w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg text-white font-bold transition-all"
          :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">Отправить заявку</span>
          <span v-else>Отправка...</span>
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  instrument: ''
});

const isSubmitting = ref(false);

const handleSubmit = () => {
  isSubmitting.value = true;
  
  // Здесь будет логика отправки формы
  console.log('Форма отправлена:', form.value);
  
  // Имитация отправки
  setTimeout(() => {
    isSubmitting.value = false;
    alert('Ваша заявка принята! Мы свяжемся с вами в ближайшее время.');
    form.value = { name: '', email: '', instrument: '' };
  }, 1500);
};
</script>