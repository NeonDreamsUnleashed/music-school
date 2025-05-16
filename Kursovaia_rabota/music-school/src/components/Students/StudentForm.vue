<template>
  <form @submit.prevent="submitForm" class="flex flex-wrap gap-4 items-end mb-8">
    <input
      v-model="newStudent.firstName"
      type="text"
      placeholder="Имя"
      class="p-2 border rounded w-40"
      required
    />
    <input
      v-model="newStudent.lastName"
      type="text"
      placeholder="Фамилия"
      class="p-2 border rounded w-40"
      required
    />
    <input
      v-model.number="newStudent.age"
      type="number"
      placeholder="Возраст"
      :min="6"
      class="p-2 border rounded w-28"
      required
    />
    <select
      v-model="newStudent.subject"
      class="p-2 border rounded w-40"
      required
    >
      <option value="" disabled selected>Выберите предмет</option>
      <option value="фортепиано">Фортепиано</option>
      <option value="скрипка">Скрипка</option>
      <option value="гитара">Гитара</option>
      <option value="барабаны">Барабаны</option>
      <option value="сольфеджио">Сольфеджио</option>
      <option value="теория музыки">Теория музыки</option>
      <option value="история музыки">История музыки</option>
    </select>

    
    <button
      type="submit"
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      {{ studentToEdit ? 'Сохранить изменения' : 'Добавить студента' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import type { Student } from '@/types/index.ts'

const props = defineProps({
  studentToEdit: {
    type: Object as () => Student | null,
    default: null
  }
})

const emit = defineEmits()

const newStudent = ref<Student>({
  id: 0,
  firstName: '',
  lastName: '',
  age: 6,
  subject: ''
})

// Заполнение формы при редактировании студента
watch(() => props.studentToEdit, (newVal) => {
  if (newVal) {
    newStudent.value = { ...newVal }
  } else {
    newStudent.value = { id: 0, firstName: '', lastName: '', age: 0, subject: '' }
  }
})

// Обработчик для добавления или редактирования студента
const submitForm = () => {
  if (props.studentToEdit) {
    // Если редактируем студента
    emit('edit', { ...newStudent.value })
  } else {
    // Если добавляем нового студента
    emit('add', { ...newStudent.value, id: Date.now() })
  }

  // Очищаем форму после отправки
  newStudent.value = { firstName: '', lastName: '', age: 0, subject: '', id: 0 }
}
</script>
