<template>
  <div class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
    <div class="bg-gray-800 rounded-xl w-full max-w-md p-6 border border-gray-700">
      <h2 class="text-2xl font-bold mb-4">Подтверждение удаления</h2>
      <p class="text-gray-400 mb-6">Вы уверены, что хотите удалить этот предмет? Это действие нельзя отменить.</p>
      
      <div class="flex justify-end space-x-3">
        <button
          @click="$emit('cancel')"
          class="px-5 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
        >
          Отмена
        </button>
        <button
          @click="$emit('confirm')"
          class="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 transition-colors"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['cancel', 'confirm'])
</script>