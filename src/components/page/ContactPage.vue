<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 sm:p-6 font-serif bg-white"
  >
    <!-- Central Card with Minimalist Design -->
    <main
      class="relative bg-white rounded-xl w-full max-w-4xl p-8 lg:p-12"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <!-- Tombol Kembali -->
      <button
        @click="goBack"
        class="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ArrowLeftIcon class="w-5 h-5" />
        <span>Kembali</span>
      </button>

      <!-- Judul & Metadata -->
      <header class="relative text-center mb-12 space-y-4">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 py-2">
          Hubungi Kami
        </h1>
        <p class="text-sm text-gray-600 flex justify-center items-center gap-1">
          <ClockIcon class="w-4 h-4 text-gray-600" />
          <strong>Terakhir Diperbarui:</strong> 23 Juli 2025
        </p>
      </header>

      <!-- Intro -->
      <p class="mb-4 text-gray-700 leading-relaxed text-center" data-aos="fade-up" data-aos-delay="100">
        Kami senang mendengar dari Anda. Jika Anda memiliki pertanyaan atau membutuhkan
        bantuan terkait Fluidana, silakan hubungi kami melalui saluran resmi berikut.
      </p>
      <p class="mb-8 text-gray-700 leading-relaxed text-center" data-aos="fade-up" data-aos-delay="150">
        Tim kami akan merespons secepat mungkin selama jam operasional.
      </p>

      <!-- WhatsApp Box -->
      <div
        class="bg-gray-100 p-6 rounded-xl shadow-inner border border-gray-200 mb-8"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h2 class="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <PhoneArrowUpRightIcon class="w-6 h-6 text-gray-800" />
          Kontak WhatsApp
        </h2>
        <p class="text-gray-700">
          Untuk menghubungi kami secara langsung, klik tautan di bawah ini:
          <a
            href="https://wa.me/6281232052919"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 font-medium hover:underline transition-all hover:text-blue-800"
          >
            +62 812 3205 2919
          </a>
        </p>
      </div>

      <!-- Jam Operasional -->
      <div data-aos="fade-up" data-aos-delay="300">
        <h2 class="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <ClockIcon class="w-6 h-6 text-gray-800" />
          Jam Operasional Dukungan
        </h2>
        <ul class="list-disc pl-5 text-gray-700 space-y-1 mb-6">
          <li>Senin - Jumat: 09.00 - 17.00 WIB</li>
          <li>Sabtu - Minggu: Tutup (dengan respons terbatas untuk kasus darurat)</li>
        </ul>
      </div>

      <p class="mt-8 text-center text-gray-600 italic" data-aos="fade-up" data-aos-delay="400">
        Terima kasih telah menggunakan Fluidana — kami selalu siap membantu.
      </p>
    </main>
  </div>
</template>

<script setup>
import {
  ChatBubbleLeftRightIcon,
  PhoneArrowUpRightIcon,
  ClockIcon,
  ArrowLeftIcon,
} from "@heroicons/vue/24/outline"; // Menggunakan ikon outline untuk konsistensi

const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
/* Tidak ada CSS kustom tambahan, mengandalkan Tailwind CSS */
</style>
