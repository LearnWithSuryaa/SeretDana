<template>
  <div class="flex items-start gap-3">
    <div>
      <slot />
    </div>
    <div>
      <p class="text-sm text-gray-500 font-medium">{{ label }}</p>
      <p class="text-base font-semibold text-gray-900 mt-0.5">{{ value }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: String
});
</script>
