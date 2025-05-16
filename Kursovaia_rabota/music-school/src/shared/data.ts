// src/shared/data.ts
import { ref, watch } from 'vue'

interface Teacher {
  id: number
  name: string
  age: number
  subject: string
  photo: string
}

interface Student {
  id: number
  firstName: string
  lastName: string
  age: number
  subject: string
}

// Константы для localStorage
const TEACHERS_KEY = 'music-school-teachers'
const STUDENTS_KEY = 'music-school-students'
const SCHEDULE_KEY = 'music-school-schedule'

// Реактивные данные
const teachers = ref<Teacher[]>([])
const students = ref<Student[]>([])
const schedule = ref<any[]>([]) 

// Инициализация данных
function initData() {
  const savedTeachers = localStorage.getItem(TEACHERS_KEY)
  teachers.value = savedTeachers ? JSON.parse(savedTeachers) : []

  const savedStudents = localStorage.getItem(STUDENTS_KEY)
  students.value = savedStudents ? JSON.parse(savedStudents) : []

  const savedSchedule = localStorage.getItem(SCHEDULE_KEY)
  schedule.value = savedSchedule ? JSON.parse(savedSchedule) : []
}

// Автосохранение при изменениях
watch(teachers, (newVal) => {
  localStorage.setItem(TEACHERS_KEY, JSON.stringify(newVal))
}, { deep: true })

watch(students, (newVal) => {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(newVal))
}, { deep: true })

watch(schedule, (newVal) => {
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(newVal))
}, { deep: true })

export { teachers, students, schedule, initData }