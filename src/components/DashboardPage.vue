<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-gray-100 font-inter">
    <!-- Sidebar / Navigation -->
    <aside
      :class="{
        'translate-x-0': isSidebarOpen,
        '-translate-x-full': !isSidebarOpen,
      }"
      class="w-full md:w-64 bg-white shadow-lg p-6 flex flex-col fixed inset-y-0 left-0 z-30 md:relative md:translate-x-0 transition-transform duration-300 ease-in-out"
    >
      <div class="flex items-center justify-between mb-8">
        <span class="text-2xl font-bold gen-z-text-gradient">Seret Dana</span>
        <!-- Close button for mobile sidebar -->
        <button
          @click="toggleSidebar"
          class="md:hidden text-gray-600 hover:text-blue-500 focus:outline-none"
        >
          <XMarkIcon class="w-7 h-7" />
        </button>
      </div>

      <nav class="flex-grow">
        <ul class="space-y-3">
          <li>
            <a
              href="#"
              @click.prevent="
                activeTab = 'overview';
                toggleSidebar();
              "
              :class="{
                'bg-blue-100 text-blue-700': activeTab === 'overview',
                'text-gray-600 hover:bg-gray-50': activeTab !== 'overview',
              }"
              class="flex items-center p-3 rounded-lg font-medium transition duration-200"
            >
              <HomeIcon class="w-5 h-5 mr-3" />
              Overview
            </a>
          </li>
          <li>
            <a
              href="#"
              @click.prevent="
                activeTab = 'transactions';
                toggleSidebar();
              "
              :class="{
                'bg-blue-100 text-blue-700': activeTab === 'transactions',
                'text-gray-600 hover:bg-gray-50': activeTab !== 'transactions',
              }"
              class="flex items-center p-3 rounded-lg font-medium transition duration-200"
            >
              <ListBulletIcon class="w-5 h-5 mr-3" />
              Transaksi
            </a>
          </li>
          <li>
            <a
              href="#"
              @click.prevent="
                activeTab = 'budgets';
                toggleSidebar();
              "
              :class="{
                'bg-blue-100 text-blue-700': activeTab === 'budgets',
                'text-gray-600 hover:bg-gray-50': activeTab !== 'budgets',
              }"
              class="flex items-center p-3 rounded-lg font-medium transition duration-200"
            >
              <ChartPieIcon class="w-5 h-5 mr-3" />
              Anggaran
            </a>
          </li>
          <li>
            <a
              href="#"
              @click.prevent="
                activeTab = 'goals';
                toggleSidebar();
              "
              :class="{
                'bg-blue-100 text-blue-700': activeTab === 'goals',
                'text-gray-600 hover:bg-gray-50': activeTab !== 'goals',
              }"
              class="flex items-center p-3 rounded-lg font-medium transition duration-200"
            >
              <SparklesIcon class="w-5 h-5 mr-3" />
              Tujuan Keuangan
            </a>
          </li>
          <li>
            <a
              href="#"
              @click.prevent="
                activeTab = 'profile';
                toggleSidebar();
              "
              :class="{
                'bg-blue-100 text-blue-700': activeTab === 'profile',
                'text-gray-600 hover:bg-gray-50': activeTab !== 'profile',
              }"
              class="flex items-center p-3 rounded-lg font-medium transition duration-200"
            >
              <UserCircleIcon class="w-5 h-5 mr-3" />
              Profil
            </a>
          </li>
        </ul>
      </nav>

      <div class="mt-8 pt-4 border-t border-gray-200">
        <button
          @click="handleLogout"
          class="flex items-center p-3 rounded-lg font-medium text-red-600 hover:bg-red-50 w-full transition duration-200"
        >
          <ArrowLeftOnRectangleIcon class="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 p-6 md:p-10 overflow-auto">
      <!-- Mobile Header for Dashboard -->
      <div class="md:hidden flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold gen-z-text-gradient">Dashboard</h1>
        <button
          @click="toggleSidebar"
          class="text-gray-600 hover:text-blue-500 focus:outline-none"
        >
          <Bars3Icon class="w-7 h-7" />
        </button>
      </div>

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="flex items-center justify-center h-64">
        <svg
          class="animate-spin h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p class="ml-3 text-gray-600">Memuat data...</p>
      </div>

      <!-- Error Message -->
      <div
        v-if="error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <!-- Overview Tab Content -->
      <!-- Only render content if not loading AND no error -->
      <div
        v-if="activeTab === 'overview' && !isLoading && !error"
        class="space-y-8"
      >
        <h2 class="text-3xl font-bold text-gray-800 mb-6">
          Halo, {{ userProfile.name || "Mahasiswa Rantau" }}! 👋
        </h2>

        <!-- Balance Card -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 animate-fade-in-up"
          >
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-semibold text-gray-700">
                Saldo Saat Ini
              </h3>
              <WalletIcon class="w-7 h-7 text-blue-500" />
            </div>
            <span class="text-green-600 font-bold text-3xl"
              >Rp {{ formatCurrency(currentBalance) }}</span
            >
            <p class="text-gray-500 text-sm mt-2">
              Update terakhir: {{ lastUpdate }}
            </p>
          </div>

          <!-- Monthly Budget Progress -->
          <div
            class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500 animate-fade-in-up delay-100"
          >
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-semibold text-gray-700">
                Anggaran Bulan Ini
              </h3>
              <ChartBarIcon class="w-7 h-7 text-purple-500" />
            </div>
            <div class="text-gray-800 font-bold text-3xl mb-2">
              Rp {{ formatCurrency(monthlyBudgetSpent) }} / Rp
              {{ formatCurrency(monthlyBudgetTotal) }}
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                class="gen-z-gradient h-2.5 rounded-full"
                :style="{ width: budgetProgress + '%' }"
              ></div>
            </div>
            <p class="text-gray-500 text-sm mt-2">
              {{ budgetProgress.toFixed(1) }}% Terpakai
            </p>
          </div>

          <!-- Upcoming Bills -->
          <div
            class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500 animate-fade-in-up delay-200"
          >
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-semibold text-gray-700">
                Tagihan Mendatang
              </h3>
              <CalendarDaysIcon class="w-7 h-7 text-red-500" />
            </div>
            <ul
              class="space-y-2"
              v-if="upcomingBills && upcomingBills.length > 0"
            >
              <li
                v-for="bill in upcomingBills"
                :key="bill.id"
                class="flex justify-between text-gray-700 text-sm"
              >
                <span>{{ bill.name }} ({{ formatDate(bill.due_date) }})</span>
                <span class="font-semibold text-red-600"
                  >- Rp {{ formatCurrency(bill.amount) }}</span
                >
              </li>
            </ul>
            <p v-else class="text-gray-500 italic text-sm">
              Tidak ada tagihan mendatang.
            </p>
          </div>
        </div>

        <!-- Quick Action: Add Transaction -->
        <div
          class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 animate-fade-in-up delay-300"
        >
          <h3 class="text-xl font-semibold text-gray-700 mb-4">
            Catat Transaksi Baru
          </h3>
          <form @submit.prevent="addTransaction" class="space-y-4">
            <div>
              <label
                for="amount"
                class="block text-sm font-medium text-gray-700"
                >Jumlah (Rp)</label
              >
              <input
                type="number"
                id="amount"
                v-model.number="newTransaction.amount"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              />
            </div>
            <div>
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
                >Deskripsi</label
              >
              <input
                type="text"
                id="description"
                v-model="newTransaction.description"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              />
            </div>
            <div>
              <label for="type" class="block text-sm font-medium text-gray-700"
                >Tipe</label
              >
              <select
                id="type"
                v-model="newTransaction.type"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              >
                <option value="income">Pemasukan</option>
                <option value="expense">Pengeluaran</option>
              </select>
            </div>
            <div>
              <label
                for="category"
                class="block text-sm font-medium text-gray-700"
                >Kategori (Pengeluaran)</label
              >
              <select
                id="category"
                v-model="newTransaction.category_id"
                :disabled="newTransaction.type === 'income'"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 disabled:bg-gray-50 disabled:cursor-not-allowed"
              >
                <option value="">Pilih Kategori</option>
                <option
                  v-for="cat in expenseCategories"
                  :key="cat.id"
                  :value="cat.id"
                >
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <button
              type="submit"
              class="w-full gen-z-gradient text-white py-2 px-4 rounded-md font-semibold hover:opacity-90 transition duration-300"
            >
              Tambah Transaksi
            </button>
          </form>
        </div>

        <!-- Recent Transactions -->
        <div
          class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 animate-fade-in-up delay-400"
        >
          <h3 class="text-xl font-semibold text-gray-700 mb-4">
            Transaksi Terbaru
          </h3>
          <ul
            class="space-y-3"
            v-if="recentTransactions && recentTransactions.length > 0"
          >
            <li
              v-for="transaction in recentTransactions"
              :key="transaction.id"
              class="flex justify-between items-center p-3 rounded-md bg-gray-50 border border-gray-200"
            >
              <div>
                <p class="font-medium">{{ transaction.description }}</p>
                <p class="text-sm text-gray-500">
                  {{ formatDate(transaction.transaction_date) }}
                  <span v-if="transaction.category_id" class="text-gray-400"
                    >({{ getCategoryName(transaction.category_id) }})</span
                  >
                </p>
              </div>
              <span
                :class="{
                  'text-green-600': transaction.type === 'income',
                  'text-red-600': transaction.type === 'expense',
                }"
                class="font-semibold"
              >
                {{ transaction.type === "income" ? "+" : "-" }} Rp
                {{ formatCurrency(transaction.amount) }}
              </span>
            </li>
          </ul>
          <p v-else class="text-center text-gray-500 italic">
            Belum ada transaksi.
          </p>
        </div>
      </div>

      <!-- Transactions Tab Content -->
      <div
        v-if="activeTab === 'transactions' && !isLoading && !error"
        class="space-y-8"
      >
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Riwayat Transaksi</h2>
        <div class="bg-white p-6 rounded-xl shadow-lg animate-fade-in-up">
          <div
            class="mb-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
          >
            <input
              type="text"
              v-model="transactionFilter.search"
              placeholder="Cari deskripsi..."
              class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            />
            <select
              v-model="transactionFilter.type"
              class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            >
              <option value="">Semua Tipe</option>
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>
            <select
              v-model="transactionFilter.category_id"
              class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            >
              <option value="">Semua Kategori</option>
              <option
                v-for="cat in expenseCategories"
                :key="cat.id"
                :value="cat.id"
              >
                {{ cat.name }}
              </option>
            </select>
          </div>
          <ul
            class="space-y-3"
            v-if="filteredTransactions && filteredTransactions.length > 0"
          >
            <li
              v-for="transaction in filteredTransactions"
              :key="transaction.id"
              class="flex justify-between items-center p-3 rounded-md bg-gray-50 border border-gray-200"
            >
              <div>
                <p class="font-medium">{{ transaction.description }}</p>
                <p class="text-sm text-gray-500">
                  {{ formatDate(transaction.transaction_date) }}
                  <span v-if="transaction.category_id" class="text-gray-400"
                    >({{ getCategoryName(transaction.category_id) }})</span
                  >
                </p>
              </div>
              <span
                :class="{
                  'text-green-600': transaction.type === 'income',
                  'text-red-600': transaction.type === 'expense',
                }"
                class="font-semibold"
              >
                {{ transaction.type === "income" ? "+" : "-" }} Rp
                {{ formatCurrency(transaction.amount) }}
              </span>
            </li>
          </ul>
          <p v-else class="text-center text-gray-500 italic">
            Tidak ada transaksi yang cocok.
          </p>
        </div>
      </div>

      <!-- Budgets Tab Content -->
      <div
        v-if="activeTab === 'budgets' && !isLoading && !error"
        class="space-y-8"
      >
        <h2 class="text-3xl font-bold text-gray-800 mb-6">
          Anggaran & Analisis
        </h2>
        <div class="bg-white p-6 rounded-xl shadow-lg animate-fade-in-up">
          <h3 class="text-xl font-semibold text-gray-700 mb-4">
            Ringkasan Anggaran Bulan Ini
          </h3>
          <div
            class="space-y-4"
            v-if="monthlyBudgets && monthlyBudgets.length > 0"
          >
            <div
              v-for="budget in monthlyBudgets"
              :key="budget.category_id"
              class="border p-4 rounded-lg"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="font-medium text-gray-800">{{
                  getCategoryName(budget.category_id)
                }}</span>
                <span class="font-semibold text-gray-700"
                  >Rp {{ formatCurrency(budget.spent) }} / Rp
                  {{ formatCurrency(budget.limit_amount) }}</span
                >
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  :class="{
                    'bg-red-500':
                      (budget.spent / budget.limit_amount) * 100 > 100,
                    'bg-blue-500':
                      (budget.spent / budget.limit_amount) * 100 <= 100,
                  }"
                  class="h-2 rounded-full"
                  :style="{
                    width:
                      Math.min(
                        100,
                        (budget.spent / budget.limit_amount) * 100
                      ) + '%',
                  }"
                ></div>
              </div>
              <p class="text-sm text-gray-500 mt-1">
                {{ ((budget.spent / budget.limit_amount) * 100).toFixed(1) }}%
                Terpakai
                <span
                  v-if="(budget.spent / budget.limit_amount) * 100 > 100"
                  class="text-red-500 font-semibold"
                  >(Overbudget!)</span
                >
              </p>
            </div>
          </div>
          <p v-else class="text-center text-gray-500 italic">
            Belum ada anggaran yang diatur.
          </p>
          <p class="text-sm text-gray-500 mt-4">
            Visualisasi grafik akan tersedia di pembaruan selanjutnya!
          </p>
        </div>
      </div>

      <!-- Goals Tab Content -->
      <div
        v-if="activeTab === 'goals' && !isLoading && !error"
        class="space-y-8"
      >
        <h2 class="text-3xl font-bold text-gray-800 mb-6">
          Tujuan Keuangan Saya
        </h2>
        <div class="bg-white p-6 rounded-xl shadow-lg animate-fade-in-up">
          <h3 class="text-xl font-semibold text-gray-700 mb-4">
            Target Tabungan
          </h3>
          <ul class="space-y-4" v-if="savingsGoals && savingsGoals.length > 0">
            <li
              v-for="goal in savingsGoals"
              :key="goal.id"
              class="border p-4 rounded-lg border-l-4 border-blue-400"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="font-medium text-gray-800">{{ goal.name }}</span>
                <span class="font-semibold text-gray-700"
                  >Rp {{ formatCurrency(goal.saved_amount) }} / Rp
                  {{ formatCurrency(goal.target_amount) }}</span
                >
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-green-500 h-2 rounded-full"
                  :style="{
                    width:
                      Math.min(
                        100,
                        (goal.saved_amount / goal.target_amount) * 100
                      ) + '%',
                  }"
                ></div>
              </div>
              <p class="text-sm text-gray-500 mt-1">
                {{
                  ((goal.saved_amount / goal.target_amount) * 100).toFixed(1)
                }}% Tercapai
                <span
                  v-if="goal.saved_amount >= goal.target_amount"
                  class="text-green-500 font-semibold"
                  >(Tercapai!)</span
                >
              </p>
            </li>
          </ul>
          <p v-else class="text-center text-gray-500 italic">
            Belum ada tujuan tabungan.
          </p>
        </div>
      </div>

      <!-- Profile Tab Content -->
      <div
        v-if="activeTab === 'profile' && !isLoading && !error"
        class="space-y-8"
      >
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Profil Pengguna</h2>
        <div class="bg-white p-6 rounded-xl shadow-lg animate-fade-in-up">
          <div class="mb-4">
            <p class="text-gray-700 font-medium">Email:</p>
            <p class="text-gray-900">{{ userProfile.email }}</p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700 font-medium">Nama Lengkap:</p>
            <p class="text-gray-900">{{ userProfile.name }}</p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700 font-medium">Universitas:</p>
            <p class="text-gray-900">
              {{ userProfile.university || "Belum diisi" }}
            </p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700 font-medium">Jurusan:</p>
            <p class="text-gray-900">
              {{ userProfile.major || "Belum diisi" }}
            </p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700 font-medium">Kota Asal:</p>
            <p class="text-gray-900">
              {{ userProfile.home_city || "Belum diisi" }}
            </p>
          </div>
          <button
            class="gen-z-gradient text-white py-2 px-4 rounded-md font-semibold hover:opacity-90 transition duration-300"
          >
            Edit Profil
          </button>
        </div>
      </div>
    </main>

    <!-- Custom Modal Component -->
    <Modal
      :is-visible="isModalVisible"
      :title="modalTitle"
      :message="modalMessage"
      :type="modalType"
      :cancel-button="modalCancelButton"
      :confirm-button-text="modalConfirmButtonText"
      @confirm="handleModalConfirm"
      @cancel="handleModalCancel"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import {
  HomeIcon,
  ListBulletIcon,
  ChartPieIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  WalletIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  SparklesIcon,
} from "@heroicons/vue/24/outline";
import supabase from "../lib/supabaseClient";
import Modal from "./Modal.vue"; // Import the new Modal component

