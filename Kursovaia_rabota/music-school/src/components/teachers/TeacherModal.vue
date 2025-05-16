<template>
  <transition name="modal">
    <div
      v-if="teacher"
      class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      @click.self="$emit('close')"
    >
      <div class="bg-white text-black rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
        <h2 class="text-3xl font-bold mb-4">{{ teacher.name }}</h2>
        <img :src="teacher.photo" alt="Фото преподавателя" class="w-full rounded-xl mb-4" />

        <div v-if="isEditing">
          <input v-model="teacher.name" class="w-full mb-2 px-3 py-2 border rounded" placeholder="Имя" />
          <input v-model.number="teacher.age" type="number" class="w-full mb-2 px-3 py-2 border rounded" placeholder="Возраст" />
          <input v-model="teacher.subject" class="w-full mb-2 px-3 py-2 border rounded" placeholder="Предмет" />
          <input v-model="teacher.photo" class="w-full mb-2 px-3 py-2 border rounded" placeholder="Ссылка на фото" />

          <button @click="isEditing = false" class="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
            Сохранить
          </button>
        </div>
        <div v-else>
          <p class="mb-2"><strong>Возраст:</strong> {{ teacher.age }}</p>
          <p><strong>Предмет:</strong> {{ teacher.subject }}</p>
        </div>

        <div class="flex justify-between mt-6">
          <button 
            @click="isEditing = !isEditing" 
            class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Редактировать
          </button>
          <button 
            @click="$emit('delete', teacher.id)" 
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Удалить
          </button>
        </div>

        <button class="absolute top-2 right-2 text-gray-600 hover:text-black" @click="$emit('close')">
          ✕
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'


defineProps<{
  teacher: {
    id: number
    name: string
    age: number
    subject: string
    photo: string
  }
}>()

defineEmits(['close', 'delete'])

const isEditing = ref(false)
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>