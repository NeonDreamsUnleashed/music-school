<template>
  <section id="about-section" class="py-28 px-4 relative">
    <div class="max-w-6xl mx-auto">
      <div class="bg-black/70 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-white/10 shadow-2xl">
        <h2 class="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 custom-font">
          О нас
        </h2>
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p class="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
              Основанная в 2077 году под вдохновением самого Джонни Сильверхенда, наша школа стала культовым местом для всех поклонников рока.
            </p>
            <p class="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
              Наши преподаватели - настоящие рок-звёзды с многолетним опытом выступлений на крупнейших сценах мира.
            </p>
            <div class="flex flex-wrap gap-4 mt-8">
              <button 
                @click="navigateTo('/teachers')"
                class="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-full text-white font-medium transition-all"
              >
                Наши преподаватели
              </button>
              <button 
                @click="navigateTo('/students')"
                class="px-6 py-2 border border-white/30 hover:bg-white/10 rounded-full text-white font-medium transition-all"
              >
                Стать студентом музыкальной школы
              </button>
            </div>
          </div>
          <div class="relative">
            <img 
              :src="imageSrc" 
              alt="Рок-музыканты" 
              class="w-full h-auto rounded-lg shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
            >
            <div class="absolute -bottom-6 -left-6 bg-yellow-500/90 text-black px-4 py-2 rounded-lg font-bold">
              С 2077 года
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import photo1 from '@/assets/gallery/photo1.png';
import { useRouter } from 'vue-router';

const imageSrc = photo1;
const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};
</script>