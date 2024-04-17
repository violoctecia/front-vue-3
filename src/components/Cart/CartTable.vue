<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const cartItems = ref(JSON.parse(localStorage.getItem("cart")) || []);
const products = ref([]);

const fetchProducts = async () => {
  try {
    const promises = cartItems.value.map((item) =>
      axios.get(`http://127.0.0.1:8000/api/products/${item.product_id}`)
    );
    const responses = await Promise.all(promises);
    products.value = responses.map((response) => response.data);
    console.log(products.value.filter((item) => typeof item === "object"));
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchProducts();
});

const getProductById = (product_id) => {
  return products.value.find((product) => product.product_id === product_id);
};

const getProductTitle = (product_id) => {
  const product = getProductById(product_id);
  return product ? product.title : "";
};

const getProductPrice = (product_id) => {
  const product = getProductById(product_id);
  return product ? product.price : "";
};

const getProductImg = (product_id) => {
  const product = getProductById(product_id);
  return product ? product.image_url : "";
};

const removeFromCart = (index) => {
  cartItems.value.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems.value));
  document.dispatchEvent(new Event("updateCartItemCount"));
};

const getTotalPrice = () => {
  let totalPrice = 0;
  cartItems.value.forEach((item) => {
    const product = products.value.find(
      (product) => product.product_id === item.product_id
    );
    if (product) {
      totalPrice += parseFloat(product.price);
    }
  });
  return totalPrice.toFixed(2);
};
</script>

<template>

<table>
      <thead>
        <tr>
          <th class="table-img"></th>
          <th>Товар</th>
          <th>Размер</th>
          <th>Цена</th>
          <th class="remove"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItems" :key="index">
          <td class="img">
            <img
              style="height: 120px"
              :src="getProductImg(item.product_id)"
              alt="Product Image"
              loading="lazy"
            />
          </td>
          <td>{{ getProductTitle(item.product_id) }}</td>
          <td>{{ item.size }}</td>
          <td>{{ getProductPrice(item.product_id) }}₽</td>
          <td class="remove">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              class="delete_order"
              viewBox="0 0 50 50"
              @click="removeFromCart(index)"
            >
              <path
                d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
              ></path>
            </svg>
          </td>
        </tr>
      </tbody>
    </table>

</template>

<style scoped>

.delete_order {
  width: 15px;
  height: 15px;
  cursor: pointer;
}
.remove {
  text-align: center;
}

.img {
  display: flex;
  justify-content: center;
  align-items: center;
}
table {
  border: 1px solid #f6f6f6;
  font-size: 14px;
  width: 100%;
}
th,
td {
  padding: 10px;
}

td {
  height: 100px;
  vertical-align: middle;
}
th {
  height: 40px;
  background-color: #f6f6f6;
}

</style>
