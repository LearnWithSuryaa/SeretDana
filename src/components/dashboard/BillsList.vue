<template>
  <div class="space-y-6 pb-8">
    <!-- Heading -->
    <h2 class="text-2xl font-bold text-gray-800">Daftar Tagihan</h2>

    <!-- Card Wrapper -->
    <div
      class="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50"
    >
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-gray-700">Tagihan Anda</h3>
        <button
          @click="openAddEditBillModal(null)"
          class="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium text-sm shadow-md transition"
        >
          <PlusIcon class="w-4 h-4 mr-1" />
          Tambah Tagihan
        </button>
      </div>

      <!-- Filter/Search Section -->
      <div
        class="mb-4 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
      >
        <!-- Search -->
        <div class="relative flex-1">
          <input
            type="text"
            v-model="filter.search"
            placeholder="Cari nama tagihan..."
            class="w-full rounded-lg border border-gray-300 bg-white/70 pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
          <MagnifyingGlassIcon
            class="w-5 h-5 absolute left-2.5 top-2.5 text-gray-400"
          />
        </div>

        <!-- Dropdowns -->
        <select
          v-model="filter.frequency"
          class="w-full sm:w-auto rounded-lg border border-gray-300 bg-white/70 text-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        >
          <option value="">Semua Frekuensi</option>
          <option
            v-for="freq in frequencies"
            :key="freq.value"
            :value="freq.value"
          >
            {{ freq.name }}
          </option>
        </select>
        <select
          v-model="filter.is_paid"
          class="w-full sm:w-auto rounded-lg border border-gray-300 bg-white/70 text-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        >
          <option value="">Semua Status</option>
          <option value="false">Belum Dibayar</option>
          <option value="true">Sudah Dibayar</option>
        </select>
      </div>

      <!-- Bills List -->
      <ul v-if="filteredBills?.length" class="space-y-3">
        <li
          v-for="bill in filteredBills"
          :key="bill.id"
          class="bg-white/70 backdrop-blur rounded-xl border border-gray-200 shadow-sm p-4 flex justify-between items-center hover:shadow-md transition"
        >
          <!-- Info -->
          <div class="flex flex-col">
            <p class="font-semibold text-gray-800 text-sm">{{ bill.name }}</p>
            <p class="text-xs text-gray-500">
              Jatuh Tempo: {{ formatDate(bill.due_date) }}
              <span class="ml-1 text-gray-400">
                ({{ getFrequencyName(bill.frequency) }})
              </span>
              <span v-if="bill.category_id" class="text-gray-400">
                • {{ getCategoryName(bill.category_id) }}
              </span>
            </p>
          </div>

          <!-- Amount & Status -->
          <div class="flex flex-col items-end space-y-1">
            <span
              class="text-sm font-bold"
              :class="{
                'text-green-600': bill.is_paid_current_period,
                'text-red-600': !bill.is_paid_current_period,
              }"
            >
              Rp {{ formatCurrency(bill.amount) }}
            </span>
            <span
              :class="{
                'bg-green-100 text-green-800': bill.is_paid_current_period,
                'bg-red-100 text-red-800': !bill.is_paid_current_period,
              }"
              class="px-2 py-0.5 rounded-full text-[10px] font-medium"
            >
              {{ bill.is_paid_current_period ? "Lunas" : "Belum Lunas" }}
            </span>
            <button
              @click="openAddEditBillModal(bill)"
              class="text-blue-500 hover:text-blue-700"
            >
              <PencilSquareIcon class="w-4 h-4" />
            </button>
          </div>
        </li>
      </ul>

      <!-- Empty State -->
      <p v-else class="text-center text-gray-400 italic py-8">
        Tidak ada tagihan yang cocok.
      </p>
    </div>

    <!-- Add/Edit Modal -->
    <AddEditBillModal
      :is-visible="isAddEditBillModalVisible"
      :expense-categories="expenseCategories"
      :initial-bill="editingBill"
      @close="closeAddEditBillModal"
      @add-bill="handleModalAddBill"
      @update-bill="handleModalUpdateBill"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  PlusIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";
