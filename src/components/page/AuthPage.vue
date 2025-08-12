<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 sm:p-6 font-sans bg-gradient-to-br from-green-100 via-blue-100 to-purple-100"
  >
    <!-- Central Card with Glassmorphism Effect -->
    <div
      class="relative bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 w-full max-w-xl p-8 lg:p-12 transform transition-all duration-700 hover:shadow-2xl"
      data-aos="zoom-in"
    >
      <!-- Background Gradient for Card (subtle, as a fallback) -->
      <div
        class="absolute inset-0 bg-white/10 rounded-3xl -z-10"
      ></div>

      <!-- Heading -->
      <div class="text-center mb-8" data-aos="fade-down" data-aos-delay="100">
        <h1 class="text-4xl font-bold gen-z-text-gradient mb-2">
          {{ isLogin ? "Masuk ke Fluidana" : "Daftar Akun Baru" }}
        </h1>
        <p class="text-gray-700">
          {{
            isLogin
              ? "Kelola keuanganmu dengan mudah."
              : "Gabung sekarang dan atur dompetmu!"
          }}
        </p>
      </div>

      <!-- Menambahkan :key untuk memaksa Vue me-render ulang formulir,
           memastikan AOS dapat mendeteksi elemen baru -->
      <form @submit.prevent="handleSubmit" :key="isLogin">
        <!-- Email -->
        <div class="mb-5" data-aos="fade-up" data-aos-delay="200">
          <label
            for="email"
            class="block text-gray-700 text-sm font-semibold mb-2"
            >Email</label
          >
          <div class="relative">
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none bg-white/60 placeholder-gray-500"
              placeholder="contoh@email.com"
              required
            />
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <EnvelopeIcon class="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <!-- Password -->
        <div class="mb-5" data-aos="fade-up" data-aos-delay="300">
          <label
            for="password"
            class="block text-gray-700 text-sm font-semibold mb-2"
            >Password</label
          >
          <div class="relative">
            <input
              :type="passwordFieldType"
              id="password"
              v-model="password"
              class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none bg-white/60 placeholder-gray-500"
              placeholder="Minimal 6 karakter"
              required
            />
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <LockClosedIcon class="w-5 h-5 text-gray-400" />
            </div>
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <EyeIcon
                v-if="passwordFieldType === 'password'"
                class="w-5 h-5"
              />
              <EyeSlashIcon v-else class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Forgot Password Link (Only visible on login form) -->
        <div v-if="isLogin" class="text-right mb-5 text-sm" data-aos="fade-up" data-aos-delay="400">
          <a
            href="#"
            @click.prevent="isForgotPasswordModalVisible = true"
            class="text-blue-600 hover:underline font-semibold"
            >Lupa Password?</a
          >
        </div>

        <!-- Registration Fields (Only visible during registration) -->
        <div v-if="!isLogin" class="space-y-4 mb-6">
          <div class="mb-5" data-aos="fade-up" data-aos-delay="400">
            <label
              for="confirm-password"
              class="block text-gray-700 text-sm font-semibold mb-2"
              >Konfirmasi Password</label
            >
            <div class="relative">
              <input
                :type="passwordFieldType"
                id="confirm-password"
                v-model="confirmPassword"
                class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none bg-white/60 placeholder-gray-500"
                placeholder="Ulangi password Anda"
                required
              />
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <LockClosedIcon class="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-delay="500">
            <label
              for="name"
              class="block text-gray-700 text-sm font-semibold mb-2"
              >Nama Lengkap</label
            >
            <input
              type="text"
              id="name"
              v-model="name"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none bg-white/60 placeholder-gray-500"
              placeholder="Nama Lengkap Anda"
              required
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="600">
            <label
              for="university"
              class="block text-gray-700 text-sm font-semibold mb-2"
              >Universitas (Opsional)</label
            >
            <input
              type="text"
              id="university"
              v-model="university"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none bg-white/60 placeholder-gray-500"
              placeholder="Contoh: Universitas Maju Jaya"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="700">
            <label
              for="major"
              class="block text-gray-700 text-sm font-semibold mb-2"
              >Jurusan (Opsional)</label
            >
            <input
              type="text"
              id="major"
              v-model="major"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none bg-white/60 placeholder-gray-500"
              placeholder="Contoh: Ilmu Komputer"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="800">
            <label
              for="home-city"
              class="block text-gray-700 text-sm font-semibold mb-2"
              >Kota Asal (Opsional)</label
            >
            <input
              type="text"
              id="home-city"
              v-model="homeCity"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none bg-white/60 placeholder-gray-500"
              placeholder="Contoh: Bandung"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full gen-z-gradient text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:opacity-90 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          data-aos="fade-up"
          :data-aos-delay="isLogin ? '500' : '900'"
        >
          <span v-if="isLoading">Memproses...</span>
          <span v-else>{{ isLogin ? "Masuk" : "Daftar" }}</span>
        </button>
      </form>

      <!-- Divider dan Tombol Google Login -->
      <div class="flex items-center my-6" data-aos="fade-up" :data-aos-delay="isLogin ? '600' : '1000'">
        <div class="flex-grow border-t border-gray-300"></div>
        <span class="mx-4 text-gray-500 text-sm">atau</span>
        <div class="flex-grow border-t border-gray-300"></div>
      </div>

      <button
        type="button"
        @click.prevent="handleGoogleLogin"
        :disabled="isLoading"
        class="w-full flex items-center justify-center px-6 py-3 rounded-full text-lg font-semibold border border-gray-300 bg-white shadow-md hover:bg-gray-50 transform hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        data-aos="fade-up"
        :data-aos-delay="isLogin ? '700' : '1100'"
      >
        <!-- Menggunakan tag <img> untuk logo Google dari folder assets -->
        <img src="/assets/google.png" alt="Google Logo" class="w-6 h-6 mr-3">
        <span>Masuk dengan Google</span>
      </button>

      <!-- Switch mode -->
      <div
        class="mt-6 text-center text-gray-600"
        data-aos="fade-up"
        :data-aos-delay="isLogin ? '800' : '1200'"
      >
        <p v-if="isLogin">
          Belum punya akun?
          <a
            href="#"
            @click.prevent="
              isLogin = false;
              errorMessage = '';
              successMessage = '';
              resetRegistrationFields();
            "
            class="text-blue-600 hover:underline font-semibold"
            >Daftar Sekarang</a
          >
        </p>
        <p v-else>
          Sudah punya akun?
          <a
            href="#"
            @click.prevent="
              isLogin = true;
              errorMessage = '';
              successMessage = '';
              resetRegistrationFields();
            "
            class="text-blue-600 hover:underline font-semibold"
            >Masuk</a
          >
        </p>
      </div>

      <!-- Feedback -->
      <div
        v-if="errorMessage"
        class="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center"
        data-aos="fade-up"
      >
        {{ errorMessage }}
      </div>
      <div
        v-if="successMessage"
        class="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm text-center"
        data-aos="fade-up"
      >
        {{ successMessage }}
      </div>
    </div>

    <ForgotPasswordModal
      :is-visible="isForgotPasswordModalVisible"
      @close="isForgotPasswordModalVisible = false"
      @forgot-password="handleForgotPassword"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import supabase from "../../lib/supabaseClient";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import ForgotPasswordModal from "../modal/ForgotPasswordModal.vue";

