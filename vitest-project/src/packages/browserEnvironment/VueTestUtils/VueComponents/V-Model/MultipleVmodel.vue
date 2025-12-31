<template>
  <div>
    <input :value="modelValue" @input="emit('update:modelValue', $event.target.value)">
    <input :value="currency" @input="emit('update:currency', $event.target.value)">
  </div>
</template>

<script setup lang="ts">
const props=defineProps<{
  modelValue:string
  currency:string
}>()
const emit=defineEmits<{
  'update:modelValue':[value:string]
  'update:currency':[value:string]
}>()
</script>

<style scoped>

</style>