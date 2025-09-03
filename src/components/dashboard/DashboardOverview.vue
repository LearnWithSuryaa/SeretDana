<template>
  <div
    class="space-y-10 min-h-screen bg-gradient-to-br from-[#E8F5FF] via-[#F9FBFF] to-[#FFFFFF]"
  >
    <!-- Header -->
    <div class="text-center md:text-left">
      <h2
        class="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm"
      >
        Halo, {{ userProfile.name || "Mahasiswa Rantau" }} 👋
      </h2>
      <p class="text-gray-600 text-sm mt-1">Ringkasan keuanganmu hari ini ✨</p>
    </div>

    <!-- Bento Grid Ringkasan -->
    <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
      <!-- Saldo Saat Ini -->
      <div
        class="md:col-span-3 bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/40 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-base font-semibold text-gray-800">Saldo Saat Ini</h3>
          <WalletIcon class="w-6 h-6 text-[#5AB2FF]" />
        </div>
        <div class="text-green-600 font-extrabold text-3xl">
          Rp {{ formatCurrency(currentBalance) }}
        </div>
        <p class="text-gray-500 text-xs mt-2">
          Update terakhir: {{ lastUpdate }}
        </p>
      </div>

      <!-- Anggaran Bulan Ini -->
      <div
        class="md:col-span-3 bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/40 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 delay-75"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-base font-semibold text-gray-800">
            Anggaran Bulan Ini
          </h3>
          <ChartBarIcon class="w-6 h-6 text-[#A0DEFF]" />
        </div>
        <div class="text-gray-900 font-bold text-xl mb-3">
          Rp {{ formatCurrency(monthlyBudgetSpent) }} / Rp
          {{ formatCurrency(monthlyBudgetTotal) }}
        </div>
        <div class="w-full bg-gray-200/60 rounded-full h-2.5 overflow-hidden">
          <div
            class="bg-gradient-to-r from-[#5AB2FF] to-[#A0DEFF] h-2.5 rounded-full transition-all"
            :style="{ width: budgetProgress + '%' }"
          ></div>
        </div>
        <p class="text-gray-600 text-xs mt-2">
          {{ budgetProgress.toFixed(1) }}% Terpakai
        </p>
      </div>

      <!-- Batas Harian -->
      <div
        class="md:col-span-2 bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/40 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 delay-100"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-base font-semibold text-gray-800">
            Batas Pengeluaran Harian
          </h3>
          <CurrencyDollarIcon class="w-6 h-6 text-[#5AB2FF]" />
        </div>
        <div class="text-[#5AB2FF] font-extrabold text-2xl">
          Rp {{ formatCurrency(dailySpendingLimit) }}
        </div>
        <p class="text-gray-500 text-xs mt-2">Rekomendasi sisa hari ini</p>
      </div>

      <!-- Tagihan -->
      <div
        class="md:col-span-4 p-6 rounded-2xl border shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 delay-150"
        :class="
          upcomingBills && upcomingBills.length > 0
            ? 'bg-white/70 backdrop-blur-xl border-red-200 ring-2 ring-red-400/40 shadow-red-200/50'
            : 'bg-white/60 backdrop-blur-xl border-white/40'
        "
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-base font-semibold text-gray-800">
            Tagihan Mendatang
          </h3>
          <CalendarDaysIcon
            class="w-6 h-6"
            :class="
              upcomingBills && upcomingBills.length > 0
                ? 'text-red-500'
                : 'text-[#5AB2FF]'
            "
          />
        </div>

        <ul
          v-if="upcomingBills && upcomingBills.length > 0"
          class="space-y-3 text-sm"
        >
          <li
            v-for="bill in upcomingBills.slice(0, 3)"
            :key="bill.id"
            class="flex justify-between items-center p-3 rounded-lg bg-white/80 backdrop-blur-sm border border-red-100"
          >
            <span class="text-gray-800">
              {{ bill.name }} ({{ formatDate(bill.due_date) }})
            </span>
            <span class="text-red-600 font-semibold">
              - Rp {{ formatCurrency(bill.amount) }}
            </span>
          </li>
        </ul>

        <p v-else class="text-gray-500 italic text-sm">
          Tidak ada tagihan mendatang.
        </p>
      </div>

      <!-- CTA Tambah Transaksi -->
      <div
        class="md:col-span-6 bg-gradient-to-r from-[#5AB2FF] to-[#3A8DDF] p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 delay-200 text-white relative overflow-hidden"
      >
        <div
          class="absolute inset-0 bg-white/20 blur-3xl opacity-30 animate-pulse"
        ></div>
        <div class="relative">
          <h3 class="text-lg font-semibold mb-4">Catat Transaksi Baru</h3>
          <button
            @click="!isDemoMode && (isAddTransactionModalVisible = true)"
            :disabled="isDemoMode"
            class="w-full bg-white text-[#5AB2FF] py-3 px-4 rounded-lg font-semibold text-base shadow transition"
            :class="{
              'opacity-50 cursor-not-allowed': isDemoMode,
              'hover:bg-gray-100': !isDemoMode,
            }"
          >
            <span class="flex items-center justify-center">
              <PlusCircleIcon class="w-5 h-5 mr-2" /> Tambah Transaksi Cepat
            </span>
          </button>
        </div>
      </div>

      <!-- Transaksi Terbaru -->
      <div
        class="md:col-span-6 bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/40 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 delay-300"
      >
        <h3 class="text-lg font-semibold text-gray-800 mb-4">
          Transaksi Terbaru
        </h3>
        <ul
          v-if="recentTransactions && recentTransactions.length > 0"
          class="space-y-3"
        >
          <li
            v-for="transaction in recentTransactions"
            :key="transaction.id"
            class="flex justify-between items-center p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30"
          >
            <div>
              <p class="font-medium text-sm text-gray-800">
                {{ transaction.description }}
              </p>
              <p class="text-xs text-gray-600">
                {{ formatDate(transaction.transaction_date) }}
                <span v-if="transaction.category_id" class="text-gray-400">
                  ({{ getCategoryName(transaction.category_id) }})
                </span>
              </p>
            </div>
            <span
              :class="{
                'text-green-600': transaction.type === 'income',
                'text-red-600': transaction.type === 'expense',
              }"
              class="font-semibold text-sm"
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
      :is-visible="isAddTransactionModalVisible"
      :expense-categories="expenseCategories"
      :categories="categories"
      @close="isAddTransactionModalVisible = false"
      @add-transaction="handleModalAddTransaction"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  WalletIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  PlusCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";
