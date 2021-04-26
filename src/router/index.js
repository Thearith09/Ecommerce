import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Login from '../views/auth/Login.vue';
import Signup from '../views/auth/Signup.vue';
import Categories from "../views/Categories.vue";
import CategoryDetails from "../views/CategoryDetails.vue";
import CartDetails from "../views/CartDetails.vue";

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
    path: '/carts/addtocartDetails',
    name: 'CartDetails',
    component: CartDetails,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
