<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#E8F5FF] via-[#F9FBFF] to-[#FFFFFF] py-6 px-3 md:px-6 space-y-6"
  >
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row items-center justify-between text-center md:text-left py-3 gap-4"
    >
      <div>
        <h2
          class="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm"
        >
          Halo, {{ userProfile?.name || "Mahasiswa Rantau" }} 👋
        </h2>
        <p class="text-gray-600 text-sm mt-1">
          Ringkasan keuanganmu hari ini ✨
        </p>
      </div>

      <!-- Avatar + Status - ENHANCED with hover effects -->
      <div
        class="group relative flex items-center space-x-3 bg-white/60 backdrop-blur-xl px-3 py-2 rounded-full border border-white/40 shadow-md hover:shadow-lg transition-all duration-300"
      >
        <!-- Avatar dengan multiple variations on hover -->
        <div class="relative">
          <img
            :src="currentAvatar"
            alt="Avatar"
            class="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#5AB2FF] shadow-sm transition-transform duration-300 group-hover:scale-110"
            @error="handleAvatarError"
          />

          <!-- Indicator untuk gender detection -->
          <div
            class="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm"
            :class="genderIndicatorColor"
            :title="`Detected: ${detectedGender}`"
          ></div>

          <!-- Avatar variations dropdown on hover -->
          <div
            v-if="avatarVariations.length > 1"
            class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-10"
          >
            <div class="bg-white rounded-xl shadow-xl p-2 flex gap-2">
              <button
                v-for="(variation, index) in avatarVariations"
                :key="index"
                @click="selectAvatarVariation(index)"
                class="w-10 h-10 rounded-full overflow-hidden border-2 transition-all hover:scale-110"
                :class="
                  currentAvatarIndex === index
                    ? 'border-[#5AB2FF] ring-2 ring-[#5AB2FF]/30'
                    : 'border-gray-200 hover:border-[#5AB2FF]'
                "
              >
                <img
                  :src="variation"
                  :alt="`Avatar ${index + 1}`"
                  class="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>

        <div class="text-left">
          <p class="font-semibold text-gray-800 text-sm">
            {{ userProfile?.name || "Mahasiswa Rantau" }}
          </p>
          <p class="text-xs text-gray-500">Akun aktif • {{ lastUpdate }}</p>
        </div>
      </div>
    </div>

    <!-- Rest of the component remains the same -->
    <div
      class="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-[minmax(140px,auto)]"
    >
      <!-- Saldo Saat Ini -->
      <div
        class="lg:col-span-4 bg-white/70 backdrop-blur-xl p-4 md:p-5 rounded-3xl border border-white/50 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
      >
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-base md:text-lg font-semibold text-gray-800">
            Saldo Saat Ini
          </h3>
          <WalletIcon class="w-6 h-6 md:w-7 md:h-7 text-[#5AB2FF]" />
        </div>
        <div>
          <p class="text-green-600 font-extrabold text-3xl md:text-4xl">
            Rp {{ formatCurrency(currentBalance) }}
          </p>
          <p class="text-gray-500 text-xs mt-2">
            Update terakhir: {{ lastUpdate }}
          </p>
        </div>
      </div>

      <!-- Anggaran Bulan Ini -->
      <div
        class="lg:col-span-5 bg-gradient-to-br from-[#5AB2FF]/10 to-[#A0DEFF]/10 backdrop-blur-xl p-4 md:p-5 rounded-3xl border border-white/40 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
      >
        <div
          class="absolute -right-10 -bottom-10 w-40 h-40 bg-[#5AB2FF]/10 rounded-full blur-2xl"
        ></div>
        <div class="flex justify-between items-center mb-3 relative">
          <h3 class="text-base md:text-lg font-semibold text-gray-800">
            Anggaran Bulan Ini
          </h3>
          <ChartBarIcon class="w-6 h-6 md:w-7 md:h-7 text-[#5AB2FF]" />
        </div>
        <div class="relative">
          <p class="text-gray-900 font-bold text-lg md:text-xl mb-2">
            Rp {{ formatCurrency(calculatedMonthlyBudgetSpent) }} / Rp
            {{ formatCurrency(calculatedMonthlyBudgetTotal) }}
          </p>

          <!-- ✅ WARNING: Pengeluaran Tanpa Budget -->
          <div
            v-if="unbudgetedSpending > 0"
            class="mb-2 p-2.5 bg-orange-50/80 backdrop-blur-sm border border-orange-200 rounded-xl transition-all hover:shadow-md"
          >
            <div class="flex items-start gap-2">
              <svg
                class="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <div class="flex-1">
                <p class="text-xs font-semibold text-orange-800 mb-0.5">
                  Pengeluaran Tanpa Budget
                </p>
                <p class="text-xs text-orange-700">
                  Ada pengeluaran
                  <span class="font-bold"
                    >Rp {{ formatCurrency(unbudgetedSpending) }}</span
                  >
                  di kategori yang belum diatur anggarannya
                </p>
                <button
                  @click="$emit('navigate-to-budget')"
                  class="mt-1.5 text-xs text-orange-600 hover:text-orange-800 font-medium underline"
                >
                  Atur anggaran kategori lainnya →
                </button>
              </div>
            </div>
          </div>

          <div class="w-full bg-gray-200/60 rounded-full h-2.5 overflow-hidden">
            <div
              class="bg-gradient-to-r from-[#5AB2FF] to-[#A0DEFF] h-2.5 rounded-full transition-all"
              :style="{ width: budgetProgress + '%' }"
            ></div>
          </div>
          <p class="text-gray-600 text-xs mt-1.5">
            {{ budgetProgress.toFixed(1) }}% Terpakai
            <span v-if="hasBudgets" class="text-gray-400 ml-1"
              >(dari kategori yang dianggarkan)</span
            >
          </p>
        </div>
      </div>

      <!-- Batas Harian -->
      <div
        class="lg:col-span-3 bg-white/70 backdrop-blur-xl p-4 md:p-5 rounded-3xl border border-white/50 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
      >
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-base md:text-lg font-semibold text-gray-800">
            Batas Pengeluaran Harian
          </h3>
          <CurrencyDollarIcon class="w-6 h-6 md:w-7 md:h-7 text-[#5AB2FF]" />
        </div>
        <div>
          <p class="text-[#5AB2FF] font-extrabold text-2xl md:text-3xl">
            Rp {{ formatCurrency(dailySpendingLimit) }}
          </p>
          <p class="text-gray-500 text-xs mt-2">Rekomendasi sisa hari ini</p>
        </div>
      </div>

      <!-- Tagihan -->
      <div
        class="lg:col-span-8 p-4 md:p-5 rounded-3xl border shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
        :class="tagihanCardClass"
      >
        <div class="flex justify-between items-center mb-3">
          <div>
            <h3 class="text-base md:text-lg font-semibold text-gray-800">
              Tagihan Mendatang
            </h3>
            <p v-if="upcomingBills.length" class="text-xs text-gray-500 mt-0.5">
              {{ upcomingBills.length }} tagihan dalam 30 hari ke depan
            </p>
          </div>
          <CalendarDaysIcon
            class="w-6 h-6 md:w-7 md:h-7 transition-colors duration-300"
            :class="{
              'text-green-500': allBillsPaid,
              'text-red-500': !allBillsPaid && hasUpcomingBills,
              'text-[#5AB2FF]': !hasUpcomingBills,
            }"
          />
        </div>

        <div
          v-if="upcomingBills.length"
          class="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
          style="max-height: 240px"
        >
          <div
            v-for="bill in upcomingBills"
            :key="bill.id"
            class="flex justify-between items-center p-2.5 rounded-xl bg-white/80 backdrop-blur-sm transition border group"
            :class="
              bill.is_paid_current_period
                ? 'border-green-200 hover:bg-green-50'
                : 'border-red-100 hover:bg-red-50'
            "
          >
            <div
              class="flex-1 cursor-pointer min-w-0"
              @click="handleBillClick(bill)"
            >
              <p class="text-gray-800 font-medium truncate text-sm">
                {{ bill.name }}
              </p>
              <p class="text-xs text-gray-500 mt-0.5">
                {{ formatDate(bill.due_date) }}
                <span v-if="bill.category_id" class="text-gray-400 ml-1"
                  >• {{ getCategoryName(bill.category_id) }}</span
                >
              </p>
            </div>
            <div class="flex items-center space-x-2 ml-2">
              <div class="text-right">
                <span
                  class="font-semibold text-xs block"
                  :class="
                    bill.is_paid_current_period
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                >
                  {{
                    bill.is_paid_current_period
                      ? "Lunas"
                      : "Rp " + formatCurrency(bill.amount)
                  }}
                </span>
                <span
                  class="px-1.5 py-0.5 rounded-full text-[9px] font-medium inline-block mt-0.5"
                  :class="
                    bill.is_paid_current_period
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  "
                >
                  {{
                    bill.is_paid_current_period ? "✓ Dibayar" : "Belum Bayar"
                  }}
                </span>
              </div>
              <button
                @click.stop="handleToggleBillStatus(bill)"
                class="px-2.5 py-1 rounded-lg text-white text-xs font-medium transition duration-200 opacity-0 group-hover:opacity-100"
                :class="
                  bill.is_paid_current_period
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                "
              >
                {{ bill.is_paid_current_period ? "Batal" : "Bayar" }}
              </button>
            </div>
          </div>
        </div>
        <p v-else class="text-gray-500 italic text-sm text-center py-6">
          Tidak ada tagihan mendatang.
        </p>
      </div>

      <!-- CTA Tambah Transaksi -->
      <div
        class="lg:col-span-4 bg-gradient-to-r from-[#5AB2FF] to-[#3A8DDF] p-4 md:p-5 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-white relative overflow-hidden flex flex-col justify-between"
      >
        <div
          class="absolute inset-0 bg-white/20 blur-3xl opacity-30 animate-pulse"
        ></div>

        <div class="relative text-center space-y-3">
          <div class="flex flex-col items-center">
            <PlusCircleIcon
              class="w-10 h-10 md:w-12 md:h-12 text-white mb-2 opacity-90"
            />
            <h3 class="text-lg md:text-xl font-semibold">
              Catat Transaksi Baru
            </h3>
            <p class="text-xs md:text-sm text-blue-50 max-w-xs mx-auto">
              Tambahkan pengeluaran atau pemasukanmu hari ini agar catatan tetap
              akurat.
            </p>
          </div>

          <button
            @click="!isDemoMode && (isAddTransactionModalVisible = true)"
            :disabled="isDemoMode"
            class="w-full bg-white text-[#5AB2FF] py-2.5 px-4 rounded-xl font-semibold text-sm md:text-base shadow transition"
            :class="
              isDemoMode ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            "
          >
            <span class="flex items-center justify-center">
              <PlusCircleIcon class="w-4 h-4 md:w-5 md:h-5 mr-2" /> Tambah
              Transaksi
            </span>
          </button>

          <!-- Statistik Mini -->
          <div
            class="mt-4 bg-white/20 rounded-2xl p-3 backdrop-blur-sm text-left text-white/90"
          >
            <h4
              class="text-xs md:text-sm font-semibold mb-2 flex items-center gap-2"
            >
              <ChartBarIcon class="w-3.5 h-3.5 md:w-4 md:h-4" /> Statistik Bulan
              Ini
            </h4>
            <ul class="space-y-1.5 text-xs md:text-sm">
              <li class="flex items-center space-x-2">
                <BanknotesIcon class="w-4 h-4 md:w-5 md:h-5 text-white/80" />
                <span
                  >Total transaksi: <b>{{ totalTransaksiBulanIni }}</b></span
                >
              </li>
              <li class="flex items-center space-x-2">
                <CalendarDaysIcon class="w-4 h-4 md:w-5 md:h-5 text-white/80" />
                <span
                  >Rata-rata harian:
                  <b>Rp {{ rataRataHarian.toLocaleString() }}</b></span
                >
              </li>
              <li class="flex items-center space-x-2">
                <ChartBarIcon class="w-4 h-4 md:w-5 md:h-5 text-white/80" />
                <span
                  >Hari paling aktif: <b>{{ hariTersibuk }}</b></span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Transaksi Terbaru -->
      <div
        class="lg:col-span-12 bg-white/70 backdrop-blur-xl p-4 md:p-5 rounded-3xl border border-white/50 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
      >
        <h3 class="text-base md:text-lg font-semibold text-gray-800 mb-3">
          Transaksi Terbaru
        </h3>
        <ul v-if="recentTransactions.length" class="space-y-2">
          <li
            v-for="transaction in recentTransactions"
            :key="transaction.id"
            class="flex justify-between items-center p-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-white/30"
          >
            <div>
              <p class="font-medium text-sm text-gray-800">
                {{ transaction.description }}
              </p>
              <p class="text-xs text-gray-600">
                {{ formatDate(transaction.transaction_date) }}
                <span v-if="transaction.category_id" class="text-gray-400"
                  >({{ getCategoryName(transaction.category_id) }})</span
                >
              </p>
            </div>
            <span
              class="font-semibold text-xs md:text-sm"
              :class="
                transaction.type === 'income'
                  ? 'text-green-600'
                  : 'text-red-600'
              "
            >
              {{ transaction.type === "income" ? "+" : "-" }} Rp
              {{ formatCurrency(transaction.amount) }}
            </span>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500 italic text-sm">
          Belum ada transaksi.
        </p>
      </div>
    </div>

    <!-- Modal -->
    <AddTransactionModal
      v-if="isAddTransactionModalVisible"
      :is-visible="isAddTransactionModalVisible"
      :expense-categories="expenseCategories"
      :categories="categories"
      @close="isAddTransactionModalVisible = false"
      @add-transaction="handleModalAddTransaction"
    />

    <Modal
      v-if="showModal"
      :isVisible="showModal"
      :title="modalTitle"
      :message="modalMessage"
      :type="modalType"
      :confirmButtonText="confirmText"
      :cancelButton="showCancel"
      :cancelButtonText="cancelText"
      @close="showModal = false"
      @confirm="handleConfirm"
      @cancel="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import {
  WalletIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
  BanknotesIcon,
  CalendarDaysIcon,
} from "@heroicons/vue/24/outline";