import AddEditBillModal from "../modal/AddEditBillModal.vue"; // Import the new modal component

const props = defineProps({
  bills: {
    type: Array,
    default: () => [],
  },
  categories: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["add-bill", "update-bill"]);

const isAddEditBillModalVisible = ref(false);
const editingBill = ref(null); // Stores the bill object being edited

const filter = ref({
  search: "",
  frequency: "",
  is_paid: "", // Use string 'true'/'false' for select options
});

const frequencies = ref([
  { name: "Bulanan", value: "monthly" },
  { name: "Triwulanan", value: "quarterly" },
  { name: "Tahunan", value: "yearly" },
  { name: "Satu Kali", value: "one-time" },
]);

const expenseCategories = computed(() => {
  return props.categories.filter(
    (cat) => cat.type === "expense" || cat.type === "all"
  );
});

const filteredBills = computed(() => {
  if (!Array.isArray(props.bills)) return [];
  let filtered = props.bills;

  if (filter.value.search) {
    const searchTerm = filter.value.search.toLowerCase();
    filtered = filtered.filter((bill) =>
      bill.name.toLowerCase().includes(searchTerm)
    );
  }
  if (filter.value.frequency) {
    filtered = filtered.filter(
      (bill) => bill.frequency === filter.value.frequency
    );
  }
  if (filter.value.is_paid !== "") {
    // Check against empty string, not just truthy/falsy
    const isPaidBool = filter.value.is_paid === "true";
    filtered = filtered.filter(
      (bill) => bill.is_paid_current_period === isPaidBool
    );
  }

  return filtered.slice().sort((a, b) => {
    const dateA = new Date(a.due_date || 0).getTime();
    const dateB = new Date(b.due_date || 0).getTime();
    return dateA - dateB; // Sort by due date ascending
  });
});

// Methods
const formatCurrency = (value) => {
  if (typeof value !== "number") return "0";
  return value.toLocaleString("id-ID");
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getCategoryName = (categoryId) => {
  const category = props.categories.find((cat) => cat.id === categoryId);
  return category ? category.name : "Tidak Dikategorikan";
};

const getFrequencyName = (value) => {
  const freq = frequencies.value.find((f) => f.value === value);
  return freq ? freq.name : value;
};

// Functions to manage the modal
const openAddEditBillModal = (bill = null) => {
  editingBill.value = bill; // Set the bill object to edit, or null for adding
  isAddEditBillModalVisible.value = true;
};

const closeAddEditBillModal = () => {
  isAddEditBillModalVisible.value = false;
  editingBill.value = null; // Clear the editing state
};

const handleModalAddBill = (billData) => {
  emit("add-bill", billData); // Emit add event to DashboardPage
  closeAddEditBillModal(); // Close modal after submission
};

const handleModalUpdateBill = (billData) => {
  emit("update-bill", billData); // Emit update event to DashboardPage
  closeAddEditBillModal(); // Close modal after submission
};
</script>

<style scoped>
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

/* Adjusted styles for a more modern look */
.bg-white.shadow-xl {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.05); /* Softer shadow */
}

.bg-white.shadow-xl:hover {
  box-shadow: 0 15px 20px -5px rgba(0, 0, 0, 0.1),
    0 6px 10px -4px rgba(0, 0, 0, 0.08); /* Slightly more pronounced on hover */
  transform: translateY(-2px); /* Subtle lift */
}

/* Specific styles for list items */
.border.border-gray-200.p-4.rounded-lg.shadow-sm {
  border: 1px solid var(--color-gray-200);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* Very subtle shadow for list items */
}

.border.border-gray-200.p-4.rounded-lg.shadow-sm:hover {
  transform: translateY(-1px); /* Slight lift on hover */
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08); /* Slightly more pronounced shadow on hover */
}

.bg-blue-500.text-white.px-4.py-2.rounded-lg.font-medium.text-sm.shadow-md.hover\:bg-blue-600.transition.duration-300:hover {
  transform: translateY(-1px); /* Slight lift on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Softer shadow on hover */
}
</style>
