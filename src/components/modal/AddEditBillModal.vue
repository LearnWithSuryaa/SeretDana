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
          <form @submit.prevent="submitBill" class="space-y-4">
            <div>
              <label for="modal-bill-name" class="block text-sm font-medium text-gray-700">Nama Tagihan</label>
              <input type="text" id="modal-bill-name" v-model="newBill.name" required
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                     placeholder="Contoh: Sewa Kosan, Uang Semester">
            </div>

            <!-- 💰 Bagian Jumlah (Rp) dengan Format Otomatis -->
            <div>
              <label for="modal-bill-amount" class="block text-sm font-medium text-gray-700">Jumlah (Rp)</label>
              <input type="text" id="modal-bill-amount"
                     v-model="formattedAmount"
                     @input="formatRupiahInput"
                     inputmode="numeric"
                     required
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                     placeholder="Contoh: 800.000">
            </div>

            <div>
              <label for="modal-bill-due-date" class="block text-sm font-medium text-gray-700">Tanggal Jatuh Tempo</label>
              <input type="date" id="modal-bill-due-date" v-model="newBill.due_date" required
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2">
            </div>
            <div>
              <label for="modal-bill-frequency" class="block text-sm font-medium text-gray-700">Frekuensi</label>
              <select id="modal-bill-frequency" v-model="newBill.frequency" required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2">
                <option value="">Pilih Frekuensi</option>
                <option v-for="freq in frequencies" :key="freq.value" :value="freq.value">{{ freq.name }}</option>
              </select>
            </div>
            <div>
              <label for="modal-bill-category" class="block text-sm font-medium text-gray-700">Kategori (Opsional)</label>
              <select id="modal-bill-category" v-model="newBill.category_id"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2">
                <option value="">Pilih Kategori</option>
                <option v-for="cat in expenseCategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="modal-bill-is-paid" v-model="newBill.is_paid_current_period"
                     class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
              <label for="modal-bill-is-paid" class="ml-2 block text-sm text-gray-900">Sudah Dibayar untuk Periode Ini</label>
            </div>
            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" @click="close" class="px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition duration-200 cursor-pointer">
                Batal
              </button>
              <button type="submit" class="gen-z-gradient text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition duration-300 cursor-pointer">
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
import { ref, watch, computed } from 'vue';
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
  initialBill: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'add-bill', 'update-bill']);

const newBill = ref({
  id: null,
  name: '',
  amount: null,
  due_date: '',
  frequency: 'monthly',
  category_id: null,
  is_paid_current_period: false,
});

const frequencies = ref([
  { name: 'Bulanan', value: 'monthly' },
  { name: 'Triwulanan', value: 'quarterly' },
  { name: 'Tahunan', value: 'yearly' },
  { name: 'Satu Kali', value: 'one-time' }
]);

const modalTitle = computed(() => {
  return props.initialBill ? 'Edit Tagihan' : 'Tambah Tagihan Baru';
});

const submitButtonText = computed(() => {
  return props.initialBill ? 'Simpan Perubahan' : 'Tambah Tagihan';
});

watch(() => props.initialBill, (newVal) => {
  if (newVal) {
    newBill.value = {
      ...newVal,
      due_date: newVal.due_date ? new Date(newVal.due_date).toISOString().split('T')[0] : ''
    };
  } else {
    newBill.value = {
      id: null,
      name: '',
      amount: null,
      due_date: '',
      frequency: 'monthly',
      category_id: null,
      is_paid_current_period: false,
    };
  }
}, { immediate: true });

const formattedAmount = ref('');

// Saat data tagihan berubah (misal sedang edit), langsung format nilainya
watch(() => newBill.value.amount, (val) => {
  if (val !== null && val !== undefined) {
    formattedAmount.value = formatRupiah(val.toString());
  } else {
    formattedAmount.value = '';
  }
});

// Fungsi untuk memformat angka menjadi format Rupiah
function formatRupiah(value) {
  const numberString = value.replace(/[^\d]/g, '');
  if (!numberString) return '';
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(numberString);
}

// Event saat user mengetik angka di input
function formatRupiahInput(e) {
  const rawValue = e.target.value.replace(/[^\d]/g, ''); // hanya angka
  formattedAmount.value = formatRupiah(rawValue);
  newBill.value.amount = Number(rawValue); // simpan angka murni
}

const submitBill = () => {
  if (props.initialBill) {
    emit('update-bill', newBill.value);
  } else {
    emit('add-bill', newBill.value);
  }
};

const close = () => {
  emit('close');
  newBill.value = {
    id: null,
    name: '',
    amount: null,
    due_date: '',
    frequency: 'monthly',
    category_id: null,
    is_paid_current_period: false,
  };
};
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
