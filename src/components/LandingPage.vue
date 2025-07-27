<template>
  <div class="antialiased text-gray-800 overflow-hidden">
    <!-- Header / Navbar -->
    <header
      :class="[
        'backdrop-blur-md bg-white/70 shadow-md fixed top-0 w-full z-50 transition-all duration-500',
        isNavbarVisible ? 'translate-y-0' : '-translate-y-full',
      ]"
    >
      <nav
        class="container mx-auto flex justify-between items-center py-4 px-6 md:px-12"
      >
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <span class="text-2xl font-extrabold gen-z-text-gradient">
            Fluidana
          </span>
          <span class="text-sm font-medium text-gray-500 hidden md:block">
            #AlirkanUangmu
          </span>
        </div>

        <!-- Desktop Menu -->
        <ul class="hidden md:flex space-x-6 font-medium text-gray-600">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="'#' + link.href"
              @click.prevent="scrollToSection(link.href)"
              class="hover:text-blue-500 transition duration-300 relative group"
            >
              {{ link.label }}
              <span
                class="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"
              ></span>
            </a>
          </li>
          <li>
            <a
              href="/auth"
              class="bg-blue-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
              >Login</a
            >
          </li>
        </ul>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden text-gray-600 hover:text-blue-500 focus:outline-none"
        >
          <Bars3Icon v-if="!isMobileMenuOpen" class="w-7 h-7" />
          <XMarkIcon v-else class="w-7 h-7" />
        </button>
      </nav>
    </header>

    <!-- Mobile Menu Overlay -->
    <transition name="slide-fade">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden flex justify-end"
      >
        <div class="w-[80%] max-w-sm bg-white h-full p-8 shadow-lg space-y-6">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="'#' + link.href"
            @click="scrollToSectionAndCloseMenu(link.href)"
            class="block text-lg text-gray-800 font-medium hover:text-blue-500 transition"
          >
            {{ link.label }}
          </a>
          <a
            href="/auth"
            @click="toggleMobileMenu"
            class="bg-blue-500 text-white px-5 py-3 rounded-full text-center shadow-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </a>
          <a
            href="/auth"
            @click="toggleMobileMenu"
            class="border border-blue-500 text-blue-500 px-5 py-3 rounded-full text-center hover:bg-blue-50 transition duration-300"
          >
            Daftar
          </a>
        </div>
      </div>
    </transition>

    <!-- Hero Section -->
    <HeroSection />

    <!--Feature Section-->
    <FeatureSection />

    <section
      id="why-us"
      class="relative py-28 px-6 md:px-12 overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-100 z-10"
    >
      <!-- Background Dekoratif SVG -->
      <div class="absolute inset-0 -z-10">
        <svg
          class="absolute top-0 left-0 w-full h-[300px] opacity-20"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#c4b5fd"
            fill-opacity="0.3"
            d="M0,96L80,101.3C160,107,320,117,480,112C640,107,800,85,960,90.7C1120,96,1280,128,1360,144L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>
      </div>

      <div class="max-w-6xl mx-auto text-center">
        <h2
          class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-20 leading-tight"
        >
          Mengapa
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
            >Fluidana</span
          >
          Cocok untuk Mahasiswa Rantau?
        </h2>

        <!-- Cards -->
        <div class="grid md:grid-cols-2 gap-10 relative z-10">
          <!-- Card 1 -->
          <div
            class="bg-white p-8 rounded-3xl shadow-2xl relative hover:shadow-indigo-300/30 hover:scale-[1.02] transition duration-300 group"
          >
            <div
              class="absolute -top-6 -left-6 w-14 h-14 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shadow-md"
            >
              <SparklesIcon class="w-7 h-7" />
            </div>
            <h3 class="text-xl font-semibold text-sky-600 mt-8 mb-3">
              Desain Intuitif & Ramah Gen Z
            </h3>
            <p class="text-gray-700 text-sm leading-relaxed">
              Seret Dana didesain dengan antarmuka yang modern, fokus, dan bebas
              gangguan. Cocok untuk kamu yang punya jadwal padat.
            </p>
          </div>

          <!-- Card 2 -->
          <div
            class="bg-white p-8 rounded-3xl shadow-2xl relative hover:shadow-green-300/30 hover:scale-[1.02] transition duration-300 group md:-mt-6"
          >
            <div
              class="absolute -top-6 -left-6 w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-md"
            >
              <AcademicCapIcon class="w-7 h-7" />
            </div>
            <h3 class="text-xl font-semibold text-green-600 mt-8 mb-3">
              Fokus pada Kebutuhan Mahasiswa
            </h3>
            <p class="text-gray-700 text-sm leading-relaxed">
              Fluidana mengerti kondisi finansial mahasiswa rantau. Dari uang
              saku hingga pengeluaran harian, semua bisa kamu lacak dengan
              simpel.
            </p>
          </div>

          <!-- Card 3 -->
          <div
            class="bg-white p-8 rounded-3xl shadow-2xl relative hover:shadow-purple-300/30 hover:scale-[1.02] transition duration-300 group md:col-span-2 md:-mt-8"
          >
            <div
              class="absolute -top-6 -left-6 w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shadow-md"
            >
              <LightBulbIcon class="w-7 h-7" />
            </div>
            <h3 class="text-xl font-semibold text-purple-600 mt-8 mb-3">
              Edukasi Finansial Ringan
            </h3>
            <p class="text-gray-700 text-sm leading-relaxed max-w-2xl mx-auto">
              Fluidana bukan hanya alat pencatat, tapi juga sahabat finansial.
              Memberikan insight sederhana yang membantu kamu membentuk
              kebiasaan sehat secara perlahan.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <HowItWorks />

    <!-- Demo Section (New Component) -->
    <DemoSection />

    <!-- Testimonials Section -->
    <TestimonialCarousel />
    <!-- FAQ Section -->
    <section
      id="faq"
      class="py-20 px-6 md:px-12 bg-gradient-to-b from-white via-gray-50 to-white relative z-10"
    >
      <div class="container mx-auto max-w-3xl">
        <h2
          class="text-3xl md:text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text animate-fade-up py-1"
        >
          Pertanyaan Sering Diajukan (FAQ)
        </h2>

        <div class="space-y-6">
          <!-- FAQ Item -->
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up"
            :class="`delay-${index * 100}`"
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

    <!-- Call to Action Section -->
    <section
      class="py-16 px-4 sm:px-6 md:px-12 text-center mt-10 relative overflow-hidden"
    >
      <!-- Soft background blobs -->
      <div
        class="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] bg-purple-300 opacity-30 rounded-full blur-3xl z-0"
      ></div>
      <div
        class="absolute bottom-[-100px] right-[-100px] w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] bg-pink-300 opacity-30 rounded-full blur-3xl z-0"
      ></div>

      <div
        class="container mx-auto max-w-xl sm:max-w-2xl bg-white px-6 sm:px-10 py-10 rounded-2xl shadow-lg relative z-10 border-4 border-purple-200 animate-fade-up"
      >
        <h2
          class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 gen-z-text-gradient py-1"
        >
          Siap Bebas Drama Keuangan?
        </h2>
        <p class="text-base sm:text-lg text-gray-700 mb-8">
          Jangan tunda lagi! Mulai atur keuanganmu sekarang dan rasakan bedanya.
        </p>
        <a
          href="/auth"
          class="gen-z-gradient text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold shadow-xl hover:opacity-90 transform hover:scale-105 transition duration-300 btn-primary"
        >
          Daftar Gratis Sekarang!
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="bg-gray-800 text-white py-8 px-6 md:px-12 mt-10 rounded-t-3xl"
    >
      <div class="container mx-auto text-center">
        <p>&copy; 2025 Fluidana. Semua Hak Dilindungi.</p>
        <div class="mt-4 space-x-4 text-sm">
          <a href="/privacy-policy" class="hover:text-blue-400"
            >Kebijakan Privasi</a
          >
          <a href="/terms-and-conditions" class="hover:text-blue-400"
            >Syarat & Ketentuan</a
          >
          <a href="/contact" class="hover:text-blue-400">Kontak</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  ChevronDownIcon,
  SparklesIcon,
  AcademicCapIcon,
  LightBulbIcon,
  Bars3Icon, // For mobile menu hamburger
  XMarkIcon, // For mobile menu close
} from "@heroicons/vue/24/outline";