import AddTransactionModal from "../modal/AddTransactionModal.vue";
import Modal from "../modal/Modal.vue";
import supabase from "../../lib/supabaseClient";

// ==================== AVATAR SYSTEM ====================

// Gender Keywords Configuration
const GENDER_KEYWORDS = {
  female: [
    "siti",
    "ayu",
    "putri",
    "intan",
    "nisa",
    "fitri",
    "rina",
    "ani",
    "mega",
    "dwi",
    "citra",
    "dewi",
    "wati",
    "sri",
    "lestari",
    "ningrum",
    "wulan",
    "sari",
    "indah",
    "ratna",
    "tuti",
    "yanti",
    "diah",
    "maya",
    "anggraini",
    "nurul",
    "farah",
    "nur",
    "zahara",
    "fatimah",
    "chicka",
  ],

  male: [
    "budi",
    "agus",
    "joko",
    "ahmad",
    "andi",
    "rizki",
    "dedi",
    "hendra",
    "eko",
    "bayu",
    "wahyu",
    "yoga",
    "rama",
    "dimas",
    "arif",
    "fajar",
    "rudi",
    "iwan",
    "bambang",
    "teguh",
    "yanto",
    "sigit",
    "gunawan",
    "wisnu",
    "aditya",
    "putra",
    "pratama",
    "surya",
  ],
};

