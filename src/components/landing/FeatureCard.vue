<template>
  <div
    ref="card"
    :class="[
      'bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-700 ease-out transform hover:-translate-y-1 p-6 flex flex-col items-center text-center',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    ]"
    :style="{ transitionDelay: `${delay}ms` }"
  >
    <img :src="icon" alt="" class="w-24 h-24 mb-5" />
    <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ title }}</h3>
    <p class="text-gray-600 text-sm leading-relaxed">{{ description }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  icon: String,
  delay: {
    type: Number,
    default: 0,
  },
})

const isVisible = ref(false)
const card = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.unobserve(card.value)
      }
    },
    { threshold: 0.1 }
  )

  if (card.value) {
    observer.observe(card.value)
  }
})
</script>
