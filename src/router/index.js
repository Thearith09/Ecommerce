import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Login from '../views/auth/Login.vue';
import Signup from '../views/auth/Signup.vue';
import Categories from "../views/Categories.vue";
import CategoryDetails from "../views/CategoryDetails.vue";
import CartDetails from "../views/CartDetails.vue";
import ProductSearching from "../views/ProductSearching.vue";
import CheckoutOrder from "../views/CheckoutOrder.vue";
import ProductDetails from "../views/ProductDetails.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/categories/:id',
    name: 'CategoryDetails',
    component: CategoryDetails,
    props: true
  },
  {
    path: '/carts/addtocart',
    name: 'CartDetails',
    component: CartDetails,
  },
  {
    path: '/products/search/:id',
    name: 'ProductSearching',
    component: ProductSearching,
    props: true
  },
  {
    path: '/orders/checkoutorder',
    name: 'CheckoutOrder',
    component: CheckoutOrder,
  },
  {
    path: '/category/products/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
