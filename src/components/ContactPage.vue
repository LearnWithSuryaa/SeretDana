<template>
  <div
    class="relative container mx-auto p-6 md:p-10 bg-white text-gray-800 rounded-3xl shadow-2xl my-12 animate-fadeIn transition-all overflow-hidden"
  >
    <!-- Tombol Back -->
    <button
      @click="goBack"
      class="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-transform hover:scale-105 cursor-pointer"
    >
      <span class="bg-blue-100 p-2 rounded-full">
        <ArrowLeftIcon class="w-5 h-5 text-blue-500" />
      </span>
      <span class="underline font-medium">Kembali</span>
    </button>

    <!-- Judul & Metadata -->
    <header class="relative z-10 text-center mb-12 space-y-4">
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 flex justify-center items-center gap-3">
        <ChatBubbleLeftRightIcon class="w-9 h-9 text-blue-500 animate-bounce-slow" />
        Hubungi Kami
      </h1>
      <p class="text-sm text-gray-500 flex justify-center items-center gap-2">
        <ClockIcon class="w-4 h-4 text-yellow-500" />
        <strong class="font-medium">Terakhir Diperbarui:</strong> 23 Juli 2025
      </p>
    </header>

    <!-- Intro -->
    <p class="mb-4 text-gray-700 leading-relaxed text-center">
      Kami senang mendengar dari Anda! Jika Anda memiliki pertanyaan, masukan,
      atau membutuhkan bantuan terkait <span class="font-semibold text-blue-600">Seret Dana</span>, hubungi kami melalui WhatsApp resmi.
    </p>
    <p class="mb-8 text-gray-700 leading-relaxed text-center">
      Tim kami akan merespons secepat mungkin selama jam operasional.
    </p>

    <!-- WhatsApp Box -->
    <div class="bg-blue-50 p-6 rounded-xl shadow-inner border border-blue-200 mb-8">
      <h2 class="text-xl font-semibold text-blue-800 mb-2 flex items-center gap-2">
        <PhoneArrowUpRightIcon class="w-6 h-6 text-blue-500" />
        WhatsApp Resmi
      </h2>
      <p class="text-gray-800">
        Klik untuk menghubungi:
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
    <h2 class="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
      <ClockIcon class="w-6 h-6 text-yellow-500" />
      Jam Operasional Dukungan
    </h2>
    <ul class="list-disc pl-5 text-gray-700 space-y-1 mb-6">
      <li>Senin - Jumat: 09.00 - 17.00 WIB</li>
      <li>Sabtu - Minggu: Tutup (respon terbatas jika darurat)</li>
    </ul>

    <p class="mt-8 text-center text-gray-700 italic">
      Terima kasih telah menggunakan <span class="font-bold text-blue-600">Seret Dana</span> —
      kami selalu siap membantu Anda! 🚀
    </p>
  </div>
</template>

<script setup>
import {
  ChatBubbleLeftRightIcon,
  PhoneArrowUpRightIcon,
  ClockIcon,
  ArrowLeftIcon,
} from "@heroicons/vue/24/solid";

const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 2s infinite;
}
</style>
