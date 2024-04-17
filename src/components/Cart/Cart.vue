<script setup>
import CartOrder from "@/components/Cart/CartOrder.vue";
import CartTable from "@/components/Cart/CartTable.vue";
</script>

<template>
  <div class="cart_wrapper">
    <div class="order">
      <!-- <p>Сумма заказа: {{ getTotalPrice() }}₽</p> -->
      <p class="title">Оформление заказа</p>
      <CartOrder></CartOrder>
    </div>
    <div style="width: 100%;">
      <CartTable></CartTable>
    </div>
  </div>
</template>

<style>
.cart_wrapper {
  display: flex;
  gap: 25px;
  width: 100%;
}
.order {
  background-color: #f6f6f6;
  padding: 25px;
  display: flex;
  flex-direction: column;
  width: 40%;

  .title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 50px;
  }
}
.cart_wrapper {
  width: 100%;
}
</style>
