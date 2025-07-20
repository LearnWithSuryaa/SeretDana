<template>
  <transition name="modal-fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm px-4"
    >
      <div
        class="bg-white rounded-3xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-95 modal-content border border-gray-200"
      >
        <!-- Header -->
        <div
          class="px-6 py-5 border-b border-gray-100 flex justify-between items-center"
        >
          <h3 class="text-2xl font-bold text-gray-800 tracking-tight">
            Catat Transaksi
          </h3>
          <button
            @click="close"
            class="text-gray-400 hover:text-gray-600 transition"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-5">
          <form @submit.prevent="submitTransaction" class="space-y-6">
            <!-- Jumlah -->
            <div class="relative">
              <label
                for="modal-amount"
                class="block text-xs font-semibold text-gray-500 mb-1"
                >Jumlah (Rp)</label
              >
              <div class="relative">
                <input
                  type="number"
                  id="modal-amount"
                  v-model.number="newTransaction.amount"
                  required
                  placeholder="Contoh: 50000"
                  class="modern-input pl-10"
                />
                <span
                  class="absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm"
                  >Rp</span
                >
              </div>
            </div>

            <!-- Deskripsi -->
            <div>
              <label
                for="modal-description"
                class="block text-xs font-semibold text-gray-500 mb-1"
                >Deskripsi</label
              >
              <textarea
                id="modal-description"
                v-model="newTransaction.description"
                rows="3"
                placeholder="Contoh: Beli makan siang di warteg dekat kos"
                class="modern-input resize-none"
              ></textarea>
            </div>

            <!-- Tipe Transaksi -->
            <div>
              <label
                for="modal-type"
                class="block text-xs font-semibold text-gray-500 mb-1"
                >Tipe</label
              >
              <select
                id="modal-type"
                v-model="newTransaction.type"
                required
                class="modern-input cursor-pointer"
              >
                <option value="income">Pemasukan</option>
                <option value="expense">Pengeluaran</option>
              </select>
            </div>

            <!-- Kategori -->
            <div>
              <label
                for="modal-category"
                class="block text-xs font-semibold text-gray-500 mb-1"
                >Kategori</label
              >
              <div
                v-if="newTransaction.type === 'expense' && currentCategories.length === 0"
                class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative text-sm"
              >
                <strong class="font-bold">Perhatian!</strong>
                <span class="block sm:inline"
                  >Anda belum memiliki kategori pengeluaran. Silakan buat di
                  halaman Kategori terlebih dahulu.</span
                >
              </div>
              <select
                id="modal-category"
                v-model="newTransaction.category_id"
                :disabled="newTransaction.type === 'expense' && currentCategories.length === 0"
                class="modern-input disabled:bg-gray-100 disabled:cursor-not-allowed cursor-pointer"
              >
                <option value="">Pilih Kategori</option>
                <option
                  v-for="cat in currentCategories"
                  :key="cat.id"
                  :value="cat.id"
                >
                  {{ cat.name }}
                </option>
              </select>
            </div>

            <!-- Warning: Data Tidak Bisa Dihapus -->
            <div
              class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative text-sm"
            >
              <strong class="font-bold">Penting!</strong>
              <span class="block sm:inline"
                >Transaksi yang sudah dicatat tidak dapat dihapus di kemudian
                hari. Mohon pastikan data Anda benar.</span
              >
            </div>

            <!-- Tombol -->
            <div class="flex justify-end pt-3 gap-3">
              <button
                type="button"
                @click="close"
                class="px-5 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="isSubmitDisabled"
                class="px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Tambah
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  isVisible: Boolean,
  categories: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close", "add-transaction"]);

const newTransaction = ref({
  amount: null,
  description: "",
  type: "expense", // Default to expense
  category_id: "",
});

// Computed property to filter categories based on selected transaction type
const currentCategories = computed(() => {
  if (!Array.isArray(props.categories)) return [];
  const type = newTransaction.value.type;
  if (type === 'expense') {
    return props.categories.filter(cat => cat.type === 'expense' || cat.type === 'all');
  } else if (type === 'income') {
    return props.categories.filter(cat => cat.type === 'income' || cat.type === 'all');
  }
  return [];
});

// Computed property to control submit button disabled state
const isSubmitDisabled = computed(() => {
  // If type is expense AND no expense categories are available
  if (newTransaction.value.type === 'expense' && currentCategories.value.length === 0) {
    return true;
  }
  // Otherwise, allow submission (HTML 'required' will handle empty amount/description)
  return false;
});

// Watch for type change to reset category_id
watch(
  () => newTransaction.value.type,
  (newType) => {
    newTransaction.value.category_id = ""; // Clear selected category
  }
);

const submitTransaction = () => {
  // No need for explicit category_id validation here as the button is disabled
  // if expense type and no categories.
  emit("add-transaction", { ...newTransaction.value });
  resetForm();
};

const close = () => {
  emit("close");
  resetForm();
};

const resetForm = () => {
  newTransaction.value = {
    amount: null,
    description: "",
    type: "expense", // Reset to 'expense'
    category_id: "",
  };
};
</script>

<style scoped lang="postcss">
.modern-input {
  @apply mt-1 block w-full rounded-lg border border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 text-sm p-2 transition;
}

/* Modal transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Custom content animation */
.modal-content {
  animation: pop-in 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
@keyframes pop-in {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
