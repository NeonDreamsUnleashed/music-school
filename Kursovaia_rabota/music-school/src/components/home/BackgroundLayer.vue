<template>
  <div class="fixed inset-0 w-full h-full z-0 overflow-hidden">
    <div class="absolute inset-0 bg-black/60 z-10"></div>
    <img
      :src="rokImage"
      alt="Background"
      class="w-full h-full object-cover object-center"
      :style="{ transform: `scale(1.1) translateY(${scrollY * 0.2}px)` }"
    />
  </div>
</template>

<script setup lang="ts">
import rokImage from '@/assets/rok1.png';

defineProps({
  scrollY: {
    type: Number,
    required: true
  }
});
</script>