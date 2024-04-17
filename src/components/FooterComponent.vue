<script setup></script>

<template>
  <div class="footer">
    <div class="container">
      <p>
        Explore our collection and shop now for the latest trends and best deals. Follow us on social media for updates and promotions. Need help? Contact our customer support team. 
      </p>
      <p>© [Year] [Your Company Name].</p>
    </div>
  </div>
</template>

<style scoped>
.footer {
  background-color: rgb(55, 55, 55);
  color: rgb(255, 255, 255);
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  margin-top: 100px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 40px 0px;

  p {
    width: 50%;
  }

  .info {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    p {
      width: 100%;
    }
  }
}
</style>
