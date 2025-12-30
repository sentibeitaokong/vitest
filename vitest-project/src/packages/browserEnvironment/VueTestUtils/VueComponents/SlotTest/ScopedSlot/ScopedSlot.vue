<template>
  <div>
    <div class="scoped">
      <slot name="scoped" v-bind="{ msg }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
const msg = ref("world");
</script>

<style scoped>

</style>