// Import the new DemoSection component
import FeatureSection from "./FeatureSection.vue";
import HowItWorks from "./HowItWorks.vue";
import DemoSection from "./DemoSection.vue";
import TestimonialCarousel from "./TestimonialCarousel.vue";
import HeroSection from "./HeroSection.vue";

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

// Reactive state for mobile menu
const isMobileMenuOpen = ref(false);

// Function to toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Function for smooth scrolling
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// Function for smooth scrolling and closing mobile menu
const scrollToSectionAndCloseMenu = (sectionId) => {
  scrollToSection(sectionId);
  toggleMobileMenu(); // Close the mobile menu after clicking a link
};

// Intersection Observer logic for scroll animations
const observer = ref(null);

const setupIntersectionObserver = () => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.value.unobserve(entry.target);
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1, // Trigger when 10% of the element is visible
    }
  );

  // Observe elements with 'animate-on-scroll' class
  document.querySelectorAll(".animate-on-scroll").forEach((element) => {
    observer.value.observe(element);
  });

  // Manually trigger initial animations for hero section
  document.querySelectorAll(".animate-on-load").forEach((element) => {
    element.classList.add("is-visible");
  });
};

const isNavbarVisible = ref(true);
let lastScrollY = window.scrollY;

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    // Scrolling down
    isNavbarVisible.value = false;
  } else {
    // Scrolling up
    isNavbarVisible.value = true;
  }
  lastScrollY = currentScrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

