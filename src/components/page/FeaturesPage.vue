<template>
  <div class="relative min-h-screen overflow-hidden font-inter">
    <!-- Background Shapes -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-[#F0F9FF] via-[#FFFFFF] to-[#E6F0FF]"
    ></div>
    <div
      class="absolute top-32 left-10 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl animate-pulse"
    ></div>
    <div
      class="absolute bottom-20 right-10 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl animate-pulse"
    ></div>

    <!-- Navbar -->
    <header
      class="fixed top-0 w-full z-50 transition-all duration-300"
      :class="
        scrolled ? 'bg-white/80 shadow backdrop-blur-md' : 'bg-transparent'
      "
    >
      <nav
        class="container mx-auto px-6 md:px-12 flex justify-between items-center py-4"
      >
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <span
            class="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent"
          >
            Fluidana
          </span>
        </div>

        <!-- Desktop Menu -->
        <ul class="hidden md:flex space-x-8 font-medium text-gray-700">
          <li v-for="link in navLinks" :key="link.href">
            <router-link
              :to="link.href"
              class="hover:text-blue-600 transition relative group"
            >
              {{ link.label }}
              <span
                class="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"
              ></span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/auth"
              class="bg-blue-500 text-white px-5 py-2 rounded-full shadow hover:bg-blue-600 transition"
            >
              Login
            </router-link>
          </li>
        </ul>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
        >
          <Bars3Icon v-if="!isMobileMenuOpen" class="w-7 h-7" />
          <XMarkIcon v-else class="w-7 h-7" />
        </button>
      </nav>
    </header>

    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden flex justify-end"
      >
        <div
          class="w-[80%] max-w-xs bg-white h-full p-8 shadow-lg space-y-6 flex flex-col"
        >
          <router-link
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            @click="isMobileMenuOpen = false"
            class="block text-lg font-medium text-gray-800 hover:text-blue-600 transition"
          >
            {{ link.label }}
          </router-link>
          <router-link
            to="/auth"
            class="bg-blue-500 text-white px-5 py-3 rounded-full text-center shadow hover:bg-blue-600 transition"
            @click="isMobileMenuOpen = false"
          >
            Login
          </router-link>
        </div>
      </div>
    </transition>

    <!-- Hero -->
    <section
      id="home"
      class="relative z-10 pt-32 md:pt-40 px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-12"
    >
      <!-- Text -->
      <div class="flex-1 text-center md:text-left" data-aos="fade-right">
        <span
          class="inline-block px-4 py-1 bg-blue-100 text-blue-600 font-semibold rounded-full text-sm mb-4"
        >
          #AlirkanUangmu
        </span>
        <h1
          class="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight"
        >
          Fitur <span class="text-blue-500">Canggih</span> untuk
          <br />
          Kelola Keuanganmu
        </h1>
        <p class="mt-4 text-gray-600 max-w-lg text-lg md:pr-8 mx-auto md:mx-0">
          Semua yang kamu butuhkan untuk mengatur uang, dari mahasiswa untuk
          mahasiswa. Simple. Modern. Powerful.
        </p>
        <div class="mt-8 flex justify-center md:justify-start gap-4">
          <a
            href="/auth"
            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow transition"
          >
            Mulai Sekarang
          </a>
        </div>
      </div>

      <!-- Mockup Mini UI -->
      <DashboardMiniMockup />
    </section>

    <!-- Features -->
    <section id="features" class="relative z-10 py-20 px-6 md:px-12">
      <h2
        class="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-12"
        data-aos="fade-up"
      >
        Apa Saja yang Bisa Kamu Lakukan?
      </h2>
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          class="group bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-md border border-white/50 hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-[1.02]"
          :data-aos="index % 2 === 0 ? 'fade-up-right' : 'fade-up-left'"
          data-aos-delay="100"
        >
          <div
            class="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 mb-4 group-hover:scale-110 transition"
          >
            <component :is="feature.icon" class="w-7 h-7" />
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- CTA with Wave -->
    <section
      id="cta"
      class="relative z-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center overflow-hidden"
      data-aos="fade-up"
      data-aos-easing="ease-in-out"
      data-aos-duration="1000"
    >
      <!-- Wave Shape -->
      <svg
        class="absolute top-0 left-0 w-full h-16 text-white"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,96L48,128C96,160,192,224,288,234.7C384,245,480,203,576,165.3C672,128,768,96,864,85.3C960,75,1056,85,1152,112C1248,139,1344,181,1392,202.7L1440,224V0H0Z"
        />
      </svg>

      <div class="relative py-20 px-6 md:px-12">
        <h2
          class="text-2xl md:text-3xl font-bold mb-4"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          Siap Membawa Keuanganmu ke Level Selanjutnya?
        </h2>
        <p class="mb-6 text-blue-100" data-aos="fade-up" data-aos-delay="400">
          Fluidana hadir untuk mendampingi perjalanan finansial mahasiswa.
        </p>
        <a
          href="/auth"
          class="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
          data-aos="zoom-in"
          data-aos-delay="600"
        >
          Daftar Sekarang
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import {
  BanknotesIcon,
  ChartBarSquareIcon,
  HomeIcon,
  ChartBarIcon,
  BellIcon,
  CreditCardIcon,
  BellAlertIcon,
  CalendarDaysIcon,
  WalletIcon,
  SparklesIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/vue/24/outline";
import DashboardMiniMockup from "../page/DashboardMiniMockup.vue";

const isMobileMenuOpen = ref(false);
const scrolled = ref(false);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Contact", href: "/contact" },
];

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Navbar scroll effect
const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};
onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

const features = [
  {
    title: "Pencatatan Mudah",
    description: "Catat pemasukan dan pengeluaran harianmu dengan sekali klik.",
    icon: WalletIcon,
  },
  {
    title: "Manajemen Target",
    description: "Buat dan capai target finansialmu dengan lebih mudah.",
    icon: ChartBarIcon,
  },
  {
    title: "Keamanan Data",
    description: "Data kamu tersimpan aman dengan autentikasi ganda.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Bisa Diakses Kapan Saja",
    description: "Cek dan kelola keuanganmu dari mana saja dan kapan saja.",
    icon: DevicePhoneMobileIcon,
  },
  {
    title: "Pengingat Tagihan",
    description: "Dapatkan notifikasi sebelum jatuh tempo agar tidak telat bayar.",
    icon: BellAlertIcon,
  },
  {
    title: "Perencanaan Anggaran",
    description: "Atur dan optimalkan pengeluaranmu setiap bulan dengan mudah.",
    icon: CalendarDaysIcon,
  },
];

</script>
