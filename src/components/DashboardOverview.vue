<template>
  <div class="space-y-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Halo, {{ userProfile.name || 'Mahasiswa Rantau' }}! 👋</h2>

    <!-- Balance Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Saldo Saat Ini Card -->
      <div class="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-blue-500 hover:shadow-lg transition duration-300 ease-in-out">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-gray-700">Saldo Saat Ini</h3>
          <WalletIcon class="w-7 h-7 text-blue-500" />
        </div>
        <span class="text-green-600 font-bold text-3xl">Rp {{ formatCurrency(currentBalance) }}</span>
        <p class="text-gray-500 text-sm mt-2">Update terakhir: {{ lastUpdate }}</p>
      </div>

      <!-- Anggaran Bulan Ini Card -->
      <div class="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-purple-500 hover:shadow-lg transition duration-300 ease-in-out delay-100">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-gray-700">Anggaran Bulan Ini</h3>
          <ChartBarIcon class="w-7 h-7 text-purple-500" />
        </div>
        <div class="text-gray-800 font-bold text-3xl mb-2">
          Rp {{ formatCurrency(monthlyBudgetSpent) }} / Rp {{ formatCurrency(monthlyBudgetTotal) }}
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div class="gen-z-gradient h-2.5 rounded-full" :style="{ width: budgetProgress + '%' }"></div>
        </div>
        <p class="text-gray-500 text-sm mt-2">{{ budgetProgress.toFixed(1) }}% Terpakai</p>
      </div>

      <!-- Tagihan Mendatang Card -->
      <div class="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-red-500 hover:shadow-lg transition duration-300 ease-in-out delay-200">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-gray-700">Tagihan Mendatang</h3>
          <CalendarDaysIcon class="w-7 h-7 text-red-500" />
        </div>
        <!-- Display only the first 3 upcoming bills -->
        <ul class="space-y-2" v-if="upcomingBills.length > 0">
          <li v-for="bill in upcomingBills.slice(0, 3)" :key="bill.id" class="flex justify-between items-center text-gray-700 text-sm py-1 border-b border-gray-100 last:border-b-0">
            <span>{{ bill.name }} ({{ formatDate(bill.due_date) }})</span>
            <span class="font-semibold text-red-600">- Rp {{ formatCurrency(bill.amount) }}</span>
          </li>
        </ul>
        <p v-else class="text-gray-500 italic text-sm">Tidak ada tagihan mendatang.</p>
      </div>
    </div>

    <!-- Quick Action: Add Transaction (Button to open modal) -->
    <div class="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-green-500 hover:shadow-lg transition duration-300 ease-in-out delay-300">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">Catat Transaksi Baru</h3>
      <button @click="isAddTransactionModalVisible = true"
              class="w-full gen-z-gradient text-white py-3 px-4 rounded-lg font-semibold text-lg shadow-md hover:opacity-90 transition duration-300 cursor-pointer">
        <span class="flex items-center justify-center">
          <PlusCircleIcon class="w-6 h-6 mr-2" /> Tambah Transaksi Cepat
        </span>
      </button>
    </div>

    <!-- Recent Transactions -->
    <div class="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-yellow-500 hover:shadow-lg transition duration-300 ease-in-out delay-400">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">Transaksi Terbaru</h3>
      <ul class="space-y-3" v-if="recentTransactions && recentTransactions.length > 0">
        <li v-for="transaction in recentTransactions" :key="transaction.id"
            class="flex justify-between items-center p-3 rounded-md bg-gray-50 border border-gray-200">
          <div>
            <p class="font-medium">{{ transaction.description }}</p>
            <p class="text-sm text-gray-500">{{ formatDate(transaction.transaction_date) }} <span v-if="transaction.category_id" class="text-gray-400">({{ getCategoryName(transaction.category_id) }})</span></p>
          </div>
          <span :class="{'text-green-600': transaction.type === 'income', 'text-red-600': transaction.type === 'expense'}"
                class="font-semibold">
            {{ transaction.type === 'income' ? '+' : '-' }} Rp {{ formatCurrency(transaction.amount) }}
          </span>
        </li>
      </ul>
      <p v-else class="text-center text-gray-500 italic">Belum ada transaksi.</p>
    </div>

    <!-- Add Transaction Modal -->
    <AddTransactionModal
  :is-visible="isAddTransactionModalVisible"
  :categories="categories"
  @close="isAddTransactionModalVisible = false"
  @add-transaction="handleModalAddTransaction"
/>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  WalletIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  PlusCircleIcon
} from '@heroicons/vue/24/outline';
import AddTransactionModal from './AddTransactionModal.vue';

const props = defineProps({
  userProfile: {
    type: Object,
    default: () => ({ name: 'Mahasiswa Rantau' })
  },
  currentBalance: {
    type: Number,
    default: 0
  },
  lastUpdate: {
    type: String,
    default: 'N/A'
  },
  monthlyBudgetTotal: {
    type: Number,
    default: 0
  },
  monthlyBudgetSpent: {
    type: Number,
    default: 0
  },
  budgetProgress: {
    type: Number,
    default: 0
  },
  upcomingBills: {
    type: Array,
    default: () => []
  },
  expenseCategories: {
    type: Array,
    default: () => []
  },
  recentTransactions: {
    type: Array,
    default: () => []
  },
  categories: {
    type: Array,
    default: () => []
  },
});

const emit = defineEmits(['add-transaction']);

const isAddTransactionModalVisible = ref(false);

// Methods
const formatCurrency = (value) => {
  if (typeof value !== 'number') return '0';
  return value.toLocaleString('id-ID');
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid Date';
  return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
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
  console.log('DashboardOverview mounted. Props received:', props);
  console.log('recentTransactions in DashboardOverview:', props.recentTransactions);
  console.log('upcomingBills in DashboardOverview:', props.upcomingBills);
  console.log('expenseCategories in DashboardOverview:', props.expenseCategories);
  console.log('categories in DashboardOverview:', props.categories);
});
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

/* Animations for dashboard cards/elements */
.animate-fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.animate-fade-in-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.delay-100 { transition-delay: 0.1s; }
.delay-200 { transition-delay: 0.2s; }
.delay-300 { transition-delay: 0.3s; }
.delay-400 { transition-delay: 0.4s; }

/* Adjusted hover effects for cards and buttons */
/* Cards: from transform hover:scale-102 shadow-xl to hover:shadow-lg */
.bg-white.shadow-xl.transform.hover\:scale-102.transition.duration-300.ease-in-out:hover {
  transform: scale(1); /* No scale on hover for cards */
  box-shadow: var(--tw-shadow-lg); /* Softer shadow */
}

/* Button: from shadow-md hover:opacity-90 transform hover:scale-105 to softer hover */
.gen-z-gradient.text-white.py-3.px-4.rounded-lg.font-semibold.text-lg.shadow-md.hover\:opacity-90.transform.hover\:scale-105.transition.duration-300:hover {
  transform: translateY(-1px); /* Slight lift */
  box-shadow: 0 4px 8px rgba(0,0,0,0.15); /* Softer shadow */
  opacity: 0.95; /* Slightly less opacity change */
}

/* Ensure default styles for li elements are not overridden by hidden rules */
ul > li {
  color: inherit; /* Ensure text color is inherited */
  background-color: inherit; /* Ensure background is inherited */
  border: initial; /* Reset border */
  min-height: initial; /* Reset min-height */
  opacity: 1; /* Ensure full opacity */
  display: flex; /* Ensure display */
  visibility: visible; /* Ensure visibility */
}
</style>