onMounted(() => {
  setupIntersectionObserver();
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});

const navLinks = [
  { label: "Fitur", href: "features" },
  { label: "Mengapa Kami?", href: "why-us" },
  { label: "Cara Kerja", href: "how-it-works" },
  { label: "Demo", href: "demo" },
  { label: "FAQ", href: "faq" },
];
</script>

<style scoped>
/* Global styles for Inter font and background color */
body {
  font-family: "Inter", sans-serif;
  background-color: #f0f2f5;
}

/* New Fun & Gen Z Gradient */
.gen-z-gradient {
  background: linear-gradient(
    135deg,
    #6ee7b7,
    #3b82f6,
    #9333ea
  ); /* Hijau Mint, Biru Cerah, Ungu Neon */
}
.gen-z-text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(45deg, #6ee7b7, #3b82f6, #9333ea);
}

/* Button hover effect */
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

/* Base animation for elements that appear on scroll */
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
.delay-100 {
  transition-delay: 0.1s;
}
.delay-200 {
  transition-delay: 0.2s;
}
.delay-300 {
  transition-delay: 0.3s;
}

/* Animations for hero section (triggered on load, not scroll) */
.hero-headline.animate-on-load {
  animation: popIn 0.6s ease-out forwards;
}
.hero-subtitle.animate-on-load {
  animation: slideInLeft 0.8s ease-out forwards;
}
.hero-buttons.animate-on-load {
  animation: fadeIn 1s ease-out forwards;
}

/* Ensure initial state is hidden for hero elements before load animation */
.hero-headline,
.hero-subtitle,
.hero-buttons {
  opacity: 0;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Custom styles for How It Works timeline */
.how-it-works-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  text-align: center;
  padding: 0 1rem; /* Added padding for mobile */
}

.how-it-works-icon {
  position: relative;
  margin-bottom: 1rem;
  /* Base glow effect */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Subtle initial shadow */
  transition: box-shadow 0.3s ease-in-out;
}

/* Specific glow colors and animation */
.timeline-glow-blue {
  animation: pulse-blue 2s infinite alternate;
}
.timeline-glow-green {
  animation: pulse-green 2s infinite alternate;
}
.timeline-glow-purple {
  animation: pulse-purple 2s infinite alternate;
}

@keyframes pulse-blue {
  0% {
    box-shadow: 0 0 0px rgba(59, 130, 246, 0.7), 0 0 0px rgba(59, 130, 246, 0.4);
  }
  100% {
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.7),
      0 0 30px rgba(59, 130, 246, 0.4);
  }
}
@keyframes pulse-green {
  0% {
    box-shadow: 0 0 0px rgba(34, 197, 94, 0.7), 0 0 0px rgba(34, 197, 94, 0.4);
  }
  100% {
    box-shadow: 0 0 15px rgba(34, 197, 94, 0.7), 0 0 30px rgba(34, 197, 94, 0.4);
  }
}
@keyframes pulse-purple {
  0% {
    box-shadow: 0 0 0px rgba(147, 51, 234, 0.7), 0 0 0px rgba(147, 51, 234, 0.4);
  }
  100% {
    box-shadow: 0 0 15px rgba(147, 51, 234, 0.7),
      0 0 30px rgba(147, 51, 234, 0.4);
  }
}

@media (min-width: 768px) {
  .how-it-works-item {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    text-align: left;
    padding: 0;
  }

  .how-it-works-item .how-it-works-content {
    width: calc(50% - 40px);
  }

  .how-it-works-item:nth-child(odd) {
    justify-content: flex-start;
  }
  .how-it-works-item:nth-child(odd) .how-it-works-content {
    order: 1;
    text-align: right;
    padding-right: 40px;
  }
  .how-it-works-item:nth-child(odd) .how-it-works-icon {
    order: 2;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0;
  }

  .how-it-works-item:nth-child(even) {
    justify-content: flex-end;
  }
  .how-it-works-item:nth-child(even) .how-it-works-content {
    order: 2;
    text-align: left;
    padding-left: 40px;
  }
  .how-it-works-item:nth-child(even) .how-it-works-icon {
    order: 1;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0;
  }

  .timeline-line {
    left: 50%;
    transform: translateX(-50%);
  }
}

/* Mobile Menu Specific Styles */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: flex-end; /* Push menu to right */
}

.mobile-menu-content {
  width: 75%; /* Adjust as needed */
  background-color: white;
  padding: 2rem;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
  /* Initial state for transition */
  transform: translateX(100%);
}

/* Vue Transition Classes */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0);
}
</style>
