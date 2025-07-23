<template>
  <section
    id="demo"
    class="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 py-20 px-6 md:px-12 text-center"
  >
    <div class="container mx-auto max-w-5xl relative z-10">
      <!-- Judul -->
      <h2 class="text-3xl md:text-4xl font-extrabold mb-6 gen-z-text-gradient animate-on-scroll">
        Lihat Seret Dana Beraksi!
      </h2>
      <p
        class="text-lg text-gray-700 mb-14 max-w-2xl mx-auto animate-on-scroll delay-100"
      >
        Saksikan bagaimana Seret Dana memudahkan pencatatan keuangan harianmu dengan antarmuka yang intuitif dan fungsional.
      </p>

      <!-- Demo Steps -->
      <div class="space-y-24">
        <!-- Langkah 1 -->
        <div class="flex flex-col md:flex-row items-center gap-10 animate-on-scroll delay-200">
          <div class="md:w-1/2 text-center md:text-left">
            <h3 class="text-2xl font-semibold mb-4 text-blue-600">
              1. Catat Transaksi Cepat & Akurat
            </h3>
            <p class="text-gray-700 leading-relaxed">
              Input pemasukan atau pengeluaranmu hanya dalam beberapa detik. Pilih kategori, masukkan jumlah, dan tambahkan deskripsi. Semudah itu!
            </p>
          </div>
          <div class="md:w-1/2 w-full">
            <img
              src="/input-transaksi.png"
              alt="Screenshot Input Transaksi"
              class="w-full rounded-2xl shadow-xl border-4 border-blue-300 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <!-- Langkah 2 -->
        <div class="flex flex-col md:flex-row-reverse items-center gap-10 animate-on-scroll delay-300">
          <div class="md:w-1/2 text-center md:text-right">
            <h3 class="text-2xl font-semibold mb-4 text-green-600">
              2. Pantau Ringkasan Keuanganmu
            </h3>
            <p class="text-gray-700 leading-relaxed">
              Lihat saldo terkini, transaksi terbaru, dan ringkasan pengeluaranmu di satu tempat. Dashboard yang bersih membantumu tetap fokus.
            </p>
          </div>
          <div class="md:w-1/2 w-full">
            <img
              src="/dashboard-overview.png"
              alt="Screenshot Dashboard Overview"
              class="w-full rounded-2xl shadow-xl border-4 border-green-300 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <!-- Langkah 3 -->
        <div class="flex flex-col md:flex-row items-center gap-10 animate-on-scroll delay-400">
          <div class="md:w-1/2 text-center md:text-left">
            <h3 class="text-2xl font-semibold mb-4 text-purple-600">
              3. Analisis Anggaran Visual & Mudah
            </h3>
            <p class="text-gray-700 leading-relaxed">
              Pahami pola pengeluaranmu dengan grafik yang mudah dimengerti. Identifikasi area di mana kamu bisa berhemat dan capai tujuan finansialmu.
            </p>
          </div>
          <div class="md:w-1/2 w-full">
            <img
              src="/budget-analytics.png"
              alt="Screenshot Budget Analytics"
              class="w-full rounded-2xl shadow-xl border-4 border-purple-300 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="mt-20">
        <a
          href="/auth"
          class="gen-z-gradient text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:opacity-90 hover:scale-105 transition duration-300 inline-block"
        >
          Coba Aplikasi Sekarang!
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gen-z-gradient {
  background: linear-gradient(135deg, #6EE7B7, #3B82F6, #9333EA);
}
.gen-z-text-gradient {
  background-image: linear-gradient(45deg, #6EE7B7, #3B82F6, #9333EA);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Scroll animations */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Delay classes for staggered animations */
.delay-100 { transition-delay: 0.1s; }
.delay-200 { transition-delay: 0.2s; }
.delay-300 { transition-delay: 0.3s; }
.delay-400 { transition-delay: 0.4s; }
</style>
