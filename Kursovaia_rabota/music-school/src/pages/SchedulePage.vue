<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <ScheduleHeader />
    
    <LessonForm
      :teachers="teachers"
      :students="students"
      @create-lesson="createLesson"
    />
    
    <LessonList
      :lessons="sortedLessons"
      :teachers="teachers"
      :students="students"
      @remove-lesson="removeLesson"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ScheduleHeader from '@/components/schedule/ScheduleHeader.vue'
import LessonForm from '@/components/schedule/LessonForm.vue'
import LessonList from '@/components/schedule/LessonList.vue'
import type { Teacher, Student, Lesson } from '@/types/schedule'

const SCHEDULE_STORAGE_KEY = 'music-school-schedule'
const TEACHERS_STORAGE_KEY = 'music-school-teachers'
const STUDENTS_STORAGE_KEY = 'students'

const lessons = ref<Lesson[]>([])
const teachers = ref<Teacher[]>([])
const students = ref<Student[]>([])

onMounted(() => {
  loadData()
})

const loadData = () => {
  // Загружаем преподавателей
  const savedTeachers = localStorage.getItem(TEACHERS_STORAGE_KEY)
  if (savedTeachers) {
    try {
      teachers.value = JSON.parse(savedTeachers).map((t: any) => ({
        ...t,
        id: Number(t.id),
        age: Number(t.age)
      }))
    } catch (e) {
      console.error('Ошибка загрузки преподавателей:', e)
      teachers.value = []
    }
  }

  // Загружаем студентов
  const savedStudents = localStorage.getItem(STUDENTS_STORAGE_KEY)
  if (savedStudents) {
    try {
      students.value = JSON.parse(savedStudents).map((s: any) => ({
        ...s,
        id: Number(s.id),
        age: Number(s.age)
      }))
    } catch (e) {
      console.error('Ошибка загрузки студентов:', e)
      students.value = []
    }
  }

  // Загружаем расписание
  const savedLessons = localStorage.getItem(SCHEDULE_STORAGE_KEY)
  if (savedLessons) {
    try {
      lessons.value = JSON.parse(savedLessons).map((l: any) => ({
        ...l,
        id: Number(l.id),
        teacherId: Number(l.teacherId),
        studentIds: l.studentIds.map((id: any) => Number(id))
      }))
    } catch (e) {
      console.error('Ошибка загрузки расписания:', e)
      lessons.value = []
    }
  }
}

const createLesson = (lessonData: Omit<Lesson, 'id'>) => {
  const lesson: Lesson = {
    id: Date.now(),
    ...lessonData
  }
  lessons.value.push(lesson)
  saveLessons()
}

const removeLesson = (id: number) => {
  lessons.value = lessons.value.filter(lesson => lesson.id !== id)
  saveLessons()
}

const saveLessons = () => {
  localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(lessons.value))
}

const sortedLessons = computed(() => {
  return [...lessons.value].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`).getTime()
    const dateB = new Date(`${b.date}T${b.time}`).getTime()
    return dateA - dateB
  })
})
</script>