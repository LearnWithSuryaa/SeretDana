// main.js
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { MotionPlugin } from '@vueuse/motion'
import App from "./App.vue";

// Impor gaya global Anda
import "./style.css"; // Pastikan path ini benar

// Import komponen halaman Anda
import LandingPage from "./components/LandingPage.vue";
import AuthPage from "./components/AuthPage.vue";
import DashboardPage from "./components/DashboardPage.vue";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage.vue"; // Import Kebijakan Privasi
import TermsAndConditionsPage from "./components/TermsAndConditionsPage.vue"; // Import Syarat & Ketentuan
import ContactPage from "./components/ContactPage.vue"; // Import Kontak
import ResetPasswordPage from "./components/ResetPasswordPage.vue"; // Import ResetPasswordPage
import supabase from "./lib/supabaseClient"; // Pastikan path benar

// 1. Definisikan rute-rute Anda
const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/auth",
    name: "Auth",
    component: AuthPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicyPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/terms-and-conditions",
    name: "TermsAndConditions",
    component: TermsAndConditionsPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/reset-password", // Rute untuk halaman reset password
    name: "ResetPassword",
    component: ResetPasswordPage,
    meta: { requiresAuth: false }, // Tidak memerlukan autentikasi
  },
  // 404 fallback
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

// 2. Buat instance router
const router = createRouter({
  history: createWebHistory(), // Menggunakan history mode untuk URL yang bersih
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Selalu scroll ke atas saat navigasi ke rute baru
    return { top: 0, behavior: "smooth" };
  },
});

// 3. Navigation Guards: Melindungi rute
router.beforeEach(async (to, from, next) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const isAuthenticated = !!session; // Cek apakah user terautentikasi

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Jika rute memerlukan autentikasi tapi user belum login, arahkan ke halaman login
    next({ name: "Auth" });
  }
  // Jika user sudah login dan mencoba mengakses halaman Auth, Landing, TAPI BUKAN ResetPassword, arahkan ke dashboard
  else if ((to.name === "Auth" || to.name === "Landing") && isAuthenticated && to.name !== "ResetPassword") {
    next({ name: "Dashboard" });
  }
  else {
    // Lanjutkan navigasi
    next();
  }
});

// 4. Buat dan mount aplikasi Vue
const app = createApp(App);
app.use(MotionPlugin); // Gunakan Motion Plugin
app.use(router); // Gunakan router di aplikasi Vue
app.mount("#app");
