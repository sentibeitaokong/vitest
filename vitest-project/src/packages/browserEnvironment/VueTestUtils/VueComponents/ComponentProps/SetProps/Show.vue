<script setup>
import { ref } from 'vue'

const { show } = defineProps(['show'])
const greeting = ref('Hello')
</script>

<template>
  <div v-if="show">{{ greeting }}</div>
</template>