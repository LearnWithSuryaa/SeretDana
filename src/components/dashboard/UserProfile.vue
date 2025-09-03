<template>
  <div class="space-y-8">
    <!-- Header Profil -->
    <div class="relative bg-[#5AB2FF] rounded-2xl shadow-xl overflow-hidden">
      <div class="absolute inset-0 bg-black/10"></div>
      <div
        class="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between relative z-10"
      >
        <!-- Avatar + Info -->
        <div class="flex items-center space-x-4">
          <img
            :src="
              userProfile.avatar ||
              'https://ui-avatars.com/api/?name=' + userProfile.name
            "
            class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-md object-cover"
          />
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-white">
              {{ userProfile.name || "Pengguna Baru" }}
            </h2>
            <p class="text-white/80 text-sm sm:text-base">
              {{ userProfile.email }}
            </p>
            <span
              class="mt-2 inline-block bg-white/20 text-white text-xs sm:text-sm px-3 py-1 rounded-full"
            >
              Mahasiswa • {{ userProfile.university || "Belum diisi" }}
            </span>
          </div>
        </div>

        <!-- Quick Actions + Logout -->
        <div
          class="mt-4 sm:mt-0 flex flex-wrap gap-2 sm:gap-3 justify-start sm:justify-end"
        >
          <button
            @click="isEditProfileModalVisible = true"
            class="bg-white text-[#5AB2FF] px-4 py-2 rounded-full font-semibold hover:bg-[#FFF9D0] transition shadow text-sm sm:text-base"
          >
            Edit Profil
          </button>
          <button
            @click="isChangePasswordModalVisible = true"
            class="bg-[#A0DEFF] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#5AB2FF] transition shadow text-sm sm:text-base"
          >
            Ubah Password
          </button>
          <button
            @click="isLogoutModalVisible = true"
            class="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition shadow text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </div>

    <!-- Progress Kelengkapan Profil -->
    <div class="bg-white p-6 rounded-2xl shadow-md">
      <h3 class="font-semibold text-gray-700 mb-3">Kelengkapan Profil</h3>
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div
          class="bg-[#5AB2FF] h-3 rounded-full transition-all duration-500"
          :style="{ width: profileCompletion + '%' }"
        ></div>
      </div>
      <p class="text-sm text-gray-500 mt-2">{{ profileCompletion }}% lengkap</p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-[#5AB2FF] text-white p-4 rounded-xl shadow-md text-center">
        <p class="text-lg font-bold">{{ stats.transactions }}</p>
        <p class="text-sm opacity-80">Transaksi</p>
      </div>
      <div class="bg-[#A0DEFF] text-white p-4 rounded-xl shadow-md text-center">
        <p class="text-lg font-bold">{{ stats.budgets }}</p>
        <p class="text-sm opacity-80">Budget</p>
      </div>
      <div
        class="bg-[#CAF4FF] text-gray-800 p-4 rounded-xl shadow-md text-center"
      >
        <p class="text-lg font-bold">{{ stats.goals }}</p>
        <p class="text-sm opacity-80">Goals</p>
      </div>
    </div>

    <!-- Informasi Tambahan -->
    <div class="bg-white p-6 rounded-2xl shadow-md space-y-6">
      <h3 class="font-semibold text-gray-700 mb-4">Informasi Tambahan</h3>

      <div class="grid gap-4 md:grid-cols-3">
        <div class="flex items-center space-x-3 bg-[#A0DEFF] p-4 rounded-xl">
          <AcademicCapIcon class="w-6 h-6 text-[#5AB2FF]" />
          <div>
            <p class="text-sm text-gray-500">Universitas</p>
            <p class="text-gray-800 font-medium">
              {{ userProfile.university || "Belum diisi" }}
            </p>
          </div>
        </div>

        <div class="flex items-center space-x-3 bg-[#CAF4FF] p-4 rounded-xl">
          <BookOpenIcon class="w-6 h-6 text-[#5AB2FF]" />
          <div>
            <p class="text-sm text-gray-500">Jurusan</p>
            <p class="text-gray-800 font-medium">
              {{ userProfile.major || "Belum diisi" }}
            </p>
          </div>
        </div>

        <div class="flex items-center space-x-3 bg-[#A0DEFF] p-4 rounded-xl">
          <MapPinIcon class="w-6 h-6 text-[#5AB2FF]" />
          <div>
            <p class="text-sm text-gray-500">Kota Asal</p>
            <p class="text-gray-800 font-medium">
              {{ userProfile.home_city || "Belum diisi" }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Edit Profil -->
    <EditProfileModal
      :is-visible="isEditProfileModalVisible"
      :initial-profile="userProfile"
      @close="isEditProfileModalVisible = false"
      @update-profile="handleModalUpdateProfile"
    />

    <!-- Modal Ubah Password -->
    <ChangePasswordModal
      :is-visible="isChangePasswordModalVisible"
      @close="isChangePasswordModalVisible = false"
      @change-password="handleModalChangePassword"
    />

    <!-- Modal Logout -->
    <Modal
      :is-visible="isLogoutModalVisible"
      title="Konfirmasi Logout"
      message="Apakah Anda yakin ingin keluar?"
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
  emit("update-profile", profileData);
  isEditProfileModalVisible.value = false;
};
const handleModalChangePassword = (passwordData) => {
  emit("change-password", passwordData);
  isChangePasswordModalVisible.value = false;
};

// Mekanisme Logout menggunakan Modal.vue
const confirmLogout = async () => {
  try {
    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) throw logoutError;
    console.log("User logged out.");
    emit("logout");
    router.push({ name: "Landing" });
  } catch (err) {
    console.error("Error logging out:", err.message);
    // Bisa tampilkan modal error lain jika perlu
  } finally {
    isLogoutModalVisible.value = false;
  }
};

// Hitung kelengkapan profil
const profileCompletion = computed(() => {
  let total = 5;
  let filled = 0;
  if (props.userProfile.name) filled++;
  if (props.userProfile.email) filled++;
  if (props.userProfile.university) filled++;
  if (props.userProfile.major) filled++;
  if (props.userProfile.home_city) filled++;
  return Math.round((filled / total) * 100);
});

// Ambil data Quick Stats dari Supabase
onMounted(async () => {
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

/* Adjusted styles for modern look */
.bg-white.shadow-xl {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.05);
}

.bg-white.shadow-xl:hover {
  box-shadow: 0 15px 20px -5px rgba(0, 0, 0, 0.1),
    0 6px 10px -4px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
</style>
