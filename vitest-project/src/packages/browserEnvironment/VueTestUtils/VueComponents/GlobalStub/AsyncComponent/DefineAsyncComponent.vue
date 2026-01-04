<script  lang="ts">
import {defineAsyncComponent} from "vue";
const MyComponent=defineAsyncComponent(()=>import('./AsyncComponent.vue'))
export default {
  components: {
    MyComponent
  }
}
</script>

<template>
  <div>
    <MyComponent></MyComponent>
  </div>
</template>

<style scoped>

</style>