<script setup></script>

<template>
  <div class="admin_menu">
    <router-link to="/admin/add">Добавить товар</router-link>
    <router-link to="/admin/store">Управление товарами</router-link>
  </div>
</template>

<style scoped>
.admin_menu {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  background-color: #f6f6f6;
}
</style>