const router = useRouter();

const isLogin = ref(true);
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const name = ref("");
const university = ref("");
const major = ref("");
const homeCity = ref("");
const passwordFieldType = ref("password");
const errorMessage = ref("");
const successMessage = ref("");
const isLoading = ref(false);
const isForgotPasswordModalVisible = ref(false);

const togglePasswordVisibility = () => {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
};

const resetRegistrationFields = () => {
  name.value = "";
  university.value = "";
  major.value = "";
  homeCity.value = "";
  password.value = "";
  confirmPassword.value = "";
};

const handleSubmit = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  isLoading.value = true;

  if (!email.value || !password.value) {
    errorMessage.value = "Email dan password harus diisi.";
    isLoading.value = false;
    return;
  }

  if (!isValidEmail(email.value)) {
    errorMessage.value = "Format email tidak valid.";
    isLoading.value = false;
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value = "Password minimal 6 karakter.";
    isLoading.value = false;
    return;
  }

  if (!isLogin.value) {
    if (password.value !== confirmPassword.value) {
      errorMessage.value = "Konfirmasi password tidak cocok.";
      isLoading.value = false;
      return;
    }
    if (!name.value) {
      errorMessage.value = "Nama lengkap harus diisi untuk pendaftaran.";
      isLoading.value = false;
      return;
    }
  }

  try {
    let data, error;

    if (isLogin.value) {
      ({ data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      }));
      if (error) throw error;

      successMessage.value = "Login berhasil! Mengarahkan ke dashboard...";

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      ({ data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: {
            name: name.value,
            university: university.value,
            major: major.value,
            home_city: homeCity.value,
          },
        },
      }));
      if (error) throw error;
      successMessage.value =
        "Registrasi berhasil! Silakan cek email Anda untuk verifikasi.";
      isLogin.value = true;
      resetRegistrationFields();
    }
  } catch (err) {
    console.error("Auth error:", err.message);
    errorMessage.value = err.message || "Terjadi kesalahan. Silakan coba lagi.";
  } finally {
    isLoading.value = false;
  }
};

const handleForgotPassword = async (userEmail) => {
  isLoading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(userEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;

    successMessage.value =
      "Tautan reset password telah dikirim ke email Anda. Silakan cek inbox Anda.";
    isForgotPasswordModalVisible.value = false;
  } catch (err) {
    console.error("Forgot password error:", err.message);
    errorMessage.value =
      err.message || "Gagal mengirim tautan reset password. Pastikan email benar.";
  } finally {
    isLoading.value = false;
  }
};

const handleGoogleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) throw error;

  } catch (err) {
    console.error("Google login error:", err.message);
    errorMessage.value = err.message || "Gagal login dengan Google. Silakan coba lagi.";
  } finally {
    isLoading.value = false;
  }
};

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
};

// Fungsi untuk mereset AOS
const resetAos = () => {
  nextTick(() => {
    if (window.AOS) {
      window.AOS.refreshHard();
    }
  });
};

// Menggunakan watch untuk memanggil resetAos setiap kali `isLogin` berubah
watch(isLogin, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    resetAos();
  }
});
</script>

<style scoped>
.gen-z-gradient {
  background: linear-gradient(135deg, #6ee7b7, #3b82f6, #9333ea);
  transition: all 0.3s ease-in-out;
}
.gen-z-text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(45deg, #6ee7b7, #3b82f6, #9333ea);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}
</style>
