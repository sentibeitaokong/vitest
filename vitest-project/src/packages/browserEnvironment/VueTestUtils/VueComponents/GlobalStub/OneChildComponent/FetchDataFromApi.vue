<template>
  <div>{{ result }}</div>
</template>

<script  lang="ts">

export default {
  data() {
    return {
      result: ''
    }
  },
  async mounted() {
    const res = await axios.get('/api/info')
    this.result = res.data
  },
}
</script>

<style scoped>

</style>