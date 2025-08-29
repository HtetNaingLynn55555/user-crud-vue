<script setup>
import Nav from "./components/Nav.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div>
    <Nav v-if="!route.meta.hideNav" />
    <router-view />
  </div>
</template>

<style scoped></style>
