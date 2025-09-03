<template>
  <section
    id="why-us"
    class="relative py-28 px-6 md:px-12 overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-100 z-10"
  >
    <!-- Background Dekoratif SVG -->
    <div class="absolute inset-0 -z-10">
      <svg
        class="absolute top-0 left-0 w-full h-[300px] opacity-20"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#c4b5fd"
          fill-opacity="0.3"
          d="M0,96L80,101.3C160,107,320,117,480,112C640,107,800,85,960,90.7C1120,96,1280,128,1360,144L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        />
      </svg>
    </div>

    <div class="max-w-6xl mx-auto text-center">
      <h2
        class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-20 leading-tight"
        data-aos="fade-up"
      >
        Mengapa
        <span
          class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
        >Fluidana</span>
        Cocok untuk Mahasiswa Rantau?
      </h2>

      <!-- Cards -->
      <div class="grid md:grid-cols-2 gap-10 relative z-10">
        <!-- Card 1 -->
        <div
          class="bg-white p-8 rounded-3xl shadow-2xl relative hover:shadow-indigo-300/30 hover:scale-[1.02] transition duration-300 group"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div
            class="absolute -top-6 -left-6 w-14 h-14 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shadow-md"
          >
            <SparklesIcon class="w-7 h-7" />
          </div>
          <h3 class="text-xl font-semibold text-sky-600 mt-8 mb-3">
            Desain Intuitif & Ramah Gen Z
          </h3>
          <p class="text-gray-700 text-sm leading-relaxed">
            Fluidana didesain dengan antarmuka yang modern, fokus, dan bebas
            gangguan. Cocok untuk kamu yang punya jadwal padat.
          </p>
        </div>

        <!-- Card 2 -->
        <div
          class="bg-white p-8 rounded-3xl shadow-2xl relative hover:shadow-green-300/30 hover:scale-[1.02] transition duration-300 group md:-mt-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div
            class="absolute -top-6 -left-6 w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-md"
          >
            <AcademicCapIcon class="w-7 h-7" />
          </div>
          <h3 class="text-xl font-semibold text-green-600 mt-8 mb-3">
            Fokus pada Kebutuhan Mahasiswa
          </h3>
          <p class="text-gray-700 text-sm leading-relaxed">
            Fluidana mengerti kondisi finansial mahasiswa rantau. Dari uang
            saku hingga pengeluaran harian, semua bisa kamu lacak dengan
            simpel.
          </p>
        </div>

        <!-- Card 3 -->
        <div
          class="bg-white p-8 rounded-3xl shadow-2xl relative hover:shadow-purple-300/30 hover:scale-[1.02] transition duration-300 group md:col-span-2 md:-mt-8"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div
            class="absolute -top-6 -left-6 w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shadow-md"
          >
            <LightBulbIcon class="w-7 h-7" />
          </div>
          <h3 class="text-xl font-semibold text-purple-600 mt-8 mb-3">
            Edukasi Finansial Ringan
          </h3>
          <p class="text-gray-700 text-sm leading-relaxed max-w-2xl mx-auto">
            Fluidana bukan hanya alat pencatat, tapi juga sahabat finansial.
            Memberikan insight sederhana yang membantu kamu membentuk
            kebiasaan sehat secara perlahan.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { SparklesIcon, AcademicCapIcon, LightBulbIcon } from '@heroicons/vue/24/solid'

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-cubic',
  })
})
</script>
