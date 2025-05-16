<template>
  <div 
    class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-gray-800 rounded-xl w-full max-w-md p-6 border border-gray-700">
      <h2 class="text-2xl font-bold mb-6">
        {{ subject.id ? 'Редактирование' : 'Новый предмет' }}
      </h2>
      
      <div class="space-y-4">
        <div>
          <label class="block text-gray-400 mb-2">Название*</label>
          <input
            v-model="formData.name"
            class="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Введите название"
            required
          >
        </div>
        
        <div>
          <label class="block text-gray-400 mb-2">Описание</label>
          <textarea
            v-model="formData.description"
            class="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            rows="3"
            placeholder="Добавьте описание предмета"
          ></textarea>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-400 mb-2">Сложность*</label>
            <select
              v-model="formData.difficulty"
              class="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              required
            >
              <option value="beginner">Начальный</option>
              <option value="intermediate">Средний</option>
              <option value="advanced">Продвинутый</option>
            </select>
          </div>
          
          <div>
            <label class="block text-gray-400 mb-2">Часы*</label>
            <input
              v-model.number="formData.hours"
              type="number"
              min="1"
              class="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Количество часов"
              required
            >
          </div>
        </div>
      </div>
      
      <div class="flex justify-end space-x-3 mt-8">
        <button
          @click="$emit('close')"
          class="px-5 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
        >
          Отмена
        </button>
        <button
          @click="handleSave"
          class="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors"
          :disabled="!isFormValid"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import type { SubjectForm } from '@/types/subject'

const props = defineProps<{
  subject: SubjectForm
}>()

const emit = defineEmits(['close', 'save'])

const formData = reactive<SubjectForm>({
  id: undefined,
  name: '',
  description: '',
  difficulty: 'beginner',
  hours: 10
})

// Инициализация формы
watch(() => props.subject, (newVal) => {
  Object.assign(formData, newVal)
}, { immediate: true })

const isFormValid = computed(() => {
  return formData.name.trim() !== '' && 
         formData.hours > 0 &&
         formData.difficulty !== undefined
})

const handleSave = () => {
  if (isFormValid.value) {
    emit('save', { ...formData })
  }
}
</script>