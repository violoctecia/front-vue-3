<script setup>
import Header from "./components/Header.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
  <div class="container" >
    <Header></Header>
  </div>
  <FooterComponent> </FooterComponent>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
