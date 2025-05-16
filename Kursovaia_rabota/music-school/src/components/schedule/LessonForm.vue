<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-8">
    <h2 class="text-xl font-semibold mb-4">Создать занятие</h2>
    
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Преподаватель*</label>
        <select 
          v-model="form.teacherId"
          required
          class="w-full p-2 border rounded-md"
        >
          <option disabled value="">Выберите преподавателя</option>
          <option 
            v-for="teacher in teachers" 
            :key="teacher.id" 
            :value="teacher.id"
          >
            {{ teacher.name }} ({{ teacher.subject }})
          </option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Студенты*</label>
        <select 
          v-model="form.studentIds"
          multiple
          required
          class="w-full p-2 border rounded-md h-auto min-h-[42px]"
        >
          <option 
            v-for="student in students" 
            :key="student.id" 
            :value="student.id"
          >
            {{ student.firstName }} {{ student.lastName }} ({{ student.subject }})
          </option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Дата*</label>
        <input 
          v-model="form.date"
          type="date" 
          required
          class="w-full p-2 border rounded-md"
        >
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Время*</label>
        <input 
          v-model="form.time"
          type="time" 
          required
          class="w-full p-2 border rounded-md"
        >
      </div>
      
      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-2">Предмет*</label>
        <select
          v-model="form.subject"
          required
          class="w-full p-2 border rounded-md"
        >
          <option value="" disabled selected>Выберите предмет</option>
          <option value="Фортепиано">Фортепиано</option>
          <option value="Скрипка">Скрипка</option>
          <option value="Гитара">Гитара</option>
          <option value="Барабаны">Барабаны</option>
          <option value="Сольфеджио">Сольфеджио</option>
          <option value="Теория музыки">Теория музыки</option>
          <option value="История музыки">История музыки</option>
        </select>
      </div>
      
      <button 
        type="submit"
        class="md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Создать занятие
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Teacher, Student, LessonFormData } from '@/types/schedule'

const props = defineProps<{
  teachers: Teacher[]
  students: Student[]
}>()

const emit = defineEmits(['create-lesson'])

const form = ref<LessonFormData>({
  teacherId: '',
  studentIds: [],
  date: '',
  time: '',
  subject: ''
})

const handleSubmit = () => {
  if (!form.value.teacherId || form.value.studentIds.length === 0) {
    alert('Пожалуйста, выберите преподавателя и хотя бы одного студента')
    return
  }

  emit('create-lesson', {
    teacherId: Number(form.value.teacherId),
    studentIds: form.value.studentIds.map(id => Number(id)),
    date: form.value.date,
    time: form.value.time,
    subject: form.value.subject
  })

  resetForm()
}

const resetForm = () => {
  form.value = {
    teacherId: '',
    studentIds: [],
    date: '',
    time: '',
    subject: ''
  }
}
</script>