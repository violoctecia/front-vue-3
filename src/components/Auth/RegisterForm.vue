<script setup>
import axios from 'axios';
import { ref } from 'vue';
import router from '@/router';

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const errorMessage = ref('');


const register = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/store', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });
    router.push('/login');
  } catch (error) {
    if (error.response && error.response.status === 422) {
      errorMessage.value = 'Заполните поля корректно';
    } else if (error.response && error.response.status === 500) {
      errorMessage.value = 'Email уже использован';
    }
  }
}
</script>

<template>
  <form @submit.prevent="register">
    <h1>Регистрация</h1>
    <div class="input_area">
      <p>Имя</p>
      <input type="name" name="name" v-model="name" />
    </div>
    <div class="input_area">
      <p>Почта</p>
      <input type="email" name="email" v-model="email" />
    </div>
    <div class="input_area">
      <p>Пароль</p>
      <input type="password" name="password" v-model="password" />
    </div>
    <div class="input_area">
      <p>Повторите пароль</p>
      <input
        type="password"
        name="password_confirmation"
        v-model="password_confirmation"
      />
    </div>
    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    <input type="submit" class="submit" value="Зарегистрироваться" />
  </form>
</template>

<style scoped>
.error {
  color: red;
}
form {
  background: rgb(244 244 244);
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 25px;
  gap: 20px;
  border-radius: 15px;
}
h1 {
  font-size: 20px;
  display: flex;
  justify-content: center;
}
p {
  font-size: 16px;
}
.input_area {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
input {
  border-radius: 8px;
  border: 1px rgba(182, 182, 182, 0.64) solid;
  font-size: 14px;
  padding: 8px 10px;
  width: 100%;
}
.submit {
  border-radius: 8px;
  border: 1px rgba(182, 182, 182, 0.64) solid;
  font-size: 16px;
  padding: 8px 10px;
  width: 100%;
  background: #4d7dff;
  color: white;
  text-align: center;
}
.submit:hover {
  background: #3269fc;
}
</style>