const router = useRouter();

// Reactive states
const activeTab = ref("overview");
const isSidebarOpen = ref(false);
const isLoading = ref(true);
const error = ref(null);

// Modal states
const isModalVisible = ref(false);
const modalTitle = ref("");
const modalMessage = ref("");
const modalType = ref("info"); // 'info', 'success', 'error', 'warning', 'confirm'
const modalCancelButton = ref(false);
const modalConfirmButtonText = ref("Oke");
let modalCallback = null; // Callback function for confirm actions

// Data from Supabase
const userProfile = ref({
  email: "",
  name: "",
  university: "",
  major: "",
  home_city: "",
});
const transactions = ref([]);
const categories = ref([]);
const budgets = ref([]);
const savingsGoals = ref([]);
const bills = ref([]);

// Form for new transaction
const newTransaction = ref({
  amount: null,
  description: "",
  type: "expense",
  category_id: "",
});

// Filters for transactions tab
const transactionFilter = ref({
  search: "",
  type: "",
  category_id: "",
});

// Computed properties for Dashboard Overview
const currentBalance = computed(() => {
  // Ensure transactions.value is an array before reducing
  if (!Array.isArray(transactions.value)) return 0;
  return transactions.value.reduce((sum, t) => {
    return t.type === "income" ? sum + t.amount : sum - t.amount;
  }, 0);
});

