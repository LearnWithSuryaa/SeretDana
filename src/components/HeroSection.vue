<template>
  <section
    class="relative py-24 px-6 md:px-12 text-center text-white overflow-hidden bg-gray-900 rounded-b-[3rem] md:rounded-b-[5rem]"
    @mousemove="handleMouseMove"
    @mouseenter="cursorVisible = true"
    @mouseleave="cursorVisible = false"
  >
    <!-- Background -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-800 via-purple-800 to-indigo-900 opacity-80"
      ></div>
      <div class="absolute inset-0 backdrop-blur-md bg-white/5"></div>
      <svg
        class="w-full h-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 40 0 L 0 0 0 40" stroke="white" stroke-width="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <!-- Hero Content -->
    <div class="relative z-10 container mx-auto max-w-4xl">
      <h1
        class="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight"
      >
        Dompet Aman, Kuliah Lancar! <br class="hidden sm:block" />
        <span class="text-yellow-300">Catat Uang Harian Anti Ribet.</span>
      </h1>
      <p class="text-lg md:text-xl mb-10 opacity-90">
        Aplikasi keuangan harian yang dirancang khusus untuk mahasiswa rantau.
        Bikin kamu melek finansial, bebas drama akhir bulan, dan bisa nabung
        buat masa depan!
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="/auth"
          class="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-50 hover:scale-105 transition duration-300"
        >
          Gaspol, Cobain Gratis!
        </a>
        <a
          href="#how-it-works"
          @click.prevent="scrollToSection('how-it-works')"
          class="border border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 hover:scale-105 transition duration-300"
        >
          Intip Fitur Kerennya
        </a>
      </div>
    </div>

    <!-- Cursor Glow -->
    <div
      v-if="cursorVisible"
      class="pointer-events-none fixed top-0 left-0 w-36 h-36 rounded-full z-50 transition-transform duration-75"
      :style="{
        transform: `translate(${cursor.x}px, ${cursor.y}px)`,
        background:
          'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(250,204,21,0.5) 40%, transparent 100%)',
        filter: 'blur(50px)',
        opacity: 1,
      }"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";

const cursor = ref({ x: 0, y: 0 });
const cursorVisible = ref(false);

const handleMouseMove = (e) => {
  cursor.value = {
    x: e.clientX - 72, 
    y: e.clientY - 72,
  };
};

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};
</script>

<style scoped>
@media (max-width: 768px) {
  .pointer-events-none {
    display: none;
  }
}
</style>
