<template>
  <div>
    <Todo></Todo>
    <TransitionComponent></TransitionComponent>
    <Layout></Layout>
  </div>
</template>

<script setup lang="ts">
import Todo from './packages/browserEnvironment/VueTestUtils/VueComponents/Basic/Todo/Todo.vue'
import TransitionComponent from "./packages/browserEnvironment/VueTestUtils/VueComponents/TransitionTest/Transition.vue";
import Layout from "./packages/browserEnvironment/VueTestUtils/VueComponents/VueRouter/RealVueRouter/Layout.vue";
</script>

<style scoped>

</style>