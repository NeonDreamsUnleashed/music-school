<template>
  <div class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
    <div class="flex items-start justify-between mb-4">
      <h3 class="text-xl font-semibold">{{ subject.name }}</h3>
      <span 
        class="text-xs px-2 py-1 rounded-full"
        :class="difficultyClass"
      >
        {{ difficultyLabel }}
      </span>
    </div>
    
    <p class="text-gray-400 mb-4">{{ subject.description }}</p>
    
    <div class="flex justify-between items-center text-sm">
      <span class="text-cyan-400">{{ subject.hours }} академических часов</span>
      <div class="flex space-x-2">
        <button 
          @click="$emit('edit')"
          class="text-gray-400 hover:text-cyan-400 transition-colors"
          title="Редактировать"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button 
          @click="$emit('delete')"
          class="text-gray-400 hover:text-rose-400 transition-colors"
          title="Удалить"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Subject } from '@/types/subject'

const props = defineProps<{
  subject: Subject
}>()

defineEmits(['edit', 'delete'])

const difficultyLabel = computed(() => {
  const levels: Record<string, string> = {
    beginner: 'Начальный',
    intermediate: 'Средний',
    advanced: 'Продвинутый'
  }
  return levels[props.subject.difficulty] || props.subject.difficulty
})

const difficultyClass = computed(() => {
  return {
    'bg-green-900 text-green-300': props.subject.difficulty === 'beginner',
    'bg-yellow-900 text-yellow-300': props.subject.difficulty === 'intermediate',
    'bg-red-900 text-red-300': props.subject.difficulty === 'advanced'
  }
})
</script>