<template>
  <div>
    <div>
      <button @click="increment" />
      Count: {{ count }}
    </div>
  </div>
</template>

<script  lang="ts">
export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment')
    }
  }
}


</script>

<style scoped>

</style>