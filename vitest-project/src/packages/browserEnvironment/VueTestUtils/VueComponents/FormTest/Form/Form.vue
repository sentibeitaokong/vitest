<script setup>
import { ref } from 'vue'

const email = ref('')
const emit = defineEmits(['submit','focus-lost'])
const inputValue = ref('')

const handleBlur = (event) => {
  if (event.relatedTarget.tagName === 'BUTTON') {
    emit('focus-lost')
  }
}
const submit = () => {
  emit('submit', email.value)
}
</script>

<template>
  <div>
    <input type="email" v-model="email" />
    <button @click="submit" data-test="button">Submit</button>
    <form>
      <input type="text" v-model="inputValue" @blur="handleBlur" />
      <button data-test="form">Submit</button>
    </form>
  </div>
</template>