<template>
  <div>
<!--    <div v-for="item in props.products">
      <div>{{item.name}}</div>
    </div>-->
    <select
        style="width: 100%"
        v-model="label"
    >
     <option
             v-for="item in props.products"
             :value="item.name"
             :label="item.name"
             >{{item.name}}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props=defineProps(['products'])
const label=ref<string>('')

</script>

<style scoped>

</style>