<template>
  <div class="overflow-x-auto">
    <table class="min-w-full table-auto">
      <thead>
        <tr>
          <th class="p-2">Имя</th>
          <th class="p-2">Фамилия</th>
          <th class="p-2">Возраст</th>
          <th class="p-2">Предмет</th>
          <th class="p-2">Действия</th>
        </tr>
      </thead>
      <tbody>
        <!-- Проходим по всем студентам -->
        <tr v-for="student in students" :key="student.id">
          <td class="p-2">{{ student.firstName }}</td>
          <td class="p-2">{{ student.lastName }}</td>
          <td class="p-2">{{ student.age }}</td>
          <td class="p-2">{{ student.subject }}</td>
          <td class="p-2">
            <button @click="editStudent(student)" class="bg-yellow-500 text-white px-2 py-1 rounded">Редактировать</button>
            <button @click="removeStudent(student.id)" class="bg-red-500 text-white px-2 py-1 rounded">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Student } from '@/types/index.ts'

const props = defineProps({
  students: {
    type: Array as () => Student[],
    required: true
  }
})

const emit = defineEmits()

const removeStudent = (id: number) => {
  emit('remove', id)
}

const editStudent = (student: Student) => {
  emit('edit', student)
}
</script>
