<template>
  <div class="space-y-6">
    <!-- Heading -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-2"
    >
      <h2 class="text-3xl font-bold text-gray-800">Riwayat Transaksi</h2>
      <span class="text-sm text-gray-500">
        {{ filteredTransactions.length }} transaksi ditemukan
      </span>
    </div>

    <!-- Modern Filter Toolbar -->
    <div
      class="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 shadow-sm flex flex-col md:flex-row md:items-center md:gap-4 gap-3"
    >
      <!-- Search -->
      <div class="relative w-full md:w-auto flex-1">
        <input
          v-model="filter.search"
          type="text"
          placeholder="Cari deskripsi..."
          class="w-full bg-gray-50 border border-gray-300 text-sm rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <MagnifyingGlassIcon
          class="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
        />
      </div>

      <!-- Type Selector -->
      <div class="flex items-center gap-2 cursor-pointer">
        <button
          @click="filter.type = ''"
          :class="filter.type === '' ? activeFilterClass : inactiveFilterClass"
        >
          Semua
        </button>
        <button
          @click="filter.type = 'income'"
          :class="
            filter.type === 'income' ? activeFilterClass : inactiveFilterClass
          "
        >
          Pemasukan
        </button>
        <button
          @click="filter.type = 'expense'"
          :class="
            filter.type === 'expense' ? activeFilterClass : inactiveFilterClass
          "
        >
          Pengeluaran
        </button>
      </div>

      <!-- Category Filter -->
      <select
        v-model="filter.category_id"
        class="bg-gray-50 border border-gray-300 text-sm rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full md:w-auto"
      >
        <option value="">Semua Kategori</option>
        <template v-if="filter.type === 'income'">
          <option v-for="cat in incomeCategories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </template>
        <template v-else-if="filter.type === 'expense'">
          <option
            v-for="cat in expenseCategories"
            :key="cat.id"
            :value="cat.id"
          >
            {{ cat.name }}
          </option>
        </template>
        <template v-else>
          <option v-for="cat in allCategories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </template>
      </select>
    </div>

    <!-- Transactions List -->
    <div class="space-y-3">
      <template v-if="filteredTransactions.length > 0">
        <transition-group name="fade" tag="div">
          <div
            v-for="transaction in filteredTransactions"
            :key="transaction.id"
            class="relative bg-white rounded-xl border-l-4 shadow-sm border-gray-200 p-4 flex justify-between items-center transition duration-300 transform hover:shadow-lg hover:scale-[1.01]"
            :class="{
              'border-green-500': transaction.type === 'income',
              'border-red-500': transaction.type === 'expense',
            }"
          >
            <!-- Info -->
            <div class="space-y-1">
              <p class="text-gray-800 font-medium">
                {{ transaction.description }}
              </p>
              <div class="text-xs text-gray-500">
                {{ formatDate(transaction.transaction_date) }}
                <span v-if="transaction.category_id" class="ml-1 text-gray-400">
                  • {{ getCategoryName(transaction.category_id) }}
                </span>
              </div>
            </div>

            <!-- Amount -->
            <div
              class="text-sm font-bold"
              :class="{
                'text-green-600': transaction.type === 'income',
                'text-red-600': transaction.type === 'expense',
              }"
            >
              {{ transaction.type === "income" ? "+" : "-" }} Rp
              {{ formatCurrency(transaction.amount) }}
            </div>
          </div>
        </transition-group>
      </template>

      <p v-else class="text-center text-gray-400 italic py-12">
        Tidak ada transaksi yang cocok ditemukan.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";

// Props
const props = defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
  categories: {
    type: Array,
    default: () => [],
  },
});

// Filter state
const filter = ref({
  search: "",
  type: "",
  category_id: "",
});

// Computed category filters
const incomeCategories = computed(() =>
  props.categories.filter((c) => c.type === "income" || c.type === "all")
);
const expenseCategories = computed(() =>
  props.categories.filter((c) => c.type === "expense" || c.type === "all")
);
const allCategories = computed(() => props.categories);

// Filtered transaction logic
const filteredTransactions = computed(() => {
  let filtered = props.transactions;

  if (filter.value.search) {
    filtered = filtered.filter((t) =>
      t.description.toLowerCase().includes(filter.value.search.toLowerCase())
    );
  }
  if (filter.value.type) {
    filtered = filtered.filter((t) => t.type === filter.value.type);
  }
  if (filter.value.category_id) {
    filtered = filtered.filter(
      (t) => t.category_id === filter.value.category_id
    );
  }

  return filtered.sort(
    (a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)
  );
});

// Helpers
const formatCurrency = (val) => (val || 0).toLocaleString("id-ID");
const formatDate = (date) =>
  new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
const getCategoryName = (id) =>
  props.categories.find((cat) => cat.id === id)?.name || "Tidak dikategorikan";

// Dynamic button classes
const activeFilterClass =
  "px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full";
const inactiveFilterClass =
  "px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full hover:bg-gray-200 transition";
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
