<template>
  <section id="demo" class="py-16 px-6 md:px-12 text-center mt-10 relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
    <div class="container mx-auto max-w-5xl relative z-10">
      <h2 class="text-3xl md:text-4xl font-bold mb-8 gen-z-text-gradient animate-on-scroll">Lihat Seret Dana Beraksi!</h2>
      <p class="text-lg text-gray-700 mb-12 max-w-2xl mx-auto animate-on-scroll delay-100">
        Saksikan bagaimana Seret Dana memudahkan pencatatan keuangan harianmu dengan antarmuka yang intuitif dan fungsional.
      </p>

      <div class="space-y-16">
        <!-- Demo Step 1: Catat Transaksi Cepat -->
        <div class="flex flex-col md:flex-row items-center md:space-x-12 animate-on-scroll delay-200">
          <div class="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
            <h3 class="text-2xl font-semibold mb-4 text-blue-600">1. Catat Transaksi Cepat & Akurat</h3>
            <p class="text-gray-700 leading-relaxed">
              Input pemasukan atau pengeluaranmu hanya dalam beberapa detik. Pilih kategori, masukkan jumlah, dan tambahkan deskripsi. Semudah itu!
            </p>
          </div>
          <div class="md:w-1/2 w-full">
            <img src="https://placehold.co/800x450/E0E7FF/3B82F6?text=Screenshot+Input+Transaksi" alt="Screenshot Input Transaksi"
                 class="w-full h-auto rounded-xl shadow-xl mx-auto border-4 border-blue-300 transform hover:scale-102 transition duration-300 ease-in-out">
          </div>
        </div>

        <!-- Demo Step 2: Pantau Ringkasan Keuangan -->
        <div class="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-12 animate-on-scroll delay-300">
          <div class="md:w-1/2 mb-8 md:mb-0 text-center md:text-right">
            <h3 class="text-2xl font-semibold mb-4 text-green-600">2. Pantau Ringkasan Keuanganmu</h3>
            <p class="text-gray-700 leading-relaxed">
              Lihat saldo terkini, transaksi terbaru, dan ringkasan pengeluaranmu di satu tempat. Dashboard yang bersih membantumu tetap fokus.
            </p>
          </div>
          <div class="md:w-1/2 w-full">
            <img src="https://placehold.co/800x450/D1FAE5/10B981?text=Screenshot+Dashboard+Overview" alt="Screenshot Dashboard Overview"
                 class="w-full h-auto rounded-xl shadow-xl mx-auto border-4 border-green-300 transform hover:scale-102 transition duration-300 ease-in-out">
          </div>
        </div>

        <!-- Demo Step 3: Analisis Anggaran Visual -->
        <div class="flex flex-col md:flex-row items-center md:space-x-12 animate-on-scroll delay-400">
          <div class="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
            <h3 class="text-2xl font-semibold mb-4 text-purple-600">3. Analisis Anggaran Visual & Mudah</h3>
            <p class="text-gray-700 leading-relaxed">
              Pahami pola pengeluaranmu dengan grafik yang mudah dimengerti. Identifikasi area di mana kamu bisa berhemat dan capai tujuan finansialmu.
            </p>
          </div>
          <div class="md:w-1/2 w-full">
            <img src="https://placehold.co/800x450/EEDCFF/8B5CF6?text=Screenshot+Budget+Analytics" alt="Screenshot Budget Analytics"
                 class="w-full h-auto rounded-xl shadow-xl mx-auto border-4 border-purple-300 transform hover:scale-102 transition duration-300 ease-in-out">
          </div>
        </div>
      </div>

      <div class="mt-16">
        <a href="/auth" class="gen-z-gradient text-white px-10 py-4 rounded-full text-xl font-semibold shadow-xl hover:opacity-90 transform hover:scale-105 transition duration-300 btn-primary">
          Coba Aplikasi Sekarang!
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped>
/* Consistent gradients from LandingPage */
.gen-z-gradient {
  background: linear-gradient(135deg, #6EE7B7, #3B82F6, #9333EA); /* Hijau Mint, Biru Cerah, Ungu Neon */
}
.gen-z-text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(45deg, #6EE7B7, #3B82F6, #9333EA);
}

/* Button hover effect */
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.2);
}

/* Base animation for elements that appear on scroll (reused from LandingPage) */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Delay animations for staggered effect */
.delay-100 { transition-delay: 0.1s; }
.delay-200 { transition-delay: 0.2s; }
.delay-300 { transition-delay: 0.3s; }
.delay-400 { transition-delay: 0.4s; }
</style>
