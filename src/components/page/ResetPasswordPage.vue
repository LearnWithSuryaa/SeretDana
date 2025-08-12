<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h1 class="text-3xl font-bold gen-z-text-gradient mb-6 text-center">Reset Password</h1>

      <form @submit.prevent="handleResetPassword" class="space-y-5">
        <div>
          <label for="new-password" class="block text-gray-700 text-sm font-semibold mb-2">Password Baru</label>
          <input
            type="password"
            id="new-password"
            v-model.trim="newPassword"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 focus:outline-none"
            placeholder="Minimal 6 karakter"
            required
          />
        </div>
        <div>
          <label for="confirm-new-password" class="block text-gray-700 text-sm font-semibold mb-2">Konfirmasi Password Baru</label>
          <input
            type="password"
            id="confirm-new-password"
            v-model.trim="confirmNewPassword"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 focus:outline-none"
            placeholder="Ulangi password baru"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full gen-z-gradient text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:opacity-90 transform hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading">Memproses...</span>
          <span v-else>Ubah Password</span>
        </button>
      </form>

      <div v-if="errorMessage" class="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm text-center">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import supabase from '../../lib/supabaseClient'; // Pastikan path benar

const router = useRouter();
const route = useRoute();

const newPassword = ref('');
const confirmNewPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);

onMounted(() => {
  // Optional: Check if there's a recovery token in the URL on mount
  // Supabase.js v2 automatically handles session from URL for resetPasswordForEmail
  // but we can log it for debugging
  if (route.query.type === 'recovery' && route.query.access_token) {
    console.log('Recovery link detected. Ready to reset password.');
    successMessage.value = 'Silakan masukkan password baru Anda.';
  } else if (route.query.reset === 'true') {
    successMessage.value = 'Password berhasil direset! Silakan login dengan password baru Anda.';
    // Clear the query parameter after displaying message
    router.replace({ query: {} });
  }
});

const handleResetPassword = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  isLoading.value = true;

  if (newPassword.value.length < 6) {
    errorMessage.value = 'Password baru minimal 6 karakter.';
    isLoading.value = false;
    return;
  }
  if (newPassword.value !== confirmNewPassword.value) {
    errorMessage.value = 'Konfirmasi password baru tidak cocok.';
    isLoading.value = false;
    return;
  }

  try {
    // This method updates the user's password for the currently authenticated session (from recovery token)
    const { error } = await supabase.auth.updateUser({
      password: newPassword.value,
    });

    if (error) throw error;

    successMessage.value = 'Password Anda berhasil diubah! Mengarahkan ke halaman login...';
    setTimeout(() => {
      router.push('/auth'); // Redirect to login page
    }, 2000);
  } catch (err) {
    console.error('Password reset error:', err.message);
    errorMessage.value = err.message || 'Gagal mengubah password. Silakan coba lagi.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.gen-z-gradient {
  background: linear-gradient(135deg, #6EE7B7, #3B82F6, #9333EA);
}
.gen-z-text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(45deg, #6EE7B7, #3B82F6, #9333EA);
}

/* Modal transition styles (reused for consistency) */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-content {
  animation: pop-in 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

@keyframes pop-in {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
