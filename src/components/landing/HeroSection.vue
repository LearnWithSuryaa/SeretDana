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
        class="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 opacity-90"
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
        data-aos="fade-up"
      >
        Atur Keuangan, Hidup Tenang. <br class="hidden sm:block" />
        <span class="text-blue-400">Fluidana, Mengalirkan Kendali Uangmu.</span>
      </h1>
      <p
        class="text-lg md:text-xl mb-10 text-gray-300"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Fluidana adalah aplikasi keuangan harian untuk mahasiswa rantau. Catat
        pengeluaran, kontrol anggaran, dan wujudkan tabungan masa depan — semua dalam satu alur yang simpel dan lancar.
      </p>
      <div
        class="flex flex-col sm:flex-row justify-center gap-4"
        data-aos="zoom-in"
        data-aos-delay="400"
      >
        <a
          href="/auth"
          class="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-100 hover:scale-105 transition duration-300"
        >
          Mulai Sekarang Gratis
        </a>
        <a
          href="#how-it-works"
          @click.prevent="scrollToSection('how-it-works')"
          class="border border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 hover:scale-105 transition duration-300"
        >
          Jelajahi Fiturnya
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
          'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(96,165,250,0.5) 40%, transparent 100%)',
        filter: 'blur(50px)',
        opacity: 1,
      }"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

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

onMounted(() => {
  AOS.init({
    duration: 900,
    easing: "ease-out-cubic",
    once: true,
  });
});
</script>

<style scoped>
@media (max-width: 768px) {
  .pointer-events-none {
    display: none;
  }
}
</style>
