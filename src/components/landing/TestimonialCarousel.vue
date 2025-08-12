<template>
  <section
    class="py-20 px-6 md:px-12 bg-gradient-to-b from-white to-blue-50"
    data-aos="fade-up"
  >
    <div class="max-w-6xl mx-auto text-center">
      <h2
        class="text-3xl md:text-4xl font-bold text-blue-700 mb-14"
        data-aos="zoom-in"
      >
        Kata Mereka Tentang <span class="text-purple-600">Fluidana</span>
      </h2>

      <Swiper
        :modules="[Autoplay, Pagination]"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :loop="true"
        :pagination="{ clickable: true }"
        class="rounded-2xl"
        data-aos="fade-up"
      >
        <SwiperSlide
          v-for="(item, index) in testimonials"
          :key="index"
        >
          <div
            class="bg-white/70 backdrop-blur-lg mb-3 border border-blue-100 shadow-lg rounded-3xl p-8 max-w-2xl mx-auto transition duration-300 hover:shadow-2xl"
            :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
          >
            <p
              class="text-gray-700 text-base md:text-lg italic leading-relaxed mb-6"
            >
              "{{ item.message }}"
            </p>
            <div class="flex items-center justify-center space-x-4">
              <img
                :src="item.avatar"
                alt="avatar"
                class="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-purple-300 shadow-md"
              />
              <div class="text-left">
                <p class="font-semibold text-blue-800 text-base md:text-lg">
                  {{ item.name }}
                </p>
                <p class="text-sm text-gray-500">{{ item.title }}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import { onMounted } from "vue";

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });
});

const testimonials = [
  {
    name: "Rina Wulandari",
    title: "Mahasiswa UI",
    message:
      "Fluidana bantu aku lacak uang jajan tiap minggu. Sekarang lebih hemat dan nggak bingung akhir bulan!",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "Bagus Santoso",
    title: "Freelancer Keuangan",
    message:
      "Dulu sering miss catat pengeluaran, sekarang semua rapi dengan Fluidana. Suka banget fiturnya!",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    name: "Dinda Permata",
    title: "Mahasiswa Unair",
    message:
      "UI-nya kece dan mudah digunakan. Aku bisa atur kategori pengeluaran dan lihat grafik bulanan. Love it!",
    avatar: "https://i.pravatar.cc/100?img=48",
  },
];
</script>
