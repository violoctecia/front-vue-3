<script setup>
import { ref } from "vue";
import axios from "axios";

const product = ref({
  title: "",
  price: "",
  subtitle: "",
  category: "",
  image1: null,
  image2: null,
});
const message = ref("");

const onFileChange1 = (event) => {
  product.value.image1 = event.target.files[0];
};

const onFileChange2 = (event) => {
  product.value.image2 = event.target.files[0];
};

const submitProduct = async () => {
  const formData = new FormData();
  formData.append("title", product.value.title);
  formData.append("price", product.value.price);
  formData.append("subtitle", product.value.subtitle);
  formData.append("category", product.value.category);
  formData.append("image", product.value.image1);
  formData.append("image_hover", product.value.image2);

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/admin/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Product added:", response.data);
    message.value = "Товар успешно добавлен";
  } catch (error) {
    console.error("Error adding product:", error);
    message.value = "Ошибка";
  }
};

const categories = [
  { id: 1, name: "Jeans" },
  { id: 2, name: "Hoodie" },
  { id: 3, name: "Bags" },
];
import AdminMenu from "@/components/Admin/AdminMenu.vue";
</script>

<template>
  <div class="admin_add">
    <AdminMenu></AdminMenu>
    <div class="add_product">
      <h2>Добавить товар</h2>
      <div class="inputs">
        <p>Введите название</p>
        <input v-model="product.title" />
      </div>
      <div class="inputs">
        <p>Цена товара</p>
        <input v-model="product.price" />
      </div>
      <div class="inputs">
        <p>Описание товара</p>
        <input v-model="product.subtitle" />
      </div>
      <div class="inputs">
        <p>Категория товара</p>
        <select v-model="product.category">
          <option disabled value="">выбрать из списка</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.name"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="inputs">
        <p>Загрузите 1 изображение</p>
        <input type="file" @change="onFileChange1" />

        <p>Загрузите 2 изображение</p>
        <input type="file" @change="onFileChange2" />
      </div>

      <button @click="submitProduct">Добавить</button>
      {{ message }}
    </div>
  </div>
</template>

<style scoped>

.inputs {
  font-weight: 400;
  display: flex;
  flex-direction: column;
  gap: 10px;

  select {
    border: 1px rgb(195, 195, 195) solid;
    padding: 5px 15px;
    border-radius: 8px;
  }

  span {
    font-weight: 300;
  }
}

.add_product {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
  padding: 15px;
  background-color: #f6f6f6;

  h2 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 15px;
  }
  input {
    border: 1px rgb(195, 195, 195) solid;
    padding: 5px 15px;
    border-radius: 8px;
  }
  input[type="file"] {
    padding: 0;
    border-radius: 0;
    border: 0;
  }
  button {
    background-color: rgb(110, 110, 236);
    padding: 5px 15px;
    border-radius: 8px;
    text-align: center;
    color: white;
  }
}
</style>
