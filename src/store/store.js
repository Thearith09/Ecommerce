//https://github.com/robinvdvleuten/vuex-persistedstate
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

const store = createStore({
  state: {
    cart: [],
    whistlist: [],
    sessionID: null,
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => Cookies.get(key),
        // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, value) =>
          Cookies.set(key, value, { expires: 7, secure: true }),
        removeItem: (key) => Cookies.remove(key),
      },
    }),
  ],
  mutations: {
    setSessionId(state, id) {
      state.sessionID = id;
    },
    removeSessionId(state) {
      state.sessionID = null;
    },
    addToCart(state, item) {
      let exist = false;
      if (state.cart.length > 0) {
        for (let element of state.cart) {
          if (item.name == element.name) {
            exist = true;
            element.qty += item.qty;
            element.size = item.size;
            element.color = item.color;
          }
        }
        if (!exist) {
          state.cart.push(item);
        }
      } else {
        state.cart.push(item);
      }
    },
    updateToCart(state, item) {
      for (let element of state.cart) {
        if (item.name == element.name) {
          element.qty = item.qty;
        }
      }
    },
    removeFromCart(state, name) {
      if (state.cart.length > 0) {
        const index = state.cart.findIndex((element) => element.name == name);
        state.cart.splice(index, 1);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
    addToWhistlist(state, item) {
      state.whistlist.push(item);
    },
    removeFromWhistlist(state, name) {
      if (state.whistlist.length > 0) {
        const index = state.whistlist.findIndex(
          (element) => element.name == name
        );
        state.whistlist.splice(index, 1);
      }
    },
    clearWhistlist(state) {
      state.whistlist = [];
    },
  },
});
export default store;
