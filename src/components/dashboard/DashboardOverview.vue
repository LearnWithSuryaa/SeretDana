<template>
  <div class="space-y-10">
    <!-- Header -->
    <h2 class="text-3xl font-extrabold text-black leading-tight">
      Halo, {{ userProfile.name || 'Mahasiswa Rantau' }} 👋
    </h2>
    <p class="text-gray-500 text-sm">Ini adalah ringkasan keuanganmu hari ini.</p>

    <!-- Bento Grid Ringkasan -->
    <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
      <!-- Saldo Saat Ini -->
      <div class="md:col-span-3 bg-white p-6 rounded-2xl shadow-lg border-l-4 border-[#5AB2FF] hover:shadow-xl transition">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-base font-semibold text-gray-700">Saldo Saat Ini</h3>
          <WalletIcon class="w-6 h-6 text-[#5AB2FF]" />
        </div>
        <div class="text-green-600 font-extrabold text-3xl">Rp {{ formatCurrency(currentBalance) }}</div>
        <p class="text-gray-400 text-xs mt-1">Update terakhir: {{ lastUpdate }}</p>
      </div>

      <!-- Anggaran Bulan Ini -->
      <div class="md:col-span-3 bg-white p-6 rounded-2xl shadow-lg border-l-4 border-[#A0DEFF] hover:shadow-xl transition delay-75">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-base font-semibold text-gray-700">Anggaran Bulan Ini</h3>
          <ChartBarIcon class="w-6 h-6 text-[#A0DEFF]" />
        </div>
        <div class="text-gray-800 font-bold text-xl mb-2">
          Rp {{ formatCurrency(monthlyBudgetSpent) }} / Rp {{ formatCurrency(monthlyBudgetTotal) }}
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div class="progress-gradient h-2.5 rounded-full transition-all" :style="{ width: budgetProgress + '%' }"></div>
        </div>
        <p class="text-gray-400 text-xs mt-1">{{ budgetProgress.toFixed(1) }}% Terpakai</p>
      </div>

      <!-- Batas Harian -->
      <div class="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg border-l-4 border-[#CAF4FF] hover:shadow-xl transition delay-100">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-base font-semibold text-gray-700">Batas Pengeluaran Harian</h3>
          <CurrencyDollarIcon class="w-6 h-6 text-[#5AB2FF]" />
        </div>
        <div class="text-[#5AB2FF] font-extrabold text-2xl">Rp {{ formatCurrency(dailySpendingLimit) }}</div>
        <p class="text-gray-400 text-xs mt-1">Rekomendasi sisa hari ini</p>
      </div>

      <!-- Tagihan -->
      <div class="md:col-span-4 bg-white p-6 rounded-2xl shadow-lg border-l-4 border-[#5AB2FF] hover:shadow-xl transition delay-150">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-base font-semibold text-gray-700">Tagihan Mendatang</h3>
          <CalendarDaysIcon class="w-6 h-6 text-[#5AB2FF]" />
        </div>
        <ul v-if="upcomingBills && upcomingBills.length > 0" class="space-y-2 text-sm">
          <li v-for="bill in upcomingBills.slice(0, 3)" :key="bill.id"
              class="flex justify-between items-center text-gray-700 border-b border-gray-100 py-1">
            <span>{{ bill.name }} ({{ formatDate(bill.due_date) }})</span>
            <span class="text-red-600 font-semibold">- Rp {{ formatCurrency(bill.amount) }}</span>
          </li>
        </ul>
        <p v-else class="text-gray-400 italic text-sm">Tidak ada tagihan mendatang.</p>
      </div>

      <!-- CTA Tambah Transaksi -->
      <div class="md:col-span-6 bg-white p-6 rounded-2xl shadow-lg border-l-4 border-[#A0DEFF] hover:shadow-xl transition delay-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Catat Transaksi Baru</h3>
        <button @click="isAddTransactionModalVisible = true"
                class="w-full cta-gradient text-white py-3 px-4 rounded-lg font-semibold text-base shadow-md hover:opacity-90 transition">
          <span class="flex items-center justify-center">
            <PlusCircleIcon class="w-5 h-5 mr-2" /> Tambah Transaksi Cepat
          </span>
        </button>
      </div>

      <!-- Transaksi Terbaru -->
      <div class="md:col-span-6 bg-white p-6 rounded-2xl shadow-lg border-l-4 border-[#CAF4FF] hover:shadow-xl transition delay-300">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Transaksi Terbaru</h3>
        <ul v-if="recentTransactions && recentTransactions.length > 0" class="space-y-3">
          <li v-for="transaction in recentTransactions" :key="transaction.id"
              class="flex justify-between items-center p-3 rounded-md bg-gray-50 border border-gray-200">
            <div>
              <p class="font-medium text-sm">{{ transaction.description }}</p>
              <p class="text-xs text-gray-500">{{ formatDate(transaction.transaction_date) }}
                <span v-if="transaction.category_id" class="text-gray-400">({{ getCategoryName(transaction.category_id) }})</span>
              </p>
            </div>
            <span :class="{'text-green-600': transaction.type === 'income', 'text-red-600': transaction.type === 'expense'}"
                  class="font-semibold text-sm">
              {{ transaction.type === 'income' ? '+' : '-' }} Rp {{ formatCurrency(transaction.amount) }}
            </span>
          </li>
        </ul>
        <p v-else class="text-center text-gray-400 italic text-sm">Belum ada transaksi.</p>
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
import { ref, onMounted } from 'vue';
import {
  WalletIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  PlusCircleIcon,
  CurrencyDollarIcon
} from '@heroicons/vue/24/outline';
import AddTransactionModal from '../modal/AddTransactionModal.vue'; 

const props = defineProps({
  userProfile: { type: Object, default: () => ({ name: 'Mahasiswa Rantau' }) },
  currentBalance: { type: Number, default: 0 },
  lastUpdate: { type: String, default: 'N/A' },
  monthlyBudgetTotal: { type: Number, default: 0 },
  monthlyBudgetSpent: { type: Number, default: 0 },
  budgetProgress: { type: Number, default: 0 },
  upcomingBills: { type: Array, default: () => [] },
  expenseCategories: { type: Array, default: () => [] },
  recentTransactions: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
  dailySpendingLimit: { type: Number, default: 0 }
});

const emit = defineEmits(['add-transaction']);
const isAddTransactionModalVisible = ref(false);

// Helpers
const formatCurrency = (value) => typeof value === 'number' ? value.toLocaleString('id-ID') : '0';
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
};
const getCategoryName = (categoryId) => {
  const category = props.categories.find(cat => cat.id === categoryId);
  return category ? category.name : 'Tidak Dikategorikan';
};

const handleModalAddTransaction = (transactionData) => {
  emit('add-transaction', transactionData);
  isAddTransactionModalVisible.value = false;
};

onMounted(() => {
  console.log('DashboardOverview mounted. Props:', props);
});
</script>

<style scoped>
.progress-gradient {
  background: linear-gradient(90deg, #A0DEFF, #5AB2FF);
}
.cta-gradient {
  background: linear-gradient(90deg, #A0DEFF, #5AB2FF);
}
</style>
