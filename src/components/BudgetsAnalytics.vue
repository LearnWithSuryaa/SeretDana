<template>
  <div class="space-y-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Anggaran & Analisis</h2>
    <div class="bg-white p-6 rounded-2xl shadow-xl">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold text-gray-700">Ringkasan Anggaran Bulan Ini</h3>
        <button @click="openAddBudgetModal(null)"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-md hover:bg-blue-600 transition duration-300 cursor-pointer">
          <span class="flex items-center">
            <PlusIcon class="w-4 h-4 mr-1" /> Atur Anggaran
          </span>
        </button>
      </div>

      <!-- Budget List -->
      <div class="space-y-4" v-if="monthlyBudgets && monthlyBudgets.length > 0">
        <div v-for="budget in monthlyBudgets" :key="budget.category_id"
             class="border border-gray-200 p-4 rounded-lg shadow-sm transform hover:scale-101 transition duration-200 ease-in-out">
          <div class="flex justify-between items-center mb-2">
            <span class="font-medium text-gray-800">{{ getCategoryName(budget.category_id) }}</span>
            <span class="font-semibold text-gray-700">Rp {{ formatCurrency(budget.spent) }} / Rp {{ formatCurrency(budget.limit_amount) }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div :class="{'bg-red-500': (budget.spent / budget.limit_amount) * 100 > 100, 'bg-blue-500': (budget.spent / budget.limit_amount) * 100 <= 100}"
                 class="h-2 rounded-full" :style="{ width: Math.min(100, (budget.spent / budget.limit_amount) * 100) + '%' }"></div>
          </div>
          <p class="text-sm text-gray-500 mt-1 flex justify-between items-center">
            <span>{{ ((budget.spent / budget.limit_amount) * 100).toFixed(1) }}% Terpakai
            <span v-if="(budget.spent / budget.limit_amount) * 100 > 100" class="text-red-500 font-semibold">(Overbudget!)</span></span>
            <button @click="openAddBudgetModal(budget)" class="text-blue-500 hover:text-blue-700 text-xs font-semibold ml-2 cursor-pointer">
              Edit
            </button>
          </p>
        </div>
      </div>
      <p v-else class="text-center text-gray-500 italic py-4">Belum ada anggaran yang diatur untuk bulan ini.</p>
      
      <!-- Chart Visualization -->
      <div class="mt-8 pt-6 border-t border-gray-100">
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Visualisasi Pengeluaran Bulan Ini</h3>
        <div v-if="totalSpentForChart > 0" class="w-full h-64 flex items-center justify-center">
          <canvas ref="expenseChartCanvas"></canvas>
        </div>
        <div v-else class="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
          <p>Tidak ada data pengeluaran untuk ditampilkan di grafik.</p>
        </div>
      </div>
    </div>

    <!-- Add Budget Modal -->
    <AddBudgetModal
      :is-visible="isAddBudgetModalVisible"
      :expense-categories="expenseCategories"
      :initial-budget="editingBudget"
      @close="closeAddBudgetModal"
      @add-budget="handleModalAddBudget"
      @update-budget="handleModalUpdateBudget"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import AddBudgetModal from './AddBudgetModal.vue';
import Chart from 'chart.js/auto'; // Import Chart.js

const props = defineProps({
  budgets: {
    type: Array,
    default: () => []
  },
  transactions: {
    type: Array,
    default: () => []
  },
  categories: { // This is the prop from DashboardPage
    type: Array,
    default: () => []
  },
});

const emit = defineEmits(['add-budget', 'update-budget']);

const isAddBudgetModalVisible = ref(false);
const editingBudget = ref(null);

const expenseChartCanvas = ref(null);
let expenseChartInstance = null;

const openAddBudgetModal = (budget = null) => {
  editingBudget.value = budget;
  isAddBudgetModalVisible.value = true;
};

const closeAddBudgetModal = () => {
  isAddBudgetModalVisible.value = false;
  editingBudget.value = null;
};

const monthlyBudgets = computed(() => {
  if (!Array.isArray(props.budgets) || !Array.isArray(props.transactions)) return [];
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  return props.budgets
    .filter(b => b.month === currentMonth && b.year === currentYear)
    .map(budget => {
      const spent = props.transactions
        .filter(t => t.type === 'expense' && t.category_id === budget.category_id && new Date(t.transaction_date).getMonth() + 1 === currentMonth)
        .reduce((sum, t) => sum + t.amount, 0);
      return { ...budget, spent };
    });
});

const formatCurrency = (value) => {
  if (typeof value !== 'number') return '0';
  return value.toLocaleString('id-ID');
};

const getCategoryName = (categoryId) => {
  if (!Array.isArray(props.categories)) return 'Tidak Dikategorikan'; // Defensive check
  const category = props.categories.find(cat => cat.id === categoryId);
  // Diagnostic: Log if category is not found
  if (!category) {
    console.warn(`Category with ID ${categoryId} not found in props.categories.`);
  }
  return category ? category.name : 'Tidak Dikategorikan';
};

const expenseCategories = computed(() => {
  if (!Array.isArray(props.categories)) return [];
  return props.categories.filter(cat => cat.type === 'expense' || cat.type === 'all');
});

const handleModalAddBudget = (budgetData) => {
  emit('add-budget', budgetData);
};

const handleModalUpdateBudget = (budgetData) => {
  emit('update-budget', budgetData);
};

// --- Chart.js Logic ---
const chartData = computed(() => {
  const currentMonth = new Date().getMonth();
  const expenseData = {}; // { categoryName: totalSpent }

  console.log('Chart Data Calculation: Processing transactions for chart...');
  props.transactions
    .filter(t => t.type === 'expense' && new Date(t.transaction_date).getMonth() === currentMonth)
    .forEach(t => {
      const categoryName = t.category_id ? getCategoryName(t.category_id) : 'Tidak Dikategorikan';
      console.log(`  Transaction: ${t.description}, Amount: ${t.amount}, Category ID: ${t.category_id}, Resolved Category: ${categoryName}`);
      expenseData[categoryName] = (expenseData[categoryName] || 0) + t.amount;
    });

  const labels = Object.keys(expenseData);
  const data = Object.values(expenseData);
  const backgroundColors = generateColors(labels.length);

  console.log('Chart Data Calculation: Final Labels:', labels);
  console.log('Chart Data Calculation: Final Data:', data);

  return { labels, data, backgroundColors };
});

const totalSpentForChart = computed(() => {
  return chartData.value.data.reduce((sum, val) => sum + val, 0);
});

const generateColors = (numColors) => {
  const colors = [
    '#6EE7B7', '#3B82F6', '#9333EA', '#FACC15', '#EF4444', '#EC4899', '#A855F7', '#10B981', '#3B82F6', '#6366F1',
    '#F87171', '#FB923C', '#FCD34D', '#A78BFA', '#E879F9', '#22D3EE', '#F472B6', '#FBBF24', '#34D399', '#60A5FA'
  ]; // More diverse Tailwind-like colors
  const generated = [];
  for (let i = 0; i < numColors; i++) {
    generated.push(colors[i % colors.length]);
  }
  return generated;
};

const renderChart = () => {
  if (expenseChartCanvas.value && totalSpentForChart.value > 0) {
    if (expenseChartInstance) {
      expenseChartInstance.destroy();
    }

    const ctx = expenseChartCanvas.value.getContext('2d');
    expenseChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: chartData.value.labels,
        datasets: [{
          data: chartData.value.data,
          backgroundColor: chartData.value.backgroundColors,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                family: 'Inter',
              },
              color: '#374151',
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label += 'Rp ' + formatCurrency(context.parsed);
                }
                return label;
              },
              afterLabel: function(context) {
                const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                const percentage = (context.parsed / total * 100).toFixed(1) + '%';
                return `(${percentage})`;
              }
            },
            bodyFont: {
              family: 'Inter',
            },
            titleFont: {
              family: 'Inter',
            },
          }
        }
      }
    });
  } else if (expenseChartInstance) {
    expenseChartInstance.destroy();
    expenseChartInstance = null;
  }
};

watch(chartData, () => {
  renderChart();
}, { deep: true });

onMounted(() => {
  renderChart();
});

onBeforeUnmount(() => {
  if (expenseChartInstance) {
    expenseChartInstance.destroy();
  }
});
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
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
}

.bg-white.shadow-xl:hover {
  box-shadow: 0 15px 20px -5px rgba(0, 0, 0, 0.1), 0 6px 10px -4px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

/* Specific styles for list items */
.border.border-gray-200.p-4.rounded-lg.shadow-sm {
  border: 1px solid var(--color-gray-200);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.border.border-gray-200.p-4.rounded-lg.shadow-sm:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}

.bg-blue-500.text-white.px-4.py-2.rounded-lg.font-medium.text-sm.shadow-md.hover\:bg-blue-600.transition.duration-300:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}
</style>
