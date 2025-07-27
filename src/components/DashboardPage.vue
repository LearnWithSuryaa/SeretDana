<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-gray-100 font-inter">
    <!-- Sidebar / Navigation -->
    <aside
      :class="[
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        isSidebarCollapsed ? 'md:w-20' : 'md:w-64',
      ]"
      class="w-full bg-white shadow-lg p-4 flex flex-col fixed inset-y-0 left-0 z-30 md:relative md:translate-x-0 transition-all duration-300 ease-in-out border-r border-gray-100"
    >
      <!-- Logo dan Collapse Button -->
      <div class="flex items-center justify-between mb-8">
        <!-- Logo -->
        <span
          class="text-2xl font-bold text-gray-800 gen-z-text-gradient transition-all"
          v-show="!isSidebarCollapsed"
        >
          Fluidana
        </span>

        <!-- Collapse Button (Mobile) -->
        <button
          @click="toggleSidebar"
          class="md:hidden text-gray-600 hover:text-blue-500 focus:outline-none"
        >
          <XMarkIcon class="w-7 h-7" />
        </button>

        <!-- Collapse Button (Desktop) -->
        <button
          @click="toggleCollapse"
          class="hidden md:flex items-center justify-center w-9 h-9 ml-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <ChevronDoubleLeftIcon
            v-if="!isSidebarCollapsed"
            class="w-5 h-5 text-gray-600"
          />
          <ChevronDoubleRightIcon v-else class="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-grow">
        <ul class="space-y-2">
          <li v-for="item in menuItems" :key="item.key">
            <a
              href="#"
              @click.prevent="
                activeTab = item.key;
                toggleSidebar();
              "
              :class="[
                'flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition duration-200 group',
                activeTab === item.key
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50',
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  isSidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5',
                  'transition-all duration-200',
                ]"
              />
              <span
                v-show="!isSidebarCollapsed"
                class="hidden md:inline transition-opacity duration-200"
              >
                {{ item.label }}
              </span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- Logout Button -->
      <div class="mt-8 pt-4 border-t border-gray-200">
        <button
          @click="handleLogout"
          class="flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-red-600 hover:bg-red-50 w-full transition duration-200 cursor-pointer"
        >
          <ArrowLeftOnRectangleIcon
            :class="[isSidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5']"
          />
          <span
            v-show="!isSidebarCollapsed"
            class="hidden md:inline transition-opacity duration-200"
          >
            Logout
          </span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 p-6 md:p-10 overflow-auto">
      <!-- Mobile Header for Dashboard -->
      <div class="md:hidden flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold gen-z-text-gradient">Dashboard</h1>
        <button
          @click="toggleSidebar"
          class="text-gray-600 hover:text-blue-500 focus:outline-none"
        >
          <Bars3Icon class="w-7 h-7" />
        </button>
      </div>

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="flex items-center justify-center h-64">
        <svg
          class="animate-spin h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p class="ml-3 text-gray-600">Memuat data...</p>
      </div>

      <!-- Error Message -->
      <div
        v-if="error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <!-- Render child components based on activeTab -->
      <DashboardOverview
        v-if="activeTab === 'overview' && !isLoading && !error"
        :user-profile="userProfile"
        :current-balance="currentBalance"
        :last-update="lastUpdate"
        :monthly-budget-total="monthlyBudgetTotal"
        :monthly-budget-spent="monthlyBudgetSpent"
        :budget-progress="budgetProgress"
        :upcoming-bills="upcomingBills"
        :expense-categories="expenseCategories"
        :recent-transactions="recentTransactions"
        :categories="categories"
        :daily-spending-limit="dailySpendingLimit"
        @add-transaction="addTransaction"
      />

      <TransactionsList
        v-if="activeTab === 'transactions' && !isLoading && !error"
        :transactions="transactions"
        :categories="categories"
      />

      <BudgetsAnalytics
        v-if="activeTab === 'budgets' && !isLoading && !error"
        :budgets="budgets"
        :transactions="transactions"
        :categories="categories"
        @add-budget="addBudget"
        @update-budget="updateBudget"
      />

      <BillsList
        v-if="activeTab === 'bills' && !isLoading && !error"
        :bills="bills"
        :categories="categories"
        @add-bill="addBill"
        @update-bill="updateBill"
      />

      <SavingsGoals
        v-if="activeTab === 'goals' && !isLoading && !error"
        :savings-goals="savingsGoals"
        @add-goal="addGoal"
        @update-goal="updateGoal"
      />

      <CategoriesPage
        v-if="activeTab === 'categories' && !isLoading && !error"
        :categories="categories"
        @add-category="addCategory"
        @update-category="updateCategory"
        @delete-category="deleteCategory"
        @show-modal="showModal"
      />

      <UserProfile
        v-if="activeTab === 'profile' && !isLoading && !error"
        :user-profile="userProfile"
        @update-profile="updateProfile"
        @change-password="changePassword"
      />
    </main>

    <!-- Custom Modal Component (General purpose alerts/confirmations) -->
    <Modal
      :is-visible="isModalVisible"
      :title="modalTitle"
      :message="modalMessage"
      :type="modalType"
      :cancel-button="modalCancelButton"
      :confirm-button-text="modalConfirmButtonText"
      @confirm="handleModalConfirm"
      @cancel="handleModalCancel"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import {
  HomeIcon,
  ListBulletIcon,
  ChartPieIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  ReceiptPercentIcon,
  TagIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/outline";

const isSidebarCollapsed = ref(false);
const toggleCollapse = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const menuItems = [
  { key: "overview", label: "Overview", icon: HomeIcon },
  { key: "transactions", label: "Transaksi", icon: ListBulletIcon },
  { key: "budgets", label: "Anggaran", icon: ChartPieIcon },
  { key: "bills", label: "Tagihan", icon: ReceiptPercentIcon },
  { key: "goals", label: "Tujuan Keuangan", icon: SparklesIcon },
  { key: "categories", label: "Kategori", icon: TagIcon },
  { key: "profile", label: "Profil", icon: UserCircleIcon },
];

import supabase from "../lib/supabaseClient"; // Pastikan path benar

// Import komponen modular
import DashboardOverview from "./DashboardOverview.vue";
import TransactionsList from "./TransactionsList.vue";
import BudgetsAnalytics from "./BudgetsAnalytics.vue";
import BillsList from "./BillsList.vue";
import SavingsGoals from "./SavingsGoals.vue";
import UserProfile from "./UserProfile.vue";
import CategoriesPage from "./CategoriesPage.vue"; // Import CategoriesPage
import Modal from "./Modal.vue"; // Modal serbaguna (alert/konfirmasi)

const router = useRouter();

// --- Reactive States ---
const activeTab = ref("overview");
const isSidebarOpen = ref(false);
const isLoading = ref(true);
const error = ref(null);

// States untuk Modal serbaguna
const isModalVisible = ref(false);
const modalTitle = ref("");
const modalMessage = ref("");
const modalType = ref("info"); // 'info', 'success', 'error', 'warning', 'confirm'
const modalCancelButton = ref(false);
const modalConfirmButtonText = ref("Oke");
let modalCallback = null; // Callback function untuk aksi konfirmasi modal

// Data dari Supabase
const userProfile = ref({
  id: "",
  email: "",
  name: "",
  university: "",
  major: "",
  home_city: "",
});
const transactions = ref([]);
const categories = ref([]);
const budgets = ref([]);
const savingsGoals = ref([]);
const bills = ref([]);

// --- Computed Properties (Mengagregasi/memproses data dari berbagai sumber) ---
const currentBalance = computed(() => {
  if (!Array.isArray(transactions.value)) return 0;
  return transactions.value.reduce((sum, t) => {
    return t.type === "income" ? sum + t.amount : sum - t.amount;
  }, 0);
});

const lastUpdate = computed(() => {
  if (!Array.isArray(transactions.value) || transactions.value.length === 0)
    return "N/A";
  const sortedTransactions = [...transactions.value].sort((a, b) => {
    const dateA = new Date(a.created_at || 0);
    const dateB = new Date(b.created_at || 0);
    return dateB.getTime() - dateA.getTime();
  });
  const latestTransaction = sortedTransactions[0];
  if (!latestTransaction || !latestTransaction.created_at) return "N/A";
  return new Date(latestTransaction.created_at).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const monthlyBudgetTotal = computed(() => {
  if (!Array.isArray(budgets.value)) return 0;
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  return budgets.value
    .filter((b) => b.month === currentMonth && b.year === currentYear)
    .reduce((sum, b) => sum + b.limit_amount, 0);
});

const monthlyBudgetSpent = computed(() => {
  if (!Array.isArray(transactions.value)) return 0;
  const currentMonth = new Date().getMonth();
  return transactions.value
    .filter(
      (t) =>
        t.type === "expense" &&
        new Date(t.transaction_date).getMonth() === currentMonth
    )
    .reduce((sum, t) => sum + t.amount, 0);
});

const budgetProgress = computed(() => {
  if (monthlyBudgetTotal.value === 0) return 0;
  return (monthlyBudgetSpent.value / monthlyBudgetTotal.value) * 100;
});

const upcomingBills = computed(() => {
  if (!Array.isArray(bills.value)) return [];
  const today = new Date();
  return bills.value
    .filter((bill) => {
      const dueDate = new Date(bill.due_date);
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 30 && !bill.is_paid_current_period;
    })
    .sort((a, b) => {
      const dateA = new Date(a.due_date || 0).getTime();
      const dateB = new Date(b.due_date || 0).getTime();
      return dateA - dateB;
    })
    .slice(0, 3);
});

const expenseCategories = computed(() => {
  if (!Array.isArray(categories.value)) return [];
  return categories.value.filter(
    (cat) => cat.type === "expense" || cat.type === "all"
  );
});

const recentTransactions = computed(() => {
  if (!Array.isArray(transactions.value)) return [];
  return transactions.value
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.created_at || 0);
      const dateB = new Date(b.created_at || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 5);
});

const dailySpendingLimit = computed(() => {
  const today = new Date();
  const currentMonth = today.getMonth(); // 0-11
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysRemaining = daysInMonth - today.getDate() + 1;

  if (daysRemaining <= 0) return currentBalance.value;

  // 1. Hitung pengeluaran bulan ini
  const expensesThisMonth = transactions.value
    .filter((t) => {
      const date = new Date(t.transaction_date);
      return (
        t.type === "expense" &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);

  // 2. Total anggaran esensial bulan ini
  const essentialBudgetTotal = budgets.value
    .filter((b) => b.month === currentMonth + 1 && b.year === currentYear)
    .reduce((sum, b) => sum + b.limit_amount, 0);

  // 3. Tagihan jatuh tempo bulan ini atau bulan depan & belum dibayar
  const upcomingBillsAmount = bills.value
    .filter((bill) => {
      const due = new Date(bill.due_date);
      const dueMonth = due.getMonth();
      const dueYear = due.getFullYear();
      return (
        !bill.is_paid_current_period &&
        ((dueYear === currentYear &&
          (dueMonth === currentMonth || dueMonth === currentMonth + 1)) ||
          (currentMonth === 11 &&
            dueMonth === 0 &&
            dueYear === currentYear + 1))
      );
    })
    .reduce((sum, bill) => sum + bill.amount, 0);

  // 4. Total kekurangan dari tujuan tabungan
  const totalSavingsGoalsRemaining = savingsGoals.value
    .filter((goal) => !goal.is_completed)
    .reduce((sum, goal) => sum + (goal.target_amount - goal.saved_amount), 0);

  // 5. Hitung dana tersedia (setelah dipotong tagihan & tabungan)
  const disposableIncome =
    currentBalance.value - upcomingBillsAmount - totalSavingsGoalsRemaining;

  // 6. Tentukan sisa budget berdasarkan anggaran atau saldo
  let remainingBudget = disposableIncome;
  if (essentialBudgetTotal > 0) {
    remainingBudget = essentialBudgetTotal - expensesThisMonth;
  }

  // 7. Hitung batas pengeluaran harian
  const limit = remainingBudget / daysRemaining;

  return Math.max(0, Math.floor(limit)); // pembulatan ke bawah agar aman
});

// Modal functions (untuk alert/konfirmasi umum)
const showModal = (
  title,
  message,
  type = "info",
  cancelButton = false,
  confirmButtonText = "Oke",
  callback = null
) => {
  isModalVisible.value = true;
  modalTitle.value = title;
  modalMessage.value = message;
  modalType.value = type;
  modalCancelButton.value = cancelButton;
  modalConfirmButtonText.value = confirmButtonText;
  modalCallback = callback;
};

const closeModal = () => {
  isModalVisible.value = false;
  modalCallback = null;
};

const handleModalConfirm = () => {
  if (modalCallback) {
    modalCallback(true);
  }
  closeModal();
};

const handleModalCancel = () => {
  if (modalCallback) {
    modalCallback(false);
  }
  closeModal();
};

// Helper methods (bisa dipindahkan ke file utilitas)
const formatCurrency = (value) => {
  return value.toLocaleString("id-ID");
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// --- Supabase Data Fetching ---
const fetchDashboardData = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("User object from Supabase:", user);
    if (!user) {
      throw new Error("User not authenticated.");
    }
    userProfile.value.id = user.id; // Simpan ID user

    // Ambil Profil
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("name, university, major, home_city")
      .eq("id", user.id)
      .limit(1);
    console.log("Profile data fetched:", profileData);
    if (profileError) {
      if (
        profileError.code === "PGRST116" ||
        (profileError.details && profileError.details.includes("0 rows"))
      ) {
        console.warn("No profile found for user, initializing with default.");
        userProfile.value = {
          ...userProfile.value,
          email: user.email,
          name: user.email,
        }; // Keep existing ID if any
      } else {
        throw profileError;
      }
    } else if (profileData && profileData.length > 0) {
      userProfile.value = {
        ...userProfile.value,
        ...profileData[0],
        email: user.email,
      };
    } else {
      userProfile.value = {
        ...userProfile.value,
        email: user.email,
        name: user.email,
      };
    }

    // Ambil Kategori
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("categories")
      .select("*")
      .or(`user_id.eq.${user.id},user_id.is.null`);
    console.log("Categories data fetched:", categoriesData);
    if (categoriesError) throw categoriesError;
    categories.value = categoriesData;

    // Ambil Transaksi
    const { data: transactionsData, error: transactionsError } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    console.log("Transactions data fetched:", transactionsData);
    if (transactionsError) throw transactionsError;
    transactions.value = transactionsData.map((t) => ({
      ...t,
      transaction_date: new Date(t.transaction_date),
      created_at: new Date(t.created_at),
    }));

    // Ambil Anggaran
    const { data: budgetsData, error: budgetsError } = await supabase
      .from("budgets")
      .select("*")
      .eq("user_id", user.id);
    console.log("Budgets data fetched:", budgetsData);
    if (budgetsError) throw budgetsError;
    budgets.value = budgetsData;

    // Ambil Tujuan Tabungan
    const { data: goalsData, error: goalsError } = await supabase
      .from("savings_goals")
      .select("*")
      .eq("user_id", user.id);
    console.log("Savings Goals data fetched:", goalsData);
    if (goalsError) throw goalsError;
    savingsGoals.value = goalsData;

    // Ambil Tagihan
    const { data: billsData, error: billsError } = await supabase
      .from("bills")
      .select("*")
      .eq("user_id", user.id);
    console.log("Bills data fetched:", billsData);
    if (billsError) throw billsError;
    bills.value = billsData.map((b) => ({
      ...b,
      due_date: new Date(b.due_date),
    }));
  } catch (err) {
    console.error("Error fetching dashboard data:", err.message);
    error.value = "Gagal memuat data: " + err.message;
    showModal("Error", "Gagal memuat data: " + err.message, "error");
  } finally {
    isLoading.value = false;
    console.log("isLoading set to false. Final error state:", error.value);
  }
};

// --- CRUD Operations for Modals (dipicu oleh komponen anak) ---

// Fungsi helper untuk kategorisasi otomatis
const categorizeTransactionAutomatically = (
  description,
  availableCategories
) => {
  const normalize = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/gi, "");

  const lowerDesc = normalize(description.toLowerCase());
  const words = lowerDesc.split(/\s+/);

  let bestScore = 0;
  let bestCategoryName = null;

  const keywordMapMahasiswaRantauModern = {
    "Makanan & Minuman": [
      "makan",
      "minum",
      "kopi",
      "cafe",
      "restoran",
      "warung",
      "jajan",
      "kuliner",
      "food",
      "minuman",
      "mcd",
      "kfc",
      "burger",
      "pizza",
      "sushi",
      "snack",
      "sarapan",
      "lunch",
      "dinner",
      "bakso",
      "mie",
      "sate",
      "ayam geprek",
      "nasi goreng",
      "indomie",
      "dimsum",
      "es teh",
      "boba",
      "minuman manis",
      // Tambahan untuk mahasiswa masa kini di Malang
      "warteg",
      "angkringan",
      "nasi bungkus",
      "nasi padang",
      "burjo",
      "makanan murah",
      "promo makan",
      "delivery",
      "masak",
      "bahan makanan",
      "sembako",
      "galon",
      "gas",
      "air mineral",
      "katering",
      "makan irit",
      "bekal",
      "gorengan",
      "roti",
      "kue",
      "susu",
      "telur",
      "buah",
      "sayur",
      "geprek",
      "nasi pecel",
      "rawon",
      "tahu campur",
      "cwie mie",
      "mie ayam",
      "pangsit",
      "soto",
      "gudeg", // Makanan khas Malang/Jawa Timur
      "kopi susu",
      "matcha",
      "croissant",
      "brunch",
      "fine dining",
      "street food",
      "prasmanan",
      "makan tengah",
      "cemilan",
      "dessert",
      "roti bakar",
      "martabak",
      "gorengan",
      "es",
      "jus",
      "soda",
      "minuman sachet",
      "grabfood",
      "gofood",
      "shopeefood",
      "traveloka eats",
      "promo", // Aplikasi & promo
    ],
    Transportasi: [
      "ojol",
      "gojek",
      "grab",
      "transportasi",
      "bensin",
      "tol",
      "parkir",
      "angkot",
      "bus",
      "kereta",
      "taxi",
      "commuter",
      "mrt",
      "lrt",
      "ojek",
      "antar",
      "jemput",
      "logistik",
      "sopir",
      "travel",
      // Tambahan untuk mahasiswa masa kini di Malang
      "sewa motor",
      "sewa mobil",
      "bis kampus",
      "jalan kaki",
      "sepeda",
      "tiket bus",
      "tiket kereta",
      "pesawat",
      "antar kota",
      "mudik",
      "pulang kampung",
      "servis motor",
      "servis mobil",
      "cuci motor",
      "isi ulang e-toll",
      "damri",
      "transmalang",
      "patas",
      "ekonomi",
      "pesawat murah",
      "bagasi",
      "tarif",
      "ongkos",
      "pulang",
      "liburan",
    ],
    Edukasi: [
      "buku",
      "kuliah",
      "kursus",
      "seminar",
      "fotokopi",
      "modul",
      "edukasi",
      "pendidikan",
      "stationery",
      "alat tulis",
      "belajar",
      "kampus",
      "ujian",
      "skripsi",
      "bimbel",
      "perpus",
      "kelas",
      "e-learning",
      "zoom class",
      "sertifikat",
      // Tambahan untuk mahasiswa masa kini
      "jurnal",
      "print",
      "binder",
      "spidol",
      "pulpen",
      "pensil",
      "kertas",
      "tugas",
      "proyek",
      "praktikum",
      "software",
      "aplikasi belajar",
      "workshop",
      "webinar",
      "beasiswa",
      "penelitian",
      "presentasi",
      "kebutuhan kampus",
      "fotocopy murah",
      "jilid",
      "lamaran kerja",
      "magang",
      "langganan aplikasi",
      "premium subscription",
      "canva pro",
      "grammarly",
      "notion",
      "chatgpt",
      "ai tool",
      "pelatihan",
      "bootcamp",
      "sertifikasi",
      "portofolio",
      "linkedin premium",
      "skillshare",
      "udemy",
      "coursera",
    ],
    Hiburan: [
      "nongkrong",
      "bioskop",
      "game",
      "konser",
      "rekreasi",
      "liburan",
      "hiburan",
      "streaming",
      "netflix",
      "spotify",
      "youtube premium",
      "blindbox",
      "labubu",
      "tiktok",
      "movie",
      "mobile legends",
      "mlbb",
      "genshin",
      "steam",
      "ps",
      "playstation",
      "voucher game",
      // Tambahan untuk mahasiswa masa kini di Malang
      "karaoke",
      "tempat wisata",
      "wisata lokal",
      "event kampus",
      "gathering",
      "healing",
      "cafe hits",
      "wisata kuliner",
      "jalan-jalan",
      "refreshing",
      "hangout",
      "diskusi",
      "komunitas",
      "olahraga",
      "gym",
      "futsal",
      "basket",
      "badminton",
      "sewa lapangan",
      "hobi",
      "koleksi",
      "fashion trend",
      "skincare",
      "makeup",
      "kpop",
      "jpop",
      "anime",
      "manga",
      "wibu",
      "cosplay",
      "komik",
      "novel",
      "podcast",
      "youtube",
      "influencer",
      "konser musik",
      "festival",
      "pameran",
      "museum",
      "galeri",
      "wisata alam",
      "hiking",
      "camping",
      "pantai",
      "ngopi cantik",
      "hunting foto",
      "tiktok challenge",
      "ootd",
      "thrifting",
      "preloved",
      "barbershop",
      "nail art",
    ],
    Tagihan: [
      "wifi",
      "listrik",
      "air",
      "kosan",
      "kontrakan",
      "cicilan",
      "pulsa",
      "tagihan",
      "internet",
      "pascabayar",
      "indihome",
      "telkom",
      "firstmedia",
      "pln",
      "pdam",
      "kontrak",
      "kamar",
      "sewa",
      // Tambahan untuk mahasiswa masa kini
      "uang sewa",
      "deposit kos",
      "laundry",
      "kebersihan",
      "sampah",
      "perbaikan kos",
      "listrik token",
      "token listrik",
      "kasur",
      "lemari",
      "meja belajar",
      "kipas angin",
      "perlengkapan mandi",
      "perlengkapan tidur",
      "perabot",
      "peralatan masak",
      "dapur",
      "setrika",
      "jemuran",
      "deterjen",
      "bedcover",
      "gorden",
      "cucian",
      "jasa bersih",
      "kost",
      "apartemen",
      "sharing cost",
      "patungan wifi",
    ],
    Belanja: [
      "belanja",
      "pakaian",
      "elektronik",
      "market",
      "supermarket",
      "toko",
      "fashion",
      "gadget",
      "online shop",
      "shopee",
      "tokopedia",
      "lazada",
      "zalora",
      "blibli",
      "handphone",
      "hp",
      "headset",
      "sepatu",
      "baju",
      "kaos",
      "celana",
      "sweater",
      "aksesoris",
      "topi",
      "tas",
      // Tambahan untuk mahasiswa masa kini
      "perlengkapan mandi",
      "sabun",
      "shampo",
      "pasta gigi",
      "sikat gigi",
      "deodoran",
      "parfum",
      "handbody",
      "masker",
      "sanitizer",
      "obat-obatan",
      "vitamin",
      "sakit",
      "klinik",
      "apotek",
      "dokter",
      "cek kesehatan",
      "alat masak",
      "peralatan makan",
      "sandal",
      "jaket",
      "dompet",
      "kacamata",
      "lensa kontak",
      "perhiasan",
      "cukur",
      "potong rambut",
      "salon",
      "makeup",
      "skincare",
      "sunscreen",
      "lip tint",
      "facial wash",
      "power bank",
      "charger",
      "earphone",
      "smartwatch",
      "laptop",
      "tablet",
      "mouse",
      "keyboard",
      "ssd",
      "kopi kemasan",
      "teh kemasan",
      "snack impor",
      "merchandise",
      "official store",
      "brand lokal",
    ],
    "Lain-lain": [
      "lain-lain",
      "misc",
      "lainnya",
      "donasi",
      "sumbangan",
      "amal",
      "zakat",
      "infaq",
      "derma",
      "sosial",
      "pengeluaran tidak terduga",
      "acara",
      "event",
      "biaya tambahan",
      "kerusakan",
      // Tambahan untuk mahasiswa masa kini
      "uang kas",
      "patungan",
      "kado",
      "hadiah",
      "sumbangan duka",
      "biaya admin",
      "denda",
      "service",
      "perbaikan",
      "kehilangan",
      "kecelakaan",
      "darurat",
      "tabungan",
      "investasi",
      "uang saku",
      "kiriman orang tua",
      "dana darurat",
      "pinjaman",
      "hutang",
      "arisan",
      "biaya organisasi",
      "oprec",
      "uang kuliah",
      "ukt",
      "spp",
      "dana pengembangan",
      "daftar ulang",
      "biaya wisuda",
      "cicilan hp",
      "cicilan laptop",
      "bayar parkir",
      "tip",
      "pajak",
      "materai",
      "administrasi bank",
      "top up e-wallet",
      "ovo",
      "dana",
      "gopay",
      "shopeepay",
      "linkaja",
      "qris",
      "transfer",
      "tarik tunai",
    ],
  };

  const weightedKeywords = {
    donasi: 2,
    zakat: 2,
    sumbangan: 2,
    warteg: 1.2,
    kosan: 1.5,
    listrik: 1.5,
    shopee: 1.3,
    spotify: 2,
  };

  for (const [category, keywords] of Object.entries(
    keywordMapMahasiswaRantauModern
  )) {
    let score = 0;

    for (const keyword of keywords) {
      if (words.includes(keyword)) {
        const weight = weightedKeywords[keyword] || 1;
        const positionBonus = words.indexOf(keyword) <= 2 ? 1.2 : 1;
        score += weight * positionBonus;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestCategoryName = category;
    }
  }

  if (!bestCategoryName) {
    console.log(
      `[Auto-Categorize] Tidak ditemukan kecocokan untuk: "${description}"`
    );
    return null;
  }

  const matchedCategory = availableCategories.find(
    (cat) =>
      cat.name === bestCategoryName &&
      (cat.type === "expense" || cat.type === "all")
  );

  if (matchedCategory) {
    console.log(
      `[Auto-Categorize] "${description}" dikategorikan sebagai "${bestCategoryName}" (ID: ${matchedCategory.id}, skor: ${bestScore})`
    );
    return matchedCategory.id;
  }

  return null;
};

// Transaksi CRUD
const addTransaction = async (newTransactionData) => {
  if (!newTransactionData.amount || !newTransactionData.description) {
    showModal(
      "Input Tidak Lengkap",
      "Jumlah dan deskripsi transaksi harus diisi.",
      "warning"
    );
    return;
  }

  // Logika Algoritma Kategorisasi Otomatis
  if (newTransactionData.type === "expense") {
    if (!newTransactionData.category_id) {
      const autoCategorizedId = categorizeTransactionAutomatically(
        newTransactionData.description,
        categories.value
      );
      if (autoCategorizedId) {
        newTransactionData.category_id = autoCategorizedId;
        console.log(
          `Transaksi pengeluaran otomatis dikategorikan ke ID: ${autoCategorizedId}`
        );
      } else {
        showModal(
          "Kategori Belum Dipilih",
          "Untuk pengeluaran, kategori harus dipilih atau deskripsi harus cukup jelas untuk otomatisasi.",
          "warning"
        );
        return;
      }
    }
  } else if (newTransactionData.type === "income") {
    newTransactionData.category_id = null;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const transactionToInsert = {
      user_id: user.id,
      amount: newTransactionData.amount,
      description: newTransactionData.description,
      type: newTransactionData.type,
      transaction_date: new Date().toISOString().split("T")[0],
      category_id: newTransactionData.category_id,
    };

    const { error: insertError } = await supabase
      .from("transactions")
      .insert([transactionToInsert]);

    if (insertError) throw insertError;

    showModal("Berhasil!", "Transaksi berhasil ditambahkan!", "success");
    await fetchDashboardData();
  } catch (err) {
    console.error("Error adding transaction:", err.message);
    if (
      err.message.includes("permission denied") ||
      err.message.includes("violates row-level security policy")
    ) {
      showModal(
        "Error Izin",
        'Gagal menambahkan transaksi: Pastikan kebijakan RLS INSERT untuk tabel "transactions" sudah benar.',
        "error"
      );
    } else {
      showModal(
        "Error",
        "Gagal menambahkan transaksi: " + err.message,
        "error"
      );
    }
  }
};

// Anggaran CRUD
const addBudget = async (newBudgetData) => {
  if (
    !newBudgetData.category_id ||
    !newBudgetData.limit_amount ||
    !newBudgetData.month ||
    !newBudgetData.year
  ) {
    showModal(
      "Input Tidak Lengkap",
      "Semua kolom anggaran harus diisi.",
      "warning"
    );
    return;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const budgetToInsert = {
      user_id: user.id,
      category_id: newBudgetData.category_id,
      limit_amount: newBudgetData.limit_amount,
      month: newBudgetData.month,
      year: newBudgetData.year,
    };

    const { error: insertError } = await supabase
      .from("budgets")
      .insert([budgetToInsert]);

    if (insertError) throw insertError;

    showModal("Berhasil!", "Anggaran berhasil ditambahkan!", "success");
    await fetchDashboardData();
  } catch (err) {
    console.error("Error adding budget:", err.message);
    if (
      err.message.includes("duplicate key value violates unique constraint")
    ) {
      showModal(
        "Error Anggaran",
        "Anggaran untuk kategori dan bulan/tahun ini sudah ada.",
        "error"
      );
    } else if (
      err.message.includes("permission denied") ||
      err.message.includes("violates row-level security policy")
    ) {
      showModal(
        "Error Izin",
        'Gagal menambahkan anggaran: Pastikan kebijakan RLS INSERT untuk tabel "budgets" sudah benar.',
        "error"
      );
    } else {
      showModal("Error", "Gagal menambahkan anggaran: " + err.message, "error");
    }
  }
};

const updateBudget = async (updatedBudgetData) => {
  if (!updatedBudgetData.id) {
    showModal("Error", "ID anggaran tidak ditemukan untuk pembaruan.", "error");
    return;
  }
  if (
    !updatedBudgetData.category_id ||
    !updatedBudgetData.limit_amount ||
    !updatedBudgetData.month ||
    !updatedBudgetData.year
  ) {
    showModal(
      "Input Tidak Lengkap",
      "Semua kolom anggaran harus diisi.",
      "warning"
    );
    return;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const { error: updateError } = await supabase
      .from("budgets")
      .update({
        category_id: updatedBudgetData.category_id,
        limit_amount: updatedBudgetData.limit_amount,
        month: updatedBudgetData.month,
        year: updatedBudgetData.year,
      })
      .eq("id", updatedBudgetData.id)
      .eq("user_id", user.id); // Pastikan user hanya bisa memperbarui anggarannya sendiri

    if (updateError) throw updateError;

    showModal("Berhasil!", "Anggaran berhasil diperbarui!", "success");
    await fetchDashboardData();
  } catch (err) {
    console.error("Error updating budget:", err.message);
    if (
      err.message.includes("duplicate key value violates unique constraint")
    ) {
      showModal(
        "Error Anggaran",
        "Anggaran untuk kategori dan bulan/tahun ini sudah ada.",
        "error"
      );
    } else if (
      err.message.includes("permission denied") ||
      err.message.includes("violates row-level security policy")
    ) {
      showModal(
        "Error Izin",
        'Gagal memperbarui anggaran: Pastikan kebijakan RLS UPDATE untuk tabel "budgets" sudah benar.',
        "error"
      );
    } else {
      showModal("Error", "Gagal memperbarui anggaran: " + err.message, "error");
    }
  }
};

// Tagihan CRUD
const addBill = async (newBillData) => {
  if (
    !newBillData.name ||
    !newBillData.amount ||
    !newBillData.due_date ||
    !newBillData.frequency
  ) {
    showModal(
      "Input Tidak Lengkap",
      "Semua kolom tagihan harus diisi.",
      "warning"
    );
    return;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const billToInsert = {
      user_id: user.id,
      name: newBillData.name,
      amount: newBillData.amount,
      due_date: newBillData.due_date,
      frequency: newBillData.frequency,
      category_id: newBillData.category_id || null,
      is_paid_current_period: newBillData.is_paid_current_period,
    };

    const { error: insertError } = await supabase
      .from("bills")
      .insert([billToInsert]);

    if (insertError) throw insertError;

    showModal("Berhasil!", "Tagihan berhasil ditambahkan!", "success");
    await fetchDashboardData();
  } catch (err) {
    console.error("Error adding bill:", err.message);
    if (
      err.message.includes("permission denied") ||
      err.message.includes("violates row-level security policy")
    ) {
      showModal(
        "Error Izin",
        'Gagal menambahkan tagihan: Pastikan kebijakan RLS INSERT untuk tabel "bills" sudah benar.',
        "error"
      );
    } else {
      showModal("Error", "Gagal menambahkan tagihan: " + err.message, "error");
    }
  }
};

const updateBill = async (updatedBillData) => {
  if (!updatedBillData.id) {
    showModal("Error", "ID tagihan tidak ditemukan untuk pembaruan.", "error");
    return;
  }
  if (
    !updatedBillData.name ||
    !updatedBillData.amount ||
    !updatedBillData.due_date ||
    !updatedBillData.frequency
  ) {
    showModal(
      "Input Tidak Lengkap",
      "Semua kolom tagihan harus diisi.",
      "warning"
    );
    return;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const { error: updateError } = await supabase
      .from("bills")
      .update({
        name: updatedBillData.name,
        amount: updatedBillData.amount,
        due_date: updatedBillData.due_date,
        frequency: updatedBillData.frequency,
        category_id: updatedBillData.category_id || null,
        is_paid_current_period: updatedBillData.is_paid_current_period,
      })
      .eq("id", updatedBillData.id)
      .eq("user_id", user.id); // Pastikan user hanya bisa memperbarui tagihannya sendiri

    if (updateError) throw updateError;

    showModal("Berhasil!", "Tagihan berhasil diperbarui!", "success");
    await fetchDashboardData();
  } catch (err) {
    console.error("Error updating bill:", err.message);
    if (
      err.message.includes("permission denied") ||
      err.message.includes("violates row-level security policy")
    ) {
      showModal(
        "Error Izin",
        'Gagal memperbarui tagihan: Pastikan kebijakan RLS UPDATE untuk tabel "bills" sudah benar.',
        "error"
      );
    } else {
      showModal("Error", "Gagal memperbarui tagihan: " + err.message, "error");
    }
  }
};

// Tujuan Keuangan CRUD
const addGoal = async (newGoalData) => {
  if (!newGoalData.name || !newGoalData.target_amount) {
    showModal(
      "Input Tidak Lengkap",
      "Nama tujuan dan target jumlah harus diisi.",
      "warning"
    );
    return;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const goalToInsert = {
      user_id: user.id,
      name: newGoalData.name,
      target_amount: newGoalData.target_amount,
      saved_amount: newGoalData.saved_amount || 0,
      due_date: newGoalData.due_date || null,
      is_completed: newGoalData.is_completed,
    };

    const { error: insertError } = await supabase
      .from("savings_goals")
      .insert([goalToInsert]);

    if (insertError) throw insertError;

    showModal("Berhasil!", "Tujuan keuangan berhasil ditambahkan!", "success");
    await fetchDashboardData();
  } catch (err) {
    console.error("Error adding goal:", err.message);
    if (
      err.message.includes("permission denied") ||
      err.message.includes("violates row-level security policy")
    ) {
      showModal(
        "Error Izin",
        'Gagal menambahkan tujuan: Pastikan kebijakan RLS INSERT untuk tabel "savings_goals" sudah benar.',
        "error"
      );
    } else {
      showModal("Error", "Gagal menambahkan tujuan: " + err.message, "error");
    }
  }
};

const updateGoal = async (updatedGoalData) => {
  if (!updatedGoalData.id) {
    showModal("Error", "ID tujuan tidak ditemukan untuk pembaruan.", "error");
    return;
  }
  if (!updatedGoalData.name || !updatedGoalData.target_amount) {
    showModal(
      "Input Tidak Lengkap",
      "Nama tujuan dan target jumlah harus diisi.",
      "warning"
    );
    return;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const { error: updateError } = await supabase
      .from("savings_goals")
      .update({
        name: updatedGoalData.name,
        target_amount: updatedGoalData.target_amount,
        saved_amount: updatedGoalData.saved_amount,
        due_date: updatedGoalData.due_date || null,
        is_completed: updatedGoalData.is_completed,
      })
      .eq("id", updatedGoalData.id)
      .eq("user_id", user.id); // Pastikan user hanya bisa memperbarui tujuannya sendiri

    if (updateError) throw updateError;

    showModal("Berhasil!", "Tujuan keuangan berhasil diperbarui!", "success");
    await fetchDashboardData();
  } catch (err) {
    console.error("Error updating goal:", err.message);
    if (
      err.message.includes("permission denied") ||
      err.message.includes("violates row-level security policy")
    ) {
      showModal(
        "Error Izin",
        'Gagal memperbarui tujuan: Pastikan kebijakan RLS UPDATE untuk tabel "savings_goals" sudah benar.',
        "error"
      );
    } else {
      showModal("Error", "Gagal memperbarui tujuan: " + err.message, "error");
    }
  }
};

// Kategori CRUD
const addCategory = async (newCategoryData) => {
  if (!newCategoryData.name || !newCategoryData.type) {
    showModal(
      "Input Tidak Lengkap",
      "Nama dan tipe kategori harus diisi.",
      "warning"
    );
    return;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const categoryToInsert = {
      user_id: user.id, // Kategori adalah user-specific
      name: newCategoryData.name,
      type: newCategoryData.type,
    };

    const { error: insertError } = await supabase
      .from("categories")
      .insert([categoryToInsert]);

    if (insertError) throw insertError;

    showModal("Berhasil!", "Kategori berhasil ditambahkan!", "success");
    await fetchDashboardData();
  } catch (err) {
    console.error("Error adding category:", err.message);
    if (
      err.message.includes("duplicate key value violates unique constraint")
    ) {
      showModal(
        "Error Kategori",
        "Kategori dengan nama dan tipe ini sudah ada.",
        "error"
      );
    } else if (
      err.message.includes("permission denied") ||
      err.message.includes("violates row-level security policy")
    ) {
      showModal(
        "Error Izin",
        'Gagal menambahkan kategori: Pastikan kebijakan RLS INSERT untuk tabel "categories" sudah benar.',
        "error"
      );
    } else {
      showModal("Error", "Gagal menambahkan kategori: " + err.message, "error");
    }
  }
};

const updateCategory = async (updatedCategoryData) => {
  if (!updatedCategoryData.id) {
    showModal("Error", "ID kategori tidak ditemukan untuk pembaruan.", "error");
    return;
  }
  if (!updatedCategoryData.name || !updatedCategoryData.type) {
    showModal(
      "Input Tidak Lengkap",
      "Nama dan tipe kategori harus diisi.",
      "warning"
    );
    return;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const { error: updateError } = await supabase
      .from("categories")
      .update({
        name: updatedCategoryData.name,
        type: updatedCategoryData.type,
      })
      .eq("id", updatedCategoryData.id)
      .eq("user_id", user.id); // Pastikan user hanya bisa memperbarui kategorinya sendiri

    if (updateError) throw updateError;

    showModal("Berhasil!", "Kategori berhasil diperbarui!", "success");
    await fetchDashboardData();
  } catch (err) {
    console.error("Error updating category:", err.message);
    if (
      err.message.includes("duplicate key value violates unique constraint")
    ) {
      showModal(
        "Error Kategori",
        "Kategori dengan nama dan tipe ini sudah ada.",
        "error"
      );
    } else if (
      err.message.includes("permission denied") ||
      err.message.includes("violates row-level security policy")
    ) {
      showModal(
        "Error Izin",
        'Gagal memperbarui kategori: Pastikan kebijakan RLS UPDATE untuk tabel "categories" sudah benar.',
        "error"
      );
    } else {
      showModal("Error", "Gagal memperbarui kategori: " + err.message, "error");
    }
  }
};

const deleteCategory = async (categoryId) => {
  showModal(
    "Konfirmasi Hapus Kategori",
    "Apakah Anda yakin ingin menghapus kategori ini? Tindakan ini tidak dapat dibatalkan dan transaksi terkait mungkin terpengaruh.",
    "confirm",
    true,
    "Hapus",
    async (confirmed) => {
      if (confirmed) {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) {
            throw new Error("User not authenticated.");
          }

          console.log(
            "DashboardPage: Deleting category with ID:",
            categoryId,
            "for user:",
            user.id
          );
          const { error: deleteError } = await supabase
            .from("categories")
            .delete()
            .eq("id", categoryId)
            .eq("user_id", user.id); // Pastikan user hanya bisa menghapus kategorinya sendiri

          if (deleteError) throw deleteError;

          showModal("Berhasil!", "Kategori berhasil dihapus!", "success");
          await fetchDashboardData();
        } catch (err) {
          console.error("Error deleting category:", err.message);
          if (
            err.message.includes("permission denied") ||
            err.message.includes("violates row-level security policy")
          ) {
            showModal(
              "Error Izin",
              'Gagal menghapus kategori: Pastikan kebijakan RLS DELETE untuk tabel "categories" sudah benar.',
              "error"
            );
          } else if (err.message.includes("violates foreign key constraint")) {
            showModal(
              "Error Hapus",
              "Kategori tidak dapat dihapus karena masih digunakan oleh transaksi atau anggaran. Harap hapus atau ubah transaksi/anggaran terkait terlebih dahulu.",
              "error"
            );
          } else {
            showModal(
              "Error",
              "Gagal menghapus kategori: " + err.message,
              "error"
            );
          }
        }
      }
    }
  );
};

// Profil CRUD
const updateProfile = async (updatedProfileData) => {
  if (!userProfile.value.id) {
    showModal("Error", "ID profil tidak ditemukan untuk pembaruan.", "error");
    return;
  }
  if (!updatedProfileData.name) {
    showModal("Input Tidak Lengkap", "Nama lengkap harus diisi.", "warning");
    return;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        name: updatedProfileData.name,
        university: updatedProfileData.university,
        major: updatedProfileData.major,
        home_city: updatedProfileData.home_city,
        updated_at: new Date().toISOString(), // Perbarui timestamp
      })
      .eq("id", userProfile.value.id)
      .eq("id", user.id); // Pastikan user hanya bisa memperbarui profilnya sendiri

    if (updateError) throw updateError;

    showModal("Berhasil!", "Profil berhasil diperbarui!", "success");
    await fetchDashboardData(); // Ambil ulang data untuk memperbarui UI
  } catch (err) {
    console.error("Error updating profile:", err.message);
    if (
      err.message.includes("permission denied") ||
      err.message.includes("violates row-level security policy")
    ) {
      showModal(
        "Error Izin",
        'Gagal memperbarui profil: Pastikan kebijakan RLS UPDATE untuk tabel "profiles" sudah benar.',
        "error"
      );
    } else {
      showModal("Error", "Gagal memperbarui profil: " + err.message, "error");
    }
  }
};

