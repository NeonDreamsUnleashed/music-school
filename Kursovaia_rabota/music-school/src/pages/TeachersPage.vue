<template>
  <!-- Шаблон остаётся без изменений -->
  <div class="min-h-screen bg-black flex flex-col items-center justify-center text-center p-8 text-white">
    <h1 class="text-5xl font-bold mb-16">Преподаватели</h1>
    <TeacherForm @add-teacher="addTeacher" />
    <div class="space-y-12">
      <TeacherCard
        v-for="teacher in filteredTeachers"
        :key="teacher.id"
        :teacher="teacher"
        @select="selectTeacher(teacher)"
      />
    </div>
    <TeacherModal
      v-if="selectedTeacher"
      :teacher="selectedTeacher"
      :is-editing="isEditing"
      @close="selectedTeacher = null"
      @delete="deleteTeacher"
      @toggle-edit="isEditing = !isEditing"
      @update="updateTeacher"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import TeacherForm from '@/components/teachers/TeacherForm.vue'
import TeacherCard from '@/components/teachers/TeacherCard.vue'
import TeacherModal from '@/components/teachers/TeacherModal.vue'
import kittyPhoto from '@/assets/teachersPhoto/kitty.webp'
import maxPhoto from '@/assets/teachersPhoto/max.webp'
import sergPhoto from '@/assets/teachersPhoto/serg.webp'
import alexPhoto from '@/assets/teachersPhoto/alex.webp'
import johnnyPhoto from '@/assets/teachersPhoto/johnny.webp'

interface Teacher {
  id: number
  name: string
  age: number
  subject: string
  photo: string
}

const TEACHERS_STORAGE_KEY = 'teachers' // Единый ключ

const teachers = ref<Teacher[]>([])
const selectedTeacher = ref<Teacher | null>(null)
const isEditing = ref(false)
const searchTerm = ref('')

// Загрузка данных с преобразованием типов
onMounted(() => {
  const saved = localStorage.getItem(TEACHERS_STORAGE_KEY)
  if (saved) {
    teachers.value = JSON.parse(saved).map((t: any) => ({
      ...t,
      id: Number(t.id), // Явное преобразование
      age: Number(t.age)
    }))
  } else {
    // Начальные данные
    teachers.value = [
      { id: 1, name: 'Kitty', age: 28, subject: 'Фортепиано', photo: kittyPhoto },
      { id: 2, name: 'Max', age: 35, subject: 'Скрипка', photo: maxPhoto },
      { id: 3, name: 'Serg', age: 42, subject: 'Вокал', photo: sergPhoto },
      { id: 4, name: 'Alex', age: 30, subject: 'Гитара', photo: alexPhoto },
      { id: 5, name: 'Johnny', age: 27, subject: 'Барабаны', photo: johnnyPhoto }
    ]
  }
})

// Автосохранение
watch(teachers, (newVal) => {
  localStorage.setItem(TEACHERS_STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

// Остальные методы остаются без изменений
const filteredTeachers = computed(() => {
  return teachers.value.filter(t =>
    t.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const selectTeacher = (teacher: Teacher) => {
  selectedTeacher.value = { ...teacher }
  isEditing.value = false
}

const deleteTeacher = (id: number) => {
  teachers.value = teachers.value.filter(t => t.id !== id)
  selectedTeacher.value = null
}

const addTeacher = (teacherData: Omit<Teacher, 'id'>) => {
  const newId = teachers.value.length ? Math.max(...teachers.value.map(t => t.id)) + 1 : 1
  teachers.value.push({ 
    ...teacherData, 
    id: newId,
    age: Number(teacherData.age) // Преобразование возраста
  })
}

const updateTeacher = (updatedTeacher: Teacher) => {
  const index = teachers.value.findIndex(t => t.id === updatedTeacher.id)
  if (index !== -1) {
    teachers.value[index] = {
      ...updatedTeacher,
      id: Number(updatedTeacher.id),
      age: Number(updatedTeacher.age)
    }
  }
  isEditing.value = false
}
</script>

<style scoped>
@keyframes colorPulse {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background: linear-gradient(270deg, #ff0080, #7928ca, #00ffff, #ff8c00);
  background-size: 600% 600%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: colorPulse 6s ease infinite;
}
</style>