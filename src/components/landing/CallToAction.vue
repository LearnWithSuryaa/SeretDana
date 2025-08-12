<template>
  <section
    class="py-16 px-4 sm:px-6 md:px-12 text-center mt-10 relative overflow-hidden"
  >
    <!-- Soft background blobs -->
    <div
      class="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] bg-sky-300 opacity-30 rounded-full blur-3xl z-0"
      data-aos="zoom-in"
      data-aos-delay="100"
    ></div>
    <div
      class="absolute bottom-[-100px] right-[-100px] w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] bg-sky-300 opacity-30 rounded-full blur-3xl z-0"
      data-aos="zoom-in"
      data-aos-delay="200"
    ></div>

    <div
      class="container mx-auto max-w-xl sm:max-w-2xl bg-white px-6 sm:px-10 py-10 rounded-2xl shadow-lg relative z-10 border-4 border-sky-200"
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <h2
        class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 gen-z-text-gradient py-1"
      >
        Siap Bebas Drama Keuangan?
      </h2>
      <p
        class="text-base sm:text-lg text-gray-700 mb-8"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        Jangan tunda lagi! Mulai atur keuanganmu sekarang dan rasakan bedanya.
      </p>
      <a
        href="/auth"
        class="gen-z-gradient text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold shadow-xl hover:opacity-90 transform hover:scale-105 transition duration-300 btn-primary"
        data-aos="zoom-in"
        data-aos-delay="500"
      >
        Daftar Gratis Sekarang!
      </a>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

onMounted(() => {
  AOS.init({
    duration: 800, // durasi animasi
    once: true,    // hanya animasi sekali
    offset: 100,   // jarak trigger
  });
});
</script>

<style scoped>
.gen-z-text-gradient {
  background: linear-gradient(to right, #00d0ff, #2874ca);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gen-z-gradient {
  background: linear-gradient(to right, #00eaff, #2889ca);
}
</style>
