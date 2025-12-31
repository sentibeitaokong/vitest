<template>
  <div>
    {{ value }}
  </div>
</template>

<script setup>
import { inject } from 'vue'
const value = inject('my-key')
</script>