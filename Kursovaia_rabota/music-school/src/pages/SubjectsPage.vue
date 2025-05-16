<template>
  <div class="min-h-screen bg-gray-900 flex flex-col items-center py-12 px-4 text-white">
    <!-- Заголовок -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
        Учебные предметы
      </h1>
      <p class="text-gray-400 max-w-md">Изучайте разнообразие музыкальных направлений</p>
    </div>

    <SubjectList 
      :subjects="subjects"
      @edit="openEditModal"
      @delete="confirmDelete"
    />

    <!-- Кнопка добавления -->
    <button
      @click="openAddModal"
      class="mt-10 flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-full shadow-lg transition-all"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <span>Добавить предмет</span>
    </button>

    <SubjectFormModal
      v-if="isModalOpen"
      :subject="currentSubject"
      @close="closeModal"
      @save="saveSubject"
    />

    <DeleteConfirmationModal
      v-if="showDeleteConfirm"
      @cancel="showDeleteConfirm = false"
      @confirm="deleteSubject"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import SubjectList from '@/components/subjects/SubjectList.vue'
import SubjectFormModal from '@/components/subjects/SubjectFormModal.vue'
import DeleteConfirmationModal from '@/components/subjects/DeleteConfirmationModal.vue'
import type { Subject, SubjectForm } from '@/types/subject'

const SUBJECTS_STORAGE_KEY = 'music-school-subjects'

// Состояние
const subjects = ref<Subject[]>([])
const isModalOpen = ref(false)
const showDeleteConfirm = ref(false)
const subjectToDelete = ref<number | null>(null)
const currentSubject = reactive<SubjectForm>({
  name: '',
  description: '',
  difficulty: 'beginner',
  hours: 10
})

// Инициализация данных
onMounted(() => {
  loadSubjects()
})

// Загрузка предметов
const loadSubjects = () => {
  const saved = localStorage.getItem(SUBJECTS_STORAGE_KEY)
  if (saved) {
    try {
      const parsedData = JSON.parse(saved)
      subjects.value = parsedData.map((item: any) => ({
        id: Number(item.id),
        name: String(item.name),
        description: String(item.description),
        difficulty: item.difficulty,
        hours: Number(item.hours)
      }))
    } catch (error) {
      console.error('Ошибка загрузки предметов:', error)
      subjects.value = []
    }
  }
}

// Сохранение предметов
const saveSubjects = () => {
  localStorage.setItem(SUBJECTS_STORAGE_KEY, JSON.stringify(subjects.value))
}

// Открытие формы добавления
const openAddModal = () => {
  resetForm()
  isModalOpen.value = true
}

// Открытие формы редактирования
const openEditModal = (subject: Subject) => {
  Object.assign(currentSubject, subject)
  isModalOpen.value = true
}

// Подтверждение удаления
const confirmDelete = (id: number) => {
  subjectToDelete.value = id
  showDeleteConfirm.value = true
}

// Удаление предмета
const deleteSubject = () => {
  if (subjectToDelete.value !== null) {
    subjects.value = subjects.value.filter(s => s.id !== subjectToDelete.value)
    saveSubjects()
    showDeleteConfirm.value = false
    subjectToDelete.value = null
  }
}

// Сохранение предмета
const saveSubject = (subjectData: SubjectForm) => {
  if (subjectData.id) {
    // Обновление существующего предмета
    const index = subjects.value.findIndex(s => s.id === subjectData.id)
    if (index !== -1) {
      subjects.value[index] = {
        id: subjectData.id,
        name: subjectData.name,
        description: subjectData.description,
        difficulty: subjectData.difficulty,
        hours: subjectData.hours
      }
    }
  } else {
    // Добавление нового предмета
    const newSubject: Subject = {
      id: Date.now(),
      name: subjectData.name,
      description: subjectData.description,
      difficulty: subjectData.difficulty,
      hours: subjectData.hours
    }
    subjects.value.push(newSubject)
  }
  
  saveSubjects()
  closeModal()
}

// Закрытие модального окна
const closeModal = () => {
  isModalOpen.value = false
  resetForm()
}

// Сброс формы
const resetForm = () => {
  Object.assign(currentSubject, {
    id: undefined,
    name: '',
    description: '',
    difficulty: 'beginner',
    hours: 10
  })
}
</script>