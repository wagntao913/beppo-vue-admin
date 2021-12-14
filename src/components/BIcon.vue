<template>
  <div class="inline-block mx-0.5">
    <Icon :icon="icon" :height="height" />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { defineProps } from 'vue'
const props = defineProps<{
  icon: string
  height?: string
}>()
</script>

<style scoped></style>
