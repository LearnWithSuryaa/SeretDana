<template>
  <transition name="modal-fade">
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all duration-300 scale-95 modal-content">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-xl font-semibold text-gray-800">Edit Profil Pengguna</h3>
          <button @click="close" class="text-gray-500 hover:text-gray-700 focus:outline-none">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>

        <!-- Modal Body (Form) -->
        <div class="p-6">
          <form @submit.prevent="submitProfile" class="space-y-4">
            <div>
              <label for="modal-profile-name" class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input type="text" id="modal-profile-name" v-model="editableProfile.name" required
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                     placeholder="Nama Lengkap Anda">
            </div>
            <div>
              <label for="modal-profile-university" class="block text-sm font-medium text-gray-700">Universitas</label>
              <input type="text" id="modal-profile-university" v-model="editableProfile.university"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                     placeholder="Contoh: Universitas Maju Jaya">
            </div>
            <div>
              <label for="modal-profile-major" class="block text-sm font-medium text-gray-700">Jurusan</label>
              <input type="text" id="modal-profile-major" v-model="editableProfile.major"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                     placeholder="Contoh: Ilmu Komputer">
            </div>
            <div>
              <label for="modal-profile-home-city" class="block text-sm font-medium text-gray-700">Kota Asal</label>
              <input type="text" id="modal-profile-home-city" v-model="editableProfile.home_city"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                     placeholder="Contoh: Bandung">
            </div>
            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" @click="close" class="px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition duration-200 cursor-pointer">
                Batal
              </button>
              <button type="submit" class="gen-z-gradient text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition duration-300 cursor-pointer">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  initialProfile: { // Prop to receive current user profile data
    type: Object,
    default: () => ({ name: '', university: '', major: '', home_city: '' })
  }
});

const emit = defineEmits(['close', 'update-profile']);

// Local reactive copy of the profile data for editing
const editableProfile = ref({
  name: '',
  university: '',
  major: '',
  home_city: '',
});

// Watch for changes in initialProfile prop to populate the form
watch(() => props.initialProfile, (newVal) => {
  if (newVal) {
    // Populate form fields with existing profile data
    editableProfile.value = { ...newVal };
  }
}, { immediate: true }); // Run immediately when component mounts or initialProfile changes

const submitProfile = () => {
  emit('update-profile', editableProfile.value);
  // Close modal is handled by parent after successful update
};

const close = () => {
  emit('close');
  // Reset form to initial state when modal is closed
  editableProfile.value = { ...props.initialProfile };
};
</script>

<style scoped>
/* Consistent gradients from DashboardPage */
.gen-z-gradient {
  background: linear-gradient(135deg, #6EE7B7, #3B82F6, #9333EA);
}
.gen-z-text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(45deg, #6EE7B7, #3B82F6, #9333EA);
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
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes pop-out {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.8); opacity: 0; }
}
</style>
