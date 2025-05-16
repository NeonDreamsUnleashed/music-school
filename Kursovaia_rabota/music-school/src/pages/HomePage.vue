<template>
  <div class="relative min-h-screen">
    <BackgroundLayer :scroll-y="scrollY" />
    <Header class="relative z-30" />
    
    <main class="relative z-20">
      <HeroSection @scroll-to-about="scrollToAbout" />
      <AboutSection ref="aboutSection" :image-src="photo1" />
      <GallerySection :photos="galleryPhotos" />
      <ContactForm />
    </main>
    
    <Footer class="relative z-10" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import BackgroundLayer from '@/components/home/BackgroundLayer.vue';
import HeroSection from '@/components/home/HeroSection.vue';
import AboutSection from '@/components/home/AboutSection.vue';
import GallerySection from '@/components/home/GallerySection.vue';
import ContactForm from '@/components/home/ContactForm.vue';

import photo1 from '@/assets/gallery/photo1.png';
import photo2 from '@/assets/gallery/photo2.png';
import photo3 from '@/assets/gallery/photo3.png';
import photo4 from '@/assets/gallery/photo4.png';
import photo5 from '@/assets/gallery/photo5.png';
import photo6 from '@/assets/gallery/photo6.png';

const galleryPhotos = [photo1, photo2, photo3, photo4, photo5, photo6];
const scrollY = ref(0);
const aboutSection = ref<HTMLElement | null>(null);

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

const scrollToAbout = () => {
  aboutSection.value?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  aboutSection.value = document.getElementById('about-section');
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap');

.custom-font {
  font-family: 'Rock Salt', cursive;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradientBG 5s ease infinite;
}

section > div {
  animation: fade-in 0.5s ease-out forwards;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>