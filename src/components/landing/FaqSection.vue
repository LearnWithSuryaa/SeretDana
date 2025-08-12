<template>
  <section
    id="faq"
    class="py-20 px-6 md:px-12 bg-gradient-to-b from-white via-gray-50 to-white relative z-10"
  >
    <div class="container mx-auto max-w-3xl">
      <h2
        class="text-3xl md:text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text py-1"
        data-aos="fade-up"
      >
        Pertanyaan Sering Diajukan (FAQ)
      </h2>

      <div class="space-y-6">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <details class="group">
            <summary
              class="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800 transition-colors group-open:text-purple-600"
            >
              {{ faq.question }}
              <span
                class="ml-4 transition-transform duration-300 group-open:rotate-180 text-purple-500"
              >
                <ChevronDownIcon class="w-5 h-5" />
              </span>
            </summary>
            <p class="mt-4 text-gray-600 leading-relaxed">
              {{ faq.answer }}
            </p>
          </details>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/24/solid";
import AOS from "aos";
import "aos/dist/aos.css";

const faqs = [
  {
    question: "Apakah Fluidana gratis?",
    answer:
      "Ya, Fluidana dapat digunakan secara gratis dengan fitur dasar yang lengkap untuk pencatatan keuangan harian. Mungkin akan ada fitur premium di masa depan, namun fitur inti akan selalu gratis.",
  },
  {
    question: "Bagaimana Fluidana menjaga keamanan data saya?",
    answer:
      "Kami menggunakan teknologi enkripsi standar industri dan mengandalkan infrastruktur keamanan dari Supabase untuk melindungi data Anda. Data Anda tidak akan pernah dibagikan kepada pihak ketiga tanpa izin Anda.",
  },
  {
    question: "Apakah Fluidana tersedia di mobile?",
    answer:
      "Fluidana didesain responsif dan dapat diakses dengan baik melalui browser di perangkat mobile Anda. Kami sedang merencanakan pengembangan aplikasi native di masa depan!",
  },
];

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });
});
</script>

<style scoped>
/* Opsional: memperhalus transisi open/close FAQ */
details[open] summary ~ * {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
