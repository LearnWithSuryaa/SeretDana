import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { MotionPlugin } from '@vueuse/motion'
import App from "./App.vue";

// Impor AOS dan CSS-nya
import AOS from 'aos';
import 'aos/dist/aos.css';

// Impor gaya global Anda
import "./style.css"; // Pastikan path ini benar

// Import komponen halaman Anda
import LandingPage from "./components/page/LandingPage.vue";
import AuthPage from "./components/page/AuthPage.vue";
import DashboardPage from "./components/page/DashboardPage.vue";
import PrivacyPolicyPage from "./components/page/PrivacyPolicyPage.vue";
import TermsAndConditionsPage from "./components/page/TermsAndConditionsPage.vue";
import ContactPage from "./components/page/ContactPage.vue";
import ResetPasswordPage from "./components/page/ResetPasswordPage.vue";
import supabase from "./lib/supabaseClient";

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
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPasswordPage,
    meta: { requiresAuth: false },
  },
  // 404 fallback
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

// 2. Buat instance router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: "smooth" };
  },
});

// 3. Navigation Guards: Melindungi rute
router.beforeEach(async (to, from, next) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const isAuthenticated = !!session;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "Auth" });
  }
  else if ((to.name === "Auth" || to.name === "Landing") && isAuthenticated && to.name !== "ResetPassword") {
    next({ name: "Dashboard" });
  }
  else {
    next();
  }
});

// 4. Buat dan mount aplikasi Vue
const app = createApp(App);
app.use(MotionPlugin);
app.use(router);
app.mount("#app");

// 5. Inisialisasi AOS setelah aplikasi dimount
AOS.init({
   offset: 50,
   duration: 800,
   easing: 'ease-in-sine',
   delay: 100,
});