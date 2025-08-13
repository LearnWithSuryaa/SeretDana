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
          Syarat dan Ketentuan Penggunaan Fluidana
        </h1>
        <p class="text-sm text-gray-600 flex justify-center items-center gap-1">
          <ClockIcon class="w-4 h-4 text-gray-600" />
          <strong>Terakhir Diperbarui:</strong> 23 Juli 2025
        </p>
      </header>

      <!-- Konten Utama -->
      <section class="relative space-y-12 text-base md:text-lg leading-relaxed px-2 md:px-6 text-gray-800">
        <p class="border-b border-gray-200 pb-8 italic">
          Selamat datang di Fluidana. Dokumen Syarat dan Ketentuan Penggunaan
          ("Syarat") ini mengatur akses serta pemakaian Anda terhadap aplikasi
          dan layanan kami ("Layanan"). Dengan mengakses dan/atau menggunakan
          Layanan kami, Anda secara tegas menyatakan persetujuan Anda untuk terikat
          oleh seluruh Syarat yang berlaku. Apabila Anda tidak menyetujui
          bagian mana pun dari Syarat ini, Anda tidak diperkenankan menggunakan
          Layanan kami.
        </p>

        <!-- Section Loop -->
        <div v-for="(section, index) in sections" :key="index" data-aos="fade-up" :data-aos-delay="100 + (index * 50)">
          <h2
            :class="section.color + ' flex items-center gap-3 text-2xl md:text-3xl font-bold mb-3'"
          >
            <component :is="section.icon" class="w-6 h-6" />
            {{ section.title }}
          </h2>
          <div v-html="section.content" class="space-y-4"></div>
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
  UserIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
  KeyIcon,
  ShieldCheckIcon,
  InboxArrowDownIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  BanknotesIcon,
  PhoneIcon,
  ClockIcon,
  ArrowLeftIcon,
} from "@heroicons/vue/24/outline";

const sections = [
  {
    title: "1. Penerimaan Syarat",
    icon: ShieldCheckIcon,
    color: "text-gray-800",
    content: `
      <p>Dengan mengakses dan/atau menggunakan Layanan kami, Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat pada seluruh Syarat ini, termasuk Kebijakan Privasi kami.</p>
    `,
  },
  {
    title: "2. Perubahan Syarat",
    icon: DocumentDuplicateIcon,
    color: "text-gray-800",
    content: `
      <p>Kami berhak, atas diskresi tunggal kami, untuk memodifikasi atau mengganti Syarat ini kapan saja. Apabila terdapat perubahan material, kami akan memberikan pemberitahuan sekurang-kurangnya 30 hari sebelum Syarat baru berlaku.</p>
    `,
  },
  {
    title: "3. Kelayakan Akun Pengguna",
    icon: UserIcon,
    color: "text-gray-800",
    content: `
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Usia:</strong> Pengguna harus berusia minimal 17 tahun untuk dapat menggunakan Layanan kami.</li>
        <li><strong>Keamanan Akun:</strong> Anda sepenuhnya bertanggung jawab untuk menjaga kerahasiaan kredensial akun Anda.</li>
        <li><strong>Tanggung Jawab:</strong> Anda bertanggung jawab penuh atas semua data keuangan dan aktivitas yang dilakukan melalui akun Anda.</li>
      </ul>
    `,
  },
  {
    title: "4. Penggunaan Layanan",
    icon: Cog6ToothIcon,
    color: "text-gray-800",
    content: `
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Lisensi:</strong> Kami memberikan lisensi terbatas untuk penggunaan Layanan secara pribadi dan non-komersial.</li>
        <li><strong>Larangan Penggunaan:</strong> Layanan tidak boleh digunakan untuk aktivitas ilegal atau tindakan yang merusak sistem.</li>
        <li><strong>Akurasi Data:</strong> Pengguna bertanggung jawab penuh atas keakuratan dan validitas data keuangan yang diinput.</li>
      </ul>
    `,
  },
  {
    title: "5. Konten Pengguna",
    icon: InboxArrowDownIcon,
    color: "text-gray-800",
    content: `
      <p>Anda bertanggung jawab penuh atas semua data dan informasi yang Anda unggah atau sampaikan melalui Layanan kami.</p>
    `,
  },
  {
    title: "6. Kekayaan Intelektual",
    icon: BanknotesIcon,
    color: "text-gray-800",
    content: `
      <p>Layanan serta seluruh konten, fitur, dan fungsionalitasnya adalah milik eksklusif Fluidana dan pemberi lisensinya, dilindungi oleh undang-undang kekayaan intelektual yang berlaku.</p>
    `,
  },
  {
    title: "7. Penghentian Akun",
    icon: XCircleIcon,
    color: "text-gray-800",
    content: `
      <p>Kami berhak untuk menangguhkan atau menghentikan akses Anda ke Layanan kapan saja, tanpa pemberitahuan sebelumnya, jika ditemukan adanya pelanggaran terhadap Syarat ini.</p>
    `,
  },
  {
    title: "8. Batasan Tanggung Jawab",
    icon: ExclamationTriangleIcon,
    color: "text-gray-800",
    content: `
      <p>Fluidana, sejauh yang diperbolehkan oleh hukum, tidak bertanggung jawab atas kerugian tidak langsung, insidental, khusus, atau konsekuensial, termasuk namun tidak terbatas pada kehilangan keuntungan atau data, yang timbul dari penggunaan Layanan.</p>
    `,
  },
  {
    title: "9. Hukum yang Mengatur",
    icon: KeyIcon,
    color: "text-gray-800",
    content: `
      <p>Syarat ini akan diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia.</p>
    `,
  },
  {
    title: "10. Informasi Kontak",
    icon: PhoneIcon,
    color: "text-gray-800",
    content: `
      <p>Untuk pertanyaan atau masalah terkait Syarat ini, silakan hubungi kami melalui:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>
          WhatsApp: <a href="https://wa.me/6281232052919" class="text-blue-600 hover:underline">+62 812 3205 2919</a>
        </li>
      </ul>
    `,
  },
];

const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
/*
 * Menghilangkan gaya gradien sebelumnya agar tampilan lebih bersih
 */
.gen-z-text-gradient {
  /* Hapus semua properti gradien */
  background: none;
  -webkit-background-clip: unset;
  background-clip: unset;
  color: unset;
}
</style>
