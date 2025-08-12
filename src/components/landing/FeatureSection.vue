<template>
  <section
    id="features"
    class="relative bg-gradient-to-br from-blue-50 via-white to-sky-100 py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
  >
    <!-- Background SVG Wave -->
    <div
      class="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30"
    >
      <svg
        class="w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#bfdbfe"
          fill-opacity="1"
          d="M0,192L80,192C160,192,320,192,480,181.3C640,171,800,149,960,149.3C1120,149,1280,171,1360,181.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto text-center">
      <h2
        class="text-4xl md:text-5xl font-bold mb-20 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-500 drop-shadow-md transition-all duration-1000 ease-out py-2"
      >
        Mengelola Keuangan Tanpa Ribet
      </h2>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto mb-20 leading-relaxed">
        Fitur-fitur unggulan kami dirancang untuk memudahkan kamu mencatat
        transaksi, menetapkan target keuangan, dan menjaga keamanan data.
      </p>

      <!-- Feature Cards -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <FeatureCard
          title="Pencatatan Mudah"
          description="Catat pemasukan dan pengeluaran harianmu dengan sekali klik."
          icon="/assets/Finance-cuate.svg"
          :delay="100"
        />

        <FeatureCard
          title="Manajemen Target"
          description="Buat dan capai target finansialmu dengan lebih mudah."
          icon="/assets/Goal-bro.svg"
          :delay="200"
        />

        <FeatureCard
          title="Keamanan Data"
          description="Data kamu tersimpan aman dengan autentikasi ganda."
          icon="/assets/Security-amico.svg"
          :delay="300"
        />

        <FeatureCard
          title="Bisa Diakses Kapan Saja"
          description="Cek dan kelola keuanganmu dari mana saja dan kapan saja."
          icon="/assets/At the office-cuate.svg"
          :delay="400"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import FeatureCard from "./FeatureCard.vue";
</script>
