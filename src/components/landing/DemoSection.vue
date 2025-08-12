<template>
  <section
    id="demo"
    class="relative overflow-hidden bg-gradient-to-b from-sky-950 via-indigo-950 to-purple-950 py-24 px-6 md:px-12 text-white"
  >
    <!-- Top Decorative Wave -->
    <div class="absolute top-0 left-0 w-full z-0">
      <svg
        viewBox="0 0 1440 200"
        class="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="url(#waveGradient)"
          d="M0,160 C360,80 1080,240 1440,120 L1440,0 L0,0 Z"
          opacity="0.4"
        />
        <defs>
          <linearGradient id="waveGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="100%" stop-color="#9333ea" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- Container -->
    <div class="relative z-10 max-w-6xl mx-auto text-center">
      <!-- Header -->
      <h2
        class="text-4xl md:text-5xl font-extrabold mb-6 gen-z-text-gradient"
        data-aos="fade-up"
      >
        Demo Aplikasi Fluidana
      </h2>
      <p
        class="text-lg text-white/80 mb-16 max-w-2xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        Rasakan langsung kemudahan mencatat dan memahami keuanganmu dengan
        antarmuka yang jernih dan mengalir.
      </p>

      <!-- Loading Spinner -->
      <div v-if="isLoading" class="flex justify-center items-center h-40">
        <div
          class="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"
        ></div>
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="text-red-400 text-sm mb-8"
        data-aos="fade-up"
      >
        {{ errorMessage }}
      </div>

      <!-- Demo Cards -->
      <div
        v-if="!isLoading && !errorMessage"
        class="grid md:grid-cols-3 gap-8"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div
          v-for="(step, index) in steps"
          :key="index"
          @click="openModal(step.video)"
          :data-aos="'zoom-in'"
          :data-aos-delay="index * 200"
          class="cursor-pointer relative group rounded-3xl overflow-hidden p-1 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl hover:scale-[1.02] transition-transform duration-500 backdrop-blur-xl"
        >
          <!-- Glow Border Animation -->
          <div
            class="absolute -inset-[2px] bg-gradient-to-br from-blue-400/40 to-purple-500/40 blur-xl opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none"
          ></div>

          <!-- Inner Card -->
          <div class="relative z-10 bg-white/5 rounded-[inherit] p-6 flex flex-col h-full">
            <!-- Video -->
            <div class="relative rounded-2xl overflow-hidden shadow-lg border border-white/10 mb-4">
              <video
                v-if="step.video"
                autoplay
                loop
                muted
                playsinline
                class="w-full aspect-video object-cover transition duration-300 group-hover:scale-105"
              >
                <source :src="step.video" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <!-- Title & Description -->
            <h3 :class="`text-xl font-semibold mb-2 ${step.color}`">
              {{ step.title }}
            </h3>
            <p class="text-sm text-white/80 flex-1">{{ step.desc }}</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div
        v-if="!isLoading"
        class="mt-20"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <a
          href="/auth"
          class="inline-block bg-gradient-to-r from-sky-400 to-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition duration-300"
        >
          Coba Fluidana Sekarang
        </a>
      </div>
    </div>

    <!-- Bottom Decorative Wave -->
    <div class="absolute bottom-0 left-0 w-full z-0 rotate-180">
      <svg
        viewBox="0 0 1440 200"
        class="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="url(#waveGradientBottom)"
          d="M0,160 C360,80 1080,240 1440,120 L1440,0 L0,0 Z"
          opacity="0.4"
        />
        <defs>
          <linearGradient id="waveGradientBottom" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="100%" stop-color="#9333ea" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- Video Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <div class="relative w-full max-w-4xl px-6">
        <!-- Close Button -->
        <button
          @click="closeModal"
          class="absolute top-2 right-4 text-white text-2xl hover:text-red-400 transition z-50"
          aria-label="Close"
        >
          &times;
        </button>

        <!-- Video Player -->
        <div
          class="rounded-xl overflow-hidden shadow-lg border border-white/10"
        >
          <video
            :src="selectedVideo"
            autoplay
            controls
            playsinline
            class="w-full h-auto max-h-[80vh] object-contain bg-black"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";
import supabase from "../../lib/supabaseClient";

const isLoading = ref(true);
const errorMessage = ref("");
const steps = ref([]);

const showModal = ref(false);
const selectedVideo = ref("");

function openModal(videoUrl) {
  selectedVideo.value = videoUrl;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedVideo.value = "";
}

onMounted(async () => {
  AOS.init({
    duration: 800,
    once: true,
    easing: "ease-out-cubic",
  });

  try {
    const filenames = ["step1.mp4", "step2.mp4", "step3.mp4"];
    const publicUrls = [];

    for (const name of filenames) {
      const { data, error } = supabase.storage.from("video").getPublicUrl(name);
      if (error || !data?.publicUrl) {
        console.error(`Gagal mengambil video: ${name}`, error);
        throw new Error(`Gagal mengambil video ${name}`);
      }
      publicUrls.push(data.publicUrl);
    }

    steps.value = [
      {
        title: "Catat Transaksi",
        desc: "Masukkan pengeluaran atau pemasukanmu secara instan, kapan pun dibutuhkan.",
        video: publicUrls[0],
        color: "text-blue-300",
      },
      {
        title: "Pantau Dashboard",
        desc: "Lihat ringkasan saldo, grafik harian, dan kategori utama dengan jelas.",
        video: publicUrls[1],
        color: "text-teal-300",
      },
      {
        title: "Analisis Pola",
        desc: "Identifikasi pola boros dan temukan potensi penghematan lewat visualisasi.",
        video: publicUrls[2],
        color: "text-purple-300",
      },
    ];
  } catch (err) {
    errorMessage.value =
      "Terjadi kesalahan saat memuat video demo. Silakan coba beberapa saat lagi.";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.gen-z-text-gradient {
  background-image: linear-gradient(45deg, #6ee7b7, #3b82f6, #9333ea);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
