<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import BlackButton from '@/UI/BlackButton.vue'

const product = ref(null);
const sizes = ref([]);
const selectedSize = ref("");
const buttonActive = ref(true);
const route = useRoute();
const addedToCart = ref(false);
const imgLink = ref("");

const selectSize = (size) => {
  selectedSize.value = size;
  buttonActive.value = false;
};

const fetchProductSizes = async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/products/${route.params.id}/sizes`
    );
    sizes.value = response.data;

    if (response.data.length === 0) {
      buttonActive.value = false;
    }
  } catch (error) {
    console.error(error);
  }
};

const fetchProduct = async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/products/${route.params.id}`
    );
    product.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const addToCart = () => {
  const cartItem = {
    product_id: product.value.product_id,
    size: selectedSize.value,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(cartItem);
  localStorage.setItem("cart", JSON.stringify(cart));
  addedToCart.value = true;
  setTimeout(() => {
    addedToCart.value = false;
  }, 5000);

  document.dispatchEvent(new Event("updateCartItemCount"));
};

const imgActive = (image) => {
  imgLink.value = image;
};

onMounted(async () => {
  await Promise.all([fetchProduct(), fetchProductSizes()]);
  imgLink.value = product.value.image_url; // Установка изначального активного изображения
});
</script>

<template>
  <div v-if="product" class="product">

    <div class="product_img">

      <div class="img_active">
        <img :src="imgLink" alt="Product Image" />
      </div>

      <div class="img_others">
        <img
          :src="product.image_url"
          alt="Product Image"
          @click="imgActive(product.image_url)"
          :class="{ active: imgLink === product.image_url }"
        />
        <img
          :src="product.image_url_hover"
          alt="Product Image"
          @click="imgActive(product.image_url_hover)"
          :class="{ active: imgLink === product.image_url_hover }"
        />
      </div>
    </div>

    <div class="product_info">
      <h2>{{ product.title }}</h2>
      <span>{{ product.price }}₽</span>

      <div class="buttons_size" v-if="sizes.length > 0">
        <button
          v-for="size in sizes"
          :key="size"
          @click="selectSize(size)"
          :class="{ active: selectedSize === size }"
        >
          {{ size }}
        </button>
      </div>
      <div class="btn_to_cart">
        <BlackButton :disabled="buttonActive" @click="addToCart"></BlackButton>
        <p class="added_to_cart" v-if="addedToCart === true">
          Товар добавлен в корзину
        </p>
      </div>

      <p class="product_subtitle">{{ product.subtitle }}</p>
    </div>
  </div>

  <div v-else>
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
</template>

<style>
.product_img {
  display: flex;
  flex-direction: column;
}
.img_others {
  display: flex;
  gap: 5px;
  height: 100px;

  img {
    width: 100px;
    height: 100px;
  }
  .active {
    border: 1px rgb(206, 206, 206) solid;
    border-radius: 5px;
  }

}
.img_active {
  width: 400px;
  height: 400px;
  margin-bottom: 15px;
  

  img {
    width: 400px;
    height: 400px;
  }
}
.btn_to_cart {
  margin-bottom: 100px;
  display: flex;
  align-items: center;
  vertical-align: middle;
  gap: 30px;
}

.buttons_size {
  display: flex;
  gap: 15px;
}
.buttons_size button {
  font-size: 14px;
  background-color: black;
  color: white;
  padding: 7px 10px;
  font-weight: 400;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  cursor: pointer;
}
.buttons_size button.active {
  background-color: rgb(237, 0, 0);
}

.product {
  display: flex;
  justify-content: space-around;
  height: 600px;
  gap: 50px;
  width: 100%;
}
.product_info {
  display: flex;
  flex-direction: column;
  width: 600px;
}
.product_info h2 {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 30px;
}
.product_info span {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 30px;
}
.product_info p {
  font-size: 14px;
  font-weight: 300;
}
</style>
