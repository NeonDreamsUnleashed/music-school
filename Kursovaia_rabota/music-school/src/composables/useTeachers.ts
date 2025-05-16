import { ref, computed } from 'vue'
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

export function useTeachers() {
  const teachers = ref<Teacher[]>([
    { id: 1, name: 'Kitty', age: 28, subject: 'Фортепиано', photo: kittyPhoto },
    { id: 2, name: 'Max', age: 35, subject: 'Скрипка', photo: maxPhoto },
    { id: 3, name: 'Serg', age: 42, subject: 'Вокал', photo: sergPhoto },
    { id: 4, name: 'Alex', age: 30, subject: 'Гитара', photo: alexPhoto },
    { id: 5, name: 'Johnny', age: 27, subject: 'Барабаны', photo: johnnyPhoto }
  ])

  const selectedTeacher = ref<Teacher | null>(null)
  const searchTerm = ref('')
  const isEditing = ref(false)
  const newTeacher = ref<Omit<Teacher, 'id'>>({
    name: '',
    age: 0,
    subject: '',
    photo: ''
  })

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

  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newId = teachers.value.length ? Math.max(...teachers.value.map(t => t.id)) + 1 : 1
    teachers.value.push({ ...teacher, id: newId })
  }

  return {
    teachers,
    selectedTeacher,
    searchTerm,
    isEditing,
    newTeacher,
    filteredTeachers,
    selectTeacher,
    deleteTeacher,
    addTeacher
  }
}