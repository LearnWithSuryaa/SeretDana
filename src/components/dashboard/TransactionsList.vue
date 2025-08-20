<template>
  <div class="space-y-8 bg-gradient-to-br from-[#E8F5FF] via-[#F9FBFF] to-[#FFFFFF]">
    <!-- Heading -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-2"
    >
      <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">
        Riwayat Transaksi
      </h2>
      <span class="text-sm text-gray-500">
        {{ filteredTransactions.length }} transaksi ditemukan
      </span>
    </div>

    <!-- Filter Toolbar -->
    <div
      class="w-full bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl px-4 py-4 shadow-md flex flex-col md:flex-row md:items-center md:gap-4 gap-3"
    >
      <!-- Search -->
      <div class="relative w-full md:w-auto flex-1">
        <input
          v-model="filter.search"
          type="text"
          placeholder="Cari deskripsi..."
          class="w-full bg-white/70 border border-gray-300 text-sm rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-[#5AB2FF] focus:outline-none shadow-sm"
        />
        <MagnifyingGlassIcon
          class="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
        />
      </div>

      <!-- Type Selector -->
      <div class="flex items-center gap-2">
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
        class="bg-white/70 border border-gray-300 text-sm rounded-lg py-2 px-3 focus:ring-2 focus:ring-[#5AB2FF] focus:outline-none w-full md:w-auto shadow-sm"
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

    <!-- Timeline Transactions -->
    <div v-if="Object.keys(groupedTransactions).length > 0" class="space-y-10">
      <div
        v-for="(transactions, date) in groupedTransactions"
        :key="date"
        class="relative"
      >
        <!-- Date Header -->
        <div
          class="sticky top-0 z-10 inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#EAF6FF] to-[#F8FBFF] text-[#3A8DDF] rounded-full shadow-sm border border-white/60"
        >
          <h3 class="text-xs font-semibold tracking-wide">
            {{ formatDateHeader(date) }}
          </h3>
        </div>

        <!-- Timeline List -->
        <div class="relative pl-6 space-y-4">
          <!-- Vertical Gradient Line -->
          <div
            class="absolute left-2 top-0 h-full w-0.5 bg-gradient-to-b from-[#5AB2FF] to-[#A0DEFF] opacity-40"
          ></div>

          <transition-group name="fade" tag="div">
            <div
              v-for="transaction in transactions"
              :key="transaction.id"
              class="relative bg-white/70 backdrop-blur-lg rounded-xl border border-white/40 shadow-sm p-4 flex justify-between items-center transition duration-300 hover:scale-[1.01] hover:shadow-md"
            >
              <!-- Timeline Dot -->
              <span
                class="absolute -left-2 top-5 w-3 h-3 rounded-full border-2 border-white shadow"
                :class="{
                  'bg-green-500 shadow-green-200/70':
                    transaction.type === 'income',
                  'bg-red-500 shadow-red-200/70':
                    transaction.type === 'expense',
                }"
              ></span>

              <!-- Info -->
              <div class="space-y-1">
                <p class="text-gray-800 font-medium text-sm">
                  {{ transaction.description }}
                </p>
                <div class="text-xs text-gray-500">
                  {{ formatTime(transaction.created_at) }}
                  <span
                    v-if="transaction.category_id"
                    class="ml-1 text-gray-400"
                  >
                    • {{ getCategoryName(transaction.category_id) }}
                  </span>
                </div>
              </div>

              <!-- Amount -->
              <div
                class="text-base font-bold"
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
        </div>
      </div>
    </div>

    <p v-else class="text-center text-gray-400 italic py-12">
      Tidak ada transaksi yang cocok ditemukan.
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import dayjs from "dayjs";
import "dayjs/locale/id";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.locale("id");
dayjs.extend(utc);
dayjs.extend(timezone);

// Props
const props = defineProps({
  transactions: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
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

  // sort desc pakai transaction_date
  return filtered.sort(
    (a, b) =>
      dayjs.utc(b.transaction_date).valueOf() -
      dayjs.utc(a.transaction_date).valueOf()
  );
});

// Grouped by date (pakai transaction_date)
const groupedTransactions = computed(() => {
  return filteredTransactions.value.reduce((groups, t) => {
    const dateKey = dayjs.utc(t.transaction_date).format("YYYY-MM-DD");
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(t);
    return groups;
  }, {});
});

// Helpers
const formatCurrency = (val) => (val || 0).toLocaleString("id-ID");

// Format jam pakai created_at
const formatTime = (date) => {
  if (!date) return "-";
  return dayjs.utc(date).tz(dayjs.tz.guess()).format("HH:mm");
};

// Format tanggal pakai transaction_date
const formatDateHeader = (date) => {
  if (!date) return "";
  return dayjs.utc(date).tz(dayjs.tz.guess()).format("dddd, D MMMM YYYY");
};

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