// Avatar Styles Configuration
const AVATAR_STYLES = {
  female: {
    primary: "micah",
    alternatives: ["avataaars", "big-smile", "lorelei"],
  },
  male: {
    primary: "adventurer",
    alternatives: ["avataaars", "big-smile", "bottts"],
  },
  neutral: {
    primary: "initials",
    alternatives: ["shapes", "identicon"],
  },
};

// Avatar state
const currentAvatarIndex = ref(0);
const avatarVariations = ref([]);
const detectedGender = ref("neutral");

// Detect gender from name
function detectGender(name) {
  if (!name || typeof name !== "string") {
    return "neutral";
  }

  const lowerName = name.toLowerCase().trim();

  const femaleScore = GENDER_KEYWORDS.female.filter((keyword) =>
    lowerName.includes(keyword)
  ).length;

  const maleScore = GENDER_KEYWORDS.male.filter((keyword) =>
    lowerName.includes(keyword)
  ).length;

  if (femaleScore > maleScore) return "female";
  if (maleScore > femaleScore) return "male";

  return "neutral";
}

// Generate avatar URL
function generateAvatarUrl(name, options = {}) {
  const {
    style = null,
    variant = "primary",
    seed = null,
    radius = 50,
  } = options;

  const displayName = name || "Mahasiswa Rantau";
  const gender = detectGender(displayName);

  let avatarStyle;
  if (style) {
    avatarStyle = style;
  } else if (variant === "primary") {
    avatarStyle = AVATAR_STYLES[gender].primary;
  } else if (typeof variant === "number") {
    avatarStyle =
      AVATAR_STYLES[gender].alternatives[variant] ||
      AVATAR_STYLES[gender].primary;
  }

  const avatarSeed = seed || encodeURIComponent(displayName);
  const params = new URLSearchParams({
    seed: avatarSeed,
    radius: radius.toString(),
  });

  return `https://api.dicebear.com/7.x/${avatarStyle}/svg?${params.toString()}`;
}

