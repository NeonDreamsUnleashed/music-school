<template>
  <div
    class="cursor-pointer transition transform hover:scale-105"
    @click="$emit('select', teacher)"
  >
    <div class="text-6xl font-bold animate-gradient uppercase">HELLO</div>
    <div class="text-6xl font-bold animate-gradient">{{ teacher.name }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  teacher: {
    id: number
    name: string
  }
}>()

defineEmits(['select'])
</script>

<style scoped>
.animate-gradient {
  background: linear-gradient(270deg, #ff0080, #7928ca, #00ffff, #ff8c00);
  background-size: 600% 600%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: colorPulse 6s ease infinite;
}

@keyframes colorPulse {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>