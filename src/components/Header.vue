<script setup>
import { ref, onMounted, watch } from "vue";

const cartItemCount = ref(0);

document.addEventListener("updateCartItemCount", () => {
  cartItemCount.value = JSON.parse(localStorage.getItem("cart")).length || 0;
});

onMounted(() => {
  cartItemCount.value = JSON.parse(localStorage.getItem("cart")).length || 0;
});
</script>
<template>
  <header>
    <div class="header_logo">
      <router-link to="/">
        <img src="/public/logo.png" alt="" height="40px" />
        <h1>Violoctecia</h1></router-link
      >
    </div>

    <div class="header_shop_nav">
      <router-link
        class="header_link"
        to="/shop/all"
        :class="{ active: $route.path === '/shop/all' }"
        >Все товары</router-link
      >
      <router-link
        class="header_link"
        to="/shop/hoodie"
        :class="{ active: $route.path === '/shop/hoodie' }"
        >Худи</router-link
      >
      <router-link
        class="header_link"
        to="/shop/jeans"
        :class="{ active: $route.path === '/shop/jeans' }"
        >Джинсы</router-link
      >
      <router-link
        class="header_link"
        to="/shop/bags"
        :class="{ active: $route.path === '/shop/bags' }"
        >Сумки</router-link
      >
      <router-link
        class="header_link"
        to="/shop/accessories"
        :class="{ active: $route.path === '/shop/accessories' }"
        >Аксессуары</router-link
      >
    </div>

    <div class="header_right">
      <router-link to="/shop/cart" class="cart">
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/shopping-bag--v1.png"
          alt="shopping-bag--v1"
        />
        <p class="quantity" v-if="cartItemCount > 0">{{ cartItemCount }}</p>
      </router-link>
    </div>
  </header>

  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.header_logo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  h1 {
    font-weight: 700;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
}
.header_shop_nav {
  display: flex;
  gap: 25px;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

header {
  font-size: 14px;
  font-weight: 500;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px rgba(0, 0, 0, 0.2) solid;
  margin-bottom: 50px;
}
.header_right {
  display: flex;
  gap: 25px;
  justify-content: center;
}
.cart {
  cursor: pointer;
  position: relative;
}
.quantity {
  border-radius: 100px;
  position: absolute;
  top: -5px;
  right: -10px;
  color: white;
  background-color: red;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}

.active {
  color: red;
}
</style>