// Get avatar variations
function getAvatarVariations(name) {
  const variations = [];
  const gender = detectGender(name);
  const styles = [
    AVATAR_STYLES[gender].primary,
    ...AVATAR_STYLES[gender].alternatives,
  ];

  for (let i = 0; i < styles.length; i++) {
    variations.push(generateAvatarUrl(name, { style: styles[i] }));
  }

  return variations;
}

// Initialize avatar variations when component loads or name changes
function initializeAvatars() {
  const name = props.userProfile?.name || "Mahasiswa Rantau";
  detectedGender.value = detectGender(name);
  avatarVariations.value = getAvatarVariations(name);
  currentAvatarIndex.value = 0;
}

// Current avatar URL
const currentAvatar = computed(() => {
  if (avatarVariations.value.length === 0) {
    return generateAvatarUrl(props.userProfile?.name || "Mahasiswa Rantau");
  }
  return avatarVariations.value[currentAvatarIndex.value];
});

// Gender indicator color
const genderIndicatorColor = computed(() => {
  switch (detectedGender.value) {
    case "female":
      return "bg-pink-400";
    case "male":
      return "bg-blue-400";
    default:
      return "bg-gray-400";
  }
});

// Select avatar variation
function selectAvatarVariation(index) {
  currentAvatarIndex.value = index;
}

