<template>
  <div class="mb-8">
    <input v-model="form.name" placeholder="Имя" class="mb-2 p-2 border rounded" />
    <input v-model.number="form.age" type="number" placeholder="Возраст" class="mb-2 p-2 border rounded" />
    <input v-model="form.subject" placeholder="Предмет" class="mb-2 p-2 border rounded" />
    <input v-model="form.photo" placeholder="Ссылка на фото" class="mb-4 p-2 border rounded" />
    <button 
      @click="handleSubmit"
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Добавить преподавателя
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Teacher } from '@/types/teacher'

const form = ref({
  name: '',
  age: 0,
  subject: '',
  photo: ''
})

const emit = defineEmits<{
  (e: 'add-teacher', teacher: Omit<Teacher, 'id'>): void
}>()

const handleSubmit = () => {
  if (!form.value.name || !form.value.subject) {
    alert('Пожалуйста, заполните обязательные поля')
    return
  }
  
  emit('add-teacher', { 
    name: form.value.name,
    age: form.value.age || 0,
    subject: form.value.subject,
    photo: form.value.photo || ''
  })
  
  // Сброс формы
  form.value = { name: '', age: 0, subject: '', photo: '' }
}
</script>