<template>
  <main
    class="relative container mx-auto p-6 md:p-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-3xl shadow-2xl my-12 animate-fadeIn transition-all overflow-hidden"
  >
    <!-- Tombol Back -->
    <button
      @click="goBack"
      class="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition-all cursor-pointer"
    >
      <ArrowLeftIcon class="w-5 h-5" />
      <span>Kembali</span>
    </button>

    <!-- Judul & Metadata -->
    <header class="relative z-10 text-center mb-12 space-y-4">
      <h1
        class="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 py-2 flex justify-center items-center gap-3"
      >
        <DocumentDuplicateIcon class="w-8 h-8 text-blue-500 animate-bounce-slow" />
        Syarat & Ketentuan Penggunaan Seret Dana
      </h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 flex justify-center items-center gap-1">
        <ClockIcon class="w-4 h-4 inline text-blue-500" />
        <strong>Terakhir Diperbarui:</strong> 23 Juli 2025
      </p>
    </header>

    <!-- Konten Utama -->
    <section class="relative z-10 space-y-12 text-base md:text-lg leading-relaxed">
      <div>
        <p>
          Selamat datang di Seret Dana! Syarat & Ketentuan Penggunaan ("Syarat")
          ini mengatur akses dan penggunaan Anda atas aplikasi dan layanan Seret
          Dana ("Layanan"). Dengan mengakses atau menggunakan Layanan kami, Anda
          setuju untuk terikat oleh Syarat ini. Jika Anda tidak setuju dengan
          bagian mana pun dari Syarat ini, Anda tidak boleh menggunakan Layanan
          kami.
        </p>
      </div>

      <!-- Section Loop -->
      <div v-for="(section, index) in sections" :key="index">
        <h2
          :class="section.color + ' flex items-center gap-3 text-2xl md:text-3xl font-bold mb-3'"
        >
          <component :is="section.icon" class="w-6 h-6" />
          {{ section.title }}
        </h2>
        <div v-html="section.content" class="space-y-4"></div>
      </div>
    </section>

    <p class="mt-10 text-center text-gray-700 dark:text-gray-300 italic">
      Terima kasih telah membaca. Kami berkomitmen menjaga transparansi demi kenyamanan Anda. 🚀
    </p>
  </main>
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
    color: "text-violet-600 dark:text-violet-400",
    content: `
      <p>Dengan membuat akun dan/atau menggunakan Layanan kami, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat ini, termasuk Kebijakan Privasi kami.</p>
    `,
  },
  {
    title: "2. Perubahan Syarat",
    icon: DocumentDuplicateIcon,
    color: "text-indigo-600 dark:text-indigo-400",
    content: `
      <p>Kami berhak, atas kebijakan tunggal kami, untuk memodifikasi atau mengganti Syarat ini kapan saja. Jika perubahan bersifat material, kami akan memberikan pemberitahuan setidaknya 30 hari sebelum Syarat baru berlaku.</p>
    `,
  },
  {
    title: "3. Akun Pengguna",
    icon: UserIcon,
    color: "text-blue-600 dark:text-blue-400",
    content: `
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Pendaftaran:</strong> Anda harus berusia minimal 17 tahun untuk menggunakan Layanan kami...</li>
        <li><strong>Keamanan Akun:</strong> Anda bertanggung jawab menjaga kerahasiaan akun Anda...</li>
        <li><strong>Tanggung Jawab:</strong> Anda bertanggung jawab penuh atas semua data keuangan yang dimasukkan.</li>
      </ul>
    `,
  },
  {
    title: "4. Penggunaan Layanan",
    icon: Cog6ToothIcon,
    color: "text-pink-600 dark:text-pink-400",
    content: `
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Lisensi:</strong> Lisensi terbatas untuk penggunaan pribadi & non-komersial.</li>
        <li><strong>Larangan:</strong> Tidak boleh digunakan untuk aktivitas ilegal atau merusak sistem.</li>
        <li><strong>Akurasi Data:</strong> Pengguna bertanggung jawab atas akurasi input data keuangan.</li>
      </ul>
    `,
  },
  {
    title: "5. Konten Pengguna",
    icon: InboxArrowDownIcon,
    color: "text-cyan-600 dark:text-cyan-400",
    content: `
      <p>Anda bertanggung jawab penuh atas semua data & informasi yang Anda unggah melalui Layanan.</p>
    `,
  },
  {
    title: "6. Kekayaan Intelektual",
    icon: BanknotesIcon,
    color: "text-emerald-600 dark:text-emerald-400",
    content: `
      <p>Layanan dan seluruh kontennya adalah milik eksklusif Seret Dana dan pemberi lisensinya.</p>
    `,
  },
  {
    title: "7. Penghentian",
    icon: XCircleIcon,
    color: "text-red-600 dark:text-red-400",
    content: `
      <p>Kami dapat menghentikan akses Anda ke layanan kapan saja jika melanggar syarat ini.</p>
    `,
  },
  {
    title: "8. Batasan Tanggung Jawab",
    icon: ExclamationTriangleIcon,
    color: "text-yellow-600 dark:text-yellow-400",
    content: `
      <p>Seret Dana tidak bertanggung jawab atas kerugian tidak langsung, kehilangan data, dan lainnya.</p>
    `,
  },
  {
    title: "9. Hukum yang Mengatur",
    icon: KeyIcon,
    color: "text-gray-700 dark:text-gray-300",
    content: `
      <p>Syarat ini tunduk pada hukum Republik Indonesia.</p>
    `,
  },
  {
    title: "10. Hubungi Kami",
    icon: PhoneIcon,
    color: "text-blue-500 dark:text-blue-300",
    content: `
      <ul class="list-disc list-inside space-y-2">
        <li>
          WhatsApp: <a href="https://wa.me/6281232052919" class="text-blue-600 dark:text-blue-400 hover:underline">+62 812 3205 2919</a>
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