// Handle avatar error
function handleAvatarError(event) {
  console.error("Avatar failed to load, using fallback");
  event.target.src = generateAvatarUrl(
    props.userProfile?.name || "Mahasiswa Rantau",
    {
      style: "initials",
    }
  );
}

// ==================== END AVATAR SYSTEM ====================

// Props
const props = defineProps({
  userProfile: { type: Object, default: () => ({ name: "Mahasiswa Rantau" }) },
  currentBalance: { type: Number, default: 0 },
  monthlyBudgetSpent: { type: Number, default: 0 },
  monthlyBudgetTotal: { type: Number, default: 0 },
  dailySpendingLimit: { type: Number, default: 0 },
  upcomingBills: { type: Array, default: () => [] },
  recentTransactions: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
  expenseCategories: { type: Array, default: () => [] },
  isDemoMode: { type: Boolean, default: false },
  budgets: { type: Array, default: () => [] },
  transactions: { type: Array, default: () => [] },
});

// Watch for name changes
watch(
  () => props.userProfile?.name,
  () => {
    initializeAvatars();
  },
  { immediate: true }
);

// Emits
const emit = defineEmits([
  "add-transaction",
  "bill-click",
  "toggle-bill-status",
  "navigate-to-budget",
]);

// Reactive data
const isAddTransactionModalVisible = ref(false);
const showModal = ref(false);
const modalTitle = ref("");
const modalMessage = ref("");
const modalType = ref("info");
const confirmText = ref("OK");
const showCancel = ref(false);
const cancelText = ref("Batal");

