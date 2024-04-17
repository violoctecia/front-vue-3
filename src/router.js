import { createWebHistory, createRouter } from "vue-router";
import AllProducts from "./components/Shop/AllProducts.vue";
import JeansProducts from "./components/Shop/JeansProducts.vue";
import HoodieProducts from "./components/Shop/HoodieProducts.vue";
import BagsProducts from "./components/Shop/BagsProducts.vue";
import Product from "./components/Shop/Product.vue";
import Cart from "./components/Cart/Cart.vue";
import AdminPanel from "./components/Admin/AdminPanel.vue";
import AdminAdd from "./components/Admin/AdminAdd.vue";
import AdminStore from "./components/Admin/AdminStore.vue";
import WelcomePage from "./WelcomePage.vue";

const routes = [
  
  { path: "/shop/all", component: AllProducts },
  { path: "/shop/jeans", component: JeansProducts },
  { path: "/shop/hoodie", component: HoodieProducts },
  { path: "/shop/bags", component: BagsProducts },
  {
    path: '/shop/:id',
    component: Product,
    props: true, 
  },
  { path: "/shop/cart", component: Cart },
  { path: "/admin", component: AdminPanel },
  { path: "/admin/add", component: AdminAdd },
  { path: "/admin/store", component: AdminStore },
  { path: "/", component: WelcomePage },
  { path: "/:catchAll(.*)", component: WelcomePage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
