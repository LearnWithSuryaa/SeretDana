<template>
  <div
    class="w-full max-w-5xl h-[560px] bg-white rounded-2xl shadow-xl border border-gray-200 flex overflow-hidden"
  >
    <!-- Sidebar -->
    <aside
      class="w-16 bg-gradient-to-b from-[#5AB2FF] to-[#3A8DDF] flex flex-col items-center py-4 space-y-6 relative"
    >
      <!-- Logo -->
      <div
        class="flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow"
      >
        <img src="/logo.png" alt="Fluidana" class="w-7 h-7 object-contain" />
      </div>

      <!-- Navigation -->
      <nav class="flex flex-col items-center space-y-5 mt-4 w-full">
        <div
          v-for="item in navItems"
          :key="item.key"
          class="relative flex items-center justify-center w-full"
        >
          <!-- Active Background Circle -->
          <span
            v-if="activeTab === item.key"
            class="absolute w-10 h-10 bg-white/20 rounded-full"
          ></span>

          <!-- Icon -->
          <component
            :is="item.icon"
            class="w-5 h-5 transition-colors duration-200 cursor-pointer relative z-10"
            :class="{
              'text-white': activeTab === item.key,
              'text-white/70 hover:text-white': activeTab !== item.key,
            }"
            @click="activeTab = item.key"
          />
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <main
      class="flex-1 p-5 bg-gradient-to-br from-[#f8fbff] to-[#eef6ff] overflow-y-auto"
    >
      <!-- Render child components based on activeTab -->
      <div v-if="activeTab === 'overview'">
        <DashboardOverview
          :user-profile="userProfile"
          :current-balance="currentBalance"
          :last-update="lastUpdate"
          :monthly-budget-total="monthlyBudgetTotal"
          :monthly-budget-spent="monthlyBudgetSpent"
          :budget-progress="budgetProgress"
          :upcoming-bills="upcomingBills"
          :recent-transactions="recentTransactions"
          :categories="categories"
          :daily-spending-limit="dailySpendingLimit"
          :is-demo-mode="true"
          @add-transaction="handleAddTransaction"
        />
      </div>

      <div v-else-if="activeTab === 'transactions'">
        <TransactionsList
          :transactions="allTransactions"
          :categories="categories"
          :is-demo-mode="true"
        />
      </div>

      <div v-else-if="activeTab === 'budgets'">
        <BudgetsAnalytics
          :budgets="budgets"
          :transactions="allTransactions"
          :categories="categories"
          :is-demo-mode="true"
        />
      </div>

      <div v-else-if="activeTab === 'bills'">
        <BillsList
          :bills="bills"
          :categories="categories"
          :is-demo-mode="true"
        />
      </div>

      <div v-else-if="activeTab === 'goals'">
        <SavingsGoals :savings-goals="savingsGoals" :is-demo-mode="true" />
      </div>

      <div v-else-if="activeTab === 'categories'">
        <CategoriesPage :categories="categories" :is-demo-mode="true" />
      </div>

      <div v-else-if="activeTab === 'profile'">
        <UserProfile :user-profile="userProfile" :is-demo-mode="true" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  HomeIcon,
  ListBulletIcon,
  ChartPieIcon,
  ReceiptPercentIcon,
  SparklesIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/outline";
import DashboardOverview from "../dashboard/DashboardOverview.vue";
import TransactionsList from "../dashboard/TransactionsList.vue";
import BudgetsAnalytics from "../dashboard/BudgetsAnalytics.vue";
import BillsList from "../dashboard/BillsList.vue";
import SavingsGoals from "../dashboard/SavingsGoals.vue";
import UserProfile from "../dashboard/UserProfile.vue";
import CategoriesPage from "../dashboard/CategoriesPage.vue";
import dayjs from "dayjs";

const activeTab = ref("overview");

const navItems = [
  { key: "overview", label: "Overview", icon: HomeIcon },
  { key: "transactions", label: "Transaksi", icon: ListBulletIcon },
  { key: "budgets", label: "Anggaran", icon: ChartPieIcon },
  { key: "bills", label: "Tagihan", icon: ReceiptPercentIcon },
  { key: "goals", label: "Tujuan Keuangan", icon: SparklesIcon },
  { key: "categories", label: "Kategori", icon: TagIcon },
  { key: "profile", label: "Profil", icon: UserCircleIcon },
];

// --- Data Dummy untuk Demo ---
const userProfile = ref({ name: "Mahasiswa" });
const currentBalance = ref(2350000);
const lastUpdate = ref(new Date().toLocaleDateString("id-ID"));
const monthlyBudgetTotal = ref(3000000);
const monthlyBudgetSpent = ref(1200000);
const dailySpendingLimit = ref(150000);

const categories = ref([
  { id: 1, name: "Makanan & Minuman", type: "expense" },
  { id: 2, name: "Gaji", type: "income" },
  { id: 3, name: "Transportasi", type: "expense" },
  { id: 4, name: "Hiburan", type: "expense" },
]);

const upcomingBills = ref([
  { id: 1, name: "Kos Bulanan", amount: 750000, due_date: "2025-09-10" },
]);

const recentTransactions = ref([
  {
    id: 1,
    description: "Makan Siang",
    amount: 25000,
    type: "expense",
    category_id: 1,
    transaction_date: "2025-09-03",
  },
  {
    id: 2,
    description: "Uang Saku",
    amount: 500000,
    type: "income",
    category_id: 2,
    transaction_date: "2025-09-02",
  },
]);

const allTransactions = ref([
  {
    id: 1,
    description: "Makan Siang",
    amount: 25000,
    type: "expense",
    category_id: 1,
    transaction_date: "2025-09-03",
    created_at: dayjs("2025-09-03T12:30:00Z").toISOString(),
  },
  {
    id: 2,
    description: "Uang Saku",
    amount: 500000,
    type: "income",
    category_id: 2,
    transaction_date: "2025-09-02",
    created_at: dayjs("2025-09-02T09:00:00Z").toISOString(),
  },
  {
    id: 3,
    description: "Nonton Bioskop",
    amount: 75000,
    type: "expense",
    category_id: 4,
    transaction_date: "2025-09-01",
    created_at: dayjs("2025-09-01T20:15:00Z").toISOString(),
  },
  {
    id: 4,
    description: "Bensin Motor",
    amount: 20000,
    type: "expense",
    category_id: 3,
    transaction_date: "2025-09-01",
    created_at: dayjs("2025-09-01T10:45:00Z").toISOString(),
  },
]);

const budgets = ref([
  { id: 1, category_id: 1, amount: 1500000, spent: 1200000 },
]);

const bills = ref([
  {
    id: 1,
    name: "Kos Bulanan",
    amount: 750000,
    due_date: "2025-09-10",
    frequency: "monthly",
  },
]);

const savingsGoals = ref([
  {
    id: 1,
    name: "Beli Laptop Baru",
    target_amount: 10000000,
    saved_amount: 2500000,
    due_date: "2026-06-01",
  },
]);

const budgetProgress = computed(() => {
  return (monthlyBudgetSpent.value / monthlyBudgetTotal.value) * 100;
});

const getTabName = (key) => {
  const item = navItems.find((item) => item.key === key);
  return item ? item.label : "";
};
</script>