// Password Change
const changePassword = async (passwordData) => {
  if (!passwordData.new_password || passwordData.new_password.length < 6) {
    showModal(
      "Input Tidak Valid",
      "Password baru minimal 6 karakter.",
      "warning"
    );
    return;
  }
  if (passwordData.new_password !== passwordData.confirm_new_password) {
    showModal(
      "Konfirmasi Password",
      "Password baru dan konfirmasi tidak cocok.",
      "warning"
    );
    return;
  }

  try {
    const { data, error: updateError } = await supabase.auth.updateUser({
      password: passwordData.new_password,
    });

    if (updateError) throw updateError;

    showModal("Berhasil!", "Password berhasil diperbarui!", "success");
    // Supabase secara otomatis akan me-refresh sesi
  } catch (err) {
    console.error("Error changing password:", err.message);
    // Supabase update password memerlukan user untuk re-authenticate jika sesi sudah lama
    if (
      err.message.includes(
        "AuthApiError: For security purposes, you must re-authenticate to change your password."
      )
    ) {
      showModal(
        "Error Ubah Password",
        "Untuk alasan keamanan, Anda harus login ulang untuk mengubah password. Silakan logout dan login kembali, lalu coba ubah password.",
        "error"
      );
    } else {
      showModal("Error", "Gagal mengubah password: " + err.message, "error");
    }
  }
};