// Statistik mini untuk kartu Tambah Transaksi
const totalTransaksiBulanIni = ref(0);
const rataRataHarian = ref(0);
const hariTersibuk = ref("-");

// ✅ OPSI 3: Hitung total anggaran dari kategori yang di-budget
const calculatedMonthlyBudgetTotal = computed(() => {
  if (!Array.isArray(props.budgets)) return props.monthlyBudgetTotal || 0;

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const total = props.budgets
    .filter((b) => b.month === currentMonth && b.year === currentYear)
    .reduce((sum, budget) => sum + Number(budget.limit_amount || 0), 0);

  return total > 0 ? total : props.monthlyBudgetTotal || 0;
});

// ✅ OPSI 3: Hitung pengeluaran HANYA dari kategori yang di-budget
const calculatedMonthlyBudgetSpent = computed(() => {
  if (!Array.isArray(props.budgets) || !Array.isArray(props.transactions)) {
    return props.monthlyBudgetSpent || 0;
  }

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // Dapatkan list category_id yang ada budget-nya
  const budgetedCategoryIds = props.budgets
    .filter((b) => b.month === currentMonth && b.year === currentYear)
    .map((b) => b.category_id);

  // Jika tidak ada budget yang diset, return 0
  if (budgetedCategoryIds.length === 0) {
    return 0;
  }

  // HANYA hitung pengeluaran dari kategori yang di-budget
  const spent = props.transactions
    .filter((t) => {
      const tDate = new Date(t.transaction_date);
      return (
        t.type === "expense" &&
        tDate.getMonth() + 1 === currentMonth &&
        tDate.getFullYear() === currentYear &&
        budgetedCategoryIds.includes(t.category_id)
      );
    })
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  return spent;
});

// ✅ OPSI 3: Hitung pengeluaran TANPA budget (untuk warning)
const unbudgetedSpending = computed(() => {
  if (!Array.isArray(props.budgets) || !Array.isArray(props.transactions)) {
    return 0;
  }

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // Dapatkan list category_id yang ada budget-nya
  const budgetedCategoryIds = props.budgets
    .filter((b) => b.month === currentMonth && b.year === currentYear)
    .map((b) => b.category_id);

  // Hitung pengeluaran dari kategori TANPA budget
  const unbudgeted = props.transactions
    .filter((t) => {
      const tDate = new Date(t.transaction_date);
      return (
        t.type === "expense" &&
        tDate.getMonth() + 1 === currentMonth &&
        tDate.getFullYear() === currentYear &&
        !budgetedCategoryIds.includes(t.category_id) // ✅ Kategori TIDAK ada di budget
      );
    })
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  return unbudgeted;
});

// Helper: Cek apakah user punya budget
const hasBudgets = computed(() => {
  if (!Array.isArray(props.budgets)) return false;

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  return props.budgets.some(
    (b) => b.month === currentMonth && b.year === currentYear
  );
});