const lastUpdate = computed(() => {
  if (!Array.isArray(transactions.value) || transactions.value.length === 0)
    return "N/A";
  // Sort by created_at to find the latest transaction
  const sortedTransactions = [...transactions.value].sort((a, b) => {
    // Add fallback for created_at to ensure Date constructor receives valid input
    const dateA = new Date(a.created_at || 0);
    const dateB = new Date(b.created_at || 0);
    return dateB.getTime() - dateA.getTime();
  });
  const latestTransaction = sortedTransactions[0];

  // Ensure latestTransaction.created_at is valid before formatting
  if (!latestTransaction || !latestTransaction.created_at) return "N/A";
  return new Date(latestTransaction.created_at).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const monthlyBudgetTotal = computed(() => {
  if (!Array.isArray(budgets.value)) return 0;
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  return budgets.value
    .filter((b) => b.month === currentMonth && b.year === currentYear)
    .reduce((sum, b) => sum + b.limit_amount, 0);
});

const monthlyBudgetSpent = computed(() => {
  if (!Array.isArray(transactions.value)) return 0;
  const currentMonth = new Date().getMonth();
  return transactions.value
    .filter(
      (t) =>
        t.type === "expense" &&
        new Date(t.transaction_date).getMonth() === currentMonth
    )
    .reduce((sum, t) => sum + t.amount, 0);
});

const budgetProgress = computed(() => {
  if (monthlyBudgetTotal.value === 0) return 0;
  return (monthlyBudgetSpent.value / monthlyBudgetTotal.value) * 100;
});

const upcomingBills = computed(() => {
  if (!Array.isArray(bills.value)) return [];
  const today = new Date();
  return bills.value
    .filter((bill) => {
      const dueDate = new Date(bill.due_date);
      const diffTime = dueDate.getTime() - today.getTime(); // Calculate difference in milliseconds
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
      // Filter for bills due in the future (diffDays >= 0) and within the next 30 days
      // Also check if it's not marked as paid for the current period
      return diffDays >= 0 && diffDays <= 30 && !bill.is_paid_current_period;
    })
    .sort((a, b) => {
      // Add fallback for due_date to ensure Date constructor receives valid input
      const dateA = new Date(a.due_date || 0).getTime();
      const dateB = new Date(b.due_date || 0).getTime();
      return dateA - dateB;
    })
    .slice(0, 3);
});

const expenseCategories = computed(() => {
  if (!Array.isArray(categories.value)) return [];
  return categories.value.filter(
    (cat) => cat.type === "expense" || cat.type === "all"
  );
});

const recentTransactions = computed(() => {
  if (!Array.isArray(transactions.value)) return [];
  return [...transactions.value]
    .sort(
      (a, b) =>
        new Date(b.transaction_date).getTime() -
        new Date(a.transaction_date).getTime()
    )
    .slice(0, 5);
});

const monthlyBudgets = computed(() => {
  if (!Array.isArray(budgets.value) || !Array.isArray(transactions.value))
    return [];
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  return budgets.value
    .filter((b) => b.month === currentMonth && b.year === currentYear)
    .map((budget) => {
      const spent = transactions.value
        .filter(
          (t) =>
            t.type === "expense" &&
            t.category_id === budget.category_id &&
            new Date(t.transaction_date).getMonth() + 1 === currentMonth
        )
        .reduce((sum, t) => sum + t.amount, 0);
      return { ...budget, spent };
    });
});

// Computed properties for Transactions Tab
const filteredTransactions = computed(() => {
  if (!Array.isArray(transactions.value)) return [];
  let filtered = transactions.value;

  if (transactionFilter.value.search) {
    const searchTerm = transactionFilter.value.search.toLowerCase();
    filtered = filtered.filter((t) =>
      t.description.toLowerCase().includes(searchTerm)
    );
  }
  if (transactionFilter.value.type) {
    filtered = filtered.filter((t) => t.type === transactionFilter.value.type);
  }
  if (transactionFilter.value.category_id) {
    filtered = filtered.filter(
      (t) => t.category_id === transactionFilter.value.category_id
    );
  }

  return filtered.slice().sort((a, b) => {
    // Add fallback for transaction_date to ensure Date constructor receives valid input
    const dateA = new Date(a.transaction_date || 0).getTime();
    const dateB = new Date(b.transaction_date || 0).getTime();
    return dateB - dateA;
  });
});

// Helper to get category name by ID
const getCategoryName = (categoryId) => {
  if (!Array.isArray(categories.value)) return "Tidak Dikategorikan";
  const category = categories.value.find((cat) => cat.id === categoryId);
  return category ? category.name : "Tidak Dikategorikan";
};

// Modal functions
const showModal = (
  title,
  message,
  type = "info",
  cancelButton = false,
  confirmButtonText = "Oke",
  callback = null
) => {
  isModalVisible.value = true;
  modalTitle.value = title;
  modalMessage.value = message;
  modalType.value = type;
  modalCancelButton.value = cancelButton;
  modalConfirmButtonText.value = confirmButtonText;
  modalCallback = callback;
};

const closeModal = () => {
  isModalVisible.value = false;
  modalCallback = null; // Clear callback
};

const handleModalConfirm = () => {
  if (modalCallback) {
    modalCallback(true);
  }
  closeModal();
};

const handleModalCancel = () => {
  if (modalCallback) {
    modalCallback(false);
  }
  closeModal();
};

// Methods for data fetching and manipulation
const formatCurrency = (value) => {
  return value.toLocaleString("id-ID");
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const fetchDashboardData = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }

    // Fetch Profile
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("name, university, major, home_city")
      .eq("id", user.id)
      .limit(1);
    if (profileError) {
      if (
        profileError.code === "PGRST116" ||
        (profileError.details && profileError.details.includes("0 rows"))
      ) {
        console.warn("No profile found for user, initializing with default.");
        userProfile.value = {
          email: user.email,
          name: user.email,
          university: "",
          major: "",
          home_city: "",
        };
      } else {
        throw profileError;
      }
    } else if (profileData && profileData.length > 0) {
      userProfile.value = {
        ...userProfile.value,
        ...profileData[0],
        email: user.email,
      };
    } else {
      userProfile.value = {
        email: user.email,
        name: user.email,
        university: "",
        major: "",
        home_city: "",
      };
    }

    // Fetch Categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("categories")
      .select("*")
      .or(`user_id.eq.${user.id},user_id.is.null`);
    if (categoriesError) throw categoriesError;
    categories.value = categoriesData;

    // Fetch Transactions
    const { data: transactionsData, error: transactionsError } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (transactionsError) throw transactionsError;
    transactions.value = transactionsData.map((t) => ({
      ...t,
      transaction_date: new Date(t.transaction_date),
      created_at: new Date(t.created_at),
    }));

    // Fetch Budgets
    const { data: budgetsData, error: budgetsError } = await supabase
      .from("budgets")
      .select("*")
      .eq("user_id", user.id);
    if (budgetsError) throw budgetsError;
    budgets.value = budgetsData;

    // Fetch Savings Goals
    const { data: goalsData, error: goalsError } = await supabase
      .from("savings_goals")
      .select("*")
      .eq("user_id", user.id);
    if (goalsError) throw goalsError;
    savingsGoals.value = goalsData;

    // Fetch Bills
    const { data: billsData, error: billsError } = await supabase
      .from("bills")
      .select("*")
      .eq("user_id", user.id);
    if (billsError) throw billsError;
    bills.value = billsData.map((b) => ({
      ...b,
      due_date: new Date(b.due_date),
    }));
  } catch (err) {
    console.error("Error fetching dashboard data:", err.message);
    error.value = "Gagal memuat data: " + err.message;
    showModal("Error", "Gagal memuat data: " + err.message, "error");
  } finally {
    isLoading.value = false;
  }
};

