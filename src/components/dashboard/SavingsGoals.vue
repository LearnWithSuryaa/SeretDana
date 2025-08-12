<template>
  <div class="space-y-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Tujuan Keuangan Saya</h2>
    <div class="bg-white p-6 rounded-2xl shadow-xl"> <!-- Adjusted shadow for consistency -->
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold text-gray-700">Target Tabungan</h3>
        <button @click="openAddEditGoalModal(null)"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-md hover:bg-blue-600 transition duration-300 cursor-pointer">
          <span class="flex items-center">
            <PlusIcon class="w-4 h-4 mr-1" /> Tambah Tujuan
          </span>
        </button>
      </div>

      <ul class="space-y-4" v-if="savingsGoals && savingsGoals.length > 0">
        <li v-for="goal in savingsGoals" :key="goal.id"
            class="border border-gray-200 p-4 rounded-lg shadow-sm transform hover:scale-101 transition duration-200 ease-in-out">
          <div class="flex justify-between items-center mb-2">
            <span class="font-medium text-gray-800">{{ goal.name }}</span>
            <span class="font-semibold text-gray-700">Rp {{ formatCurrency(goal.saved_amount) }} / Rp {{ formatCurrency(goal.target_amount) }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div :class="{'bg-red-500': (goal.saved_amount / goal.target_amount) * 100 > 100 && !goal.is_completed, 'bg-green-500': (goal.saved_amount / goal.target_amount) * 100 <= 100 || goal.is_completed}"
                 class="h-2 rounded-full" :style="{ width: Math.min(100, (goal.saved_amount / goal.target_amount) * 100) + '%' }"></div>
          </div>
          <p class="text-sm text-gray-500 mt-1 flex justify-between items-center">
            <span>{{ ((goal.saved_amount / goal.target_amount) * 100).toFixed(1) }}% Tercapai
            <span v-if="goal.is_completed" class="text-green-500 font-semibold">(Tercapai!)</span>
            <span v-else-if="goal.saved_amount >= goal.target_amount" class="text-green-500 font-semibold">(Target Terpenuhi!)</span>
            </span>
            <button @click="openAddEditGoalModal(goal)" class="text-blue-500 hover:text-blue-700 text-xs font-semibold ml-2 cursor-pointer">
              Edit
            </button>
          </p>
        </li>
      </ul>
      <p v-else class="text-center text-gray-500 italic py-4">Belum ada tujuan tabungan.</p>
    </div>

    <!-- Add/Edit Goal Modal -->
    <AddEditGoalModal
      :is-visible="isAddEditGoalModalVisible"
      :initial-goal="editingGoal"
      @close="closeAddEditGoalModal"
      @add-goal="handleModalAddGoal"
      @update-goal="handleModalUpdateGoal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { PlusIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'; // Added PencilSquareIcon for edit button in list if needed
import AddEditGoalModal from '../modal/AddEditGoalModal.vue'; // Import the new modal component

const props = defineProps({
  savingsGoals: {
    type: Array,
    default: () => []
  },
});

// Emit events for both adding and updating goals
const emit = defineEmits(['add-goal', 'update-goal']);

const isAddEditGoalModalVisible = ref(false);
const editingGoal = ref(null); // Stores the goal object being edited

// Functions to manage the modal
const openAddEditGoalModal = (goal = null) => {
  editingGoal.value = goal; // Set the goal object to edit, or null for adding
  isAddEditGoalModalVisible.value = true;
};

const closeAddEditGoalModal = () => {
  isAddEditGoalModalVisible.value = false;
  editingGoal.value = null; // Clear the editing state
};

const formatCurrency = (value) => {
  if (typeof value !== 'number') return '0';
  return value.toLocaleString('id-ID');
};

const handleModalAddGoal = (goalData) => {
  emit('add-goal', goalData); // Emit add event to DashboardPage
  closeAddEditGoalModal(); // Close modal after submission
};

const handleModalUpdateGoal = (goalData) => {
  emit('update-goal', goalData); // Emit update event to DashboardPage
  closeAddEditGoalModal(); // Close modal after submission
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
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05); /* Softer shadow */
}

.bg-white.shadow-xl:hover {
  box-shadow: 0 15px 20px -5px rgba(0, 0, 0, 0.1), 0 6px 10px -4px rgba(0, 0, 0, 0.08); /* Slightly more pronounced on hover */
  transform: translateY(-2px); /* Subtle lift */
}

/* Specific styles for goal list items */
.border.border-gray-200.p-4.rounded-lg.shadow-sm {
  border: 1px solid var(--color-gray-200);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* Very subtle shadow for list items */
}

.border.border-gray-200.p-4.rounded-lg.shadow-sm:hover {
  transform: translateY(-1px); /* Slight lift on hover */
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08); /* Slightly more pronounced shadow on hover */
}

/* Button styles */
.bg-blue-500.text-white.px-4.py-2.rounded-lg.font-medium.text-sm.shadow-md.hover\:bg-blue-600.transition.duration-300:hover {
  transform: translateY(-1px); /* Slight lift on hover */
  box-shadow: 0 4px 8px rgba(0,0,0,0.15); /* Softer shadow on hover */
}
</style>
