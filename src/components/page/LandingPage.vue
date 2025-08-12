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

    <!-- Why Us Section -->
    <WhyUsSection />

    <!-- How It Works Section -->
    <HowItWorks />

    <!-- Demo Section (New Component) -->
    <DemoSection />

    <!-- Testimonials Section -->
    <TestimonialCarousel />

    <!-- FAQ Section -->
    <FaqSection />

    <!-- Call to Action Section -->
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
import {
  Bars3Icon, // For mobile menu hamburger
  XMarkIcon, // For mobile menu close
} from "@heroicons/vue/24/outline";

// Import the new DemoSection component
import FeatureSection from "../landing/FeatureSection.vue";
import HowItWorks from "../landing/HowItWorks.vue";
import DemoSection from "../landing/DemoSection.vue";
import TestimonialCarousel from "../landing/TestimonialCarousel.vue";
import HeroSection from "../landing/HeroSection.vue";
import WhyUsSection from "../landing/WhyUsSection.vue";
import FaqSection from "../landing/FaqSection.vue";
import CallToAction from "../landing/CallToAction.vue";

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