const addTransaction = async () => {
  if (!newTransaction.value.amount || !newTransaction.value.description) {
    showModal(
      "Input Tidak Lengkap",
      "Jumlah dan deskripsi transaksi harus diisi.",
      "warning"
    );
    return;
  }
  if (
    newTransaction.value.type === "expense" &&
    !newTransaction.value.category_id
  ) {
    showModal(
      "Kategori Belum Dipilih",
      "Kategori harus dipilih untuk pengeluaran.",
      "warning"
    );
    return;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const transactionToInsert = {
      user_id: user.id,
      amount: newTransaction.value.amount,
      description: newTransaction.value.description,
      type: newTransaction.value.type,
      transaction_date: new Date().toISOString().split("T")[0],
      category_id:
        newTransaction.value.type === "expense"
          ? newTransaction.value.category_id
          : null,
    };

    const { error: insertError } = await supabase
      .from("transactions")
      .insert([transactionToInsert]);

    if (insertError) throw insertError;

    showModal("Berhasil!", "Transaksi berhasil ditambahkan!", "success");
    await fetchDashboardData();
    newTransaction.value = {
      amount: null,
      description: "",
      type: "expense",
      category_id: "",
    };
  } catch (err) {
    console.error("Error adding transaction:", err.message);
    showModal("Error", "Gagal menambahkan transaksi: " + err.message, "error");
  }
};

