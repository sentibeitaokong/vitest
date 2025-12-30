<!-- Password.vue -->
<script setup>
import { ref, computed } from 'vue'

const props = defineProps(['minLength'])
const password = ref('')

const error = computed(() => {
  if (password.value.length < props.minLength) {
    return `密码必须至少包含 ${props.minLength} 个字符。`
  }
  return
})
</script>

<template>
  <div>
    <input v-model="password" />
    <div v-if="error">{{ error }}</div>
  </div>
</template>