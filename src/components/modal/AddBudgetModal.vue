<template>
  <transition name="modal-fade">
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all duration-300 scale-95 modal-content">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-xl font-semibold text-gray-800">{{ modalTitle }}</h3>
          <button @click="close" class="text-gray-500 hover:text-gray-700 focus:outline-none">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>

        <!-- Modal Body (Form) -->
        <div class="p-6">
          <form @submit.prevent="submitBudget" class="space-y-4">
            <div v-if="expenseCategories.length === 0" class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative text-sm">
              <strong class="font-bold">Perhatian!</strong>
              <span class="block sm:inline">Anda belum memiliki kategori pengeluaran. Silakan buat di halaman Kategori terlebih dahulu.</span>
            </div>
            <div>
              <label for="modal-budget-category" class="block text-sm font-medium text-gray-700">Kategori</label>
              <select id="modal-budget-category" v-model="newBudget.category_id" required
                      :disabled="expenseCategories.length === 0"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 disabled:bg-gray-50 disabled:cursor-not-allowed">
                <option value="">Pilih Kategori</option>
                <option v-for="cat in expenseCategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>
            <div>
              <label for="modal-budget-amount" class="block text-sm font-medium text-gray-700">Batas Anggaran (Rp)</label>
              <input type="number" id="modal-budget-amount" v-model.number="newBudget.limit_amount" required
                     :disabled="expenseCategories.length === 0"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 disabled:bg-gray-50 disabled:cursor-not-allowed"
                     placeholder="Contoh: 500000">
            </div>
            <div>
              <label for="modal-budget-month" class="block text-sm font-medium text-gray-700">Bulan</label>
              <select id="modal-budget-month" v-model.number="newBudget.month" required
                      :disabled="expenseCategories.length === 0"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 disabled:bg-gray-50 disabled:cursor-not-allowed">
                <option v-for="m in months" :key="m.value" :value="m.value">{{ m.name }}</option>
              </select>
            </div>
            <div>
              <label for="modal-budget-year" class="block text-sm font-medium text-gray-700">Tahun</label>
              <input type="number" id="modal-budget-year" v-model.number="newBudget.year" required
                     :disabled="expenseCategories.length === 0"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 disabled:bg-gray-50 disabled:cursor-not-allowed"
                     placeholder="Contoh: 2025">
            </div>
            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" @click="close" class="px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition duration-200 cursor-pointer">
                Batal
              </button>
              <button type="submit" class="gen-z-gradient text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition duration-300 cursor-pointer"
                      :disabled="expenseCategories.length === 0">
                {{ submitButtonText }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  expenseCategories: {
    type: Array,
    default: () => []
  },
  initialBudget: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'add-budget', 'update-budget']);

const newBudget = ref({
  category_id: '',
  limit_amount: null,
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
});

const months = ref([
  { name: 'Januari', value: 1 }, { name: 'Februari', value: 2 }, { name: 'Maret', value: 3 },
  { name: 'April', value: 4 }, { name: 'Mei', value: 5 }, { name: 'Juni', value: 6 },
  { name: 'Juli', value: 7 }, { name: 'Agustus', value: 8 }, { name: 'September', value: 9 },
  { name: 'Oktober', value: 10 }, { name: 'November', value: 11 }, { name: 'Desember', value: 12 }
]);

const modalTitle = computed(() => {
  return props.initialBudget ? 'Edit Anggaran' : 'Atur Anggaran Baru';
});

const submitButtonText = computed(() => {
  return props.initialBudget ? 'Simpan Perubahan' : 'Simpan Anggaran';
});

watch(() => props.initialBudget, (newVal) => {
  if (newVal) {
    newBudget.value = { ...newVal };
  } else {
    newBudget.value = {
      category_id: '',
      limit_amount: null,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };
  }
}, { immediate: true });

const submitBudget = () => {
  if (props.initialBudget) {
    emit('update-budget', newBudget.value);
  } else {
    emit('add-budget', newBudget.value);
  }
  close();
};

const close = () => {
  emit('close');
  newBudget.value = {
    category_id: '',
    limit_amount: null,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };
};

onMounted(() => {
  console.log('AddBudgetModal mounted. expenseCategories received:', props.expenseCategories);
});
</script>

<style scoped>
/* Consistent gradients from DashboardPage */
.gen-z-gradient {
  background: linear-gradient(135deg, #6EE7B7, #3B82F6, #9333EA);
}
.gen-z-text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(45deg, #6EE7B7, #3B82F6, #9333EA);
}

/* Modal transition styles (copied from Modal.vue for consistency) */
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
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes pop-out {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.8); opacity: 0; }
}
</style>
