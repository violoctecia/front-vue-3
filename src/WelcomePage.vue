<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { ref } from "vue";

const carouselItems = ref([
  { image: "https://www.maisonmargiela.com/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-margiela-master-catalog/default/dw036dfb87/images/large/S67HL0010_M13031_859M_R.jpg?sw=1024&q=80" },
    { image: "https://www.maisonmargiela.com/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-margiela-master-catalog/default/dw036dfb87/images/large/S67HL0010_M13031_859M_R.jpg?sw=1024&q=80" },
    { image: "https://www.maisonmargiela.com/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-margiela-master-catalog/default/dw036dfb87/images/large/S67HL0010_M13031_859M_R.jpg?sw=1024&q=80" },


]);

</script>

<template>
  <div class="welcomepage">
    <Carousel :autoplay="3500" :wrapAround="true">
      <Slide v-for="(item, index) in carouselItems" :key="index">
        <div class="carousel__item">
          <img :src="item.image" alt="Slide Image" height="400px"/>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
.welcomepage {
  width: 100%;
}
.carousel__item {
  min-height: 400px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
