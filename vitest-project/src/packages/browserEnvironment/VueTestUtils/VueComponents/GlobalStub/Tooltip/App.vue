<script  lang="ts">
import {
  myDirective
} from "./directives/Tooltip";
export default {
  directives: {
    myDirective
  },
}
</script>

<template>
  <h1 v-my-directive title="Welcome tooltip">Welcome to Vue.js 3</h1>
</template>

<style scoped>

</style>