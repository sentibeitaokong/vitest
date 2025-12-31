<template>
  <div>
    <slot />
    <SomeChild></SomeChild>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import SomeChild from './SomeChild.vue'
provide('my-key', 'some-data')
</script>