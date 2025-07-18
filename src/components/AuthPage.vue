<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6"
  >
    <div
      class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 hover:shadow-2xl"
    >
      <!-- Heading -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold gen-z-text-gradient mb-2">
          {{ isLogin ? "Masuk ke Seret Dana" : "Daftar Akun Baru" }}
        </h1>
        <p class="text-gray-600">
          {{
            isLogin
              ? "Kelola keuanganmu dengan mudah."
              : "Gabung sekarang dan atur dompetmu!"
          }}
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit">
        <!-- Email -->
        <div class="mb-5">
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
              class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 focus:outline-none"
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
        <div class="mb-5">
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
              class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 focus:outline-none"
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
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              <EyeIcon
                v-if="passwordFieldType === 'password'"
                class="w-5 h-5"
              />
              <EyeSlashIcon v-else class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Confirm Password -->
        <div v-if="!isLogin" class="mb-6">
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
              class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 focus:outline-none"
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

        <!-- Submit -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full gen-z-gradient text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:opacity-90 transform hover:scale-105 transition duration-300 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading">Memproses...</span>
          <span v-else>{{ isLogin ? "Masuk" : "Daftar" }}</span>
        </button>
      </form>

      <!-- Switch mode -->
      <div class="mt-6 text-center text-gray-600">
        <p v-if="isLogin">
          Belum punya akun?
          <a
            href="#"
            @click.prevent="
              isLogin = false;
              errorMessage = '';
              successMessage = '';
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
      >
        {{ errorMessage }}
      </div>
      <div
        v-if="successMessage"
        class="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm text-center"
      >
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import supabase from "../lib/supabaseClient";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/vue/24/outline";

const isLogin = ref(true);
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const passwordFieldType = ref("password");
const errorMessage = ref("");
const successMessage = ref("");
const isLoading = ref(false);

const togglePasswordVisibility = () => {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
};

import { useRouter } from "vue-router";

const router = useRouter();

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

  if (!isLogin.value && password.value !== confirmPassword.value) {
    errorMessage.value = "Konfirmasi password tidak cocok.";
    isLoading.value = false;
    return;
  }

  try {
    let data, error;

    if (isLogin.value) {
      // Login
      ({ data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      }));
      if (error) throw error;

      successMessage.value = "Login berhasil! Mengarahkan ke dashboard...";

      // Tunggu 1 detik supaya pesan muncul dulu
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      // Register
      ({ data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      }));
      if (error) throw error;
      successMessage.value = "Registrasi berhasil! Silakan cek email Anda.";
      isLogin.value = true;
    }
  } catch (err) {
    console.error("Auth error:", err.message);
    errorMessage.value = err.message || "Terjadi kesalahan. Silakan coba lagi.";
  } finally {
    isLoading.value = false;
  }
};

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
};
</script>

<style scoped>
.gen-z-gradient {
  background: linear-gradient(135deg, #6ee7b7, #3b82f6, #9333ea);
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
