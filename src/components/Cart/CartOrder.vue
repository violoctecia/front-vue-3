<script setup>
import BlackButton from "@/UI/BlackButton.vue";
import axios from "axios";
import { ref } from "vue";

const client = ref({
  full_name: "",
  email: "",
  number: "",
  city: "",
  address: "",
  zip: "",
});
const errors = ref({});

const makeOrder = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/clients/add",
      client.value
    );

    if (response.status === 200) {
      error.value = "Заказ оформлен успешно";
    } else {
      error.value =
        response.data.message || "Произошла ошибка при оформлении заказа";
    }
  } catch (error) {
    error.value = "Произошла ошибка при обращении к серверу";
  }
};
</script>

<template>
  <div class="order_form">
    <div class="inputs">
      <p>ФИО</p>
      <input v-model="client.full_name" />
    </div>
    <div class="inputs">
      <p>Email</p>
      <input v-model="client.email" />
    </div>
    <div class="inputs">
      <p>Номер телефона</p>
      <input v-model="client.number" type="tel" />
    </div>
    <div class="inputs">
      <p>Город</p>
      <input v-model="client.city" />
    </div>
    <div class="inputs">
      <p>Адрес доставки</p>
      <input v-model="client.address" />
    </div>
    <div class="inputs">
      <p>Индекс</p>
      <input v-model="client.zip" />
    </div>

    <div class="error-list" v-if="Object.keys(errors).length">
    <ul>
      <li v-for="error in errors" :key="error">
        {{ error }}
      </li>
    </ul>
  </div>

    <BlackButton buttonText="Оформить заказ" @click="makeOrder"> </BlackButton>
  </div>
</template>

<style scoped>
span {
  color: red;
}
.order_form {
  display: flex;
  flex-direction: column;
  gap: 25px;
  text-align: left;
}
.inputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
button {
  margin-top: 20px;
}
p {
  font-weight: 400;
  font-size: 14px;
}
input {
  background-color: white;
  padding: 8px 15px;
  border-radius: 5px;
  font-weight: 400;
  font-size: 14px;
}
</style>
