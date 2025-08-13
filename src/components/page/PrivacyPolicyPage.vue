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
      <header class="text-center mb-12 space-y-4">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 py-2">
          Kebijakan Privasi Fluidana
        </h1>
        <p class="text-sm flex justify-center items-center gap-2 text-gray-600">
          <ShieldCheckIcon class="w-5 h-5 text-gray-600" />
          <span>
            <strong>Terakhir Diperbarui:</strong>
            <time datetime="2025-07-23">23 Juli 2025</time>
          </span>
        </p>
      </header>

      <!-- Isi Konten Kebijakan -->
      <section class="space-y-10 text-base md:text-lg leading-relaxed px-2 md:px-6 text-gray-800">
        <p class="border-b border-gray-200 pb-8 italic">
          Selamat datang di Fluidana! Privasi Anda adalah prioritas utama kami. Dokumen ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda secara cermat dan bertanggung jawab.
        </p>

        <div data-aos="fade-up" data-aos-delay="100">
          <h2
            class="text-2xl md:text-3xl font-bold text-gray-800 mb-3 border-b pb-1 border-gray-300 flex items-center gap-2"
          >
            <InboxArrowDownIcon class="w-6 h-6 text-gray-800" />
            Informasi yang Kami Kumpulkan
          </h2>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Informasi Identitas:</strong> Nama dan alamat email yang Anda berikan saat pendaftaran.</li>
            <li><strong>Data Penggunaan Layanan:</strong> Informasi mengenai interaksi Anda dengan aplikasi, seperti halaman yang diakses dan fitur yang digunakan, untuk tujuan analitik dan peningkatan performa.</li>
          </ul>
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <h2
            class="text-2xl md:text-3xl font-bold text-gray-800 mb-3 border-b pb-1 border-gray-300 flex items-center gap-2"
          >
            <CursorArrowRaysIcon class="w-6 h-6 text-gray-800" />
            Tujuan Penggunaan Informasi
          </h2>
          <p>Informasi yang kami kumpulkan digunakan untuk:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>Memproses akun dan menyediakan Layanan yang Anda minta.</li>
            <li>Melakukan analisis untuk terus meningkatkan kualitas dan fungsionalitas Layanan kami.</li>
            <li>Menyediakan dukungan teknis dan layanan pelanggan.</li>
            <li>Mengirimkan informasi penting terkait pembaruan Layanan dan pemberitahuan lainnya.</li>
          </ul>
        </div>

        <div data-aos="fade-up" data-aos-delay="300">
          <h2
            class="text-2xl md:text-3xl font-bold text-gray-800 mb-3 border-b pb-1 border-gray-300 flex items-center gap-2"
          >
            <LockClosedIcon class="w-6 h-6 text-gray-800" />
            Komitmen Perlindungan Data
          </h2>
          <p>Kami menerapkan langkah-langkah keamanan teknis dan administratif yang kuat untuk melindungi data pribadi Anda dari akses tidak sah, pengungkapan, atau modifikasi yang tidak semestinya.</p>
        </div>

        <div data-aos="fade-up" data-aos-delay="400">
          <h2
            class="text-2xl md:text-3xl font-bold text-gray-800 mb-3 border-b pb-1 border-gray-300 flex items-center gap-2"
          >
            <UserCircleIcon class="w-6 h-6 text-gray-800" />
            Hak Pengguna atas Data
          </h2>
          <p>Anda memiliki hak penuh untuk mengakses, mengoreksi, atau meminta penghapusan data pribadi Anda. Anda dapat mengelola data ini melalui pengaturan akun Anda atau dengan menghubungi tim dukungan kami secara langsung.</p>
        </div>

        <div data-aos="fade-up" data-aos-delay="500">
          <h2
            class="text-2xl md:text-3xl font-bold text-gray-800 mb-3 border-b pb-1 border-gray-300 flex items-center gap-2"
          >
            <ArrowPathIcon class="w-6 h-6 text-gray-800" />
            Revisi Kebijakan
          </h2>
          <p>Kami dapat melakukan pembaruan terhadap Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan segera dipublikasikan di halaman ini untuk memberikan transparansi penuh kepada Anda.</p>
        </div>

        <div data-aos="fade-up" data-aos-delay="600">
          <h2
            class="text-2xl md:text-3xl font-bold text-gray-800 mb-3 border-b pb-1 border-gray-300 flex items-center gap-2"
          >
            <EnvelopeIcon class="w-6 h-6 text-gray-800" />
            Hubungi Kami
          </h2>
          <p>
            Untuk pertanyaan, saran, atau keluhan seputar kebijakan ini, silakan hubungi tim kami melalui:
          </p>
          <a href="https://wa.me/6281232052919" class="text-blue-600 hover:underline">+62 812 3205 2919</a>
        </div>
      </section>

      <p class="mt-10 text-center text-gray-600 italic">
        Kami berterima kasih atas waktu yang Anda luangkan untuk membaca. Komitmen kami adalah menjaga transparansi demi kenyamanan dan keamanan Anda.
      </p>
    </main>
  </div>
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
} from '@heroicons/vue/24/outline';

const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
/*
 * Gaya font serif akan diterapkan dari class `font-serif` di elemen utama.
 * Kelas gradien yang tidak digunakan sudah dihapus untuk konsistensi.
 */
</style>
