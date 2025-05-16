<template>
  <div class="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <SubjectCard 
      v-for="subject in subjects"
      :key="subject.id"
      :subject="subject"
      @edit="$emit('edit', subject)"
      @delete="$emit('delete', subject.id)"
    />
  </div>
</template>

<script setup lang="ts">
import SubjectCard from './SubjectCard.vue'
import type { Subject } from '@/types/subject'

defineProps<{
  subjects: Subject[]
}>()

defineEmits(['edit', 'delete'])
</script>