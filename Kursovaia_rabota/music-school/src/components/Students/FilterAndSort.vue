<template>
  <div class="flex flex-wrap gap-4 justify-center mb-6">
    <input
      v-model="filterQuery"
      type="text"
      placeholder="Поиск по имени, фамилии или предмету"
      class="p-2 border rounded w-64"
    />
    <select v-model="sortField" class="p-2 border rounded">
      <option :value="null">Без сортировки</option>
      <option value="firstName">Имя</option>
      <option value="lastName">Фамилия</option>
      <option value="age">Возраст</option>
      <option value="subject">Предмет</option>
    </select>

    <button @click="toggleSortDirection" class="px-4 py-2 bg-blue-500 text-white rounded">
      Сортировка: {{ sortDirection === 'asc' ? 'По возрастанию' : 'По убыванию' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Student } from '@/types'

const emit = defineEmits<{
  (e: 'filter-sort', payload: {
    filterQuery: string,
    sortField: keyof Student | null,
    sortDirection: 'asc' | 'desc'
  }): void
}>()

const filterQuery = ref('')
const sortField = ref<keyof Student | null>(null)
const sortDirection = ref<'asc' | 'desc'>('asc')

const toggleSortDirection = () => {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
}

const filterAndSort = () => {
  emit('filter-sort', {
    filterQuery: filterQuery.value,
    sortField: sortField.value,
    sortDirection: sortDirection.value
  })
}

// Автоматически отправлять данные при изменении
watch([filterQuery, sortField, sortDirection], filterAndSort)
</script>
