<script setup>
import { ref } from 'vue'

const admin = ref(false)
const shouldShowDropdown = ref(false)
</script>

<template>
  <nav>
    <a id="profile" href="/profile">My Profile</a>
    <a v-if="admin" id="admin" href="/admin">Admin</a>
    <ul v-show="shouldShowDropdown" id="user-dropdown">
      <!-- dropdown content -->
    </ul>
  </nav>
</template>