// Ambil data statistik dari Supabase (gabungan income + expense, tapi rata-rata hanya expense)
async function fetchStatistik() {
  try {
    const userId = props.userProfile?.id;
    if (!userId) return;

    const now = new Date();

    // Awal dan akhir bulan
    const awalBulan = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), 1, -7, 0, 0)
    ).toISOString();
    const akhirBulan = new Date(
      Date.UTC(now.getFullYear(), now.getMonth() + 1, 0, 16, 59, 59)
    ).toISOString();

    // Ambil SEMUA transaksi (income + expense)
    const { data: semuaTransaksi, error: err1 } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .gte("transaction_date", awalBulan)
      .lte("transaction_date", akhirBulan);

    if (err1) throw err1;

    totalTransaksiBulanIni.value = semuaTransaksi?.length || 0;

    // Ambil HANYA transaksi expense
    const { data: expenseTransaksi, error: err2 } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .eq("type", "expense")
      .gte("transaction_date", awalBulan)
      .lte("transaction_date", akhirBulan);

    if (err2) throw err2;

    if (!expenseTransaksi || expenseTransaksi.length === 0) {
      rataRataHarian.value = 0;
      hariTersibuk.value = "-";
      return;
    }

    // Kelompokkan pengeluaran per hari
    const groupedByDay = expenseTransaksi.reduce((acc, t) => {
      const day = new Date(t.transaction_date).toISOString().split("T")[0];
      acc[day] = (acc[day] || 0) + Number(t.amount);
      return acc;
    }, {});

    // Total nominal pengeluaran bulan ini
    const totalExpense = Object.values(groupedByDay).reduce((a, b) => a + b, 0);

    // Rata-rata harian berdasarkan jumlah hari berlalu dalam bulan ini
    const hariBerlalu = now.getDate();
    rataRataHarian.value = Math.round(totalExpense / hariBerlalu);

    // Hari tersibuk (pengeluaran terbesar)
    const hariTersibukData = Object.entries(groupedByDay).sort(
      (a, b) => b[1] - a[1]
    )[0];
    if (hariTersibukData) {
      const date = new Date(hariTersibukData[0]);
      hariTersibuk.value = date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
    }
  } catch (err) {
    console.error("Gagal memuat statistik:", err);
  }
}

// Jalankan ketika komponen dimuat
onMounted(() => {
  fetchStatistik();
});

// Computed properties
const budgetProgress = computed(() => {
  const total = calculatedMonthlyBudgetTotal.value;
  const spent = calculatedMonthlyBudgetSpent.value;

  if (total === 0) return 0;
  return Math.min((spent / total) * 100, 100);
});

const lastUpdate = computed(() => {
  const now = new Date();
  return now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});

const allBillsPaid = computed(() => {
  return props.upcomingBills.length === 0
    ? false
    : props.upcomingBills.every((bill) => bill.is_paid_current_period);
});

const hasUpcomingBills = computed(() => props.upcomingBills.length > 0);

const tagihanCardClass = computed(() => {
  if (allBillsPaid.value)
    return "bg-green-50/60 backdrop-blur-xl border-green-200";
  if (hasUpcomingBills.value)
    return "bg-red-50/60 backdrop-blur-xl border-red-200";
  return "bg-white/60 backdrop-blur-xl border-white/40";
});

// Helper functions
function formatCurrency(amount) {
  if (amount === null || amount === undefined) return "0";
  try {
    return Math.abs(Number(amount)).toLocaleString("id-ID");
  } catch (e) {
    return String(amount);
  }
}

function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getCategoryName(categoryId) {
  if (!categoryId) return "Tanpa Kategori";
  const category = props.categories.find((cat) => cat.id === categoryId);
  return category ? category.name : "Tanpa Kategori";
}

function handleBillClick(bill) {
  emit("bill-click", bill);
}

function handleModalAddTransaction(transactionData) {
  emit("add-transaction", transactionData);
  isAddTransactionModalVisible.value = false;
}

function handleConfirm() {
  showModal.value = false;
}

function handleToggleBillStatus(bill) {
  emit("toggle-bill-status", {
    ...bill,
    is_paid_current_period: !bill.is_paid_current_period,
  });
}
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 9999px;
}
</style>
