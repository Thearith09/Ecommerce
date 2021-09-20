<template>
  <div class="flex flex-col h-screen bg-white w-full">
    <div>
      <Navbar />
    </div>

    <div class="relative mb-auto m-10 2xl:w-3/4 2xl:mx-auto ">
      <!--Alert for reseting password-->
      <div
        v-if="sent"
        class="animate_animated animate__zoomIn animate__delay-2 flex justify-center items-center w-full mb-5 z-20"
      >
        <div
          class="flex w-full max-w-sm mx-auto overflow-hidden h-24 bg-white rounded  shadow-2xl"
        >
          <div class="flex items-center justify-center w-28 bg-blue-500">
            <svg
              class="animate_animated animate__bounceIn w-6 h-6 text-white fill-current"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"
              />
            </svg>
          </div>

          <div class="flex justify-center items-center">
            <div class="mx-5">
              <p class="text-sm text-blue-600 font-bold dark:text-gray-200">
                We've been sent a link to reset your account password in your
                email box!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="!reset"
        class="bg-white w-full sm:w-10/12 md:w-8/12 lg:w-7/12 2xl:w-6/12 shadow-2xl px-5 py-10 mx-auto rounded"
      >
        <h3
          class="text-purple-700 font-bold tracking-wide font-mono text-center mb-5"
        >
          Signin Form
        </h3>
        <form @submit.prevent="handleLogin" class="space-y-5 md:mr-2">
          <div class="space-y-8">
            <div class="group relative w-full z-0">
              <input
                v-model="email"
                type="email"
                name="email"
                placeholder=" "
                required
                class="pb-1 block w-full border-b-2 focus:outline-none bg-transparent focus:ring-0 focus:border-purple-700 border-purple-100"
              />
              <label
                for="email"
                class="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
                >Enter email</label
              >
            </div>
            <div class="text-right">
              <div class="relative w-full text-left z-0">
                <input
                  v-model="password"
                  type="password"
                  placeholder=" "
                  required
                  class="pb-1 block w-full border-b-2 focus:outline-none bg-transparent focus:ring-0 focus:border-purple-700 border-purple-100"
                />
                <label
                  for="password"
                  class="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
                  >Enter password</label
                >
              </div>
              <label
                @click="reset = !reset"
                class="text-gray-500 hover:text-purple-700 cursor-pointer text-sm"
              >
                forgot password?
              </label>
            </div>
          </div>

          <label v-if="err" class="text-red-600 text-sm">{{ err }}</label>

          <div>
            <button
              v-if="!isPending"
              class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-purple-700 rounded-full shadow p-2 tracking-wide hover:text-purple-900 bg-white text-purple-700 w-full"
            >
              sign in
            </button>

            <button
              v-else
              class="relative flex justify-center items-center focus:outline-none rounded-full shadow p-2 tracking-wide bg-white text-purple-700 w-full"
            >
              <div>
                signing in...
              </div>
              <div class="absolute top-3 right-2">
                <div
                  class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-purple-700"
                ></div>
              </div>
            </button>
          </div>
        </form>
        <div class="flex flex-col justify-center items-center my-5 space-y-1">
          <div class="text-gray-700">Or sign in with</div>
          <div class="flex space-x-2">
            <div>
              <img
                @click="handleLoginWithFacebook"
                class="bg-white shadow-md hover:shadow rounded-full w-9 h-9 p-2 cursor-pointer"
                src="@/assets/images/fb1.png"
                alt="facebook icon"
              />
            </div>
            <div>
              <img
                @click="handleLoginWithGoogle"
                class="bg-white shadow-md hover:shadow rounded-full w-9 h-9 p-2 cursor-pointer"
                src="@/assets/images/gg1.png"
                alt="google icon"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <p class="text-gray-800 font-thin">
            doesn't have account yet?<span
              @click="handleNavigation"
              class="ml-2 font-semibold text-purple-700 underline cursor-pointer hover:text-purple-900"
              >signup</span
            >
          </p>
        </div>
      </div>
      <div
        v-else
        class="bg-white px-5 py-10 w-full sm:w-10/12 md:w-8/12 lg:w-7/12 2xl:w-6/12 shadow-2xl mx-auto rounded"
      >
        <div class="flex space-x-12 sm:space-x-20">
          <svg
            @click="reset = !reset"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-purple-700 cursor-pointer transform transition-all hover:-translate-x-1 duration-150"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>

          <h3
            class="text-purple-700 tracking-wide font-bold text-center mb-5 font-mono"
          >
            Reset password
          </h3>
        </div>
        <form @submit.prevent="handleResetPassword" class="space-y-6 md:mr-2">
          <div class="group relative w-full z-0">
            <input
              v-model="email"
              type="email"
              name="email"
              placeholder=" "
              required
              class="pb-1 block w-full border-b-2 focus:outline-none bg-transparent focus:ring-0 focus:border-purple-700 border-purple-100"
            />
            <label
              for="email"
              class="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
              >Enter email</label
            >
          </div>
          <button
            class="focus:outline-none focus:ring focus:ring-offset-2 focus:ring-purple-700 rounded-full shadow p-2 tracking-wide hover:text-purple-900 bg-white text-purple-700 w-full"
          >
            send reset link
          </button>
        </form>
      </div>
    </div>
    <div class="mt-5">
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useLogin from "@/composables/useLogin";
import useResetPassword from "@/composables/useResetPassword";
import getDocument from "@/composables/getDocument";
import getCollection from "@/composables/getCollection";
import useCollection from "@/composables/useCollection";
import useDocument from "@/composables/useDocument";
import useGoogleLogin from "@/composables/useGoogleLogin";
import useFacebookLogin from "@/composables/useFacebookLogin";
import { useRouter } from "vue-router";
import { firebase, timestamp, projectAuth } from "@/firebase/config";
import { ref } from "@vue/reactivity";
import { onMounted, watch, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const windowWidth = ref(window.innerWidth);
    const reset = ref(false);
    const sent = ref(false);
    const err = ref(null);

    const store = useStore();
    const { error, login, isPending } = useLogin();
    const { addUser } = useCollection("users");
    const { documents: users } = getCollection("users");

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    const handleNavigation = () => {
      router.push({ name: "Signup" });
    };

    const sendItemsToCartOnceUserSignin = (user) => {
      const { documents: cart } = getDocument("carts", user.uid, "items");
      const { updateDoc, addDoc } = useDocument("carts", user.uid, "items");
      const { documents: whistlist } = getDocument(
        "whistlist",
        user.uid,
        "items"
      );
      const { addDoc: addToWhistlist } = useDocument(
        "whistlist",
        user.uid,
        "items"
      );

      const unwatchCart = watch(cart, async () => {
        //if there are items in temporary cart, push it to user account
        unwatchCart(); //watch only once
        if (cart.value?.length > 0) {
          store.state.cart.forEach(async (item) => {
            //check whether item already add to card or not yet
            let exist = false;
            cart.value.forEach(async (element) => {
              if (item.name === element.name) {
                exist = true;
                element.qty += item.qty;
                element.color = item.color;
                element.size = item.size;
                await updateDoc(element);
              }
            });

            if (!exist) {
              await addDoc(item);
            }
          });
        } else {
          for (let item of store.state.cart) {
            await addDoc(item);
          }
        }
        store.commit("clearCart");
      });

      //apply the same technique as cart for whistlist
      const unwatchWhistlist = watch(whistlist, async () => {
        unwatchWhistlist();

        if (whistlist.value?.length > 0) {
          store.state.whistlist.forEach(async (element) => {
            let exist = false;
            whistlist.value.forEach((item) => {
              if (item.name == element.name) {
                exist = true;
              }
            });

            if (!exist) {
              await addToWhistlist(element);
            }
          });
        } else {
          for (let element of store.state.whistlist) {
            await addToWhistlist(element);
          }
        }

        store.commit("clearWhistlist");
      });

      if (store.state.cart.length <= 0 || store.state.whistlist.length <= 0) {
        router.push({ name: "Home" });
      }
    };

    const handleLogin = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        if (res.user?.emailVerified) {
          sendItemsToCartOnceUserSignin(res.user);
        } else {
          err.value = "Please verify your email!";
        }
      } else {
        err.value = "Incorrect email or password!";
      }
    };

    const handleResetPassword = async () => {
      const { resetPassword, error } = useResetPassword();

      await resetPassword(email.value);

      if (error.value) {
        err.value = error.value;
      } else {
        sent.value = true;
        reset.value = !reset.value;
        email.value = "";
        password.value = "";
        err.value = null;
        setTimeout(() => {
          sent.value = false;
        }, 4000);
      }
    };

    const handleLoginWithGoogle = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      const { error, googleLogin } = useGoogleLogin();
      const { user, accessToken } = await googleLogin(provider);
      if (!error.value) {
        if (user.emailVerified) {
          let existedUser = false;
          users?.value.forEach((doc) => {
            if (doc.id == user.uid) existedUser = true;
          });

          //check whether user exist or not yet, prevent user-info from resetting
          if (!existedUser) {
            await addUser(user.uid, {
              name: user.displayName,
              email: user.email,
              createdAt: timestamp(),
            });
          }
          sendItemsToCartOnceUserSignin(user);
        } else {
          err.value = "Your email doesnt' exist!";
        }
      } else {
        err.value = error.value;
      }
    };

    const handleLoginWithFacebook = async () => {
      const provider = new firebase.auth.FacebookAuthProvider();
      const { error, facebookLogin } = useFacebookLogin();
      const { user, accessToken } = await facebookLogin(provider);

      if (!error.value) {
        await user.sendEmailVerification();

        let existedUser = false;
        users?.value.forEach((doc) => {
          if (doc.id == user.uid) existedUser = true;
        });

        //check whether user exist or not yet, prevent user-info from resetting
        if (!existedUser) {
          await addUser(user.uid, {
            name: user.displayName,
            email: user.email,
            createdAt: timestamp(),
          });
        }
        sendItemsToCartOnceUserSignin(user);
      } else {
        err.value = error.value;
      }
    };

    return {
      handleNavigation,
      handleLogin,
      handleResetPassword,
      handleLoginWithGoogle,
      handleLoginWithFacebook,
      email,
      password,
      err,
      isPending,
      windowWidth,
      reset,
      sent,
    };
  },
};
</script>

<style scoped>
.origin-0 {
  transform-origin: 0%;
}
.-z-1 {
  z-index: -1;
}

input:focus ~ label,
input:not(:placeholder-shown) ~ label,
textarea:focus ~ label,
textarea:not(:placeholder-shown) ~ label,
select:focus ~ label,
select:not([value=""]):valid ~ label {
  /* @apply transform; scale-75; -translate-y-6; */
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  --tw-scale-x: 0.75;
  --tw-scale-y: 0.75;
  --tw-translate-y: -1.3rem;
}
input:focus ~ label,
select:focus ~ label {
  /* @apply text-black; left-0; */
  --tw-text-opacity: 1;
  color: rgba(124, 58, 237, var(--tw-text-opacity));
  left: 0px;
  z-index: 10;
}
</style>
