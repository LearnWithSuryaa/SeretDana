<template>
  <div class="flex min-h-screen bg-gray-50 text-gray-800">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col p-4 space-y-4">
      <h1 class="text-xl font-bold text-pink-500">SeretDana</h1>
      <nav class="flex flex-col space-y-2">
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          class="flex items-center px-3 py-2 rounded-lg transition hover:bg-pink-100 hover:text-pink-600"
          :class="{ 'bg-pink-100 text-pink-600 font-semibold': isActive(item.to) }"
        >
          <component :is="item.icon" class="w-5 h-5 mr-2" />
          {{ item.name }}
        </RouterLink>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Topbar -->
      <header class="w-full bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold">Dashboard</h2>
        <!-- Bisa diisi tombol profil/log out nanti -->
        <div class="text-sm text-gray-500">Halo, Mahasiswa!</div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import {
  HomeIcon,
  BanknotesIcon,
  WalletIcon,
  ReceiptPercentIcon,
  SparklesIcon,
  UserIcon,
} from '@heroicons/vue/24/outline'

const route = useRoute()

const navItems = [
  { name: 'Overview', to: '/', icon: HomeIcon },
  { name: 'Transactions', to: '/transactions', icon: BanknotesIcon },
  { name: 'Budgets', to: '/budgets', icon: WalletIcon },
  { name: 'Bills', to: '/bills', icon: ReceiptPercentIcon },
  { name: 'Goals', to: '/goals', icon: SparklesIcon },
  { name: 'Profile', to: '/profile', icon: UserIcon },
]

const isActive = (path) => {
  return computed(() => route.path === path).value
}
</script>

<style scoped>
/* Scrollbar styling for main content if needed */
main::-webkit-scrollbar {
  width: 8px;
}
main::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 4px;
}
</style>
