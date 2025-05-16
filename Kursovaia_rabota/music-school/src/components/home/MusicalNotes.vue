<template>
  <div class="notes-container">
    <div
      v-for="(note, index) in visibleNotes" 
      :key="note.id"
      class="note"
      :style="getNoteStyle(note)"
    >
      {{ note.symbol }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const symbols = ['♩', '♪', '♫', '♬', '♭'];
const notesPool = ref<Array<{
  id: number;
  symbol: string;
  startTime: number;
  duration: number;
  startPos: number;
  size: number;
  rotation: number;
}>>([]);

const visibleNotes = ref<Array<{
  id: number;
  symbol: string;
  progress: number;
  startPos: number;
  size: number;
  rotation: number;
}>>([]);

let lastId = 0;
let animationFrame: number;

const createNote = () => {
  const note = {
    id: ++lastId,
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    startTime: performance.now(),
    duration: 3000 + Math.random() * 4000,
    startPos: Math.random() * 100,
    size: 24 + Math.random() * 24,
    rotation: Math.random() * 360
  };
  notesPool.value.push(note);
  return note;
};

const updateNotes = () => {
  const now = performance.now();
  
  // Удаляем завершившие анимацию ноты
  notesPool.value = notesPool.value.filter(note => {
    return now - note.startTime < note.duration;
  });
  
  // Обновляем видимые ноты
  visibleNotes.value = notesPool.value.map(note => ({
    id: note.id,
    symbol: note.symbol,
    progress: Math.min(1, (now - note.startTime) / note.duration),
    startPos: note.startPos,
    size: note.size,
    rotation: note.rotation
  }));
  
  // Добавляем новые ноты, если нужно
  if (notesPool.value.length < 15 && Math.random() > 0.7) {
    createNote();
  }
  
  animationFrame = requestAnimationFrame(updateNotes);
};

const getNoteStyle = (note: {
  progress: number;
  startPos: number;
  size: number;
  rotation: number;
}) => {
  const currentRotation = note.rotation + note.progress * 360;
  const currentY = note.progress * 120; // 120vh чтобы гарантированно уходили за экран
  
  return {
    left: `${note.startPos}%`,
    top: `-50px`,
    fontSize: `${note.size}px`,
    color: 'rgba(234, 179, 8, 0.7)',
    transform: `translateY(${currentY}vh) rotate(${currentRotation}deg)`,
    opacity: note.progress < 0.2 ? note.progress * 5 : 
             note.progress > 0.8 ? (1 - note.progress) * 5 : 1,
    position: 'absolute',
    zIndex: 40,
    pointerEvents: 'none',
    userSelect: 'none'
  };
};

onMounted(() => {
  // Начальное заполнение
  for (let i = 0; i < 10; i++) {
    createNote();
  }
  
  // Запускаем анимацию
  animationFrame = requestAnimationFrame(updateNotes);
  
  // Регулярное добавление новых нот
  const interval = setInterval(() => {
    if (notesPool.value.length < 20) {
      createNote();
    }
  }, 800);
  
  onUnmounted(() => {
    cancelAnimationFrame(animationFrame);
    clearInterval(interval);
  });
});
</script>

<style scoped>
.notes-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 40;
}
</style>