<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4">Запланированные занятия</h2>
    
    <div v-if="lessons.length === 0" class="text-gray-500 text-center py-8">
      Нет запланированных занятий
    </div>
    
    <div v-else class="space-y-4">
      <LessonItem
        v-for="lesson in lessons"
        :key="lesson.id"
        :lesson="lesson"
        :teachers="teachers"
        :students="students"
        @remove="$emit('remove-lesson', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import LessonItem from './LessonItem.vue'
import type { Teacher, Student, Lesson } from '@/types/schedule'

defineProps<{
  lessons: Lesson[]
  teachers: Teacher[]
  students: Student[]
}>()

defineEmits(['remove-lesson'])
</script>