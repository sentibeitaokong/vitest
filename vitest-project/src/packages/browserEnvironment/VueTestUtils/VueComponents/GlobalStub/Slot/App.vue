<script  lang="ts">
  import CustomButton from "./CustomButton.vue";
  export default {
    props:['authenticated'],
    components:{
      CustomButton
    }
  }
</script>

<template>
  <custom-button>
    <div v-if="authenticated">Log out</div>
    <div v-else>Log in</div>
  </custom-button>
</template>

<style scoped>

</style>