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
          <form @submit.prevent="submitCategory" class="space-y-4">
            <div>
              <label for="modal-category-name" class="block text-sm font-medium text-gray-700">Nama Kategori</label>
              <input type="text" id="modal-category-name" v-model="newCategory.name" required
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                     placeholder="Contoh: Makanan, Transportasi">
            </div>
            <div>
              <label for="modal-category-type" class="block text-sm font-medium text-gray-700">Tipe Kategori</label>
              <!-- Menampilkan tipe kategori sebagai teks statis 'Pengeluaran' -->
              <input type="text" id="modal-category-type" value="Pengeluaran" readonly
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 bg-gray-100 cursor-not-allowed">
              <!-- newCategory.type akan selalu diset sebagai 'expense' di script -->
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
  initialCategory: { // Prop for editing existing category
    type: Object,
    default: null // Default to null for add mode
  }
});

// Emit different events based on add/edit mode
const emit = defineEmits(['close', 'add-category', 'update-category']);

const newCategory = ref({
  id: null, // Will be set if editing
  name: '',
  type: 'expense', // Default to 'expense'
});

// Computed property for modal title
const modalTitle = computed(() => {
  return props.initialCategory ? 'Edit Kategori' : 'Tambah Kategori Baru';
});

// Computed property for submit button text
const submitButtonText = computed(() => {
  return props.initialCategory ? 'Simpan Perubahan' : 'Tambah Kategori';
});

// Watch for changes in initialCategory prop to populate the form
watch(() => props.initialCategory, (newVal) => {
  if (newVal) {
    // Populate form fields with existing category data
    newCategory.value = { ...newVal };
    // Ensure type is 'expense' if it was 'all' or 'income' from existing data,
    // as this modal is now only for expense categories.
    if (newCategory.value.type !== 'expense') {
      newCategory.value.type = 'expense';
    }
  } else {
    // Reset form for add mode, ensure type defaults to 'expense'
    newCategory.value = {
      id: null,
      name: '',
      type: 'expense', // Default to 'expense'
    };
  }
}, { immediate: true }); // Run immediately when component mounts or initialCategory changes

const submitCategory = () => {
  // newCategory.type sudah diset sebagai 'expense' secara default atau dari initialCategory
  if (props.initialCategory) {
    emit('update-category', newCategory.value);
  } else {
    emit('add-category', newCategory.value);
  }
};

const close = () => {
  emit('close');
  newCategory.value = {
    id: null,
    name: '',
    type: 'expense', // Reset to 'expense'
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
