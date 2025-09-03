<template>
  <div class="container mx-auto p-4 sm:p-6 lg:p-8">
    <!-- User Card -->
    <div
      class="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between transition-all duration-300 ease-in-out hover:shadow-xl"
    >
      <div class="flex items-center space-x-4 sm:space-x-5 w-full md:w-auto">
        <img
          :src="
            userProfile.avatar ||
            'https://ui-avatars.com/api/?name=' +
              (userProfile.name || 'Pengguna') +
              '&background=D1E9FF&color=3A8DDF&size=128'
          "
          class="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md object-cover flex-shrink-0"
          alt="User Avatar"
        />
        <div class="flex-1 min-w-0">
          <h2
            class="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 truncate"
          >
            {{ userProfile.name || "Pengguna Baru" }}
          </h2>
          <p class="text-gray-600 text-sm sm:text-lg truncate">
            {{ userProfile.email || "email@example.com" }}
          </p>
          <div
            v-if="userProfile.university || userProfile.major"
            class="flex flex-wrap items-center text-gray-500 text-xs sm:text-sm mt-2 gap-2 sm:gap-3"
          >
            <span
              v-if="userProfile.university"
              class="flex items-center truncate"
            >
              <AcademicCapIcon
                class="w-4 h-4 mr-1 text-gray-400 flex-shrink-0"
              />
              {{ userProfile.university }}
            </span>
            <span v-if="userProfile.major" class="flex items-center truncate">
              <BookOpenIcon class="w-4 h-4 mr-1 text-gray-400 flex-shrink-0" />
              {{ userProfile.major }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto"
      >
        <button
          @click="isEditProfileModalVisible = !isDemoMode"
          :disabled="isDemoMode"
          :class="{ 'opacity-50 cursor-not-allowed': isDemoMode }"
          class="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200"
        >
          Edit Profil
        </button>
        <button
          @click="isChangePasswordModalVisible = !isDemoMode"
          :disabled="isDemoMode"
          :class="{ 'opacity-50 cursor-not-allowed': isDemoMode }"
          class="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-gray-200 text-gray-800 rounded-full font-medium shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-all duration-200"
        >
          Ubah Kata Sandi
        </button>
        <button
          @click="isLogoutModalVisible = !isDemoMode"
          :disabled="isDemoMode"
          :class="{ 'opacity-50 cursor-not-allowed': isDemoMode }"
          class="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-red-600 text-white rounded-full font-medium shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>

    <!-- Profile Completion & Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 overflow-x-auto">
      <!-- Profile Completion -->
      <div
        class="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 transition-all duration-300 ease-in-out hover:shadow-xl min-w-[220px]"
      >
        <h3 class="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
          Kelengkapan Profil
        </h3>
        <div class="w-full bg-gray-200 rounded-full h-3">
          <div
            class="bg-blue-500 h-3 rounded-full transition-all duration-500"
            :style="{ width: profileCompletion + '%' }"
          ></div>
        </div>
        <p class="text-xs sm:text-sm text-gray-500 mt-2 text-right">
          {{ profileCompletion }}% Lengkap
        </p>
      </div>

      <!-- Quick Stats -->
      <div
        class="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 transition-all duration-300 ease-in-out hover:shadow-xl min-w-[220px]"
      >
        <h3 class="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
          Statistik Cepat
        </h3>
        <div class="grid grid-cols-3 gap-3 text-center">
          <div class="p-3 rounded-lg bg-blue-50">
            <p class="text-xl sm:text-2xl font-bold text-blue-700">
              {{ stats.transactions }}
            </p>
            <p class="text-xs sm:text-sm text-gray-500">Transaksi</p>
          </div>
          <div class="p-3 rounded-lg bg-green-50">
            <p class="text-xl sm:text-2xl font-bold text-green-700">
              {{ stats.budgets }}
            </p>
            <p class="text-xs sm:text-sm text-gray-500">Anggaran</p>
          </div>
          <div class="p-3 rounded-lg bg-purple-50">
            <p class="text-xl sm:text-2xl font-bold text-purple-700">
              {{ stats.goals }}
            </p>
            <p class="text-xs sm:text-sm text-gray-500">Tujuan</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Info -->
    <div
      class="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 transition-all duration-300 ease-in-out hover:shadow-xl"
    >
      <h3 class="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Detail Informasi
      </h3>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <div
          class="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
        >
          <AcademicCapIcon
            class="w-6 h-6 sm:w-7 sm:h-7 text-blue-500 flex-shrink-0"
          />
          <div>
            <p class="text-xs sm:text-sm text-gray-500">Universitas</p>
            <p class="text-sm sm:text-base text-gray-800 font-medium">
              {{ userProfile.university || "Belum diisi" }}
            </p>
          </div>
        </div>

        <div
          class="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
        >
          <BookOpenIcon
            class="w-6 h-6 sm:w-7 sm:h-7 text-green-500 flex-shrink-0"
          />
          <div>
            <p class="text-xs sm:text-sm text-gray-500">Jurusan</p>
            <p class="text-sm sm:text-base text-gray-800 font-medium">
              {{ userProfile.major || "Belum diisi" }}
            </p>
          </div>
        </div>

        <div
          class="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
        >
          <MapPinIcon
            class="w-6 h-6 sm:w-7 sm:h-7 text-purple-500 flex-shrink-0"
          />
          <div>
            <p class="text-xs sm:text-sm text-gray-500">Kota Asal</p>
            <p class="text-sm sm:text-base text-gray-800 font-medium">
              {{ userProfile.home_city || "Belum diisi" }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <EditProfileModal
      :is-visible="isEditProfileModalVisible"
      :initial-profile="userProfile"
      @close="isEditProfileModalVisible = false"
      @update-profile="handleModalUpdateProfile"
    />

    <ChangePasswordModal
      :is-visible="isChangePasswordModalVisible"
      @close="isChangePasswordModalVisible = false"
      @change-password="handleModalChangePassword"
    />

    <Modal
      :is-visible="isLogoutModalVisible"
      title="Konfirmasi Logout"
      message="Apakah Anda yakin ingin keluar dari akun ini?"
      type="confirm"
      confirm-button-text="Ya, Logout"
      :cancel-button="true"
      cancel-button-text="Batal"
      @confirm="confirmLogout"
      @close="isLogoutModalVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import EditProfileModal from "../modal/EditProfileModal.vue";
import ChangePasswordModal from "../modal/ChangePasswordModal.vue";
import Modal from "../modal/Modal.vue";
import {
  AcademicCapIcon,
  BookOpenIcon,
  MapPinIcon,
} from "@heroicons/vue/24/outline";
import supabase from "../../lib/supabaseClient";

const props = defineProps({
  userProfile: {
    type: Object,
    default: () => ({
      id: null,
      email: "",
      name: "",
      university: "",
      major: "",
      home_city: "",
      avatar: "",
    }),
  },
  isDemoMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update-profile", "change-password", "logout"]);
const router = useRouter();

const isEditProfileModalVisible = ref(false);
const isChangePasswordModalVisible = ref(false);
const isLogoutModalVisible = ref(false);

const stats = ref({
  transactions: 0,
  budgets: 0,
  goals: 0,
});

const handleModalUpdateProfile = (profileData) => {
  if (props.isDemoMode) return;
  emit("update-profile", profileData);
  isEditProfileModalVisible.value = false;
};
const handleModalChangePassword = (passwordData) => {
  if (props.isDemoMode) return;
  emit("change-password", passwordData);
  isChangePasswordModalVisible.value = false;
};

const confirmLogout = async () => {
  if (props.isDemoMode) {
    isLogoutModalVisible.value = false;
    return;
  }
  try {
    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) throw logoutError;
    console.log("User logged out.");
    emit("logout");
    router.push({ name: "Landing" });
  } catch (err) {
    console.error("Error logging out:", err.message);
  } finally {
    isLogoutModalVisible.value = false;
  }
};

const profileCompletion = computed(() => {
  let total = 5; // name, email, university, major, home_city
  let filled = 0;
  if (props.userProfile.name) filled++;
  if (props.userProfile.email) filled++;
  if (props.userProfile.university) filled++;
  if (props.userProfile.major) filled++;
  if (props.userProfile.home_city) filled++;
  return Math.round((filled / total) * 100);
});

onMounted(async () => {
  if (props.isDemoMode) {
    stats.value = {
      transactions: 25,
      budgets: 4,
      goals: 2,
    };
    return;
  }

  if (!props.userProfile?.id) return;

  const { count: trxCount } = await supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", props.userProfile.id);

  const { count: budgetCount } = await supabase
    .from("budgets")
    .select("*", { count: "exact", head: true })
    .eq("user_id", props.userProfile.id);

  const { count: goalCount } = await supabase
    .from("savings_goals")
    .select("*", { count: "exact", head: true })
    .eq("user_id", props.userProfile.id);

  stats.value = {
    transactions: trxCount || 0,
    budgets: budgetCount || 0,
    goals: goalCount || 0,
  };
});
</script>
