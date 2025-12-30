<script lang="ts">
  import {ref} from "vue";
  export default {
    async setup() {
      const count = ref(0)

      // 返回值会暴露给模板和其他的选项式 API 钩子
      return {
        count
      }
    },

    mounted() {
      // console.log(this.count) // 0
    }
  }
</script>

<template>
  <div>AsyncComponent
    <span>{{count}}</span>
  </div>

</template>

<style scoped>

</style>