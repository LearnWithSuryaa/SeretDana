<template>
  <transition name="modal-fade">
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 bg-opacity-50">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-sm transform transition-all duration-300 scale-95 modal-content">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-xl font-semibold text-gray-800">{{ title }}</h3>
          <button @click="close" class="text-gray-500 hover:text-gray-700 focus:outline-none">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <p class="text-gray-700 mb-6">{{ message }}</p>
          <div class="flex justify-end space-x-3">
            <button v-if="cancelButton" @click="cancel" class="px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition duration-200">
              {{ cancelButtonText }}
            </button>
            <button @click="confirm" :class="confirmButtonClass" class="px-5 py-2 rounded-full text-white font-semibold transition duration-200">
              {{ confirmButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Pemberitahuan'
  },
  message: {
    type: String,
    default: 'Ini adalah pesan modal.'
  },
  type: {
    type: String,
    default: 'info' // Can be 'info', 'success', 'error', 'warning', 'confirm'
  },
  confirmButtonText: {
    type: String,
    default: 'Oke'
  },
  cancelButton: {
    type: Boolean,
    default: false
  },
  cancelButtonText: {
    type: String,
    default: 'Batal'
  }
});

const emit = defineEmits(['close', 'confirm', 'cancel']);

const confirmButtonClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-500 hover:bg-green-600';
    case 'error':
      return 'bg-red-500 hover:bg-red-600';
    case 'warning':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'confirm':
      return 'bg-blue-500 hover:bg-blue-600'; // For confirmation, blue is good
    default:
      return 'bg-blue-500 hover:bg-blue-600';
  }
});

const close = () => {
  emit('close');
};

const confirm = () => {
  emit('confirm');
  emit('close'); // Close on confirm by default
};

const cancel = () => {
  emit('cancel');
  emit('close'); // Close on cancel
};
</script>

<style scoped>
/* Modal transition styles */
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
