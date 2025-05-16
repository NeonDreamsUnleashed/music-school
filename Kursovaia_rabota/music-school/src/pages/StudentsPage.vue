<template>
  <div class="relative min-h-screen bg-cover bg-center" :style="{ backgroundImage: `url(${studentPageImage})` }">
    <!-- Полупрозрачный фон для контента -->
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <div class="relative z-10 p-6 flex justify-center items-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 class="text-3xl font-bold mb-6 text-center text-black">Список учеников</h1>

        <!-- Форма для добавления студента -->
        <StudentForm 
          @add="addStudent" 
          @edit="saveStudent" 
          :studentToEdit="studentToEdit"
        />

        <!-- Фильтрация и сортировка -->
        <FilterAndSort @filter-sort="filterAndSort" />

        <!-- Таблица студентов -->
        <StudentTable 
          :students="filteredAndSortedStudents" 
          @remove="removeStudent" 
          @edit="editStudent"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import StudentForm from '../components/Students/StudentForm.vue'
import StudentTable from '../components/Students/StudentTable.vue'
import { Teacher } from '../types/teacher'
import FilterAndSort from '../components/Students/FilterAndSort.vue'

// Импорт изображения фона
import studentPageImage from '@/assets/student-background.jpg'

interface Student {
  id: number
  firstName: string
  lastName: string
  age: number
  subject: string
}

const STORAGE_KEY = 'students'

// Массив студентов, который будет храниться в локальном хранилище
const students = ref<Student[]>([])

// Студент для редактирования
const studentToEdit = ref<Student | null>(null)

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  students.value = saved ? JSON.parse(saved) : []
})

watch(students, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

// Добавление нового студента
const addStudent = (student: Student) => {
  students.value.push(student)
}

// Удаление студента
const removeStudent = (id: number) => {
  students.value = students.value.filter(student => student.id !== id)
}

// Сохранение изменений студента
const saveStudent = (student: Student) => {
  const currentStudent = studentToEdit.value!
  const index = students.value.findIndex(s => s.id === currentStudent.id)
  if (index !== -1) {
    students.value[index] = student
    studentToEdit.value = null // Очищаем редактируемого студента после сохранения
  }
}

// Редактирование студента
const editStudent = (student: Student) => {
  studentToEdit.value = { ...student }
}

const filterQuery = ref('')
const sortField = ref<keyof Student | null>(null)
const sortDirection = ref<'asc' | 'desc'>('asc')

const filteredAndSortedStudents = computed(() => {
  let result = [...students.value]

  if (filterQuery.value.trim()) {
    const query = filterQuery.value.trim().toLowerCase()
    result = result.filter((s) =>
      s.firstName.toLowerCase().includes(query) ||
      s.lastName.toLowerCase().includes(query) ||
      s.subject.toLowerCase().includes(query)
    )
  }

  if (sortField.value !== null) {
    const field = sortField.value
    result.sort((a, b) => {
      const aVal = a[field]
      const bVal = b[field]

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection.value === 'asc' ? aVal - bVal : bVal - aVal
      }

      return sortDirection.value === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })
  }

  return result
})

// Функция для фильтрации и сортировки студентов
const filterAndSort = (params: { filterQuery: string, sortField: keyof Student | null, sortDirection: 'asc' | 'desc' }) => {
  filterQuery.value = params.filterQuery
  sortField.value = params.sortField
  sortDirection.value = params.sortDirection
}
</script>