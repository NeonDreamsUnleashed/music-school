<template>
  <div class="border p-4 rounded-lg hover:bg-gray-50">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="font-bold text-lg">{{ lesson.subject }}</h3>
        <p class="text-gray-600">{{ formatDate(lesson.date) }}, {{ lesson.time }}</p>
      </div>
      <button 
        @click="$emit('remove', lesson.id)"
        class="text-red-500 hover:text-red-700"
      >
        Удалить
      </button>
    </div>
    
    <div class="mt-2">
      <p><span class="font-semibold">Преподаватель:</span> {{ teacherName }}</p>
      <p class="font-semibold mt-1">Студенты:</p>
      <ul class="list-disc list-inside">
        <li v-for="studentId in lesson.studentIds" :key="studentId">
          {{ getStudentName(studentId) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Teacher, Student, Lesson } from '@/types/schedule'

const props = defineProps<{
  lesson: Lesson
  teachers: Teacher[]
  students: Student[]
}>()

defineEmits(['remove'])

const teacherName = computed(() => {
  const teacher = props.teachers.find(t => t.id === props.lesson.teacherId)
  return teacher ? `${teacher.name} (${teacher.subject})` : 'Неизвестный преподаватель'
})

const getStudentName = (id: number) => {
  const student = props.students.find(s => s.id === id)
  return student ? `${student.firstName} ${student.lastName}` : 'Неизвестный студент'
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('ru-RU', options)
}
</script>