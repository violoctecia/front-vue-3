<script setup>
import axios from 'axios';
import { ref } from 'vue';
import router from '@/router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const login = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email: email.value,
      password: password.value,
    });
    const maxAgeSeconds = 2 * 60 * 60; 
    document.cookie = `user=${email.value}; max-age=${maxAgeSeconds}; path=/`;
    router.push('/shop/welcome');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Неверный email или пароль';
    } else {
      console.error(error); 
    }
  }
}
</script>

<template>
  <form @submit.prevent="login">
    <h1>Вход</h1>
    <div class="input_area">
      <p>Email</p>
      <input type="email" name="email" v-model="email">
    </div>
    <div class="input_area">
      <p>Пароль</p>
      <input type="password" name="password" v-model="password">
    </div>
    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    <input type="submit" class="submit" value="Вход">
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