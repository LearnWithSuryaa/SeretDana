<template>
  <div class="space-y-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Profil Pengguna</h2>

    <div class="bg-white p-8 rounded-2xl shadow-xl transition duration-300 hover:shadow-2xl">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <InfoItem label="Email" :value="userProfile.email">
          <EnvelopeIcon class="w-5 h-5 text-indigo-500" />
        </InfoItem>

        <InfoItem label="Nama Lengkap" :value="userProfile.name">
          <UserIcon class="w-5 h-5 text-indigo-500" />
        </InfoItem>

        <InfoItem label="Universitas" :value="userProfile.university || 'Belum diisi'">
          <AcademicCapIcon class="w-5 h-5 text-indigo-500" />
        </InfoItem>

        <InfoItem label="Jurusan" :value="userProfile.major || 'Belum diisi'">
          <BookOpenIcon class="w-5 h-5 text-indigo-500" />
        </InfoItem>

        <InfoItem label="Kota Asal" :value="userProfile.home_city || 'Belum diisi'">
          <MapPinIcon class="w-5 h-5 text-indigo-500" />
        </InfoItem>
      </div>

      <div class="border-t border-gray-200 pt-6 flex justify-end space-x-3"> <!-- Added space-x-3 for button spacing -->
        <button
          @click="isEditProfileModalVisible = true"
          class="gen-z-gradient text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition duration-300 cursor-pointer"
        >
          Edit Profil
        </button>
        <button
          @click="isChangePasswordModalVisible = true"
          class="bg-gray-200 text-gray-700 px-5 py-2 rounded-full font-semibold hover:bg-gray-300 transition duration-300 cursor-pointer"
        >
          Ubah Password
        </button>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <EditProfileModal
      :is-visible="isEditProfileModalVisible"
      :initial-profile="userProfile"
      @close="isEditProfileModalVisible = false"
      @update-profile="handleModalUpdateProfile"
    />

    <!-- Change Password Modal -->
    <ChangePasswordModal
      :is-visible="isChangePasswordModalVisible"
      @close="isChangePasswordModalVisible = false"
      @change-password="handleModalChangePassword"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EditProfileModal from '../modal/EditProfileModal.vue'; // Import the new modal component
import ChangePasswordModal from '../modal/ChangePasswordModal.vue'; // Import the new modal component
import InfoItem from '../dashboard/InfoItem.vue'; // Pastikan InfoItem diimpor

import {
  EnvelopeIcon,
  UserIcon,
  AcademicCapIcon,
  BookOpenIcon,
  MapPinIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({
  userProfile: {
    type: Object,
    default: () => ({
      email: '',
      name: '',
      university: '',
      major: '',
      home_city: ''
    })
  }
});

const emit = defineEmits(['update-profile', 'change-password']); // Tambahkan 'change-password' ke emits

const isEditProfileModalVisible = ref(false);
const isChangePasswordModalVisible = ref(false); // State untuk mengontrol visibilitas modal ubah password

const handleModalUpdateProfile = (profileData) => {
  emit('update-profile', profileData);
  isEditProfileModalVisible.value = false;
};

const handleModalChangePassword = (passwordData) => {
  emit('change-password', passwordData); // Emit event ke DashboardPage
  isChangePasswordModalVisible.value = false;
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

/* Adjusted styles for a more modern look (consistent with other components) */
.bg-white.shadow-xl {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05); /* Softer shadow */
}

.bg-white.shadow-xl:hover {
  box-shadow: 0 15px 20px -5px rgba(0, 0, 0, 0.1), 0 6px 10px -4px rgba(0, 0, 0, 0.08); /* Slightly more pronounced on hover */
  transform: translateY(-2px); /* Subtle lift */
}

/* Button styles (consistent with other buttons) */
.gen-z-gradient.text-white.px-5.py-2.rounded-full.font-semibold.shadow-md.hover\:opacity-90.transition.duration-300:hover {
  transform: translateY(-1px); /* Slight lift */
  box-shadow: 0 4px 8px rgba(0,0,0,0.15); /* Softer shadow */
  opacity: 0.95; /* Slightly less opacity change */
}

/* New button style for secondary action */
.bg-gray-200.text-gray-700.px-5.py-2.rounded-full.font-semibold.shadow-md.hover\:bg-gray-300.transition.duration-300:hover {
  transform: translateY(-1px); /* Slight lift */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Softer shadow */
}
</style>
