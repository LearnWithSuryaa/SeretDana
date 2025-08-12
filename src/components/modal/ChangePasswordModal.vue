<template>
  <transition name="modal-fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <div
        class="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all duration-300 scale-95 modal-content"
      >
        <!-- Modal Header -->
        <div
          class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"
        >
          <h3 class="text-xl font-semibold text-gray-800">Ubah Password</h3>
          <button
            @click="close"
            class="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>

        <!-- Modal Body (Form) -->
        <div class="p-6">
          <form @submit.prevent="submitPasswordChange" class="space-y-4">
            <div>
              <label
                for="modal-current-password"
                class="block text-sm font-medium text-gray-700"
              >
                Password Saat Ini
              </label>
              <input
                type="password"
                id="modal-current-password"
                v-model.trim="currentPassword"
                required
                placeholder="Masukkan password saat ini"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              />
            </div>
            <div>
              <label
                for="modal-new-password"
                class="block text-sm font-medium text-gray-700"
              >
                Password Baru
              </label>
              <input
                type="password"
                id="modal-new-password"
                v-model.trim="newPassword"
                required
                placeholder="Minimal 6 karakter"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              />
            </div>
            <div>
              <label
                for="modal-confirm-new-password"
                class="block text-sm font-medium text-gray-700"
              >
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                id="modal-confirm-new-password"
                v-model.trim="confirmNewPassword"
                required
                placeholder="Ulangi password baru"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              />
            </div>
            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="close"
                class="px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition duration-200 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                class="gen-z-gradient text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition duration-300 cursor-pointer"
              >
                Ubah Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "change-password"]);

const currentPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");

const submitPasswordChange = () => {
  if (newPassword.value.length < 6) {
    alert("Password baru minimal 6 karakter."); // Use general modal later
    return;
  }
  if (newPassword.value !== confirmNewPassword.value) {
    alert("Konfirmasi password baru tidak cocok."); // Use general modal later
    return;
  }
  if (currentPassword.value === newPassword.value) {
    alert("Password baru tidak boleh sama dengan password saat ini."); // Use general modal later
    return;
    // Note: Supabase's update password method doesn't require current_password for security.
    // However, it's good practice to include it for custom validation or if you implement re-authentication.
  }

  emit("change-password", {
    current_password: currentPassword.value,
    new_password: newPassword.value,
    confirm_new_password: confirmNewPassword.value, // <-- PROBLEM SOLVED: Emitting this property now
  });
  resetForm();
};

const close = () => {
  emit("close");
  resetForm();
};

const resetForm = () => {
  currentPassword.value = "";
  newPassword.value = "";
  confirmNewPassword.value = "";
};
</script>

<style scoped>
/* Consistent gradients from DashboardPage */
.gen-z-gradient {
  background: linear-gradient(135deg, #6ee7b7, #3b82f6, #9333ea);
}
.gen-z-text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(45deg, #6ee7b7, #3b82f6, #9333ea);
}

/* Modal transition styles (copied from Modal.vue for consistency) */
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

.modal-fade-leave-active .modal-content {
  animation: pop-out 0.3s ease-out forwards;
}

@keyframes pop-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes pop-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
}
</style>