import AddTransactionModal from "../modal/AddTransactionModal.vue";

const props = defineProps({
  userProfile: { type: Object, default: () => ({ name: "Mahasiswa Rantau" }) },
  currentBalance: { type: Number, default: 0 },
  lastUpdate: { type: String, default: "N/A" },
  monthlyBudgetTotal: { type: Number, default: 0 },
  monthlyBudgetSpent: { type: Number, default: 0 },
  budgetProgress: { type: Number, default: 0 },
  upcomingBills: { type: Array, default: () => [] },
  expenseCategories: { type: Array, default: () => [] },
  recentTransactions: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
  dailySpendingLimit: { type: Number, default: 0 },
  isDemoMode: { type: Boolean, default: false },
});

const emit = defineEmits(["add-transaction"]);
const isAddTransactionModalVisible = ref(false);

// Helpers
const formatCurrency = (value) =>
  typeof value === "number" ? value.toLocaleString("id-ID") : "0";
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? "Invalid Date"
    : date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};
const getCategoryName = (categoryId) => {
  const category = props.categories.find((cat) => cat.id === categoryId);
  return category ? category.name : "Tidak Dikategorikan";
};

const handleModalAddTransaction = (transactionData) => {
  emit("add-transaction", transactionData);
  isAddTransactionModalVisible.value = false;
};

onMounted(() => {
  console.log("DashboardOverview mounted. Props:", props);
});
</script>

<style scoped>
.progress-gradient {
  background: linear-gradient(90deg, #a0deff, #5ab2ff);
}
.cta-gradient {
  background: linear-gradient(90deg, #a0deff, #5ab2ff);
}
</style>
