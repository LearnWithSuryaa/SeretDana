<template>
  <main
    class="relative container mx-auto p-6 md:p-10 bg-gradient-to-br from-white via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 rounded-3xl shadow-2xl my-12 animate-fadeIn transition-all"
  >
    <!-- Tombol Back -->
    <button
      @click="goBack"
      class="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition-all cursor-pointer"
    >
      <ArrowLeftIcon class="w-5 h-5" />
      <span>Kembali</span>
    </button>

    <!-- Judul dan Metadata -->
    <header class="text-center mb-12 space-y-4">
      <h1
        class="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-500 dark:from-blue-400 dark:to-pink-400 py-2"
      >
        Kebijakan Privasi Seret Dana
      </h1>
      <p class="text-sm flex justify-center items-center gap-2 text-gray-500 dark:text-gray-400">
        <ShieldCheckIcon class="w-5 h-5 text-blue-500 dark:text-blue-400" />
        <span>
          <strong>Terakhir Diperbarui:</strong>
          <time datetime="2025-07-23">23 Juli 2025</time>
        </span>
      </p>
    </header>

    <!-- Isi Konten Kebijakan -->
    <section class="space-y-10 text-base md:text-lg leading-relaxed px-2 md:px-10">
      <p class="text-gray-700 dark:text-gray-300">
        Selamat datang di Seret Dana! Privasi Anda adalah prioritas kami. Halaman ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.
      </p>

      <div>
        <h2
          class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3 border-b pb-1 border-gray-300 dark:border-gray-700 flex items-center gap-2"
        >
          <InboxArrowDownIcon class="w-6 h-6 text-blue-500 dark:text-blue-400" />
          Informasi yang Kami Kumpulkan
        </h2>
        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>Informasi Pribadi:</strong> Nama, alamat email, dan data lain yang Anda berikan saat mendaftar.</li>
          <li><strong>Data Penggunaan:</strong> Informasi tentang bagaimana Anda menggunakan aplikasi, termasuk halaman yang dikunjungi dan interaksi Anda.</li>
        </ul>
      </div>

      <div>
        <h2
          class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3 border-b pb-1 border-gray-300 dark:border-gray-700 flex items-center gap-2"
        >
          <CursorArrowRaysIcon class="w-6 h-6 text-pink-500 dark:text-pink-400" />
          Penggunaan Informasi
        </h2>
        <p>Kami menggunakan data untuk:</p>
        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Meningkatkan kualitas layanan kami.</li>
          <li>Memberikan dukungan pengguna.</li>
          <li>Mengirim pembaruan dan informasi penting.</li>
        </ul>
      </div>

      <div>
        <h2
          class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3 border-b pb-1 border-gray-300 dark:border-gray-700 flex items-center gap-2"
        >
          <LockClosedIcon class="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
          Perlindungan Data
        </h2>
        <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasi untuk melindungi data Anda dari akses yang tidak sah atau penggunaan yang tidak sah.</p>
      </div>

      <div>
        <h2
          class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3 border-b pb-1 border-gray-300 dark:border-gray-700 flex items-center gap-2"
        >
          <UserCircleIcon class="w-6 h-6 text-violet-500 dark:text-violet-400" />
          Hak Anda
        </h2>
        <p>Anda memiliki hak untuk mengakses, memperbaiki, atau menghapus informasi pribadi Anda kapan saja melalui pengaturan akun atau menghubungi tim kami.</p>
      </div>

      <div>
        <h2
          class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3 border-b pb-1 border-gray-300 dark:border-gray-700 flex items-center gap-2"
        >
          <ArrowPathIcon class="w-6 h-6 text-amber-500 dark:text-amber-400" />
          Perubahan Kebijakan
        </h2>
        <p>Kami dapat memperbarui kebijakan ini dari waktu ke waktu. Setiap perubahan akan diumumkan di halaman ini.</p>
      </div>

      <div>
        <h2
          class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3 border-b pb-1 border-gray-300 dark:border-gray-700 flex items-center gap-2"
        >
          <EnvelopeIcon class="w-6 h-6 text-blue-500 dark:text-blue-400" />
          Kontak
        </h2>
        <p>
          Jika Anda memiliki pertanyaan tentang kebijakan ini, silakan hubungi kami di
          <a href="https://wa.me/6281232052919" class="text-blue-600 dark:text-blue-400 hover:underline">+62 8123-2082-919</a>.
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import {
  ArrowLeftIcon,
  ShieldCheckIcon,
  InboxArrowDownIcon,
  CursorArrowRaysIcon,
  LockClosedIcon,
  UserCircleIcon,
  ArrowPathIcon,
  EnvelopeIcon,
} from '@heroicons/vue/24/outline' // gunakan outline biar konsisten; ganti solid jika mau kontras

const goBack = () => {
  window.history.back()
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out both;
}
</style>
