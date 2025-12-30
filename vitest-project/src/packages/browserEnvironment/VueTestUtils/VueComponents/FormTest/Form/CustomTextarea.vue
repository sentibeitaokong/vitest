<script setup>
import { ref } from 'vue'
const description = ref('')
const emit = defineEmits(['submitted'])

const handleSubmit = () => {
  emit('submitted', description.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
<!--    <v-textarea v-model="description" ref="description" />-->
    <button type="submit">Send</button>
  </form>
</template>