<script setup>
import { ref } from "vue";
import axios from "axios";

const items = ref([]);

const fetchItems = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/products");
    items.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const removeProduct = async (index) => {
  try {
    const productId = items.value[index].product_id;
    await axios.delete(`http://127.0.0.1:8000/api/products/${productId}`);
    items.value.splice(index, 1);
    fetchItems();
  } catch (error) {
    console.error("Error removing product:", error);
  }
};

fetchItems();
import AdminMenu from "@/components/Admin/AdminMenu.vue";
</script>

<template>
  <div class="admin_add">
    <AdminMenu></AdminMenu>
    <div class="products_store">
      <p>Товары:</p>
      <div class="product" v-for="(item, index) in items" :key="index">
        <div class="product_imgs">
          <img :src="item.image_url" alt="Product Image" />
          <img :src="item.image_url_hover" alt="Product Image" />
        </div>
        <div class="product_info">
          <p>
            ID: <b>{{ item.product_id }}</b>
          </p>
          <p>
            Название: <b>{{ item.title }}</b>
          </p>
          <p>
            Описание: <b>{{ item.subtitle }}</b>
          </p>
          <p>
            Цена: <b>{{ item.price }}₽</b>
          </p>
          <p>
            Категория: <b> {{ item.category }}</b>
          </p>
        </div>
        <button @click="removeProduct(index)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            class="delete_order"
            viewBox="0 0 50 50"
          >
            <path
              d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button svg {
  width: 15px;
  height: 15px;
}
.products_store {
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 15px;
  }
}
.product {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  height: 150px;
  padding: 10px;
  border: 1px rgb(187, 187, 187) solid;
}
.product_imgs {
  height: 130px;
  width: 265px;
  display: flex;
  gap: 5px;

  img {
    width: 130px;
    height: 130px;
  }
}
.product_info {
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 0;

    b {
      font-weight: 500;
    }
  }
}
</style>
