<template>
  <div>
    <input :value="modelValue" @input="emit('update:modelValue', $event.target.value)">
  </div>
</template>

<script setup lang="ts">
const props=defineProps<{
  modelValue:string
}>()
const emit=defineEmits<{
  'update:modelValue':[value:string]
}>()
</script>

<style scoped>

</style>