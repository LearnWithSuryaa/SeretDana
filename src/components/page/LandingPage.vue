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
        class="container mx-auto flex justify-between items-center py-3 px-4 sm:px-6 md:px-12"
      >
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <span class="text-xl sm:text-2xl font-extrabold gen-z-text-gradient">
            Fluidana
          </span>
          <span
            class="text-xs sm:text-sm font-medium text-gray-500 hidden md:block"
          >
            #AlirkanUangmu
          </span>
        </div>

        <!-- Desktop Menu -->
        <ul class="hidden md:flex space-x-6 font-medium text-gray-600">
          <li v-for="link in navLinks" :key="link.href">
            <a
              href="#"
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
          class="md:hidden text-gray-600 hover:text-blue-500 focus:outline-none p-2"
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
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
      >
        <div
          class="absolute right-0 top-0 w-full max-w-xs h-full bg-white shadow-lg p-6 flex flex-col space-y-6"
        >
          <div class="flex justify-between items-center mb-6">
            <span class="text-lg font-bold text-blue-500">Menu</span>
            <button
              @click="toggleMobileMenu"
              class="text-gray-600 hover:text-blue-500"
            >
              <XMarkIcon class="w-7 h-7" />
            </button>
          </div>

          <!-- Mobile Nav Links -->
          <nav class="flex flex-col space-y-4">
            <a
              v-for="link in navLinks"
              :key="link.href"
              href="#"
              @click.prevent="scrollToSectionAndCloseMenu(link.href)"
              class="block text-base text-gray-800 font-medium hover:text-blue-500 transition"
            >
              {{ link.label }}
            </a>
          </nav>

          <!-- Auth Buttons -->
          <div class="mt-auto flex flex-col space-y-3">
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
      </div>
    </transition>

    <!-- Sections with IDs -->
    <section id="hero">
      <HeroSection />
    </section>

    <section id="features">
      <FeatureSection />
    </section>

    <section id="why-us">
      <WhyUsSection />
    </section>

    <section id="how-it-works">
      <HowItWorks />
    </section>

    <section id="demo">
      <DemoSection />
    </section>

    <section id="faq">
      <FaqSection />
    </section>

    <!-- Testimonials -->
    <TestimonialCarousel />

    <!-- Call to Action -->
    <CallToAction />

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
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

// Components
import FeatureSection from "../landing/FeatureSection.vue";
import HowItWorks from "../landing/HowItWorks.vue";
import DemoSection from "../landing/DemoSection.vue";
import TestimonialCarousel from "../landing/TestimonialCarousel.vue";
import HeroSection from "../landing/HeroSection.vue";
import WhyUsSection from "../landing/WhyUsSection.vue";
import FaqSection from "../landing/FaqSection.vue";
import CallToAction from "../landing/CallToAction.vue";

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Smooth scroll
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
const scrollToSectionAndCloseMenu = (sectionId) => {
  scrollToSection(sectionId);
  toggleMobileMenu();
};

const isNavbarVisible = ref(true);
let lastScrollY = window.scrollY;
const handleScroll = () => {
  const currentScrollY = window.scrollY;
  isNavbarVisible.value = !(
    currentScrollY > lastScrollY && currentScrollY > 50
  );
  lastScrollY = currentScrollY;
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

const navLinks = [
  { label: "Fitur", href: "features" },
  { label: "Mengapa Kami?", href: "why-us" },
  { label: "Cara Kerja", href: "how-it-works" },
  { label: "Demo", href: "demo" },
  { label: "FAQ", href: "faq" },
];
</script>

<style scoped>
.gen-z-text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(45deg, #6ee7b7, #3b82f6, #9333ea);
}

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
