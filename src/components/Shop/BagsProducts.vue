<script setup>
import { ref } from "vue";
import axios from "axios";

const items = ref([]);
const isLoading = ref(true);

const fetchItems = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/products/bags");
    items.value = response.data;
    isLoading.value = false;
    console.log(items._value.length);
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }
};

fetchItems();

const sortItems = (event) => {
  const value = event.target.value;
  if (value === "asc") {
    sortByPriceAsc();
  } else if (value === "desc") {
    sortByPriceDesc();
  }
};

const sortByPriceAsc = () => {
  items.value.sort((a, b) => a.price - b.price);
};

const sortByPriceDesc = () => {
  items.value.sort((a, b) => b.price - a.price);
};
</script>

<template>
  <div class="products_wrapper">
    <div class="products_settings">
      <p>Найдено товаров: {{ items.length }}</p>
      <div class="products_filter">
        Сортировать по:
        <select @change="sortItems" class="sort-select">
          <option value="desc">убыванию цены</option>
          <option value="asc">возрастанию цены</option>
         
        </select>
      </div>
    </div>

    <div v-if="isLoading" class="catalog-item">
      <svg
        version="1.1"
        id="L9"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enable-background="new 0 0 0 0"
        xml:space="preserve"
      >
        <path
          fill="#fff"
          d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>

    <div v-else class="catalog">
      <router-link
        v-for="(item, index) in items"
        :key="index"
        :to="`/shop/${item.product_id}`"
        class="catalog-item"
        @mouseenter="item.isHovered = true"
        @mouseleave="item.isHovered = false"
      >
        <img
          :src="item.isHovered ? item.image_url_hover : item.image_url"
          alt="Product Image"
        />
        <h2>{{ item.title }}</h2>
        <span>{{ item.price }}₽</span>
        <p>{{ item.subtitle }}</p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.products_settings {
  display: flex;
  justify-content: space-between;
  p {
    color: #696969;
  }
}
.products_filter {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}
.products_filter select {
  color: #696969;
  padding: 0px 10px;
  border: 0;
  border-bottom: #cacaca 1px solid;
  font-size: 16px;
}


.products_wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.catalog {
  display: grid;
  grid-template-columns: repeat(4, 300px);
}
.catalog-item {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 15px;
  cursor: pointer;
}
.catalog-item img {
  margin-bottom: 15px;
  width: 300px;
  height: 300px;
}
.catalog-item h2 {
  font-size: 18px;
  font-weight: 500;
}
.catalog-item span {
  font-size: 16px;
  font-weight: 700;
}
.catalog-item p {
  font-size: 14px;
  font-weight: 300;
}
</style>