const emit = defineEmits(["logout"]);

const handleLogout = async () => {
  showModal(
    "Konfirmasi Logout",
    "Apakah Anda yakin ingin keluar?",
    "confirm",
    true,
    "Ya, Logout",
    async (confirmed) => {
      if (confirmed) {
        try {
          const { error: logoutError } = await supabase.auth.signOut();
          if (logoutError) throw logoutError;
          console.log("User logged out.");
          emit("logout");
          router.push({ name: "Landing" });
        } catch (err) {
          console.error("Error logging out:", err.message);
          showModal("Error Logout", "Gagal logout: " + err.message, "error");
        }
      }
    }
  );
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Intersection Observer for animations
const observer = ref(null);

const setupIntersectionObserver = () => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }
  );

  document.querySelectorAll(".animate-fade-in-up").forEach((element) => {
    observer.value.observe(element);
  });
};

onMounted(() => {
  fetchDashboardData();
  setupIntersectionObserver();
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>

<style scoped>
.font-inter {
  font-family: "Inter", sans-serif;
}

.gen-z-gradient {
  background: linear-gradient(135deg, #6ee7b7, #3b82f6, #9333ea);
}
.gen-z-text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(45deg, #6ee7b7, #3b82f6, #9333ea);
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

.delay-100 {
  transition-delay: 0.1s;
}
.delay-200 {
  transition-delay: 0.2s;
}
.delay-300 {
  transition-delay: 0.3s;
}
.delay-400 {
  transition-delay: 0.4s;
}

/* Mobile sidebar specific styles */
@media (max-width: 767px) {
  aside {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 75%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
}
</style>
