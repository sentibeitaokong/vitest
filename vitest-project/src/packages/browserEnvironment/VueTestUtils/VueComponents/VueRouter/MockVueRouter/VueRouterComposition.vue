<template>
  <div>
    <button @click="redirect">Click to Edit</button>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const props = defineProps<{
  isAuthenticated: Boolean
}>()
const router = useRouter()
const route = useRoute()

const redirect = () => {
  if (props.isAuthenticated) {
    router.push(`/posts/${route.params.id}/edit`)
  } else {
    router.push('/404')
  }
}
</script>

<style scoped>

</style>