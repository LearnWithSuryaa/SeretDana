<template>
  <section id="demo" class="relative overflow-hidden bg-gradient-to-b from-sky-950 via-indigo-950 to-purple-950 py-24 px-6 md:px-12 text-white">
    <!-- Top Decorative Wave -->
    <div class="absolute top-0 left-0 w-full z-0">
      <svg viewBox="0 0 1440 200" class="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="url(#waveGradient)"
          d="M0,160 C360,80 1080,240 1440,120 L1440,0 L0,0 Z"
          opacity="0.4"
        />
        <defs>
          <linearGradient id="waveGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="100%" stop-color="#9333ea"/>
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- Container -->
    <div class="relative z-10 max-w-6xl mx-auto text-center">
      <!-- Header -->
      <h2 class="text-4xl md:text-5xl font-extrabold mb-6 gen-z-text-gradient">
        Demo Aplikasi Fluidana
      </h2>
      <p class="text-lg text-white/80 mb-16 max-w-2xl mx-auto">
        Rasakan langsung kemudahan mencatat dan memahami keuanganmu dengan antarmuka yang jernih dan mengalir.
      </p>

      <!-- Demo Steps -->
      <div class="grid md:grid-cols-3 gap-10">
        <!-- Step Card -->
        <div v-for="(step, index) in steps" :key="index" class="bg-white/5 rounded-2xl p-6 shadow-xl hover:scale-[1.03] transition transform duration-300 backdrop-blur-sm">
          <div class="mb-4 rounded-xl overflow-hidden border border-white/20 shadow-lg">
            <video
              autoplay
              loop
              muted
              playsinline
              class="w-full h-56 object-cover"
            >
              <source :src="step.video" type="video/mp4" />
            </video>
          </div>
          <h3 :class="`text-xl font-semibold mb-2 ${step.color}`">{{ step.title }}</h3>
          <p class="text-sm text-white/80">{{ step.desc }}</p>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-20">
        <a
          href="/auth"
          class="inline-block bg-gradient-to-r from-sky-400 to-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition duration-300"
        >
          Coba Fluidana Sekarang
        </a>
      </div>
    </div>

    <!-- Bottom Decorative Wave -->
    <div class="absolute bottom-0 left-0 w-full z-0 rotate-180">
      <svg viewBox="0 0 1440 200" class="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="url(#waveGradientBottom)"
          d="M0,160 C360,80 1080,240 1440,120 L1440,0 L0,0 Z"
          opacity="0.4"
        />
        <defs>
          <linearGradient id="waveGradientBottom" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="100%" stop-color="#9333ea"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    title: 'Catat Transaksi',
    desc: 'Masukkan pengeluaran atau pemasukanmu secara instan, kapan pun dibutuhkan.',
    video: 'https://videocdn.cdnpk.net/videos/72d0d679-cb78-4bf7-8fa1-ffbbbb06764c/horizontal/previews/clear/small.mp4?token=exp=1753345332~hmac=53bb3c2214a9d088bc7e74688059e67b3e32031ef55c764e942551216a645af8',
    color: 'text-blue-300'
  },
  {
    title: 'Pantau Dashboard',
    desc: 'Lihat ringkasan saldo, grafik harian, dan kategori utama dengan jelas.',
    video: 'https://videocdn.cdnpk.net/videos/72d0d679-cb78-4bf7-8fa1-ffbbbb06764c/horizontal/previews/clear/small.mp4?token=exp=1753345332~hmac=53bb3c2214a9d088bc7e74688059e67b3e32031ef55c764e942551216a645af8',
    color: 'text-teal-300'
  },
  {
    title: 'Analisis Pola',
    desc: 'Identifikasi pola boros dan temukan potensi penghematan lewat visualisasi.',
    video: 'https://videocdn.cdnpk.net/videos/72d0d679-cb78-4bf7-8fa1-ffbbbb06764c/horizontal/previews/clear/small.mp4?token=exp=1753345332~hmac=53bb3c2214a9d088bc7e74688059e67b3e32031ef55c764e942551216a645af8',
    color: 'text-purple-300'
  }
];
</script>

<style scoped>
.gen-z-text-gradient {
  background-image: linear-gradient(45deg, #6ee7b7, #3b82f6, #9333ea);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
