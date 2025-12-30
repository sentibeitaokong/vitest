<!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue', 'label'])
</script>

<template>
  <label>
    {{ label }}
    <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>