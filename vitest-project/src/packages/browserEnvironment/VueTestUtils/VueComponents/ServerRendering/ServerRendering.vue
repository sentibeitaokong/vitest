<template>
  <div>{{ text }}</div>
</template>

<script lang="ts">
function fakeFetch(text: string) {
  return Promise.resolve(text)
}
import { ref, onServerPrefetch } from 'vue'
export default {
  setup() {
    const text = ref<string | null>(null)

    onServerPrefetch(async () => {
      text.value = await fakeFetch('onServerPrefetch')
    })

    return { text }
  }
}
</script>

<style scoped>

</style>