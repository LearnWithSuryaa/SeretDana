<template>
  <div class="space-y-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Manajemen Kategori</h2>

    <div class="bg-white p-6 rounded-2xl shadow-xl">
      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0"
      >
        <h3 class="text-xl font-semibold text-gray-700">
          Daftar Kategori Anda
        </h3>
        <button
          @click="openAddEditCategoryModal(null)"
          class="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition transform hover:scale-[1.02] cursor-pointer"
        >
          <PlusIcon class="w-4 h-4" /> Tambah Kategori
        </button>
      </div>

      <!-- Search Bar -->
      <div class="mb-4">
        <input
          type="text"
          v-model="filter.search"
          placeholder="Cari kategori..."
          class="w-full rounded-full border border-gray-300 p-2 px-4 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
        />
      </div>

      <!-- Category List -->
      <div
        v-if="filteredCategories && filteredCategories.length > 0"
        class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div
          v-for="category in filteredCategories"
          :key="category.id"
          class="bg-gray-50 hover:bg-gray-100 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div class="flex items-start justify-between">
            <div>
              <p class="font-semibold text-gray-800 mb-1">
                {{ category.name }}
              </p>
              <span
                class="inline-block text-xs font-medium px-2 py-0.5 rounded-full"
                :class="{
                  'bg-red-100 text-red-600': category.type === 'expense',
                  'bg-green-100 text-green-600': category.type === 'income',
                  'bg-gray-100 text-gray-600': category.type === 'all',
                }"
              >
                {{ getCategoryTypeDisplay(category.type) }}
              </span>
            </div>
            <button
              @click="openAddEditCategoryModal(category)"
              class="text-blue-500 hover:text-blue-700 transition cursor-pointer"
            >
              <PencilSquareIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <p v-else class="text-center text-gray-500 italic py-8">
        Tidak ada kategori yang cocok ditemukan.
      </p>
    </div>

    <!-- Modal Komponen -->
    <AddEditCategoryModal
      :is-visible="isAddEditCategoryModalVisible"
      :initial-category="editingCategory"
      @close="closeAddEditCategoryModal"
      @add-category="handleModalAddCategory"
      @update-category="handleModalUpdateCategory"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { PlusIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";
import AddEditCategoryModal from "./AddEditCategoryModal.vue";

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  "add-category",
  "update-category",
  "delete-category",
  "show-modal",
]); // Added show-modal event

const isAddEditCategoryModalVisible = ref(false);
const editingCategory = ref(null); // Stores the category object being edited

const filter = ref({
  search: "",
  type: "",
});

const filteredCategories = computed(() => {
  if (!Array.isArray(props.categories)) return [];
  let filtered = props.categories;

  if (filter.value.search) {
    const searchTerm = filter.value.search.toLowerCase();
    filtered = filtered.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm)
    );
  }

  return filtered.slice().sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
});

const getCategoryTypeDisplay = (type) => {
  switch (type) {
    case "expense":
      return "Pengeluaran";
    case "income":
      return "Pemasukan";
    case "all":
      return "Semua";
    default:
      return type;
  }
};

// Functions to manage the modal
const openAddEditCategoryModal = (category = null) => {
  editingCategory.value = category; // Set the category object to edit, or null for adding
  isAddEditCategoryModalVisible.value = true;
};

const closeAddEditCategoryModal = () => {
  isAddEditCategoryModalVisible.value = false;
  editingCategory.value = null; // Clear the editing state
};

const handleModalAddCategory = (categoryData) => {
  emit("add-category", categoryData); // Emit add event to DashboardPage
  closeAddEditCategoryModal();
};

const handleModalUpdateCategory = (categoryData) => {
  emit("update-category", categoryData); // Emit update event to DashboardPage
  closeAddEditCategoryModal();
};
</script>

<style scoped>
.bg-white.shadow-xl {
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
}

.bg-white.shadow-xl:hover {
  box-shadow: 0 15px 25px -5px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
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
