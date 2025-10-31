<template>
  <transition name="modal-fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <div
        class="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all duration-300 scale-95 modal-content border border-gray-200"
      >
        <!-- Header -->
        <div
          class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"
        >
          <h3 class="text-xl font-semibold text-gray-800">Catat Transaksi</h3>
          <button
            @click="close"
            class="text-gray-500 hover:text-gray-700 transition"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>

        <!-- Body -->
        <div class="p-6">
          <form @submit.prevent="submitTransaction" class="space-y-5">
            <!-- Jumlah -->
            <div>
              <label
                for="modal-amount"
                class="block text-sm font-medium text-gray-700"
              >
                Jumlah (Rp)
              </label>
              <div class="relative mt-1">
                <span
                  class="absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm"
                  >Rp</span
                >
                <input
                  type="text"
                  id="modal-amount"
                  v-model="formattedAmount"
                  @input="handleAmountInput"
                  inputmode="numeric"
                  required
                  placeholder="Contoh: 50.000"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-10 p-2"
                />
              </div>
            </div>

            <!-- Deskripsi -->
            <div>
              <label
                for="modal-description"
                class="block text-sm font-medium text-gray-700"
              >
                Deskripsi
              </label>
              <textarea
                id="modal-description"
                v-model="newTransaction.description"
                rows="3"
                placeholder="Contoh: Beli makan siang di warteg dekat kos"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 resize-none"
              ></textarea>
            </div>

            <!-- Tanggal -->
            <div>
              <label
                for="modal-date"
                class="block text-sm font-medium text-gray-700"
              >
                Tanggal
              </label>
              <input
                type="date"
                id="modal-date"
                v-model="newTransaction.transaction_date"
                :max="today"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 cursor-pointer"
              />
            </div>

            <!-- Tipe Transaksi -->
            <div>
              <label
                for="modal-type"
                class="block text-sm font-medium text-gray-700"
              >
                Tipe
              </label>
              <select
                id="modal-type"
                v-model="newTransaction.type"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 cursor-pointer"
              >
                <option value="income">Pemasukan</option>
                <option value="expense">Pengeluaran</option>
              </select>
            </div>

            <!-- Kategori -->
            <div>
              <label
                for="modal-category"
                class="block text-sm font-medium text-gray-700"
              >
                Kategori
              </label>
              <select
                id="modal-category"
                v-model="newTransaction.category_id"
                :disabled="
                  newTransaction.type === 'income' ||
                  (newTransaction.type === 'expense' &&
                    currentCategories.length === 0)
                "
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
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

              <p
                v-if="newTransaction.type === 'income'"
                class="text-xs text-gray-400 mt-1"
              >
                Tidak perlu memilih kategori untuk pemasukan.
              </p>

              <div
                v-if="
                  newTransaction.type === 'expense' &&
                  currentCategories.length === 0
                "
                class="mt-2 text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 p-3 rounded"
              >
                <strong class="font-semibold">Perhatian!</strong>
                Anda belum memiliki kategori pengeluaran. Silakan buat terlebih
                dahulu di halaman Kategori.
              </div>
            </div>

            <!-- Peringatan -->
            <div
              class="text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded"
            >
              <strong class="font-semibold">Penting!</strong>
              Transaksi yang sudah dicatat tidak dapat dihapus. Pastikan data
              Anda benar.
            </div>

            <!-- Tombol -->
            <div class="flex justify-end pt-4 gap-3">
              <button
                type="button"
                @click="close"
                class="px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="isSubmitDisabled"
                class="px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
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

const today = new Date().toISOString().slice(0, 10);

const newTransaction = ref({
  amount: null,
  description: "",
  transaction_date: today,
  type: "expense",
  category_id: "",
});

const formattedAmount = ref("");
const handleAmountInput = (e) => {
  const raw = e.target.value.replace(/\D/g, ""); // ambil hanya angka
  const number = parseInt(raw || "0", 10);
  newTransaction.value.amount = number;
  formattedAmount.value = number
    ? number.toLocaleString("id-ID")
    : "";
};
watch(
  () => newTransaction.value.amount,
  (val) => {
    if (!val) formattedAmount.value = "";
  }
);

const currentCategories = computed(() => {
  if (!Array.isArray(props.categories)) return [];
  const type = newTransaction.value.type;
  if (type === "expense") {
    return props.categories.filter(
      (cat) => cat.type === "expense" || cat.type === "all"
    );
  } else if (type === "income") {
    return props.categories.filter(
      (cat) => cat.type === "income" || cat.type === "all"
    );
  }
  return [];
});

const isSubmitDisabled = computed(() => {
  if (
    newTransaction.value.type === "expense" &&
    currentCategories.value.length === 0
  ) {
    return true;
  }
  return false;
});

watch(
  () => newTransaction.value.type,
  () => {
    newTransaction.value.category_id = "";
  }
);

const submitTransaction = () => {
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
    transaction_date: today,
    type: "expense",
    category_id: "",
  };
  formattedAmount.value = "";
};
</script>

<style scoped>
.gen-z-gradient {
  background: linear-gradient(135deg, #6ee7b7, #3b82f6, #9333ea);
}
.gen-z-text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(45deg, #6ee7b7, #3b82f6, #9333ea);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-content {
  animation: pop-in 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}
.modal-fade-leave-active .modal-content {
  animation: pop-out 0.3s ease-out forwards;
}
@keyframes pop-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes pop-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
}
</style>
