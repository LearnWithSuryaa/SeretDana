<template>
  <section
    class="py-20 px-6 md:px-12 bg-gray-50 relative overflow-hidden"
    id="how-it-works"
    ref="sectionRef"
  >
    <div class="container mx-auto max-w-6xl">
      <h2
        class="text-4xl md:text-5xl font-bold mb-20 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 drop-shadow-md transition-all duration-1000 ease-out py-2"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        Gimana Cara Kerjanya? Gampang Banget!
      </h2>

      <!-- MOBILE VERSION -->
      <div class="md:hidden relative overflow-x-auto pb-6">
        <div class="flex items-center gap-8 w-[800px] px-4 relative">
          <!-- Horizontal Line -->
          <div class="absolute top-8 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-emerald-400 to-fuchsia-500 rounded-full z-0"></div>

          <!-- Step 1 -->
          <div
            class="relative z-10 flex flex-col items-center min-w-[200px] transition-all duration-700 ease-out delay-100"
            :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          >
            <div class="neon-glow bg-indigo-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl ring-4 ring-white mb-2">
              <UserPlusIcon class="w-8 h-8" />
            </div>
            <h3 class="text-base font-semibold text-center text-gray-800">Daftar & Login</h3>
            <p class="text-xs text-gray-600 text-center">Buat akun atau login. Gratis!</p>
          </div>

          <!-- Step 2 -->
          <div
            class="relative z-10 flex flex-col items-center min-w-[200px] transition-all duration-700 ease-out delay-200"
            :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          >
            <div class="neon-glow bg-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl ring-4 ring-white mb-2">
              <PencilIcon class="w-8 h-8" />
            </div>
            <h3 class="text-base font-semibold text-center text-gray-800">Catat Transaksi</h3>
            <p class="text-xs text-gray-600 text-center">Catat pemasukan/pengeluaran cepat.</p>
          </div>

          <!-- Step 3 -->
          <div
            class="relative z-10 flex flex-col items-center min-w-[200px] transition-all duration-700 ease-out delay-300"
            :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          >
            <div class="neon-glow bg-fuchsia-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl ring-4 ring-white mb-2">
              <ChartBarIcon class="w-8 h-8" />
            </div>
            <h3 class="text-base font-semibold text-center text-gray-800">Pantau & Rencanakan</h3>
            <p class="text-xs text-gray-600 text-center">Lihat laporan dan atur anggaranmu.</p>
          </div>
        </div>
      </div>

      <!-- DESKTOP VERSION -->
      <div class="hidden md:grid relative grid-cols-1 md:grid-cols-3 gap-y-28 md:gap-y-40">
        <!-- Vertical Timeline Line -->
        <div
          class="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-400 via-emerald-400 to-fuchsia-500 rounded-full transition-all duration-1000 ease-in-out"
          :class="visible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 origin-top'"
        ></div>

        <!-- Step 1 -->
        <div
          class="flex justify-end md:pr-8 transition-all duration-700 ease-out delay-100"
          :class="visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'"
        >
          <div class="text-right max-w-xs">
            <h3 class="text-xl font-semibold mb-2 text-gray-800">Daftar & Login</h3>
            <p class="text-sm text-gray-600">Buat akun dengan cepat atau login jika sudah punya. Gratis!</p>
          </div>
        </div>
        <div
          class="flex justify-center transition-all duration-700 ease-out delay-200"
          :class="visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'"
        >
          <div class="neon-glow bg-indigo-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl ring-4 ring-white z-10">
            <UserPlusIcon class="w-8 h-8" />
          </div>
        </div>
        <div></div>

        <!-- Step 2 -->
        <div></div>
        <div
          class="flex justify-center transition-all duration-700 ease-out delay-300"
          :class="visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'"
        >
          <div class="neon-glow bg-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl ring-4 ring-white z-10">
            <PencilIcon class="w-8 h-8" />
          </div>
        </div>
        <div
          class="flex justify-start md:pl-8 transition-all duration-700 ease-out delay-400"
          :class="visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'"
        >
          <div class="text-left max-w-xs">
            <h3 class="text-xl font-semibold mb-2 text-gray-800">Catat Pengeluaran/Pemasukan</h3>
            <p class="text-sm text-gray-600">Setiap kali ada transaksi, langsung catat di aplikasi. Cuma butuh beberapa tap!</p>
          </div>
        </div>

        <!-- Step 3 -->
        <div
          class="flex justify-end md:pr-8 transition-all duration-700 ease-out delay-500"
          :class="visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'"
        >
          <div class="text-right max-w-xs">
            <h3 class="text-xl font-semibold mb-2 text-gray-800">Pantau & Rencanakan</h3>
            <p class="text-sm text-gray-600">Lihat laporan keuanganmu, atur anggaran, dan capai tujuan finansialmu!</p>
          </div>
        </div>
        <div
          class="flex justify-center transition-all duration-700 ease-out delay-600"
          :class="visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'"
        >
          <div class="neon-glow bg-fuchsia-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl ring-4 ring-white z-10">
            <ChartBarIcon class="w-8 h-8" />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { UserPlusIcon, PencilIcon, ChartBarIcon } from '@heroicons/vue/24/solid'

const visible = ref(false)
const sectionRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        visible.value = true
      }
    },
    { threshold: 0.2 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
</script>

<style scoped>
.neon-glow {
  box-shadow:
    0 0 10px rgba(255, 255, 255, 0.8),
    0 0 20px rgba(255, 255, 255, 0.6),
    0 0 30px rgba(255, 255, 255, 0.3);
  transition: box-shadow 0.3s ease;
}
.neon-glow:hover {
  box-shadow:
    0 0 15px rgba(255, 255, 255, 1),
    0 0 25px rgba(255, 255, 255, 0.7),
    0 0 40px rgba(255, 255, 255, 0.4);
}
</style>
