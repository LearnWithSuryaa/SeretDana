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
          <form @submit.prevent="submitGoal" class="space-y-4">
            <div>
              <label for="modal-goal-name" class="block text-sm font-medium text-gray-700">Nama Tujuan</label>
              <input type="text" id="modal-goal-name" v-model="newGoal.name" required
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                     placeholder="Contoh: Liburan Akhir Semester">
            </div>
            <div>
              <label for="modal-goal-target-amount" class="block text-sm font-medium text-gray-700">Target Jumlah (Rp)</label>
              <input type="number" id="modal-goal-target-amount" v-model.number="newGoal.target_amount" required
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                     placeholder="Contoh: 2000000">
            </div>
            <div>
              <label for="modal-goal-saved-amount" class="block text-sm font-medium text-gray-700">Jumlah Tersimpan (Rp)</label>
              <input type="number" id="modal-goal-saved-amount" v-model.number="newGoal.saved_amount"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                     placeholder="Contoh: 500000 (default 0)">
            </div>
            <div>
              <label for="modal-goal-due-date" class="block text-sm font-medium text-gray-700">Tanggal Target (Opsional)</label>
              <input type="date" id="modal-goal-due-date" v-model="newGoal.due_date"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2">
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="modal-goal-is-completed" v-model="newGoal.is_completed"
                     class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
              <label for="modal-goal-is-completed" class="ml-2 block text-sm text-gray-900">Tercapai</label>
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
  initialGoal: { // New prop for editing existing goal
    type: Object,
    default: null // Default to null for add mode
  }
});

// Emit different events based on add/edit mode
const emit = defineEmits(['close', 'add-goal', 'update-goal']);

const newGoal = ref({
  id: null, // Will be set if editing
  name: '',
  target_amount: null,
  saved_amount: 0, // Default to 0
  due_date: '', // YYYY-MM-DD format
  is_completed: false,
});

// Computed property for modal title
const modalTitle = computed(() => {
  return props.initialGoal ? 'Edit Tujuan Keuangan' : 'Tambah Tujuan Keuangan Baru';
});

// Computed property for submit button text
const submitButtonText = computed(() => {
  return props.initialGoal ? 'Simpan Perubahan' : 'Tambah Tujuan';
});

// Watch for changes in initialGoal prop to populate the form
watch(() => props.initialGoal, (newVal) => {
  if (newVal) {
    // Populate form fields with existing goal data
    // Ensure due_date is in YYYY-MM-DD format for input type="date"
    newGoal.value = {
      ...newVal,
      due_date: newVal.due_date ? new Date(newVal.due_date).toISOString().split('T')[0] : ''
    };
  } else {
    // Reset form for add mode
    newGoal.value = {
      id: null,
      name: '',
      target_amount: null,
      saved_amount: 0,
      due_date: '',
      is_completed: false,
    };
  }
}, { immediate: true }); // Run immediately when component mounts or initialGoal changes

const submitGoal = () => {
  if (props.initialGoal) {
    // If initialGoal exists, it's an update operation
    emit('update-goal', newGoal.value);
  } else {
    // Otherwise, it's an add operation
    emit('add-goal', newGoal.value);
  }
  // Close modal after submission (handled by parent's event listener)
};

const close = () => {
  emit('close');
  // Reset form when modal is closed, regardless of save or cancel
  newGoal.value = {
    id: null,
    name: '',
    target_amount: null,
    saved_amount: 0,
    due_date: '',
    is_completed: false,
  };
};
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
