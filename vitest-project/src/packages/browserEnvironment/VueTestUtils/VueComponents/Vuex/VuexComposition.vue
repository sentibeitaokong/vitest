<template>
  <div>
    <div>
      <button @click="increment" />
      Count: {{ count }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import {key} from "@/store";

const store=useStore(key)
const count=computed(()=>{
  return store.state.count
})
const increment=()=>{
  store.commit('increment')
}
</script>
<style scoped>
</style>