const emit = defineEmits(["logout"]);

const handleLogout = async () => {
  showModal(
    "Konfirmasi Logout",
    "Apakah Anda yakin ingin keluar?",
    "confirm",
    true, // Show cancel button
    "Ya, Logout",
    async (confirmed) => {
      if (confirmed) {
        try {
          const { error: logoutError } = await supabase.auth.signOut();
          if (logoutError) throw logoutError;
          console.log("User logged out.");
          emit("logout");
          router.push({ name: "Auth" });
        } catch (err) {
          console.error("Error logging out:", err.message);
          showModal("Error Logout", "Gagal logout: " + err.message, "error");
        }
      }
    }
  );
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Intersection Observer for animations
const observer = ref(null);

const setupIntersectionObserver = () => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }
  );

  document.querySelectorAll(".animate-fade-in-up").forEach((element) => {
    observer.value.observe(element);
  });
};

onMounted(() => {
  fetchDashboardData();
  setupIntersectionObserver();
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>

<style scoped>
.font-inter {
  font-family: "Inter", sans-serif;
}

.gen-z-gradient {
  background: linear-gradient(135deg, #6ee7b7, #3b82f6, #9333ea);
}
.gen-z-text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(45deg, #6ee7b7, #3b82f6, #9333ea);
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

.delay-100 {
  transition-delay: 0.1s;
}
.delay-200 {
  transition-delay: 0.2s;
}
.delay-300 {
  transition-delay: 0.3s;
}
.delay-400 {
  transition-delay: 0.4s;
}

/* Mobile sidebar specific styles */
@media (max-width: 767px) {
  aside {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 75%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
}
</style>
