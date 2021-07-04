<template>
  <div class="relative flex flex-col h-screen">
    <div
      class="border-b-2 border-yellow-200 h-20 p-5 flex justify-between items-center"
    >
      <div
        @click="handleNavigation"
        class="w-full transform transition-all duration-150 hover:-translate-x-2 cursor-pointer text-blue-600 hover:text-blue-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8 sm:h-9 sm:w-9"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <div class="flex justify-center w-full">
        <router-link :to="{ name: 'Home' }">
          <img
            class="w-full sm:w-10/12"
            src="@/assets/images/logo.png"
            alt="logo icon"
          />
        </router-link>
      </div>

      <div class="flex justify-end w-full">
        <div v-if="user.photoURL">
          <img
            class="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover object-center"
            :src="user.photoURL"
          />
        </div>
        <div
          v-else
          class="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover object-center text-white bg-blue-600 flex justify-center items-center"
        >
          <span class="uppercase font-bold text-lg">{{
            user.displayName[0]
          }}</span>
          <div
            v-if="_user && !_user.phone"
            class="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-600"
          ></div>
        </div>
      </div>
    </div>

    <div class="absolute left-1/2 flex flex-col h-screen items-center">
      <div
        v-if="successful"
        class="animate_animated animate__zoomIn animate_faster flex items-center justify-center fixed top-20 w-80"
      >
        <div
          class="flex w-full max-w-sm mx-auto overflow-hidden h-20 bg-white rounded shadow-md"
        >
          <div class="flex items-center justify-center w-12 bg-green-500">
            <svg
              class="animate_animated animate__bounceIn w-6 h-6 text-white fill-current"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
              />
            </svg>
          </div>

          <div class="flex justify-center items-center">
            <div class="mx-5">
              <span class="font-semibold text-green-500">
                Update successful!</span
              >
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="errorChangePassword"
        class="animate_animated animate__zoomIn animate_faster flex items-center justify-center fixed top-20 w-80"
      >
        <div
          class="flex w-full max-w-sm mx-auto overflow-hidden h-20 bg-white rounded shadow-md"
        >
          <div class="flex items-center justify-center w-12 bg-red-500">
            <svg
              class="animate_animated animate__bounceIn w-6 h-6 text-white fill-current"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
              />
            </svg>
          </div>

          <div class="flex justify-center items-center">
            <div class="mx-5">
              <p class="text-red-500">
                {{ errorChangePassword }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-5 mb-auto h-auto w-full md:w-3/4 lg:w-2/4 2xl:w-1/3 mx-auto">
      <div class="text-4xl my-16 text-gray-700 font-bold font-serif">
        <h1>
          Profile and Settings
        </h1>
      </div>

      <div class="flex space-x-10 font-mono">
        <div
          @click="showProfile = true"
          :class="{ activeProfile: showProfile }"
          class="text-gray-700 text-xl font-semibold cursor-pointer"
        >
          My Profile
        </div>

        <div
          @click="showProfile = false"
          :class="{ activeProfile: !showProfile }"
          class="text-gray-700 text-xl font-semibold cursor-pointer"
        >
          Account Settings
        </div>
      </div>

      <div v-if="showProfile" class="py-10 text-gray-500">
        <form @submit.prevent="handleAddProfileInfo">
          <div class="flex space-x-5 w-full">
            <div class="w-full">
              <label class="block">Firstname</label>
              <input
                autofocus
                v-model="firstname"
                class=" w-full p-2 border-2 border-gray-500 rounded"
                type="text"
              />
            </div>

            <div class="w-full">
              <label class="block">Lastname</label>
              <input
                v-model="lastname"
                class="w-full p-2 border-2 border-gray-500 rounded"
                type="text"
              />
            </div>
          </div>

          <div class="w-full">
            <label class="block">Username</label>
            <input
              v-model="username"
              disabled
              class="w-full p-2 border-2 border-gray-500 rounded opacity-50"
              type="text"
            />
          </div>

          <div class="w-full">
            <label class="block">Email</label>
            <input
              v-model="email"
              disabled
              class="w-full p-2 border-2 border-gray-500 rounded opacity-50"
              type="email"
            />
          </div>

          <div class="relative w-full">
            <label class="block">Phone number</label>
            <input
              v-model="phone"
              class="w-full p-2 border-2 border-gray-500 rounded"
              type="text"
            />
            <div
              v-if="_user && !_user.phone"
              class="absolute right-1 top-1/2 text-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div class="pt-5">
            <button
              v-if="!pending"
              :class="{ frozen: nothingToAddMore }"
              :disabled="nothingToAddMore"
              class="focus:outline-none py-2 px-8 shadow rounded bg-white text-purple-600 hover:bg-purple-600 hover:text-white"
            >
              Save
            </button>
            <button
              v-else
              class="relative flex justify-center items-center py-2 px-10 shadow focus:outline-none rounded tracking-wide bg-white text-purple-600"
            >
              <div>
                Saving...
              </div>
              <div class="absolute top-3 right-1">
                <div
                  class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-purple-600"
                ></div>
              </div>
            </button>
          </div>
        </form>
      </div>

      <div v-else class="py-10 text-gray-500">
        <form class="space-y-2" @submit.prevent="handleUpdateProfile">
          <label class="block">Upload Profile</label>
          <div
            id="img"
            class="w-full h-60 border-2 boder-gray-500 p-2 rounded"
          ></div>
          <div class="w-full">
            <label
              class="w-52 rounded h-20 flex flex-col items-center px-4 py-3 bg-white shadow tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150"
            >
              <span class="material-icons-outlined">
                cloud_upload
              </span>
              <span class="mt-2 text-base leading-normal">Select a file</span>
              <input @change="handleInsertImage" type="file" class="hidden" />
            </label>
            <div v-if="fileError" class="text-red-500">{{ fileError }}</div>
          </div>

          <div class="w-full">
            <label class="block">Username</label>
            <input
              v-model="username"
              class="w-full p-2 border-2 border-gray-500 rounded"
              type="text"
            />
          </div>

          <div class="w-full">
            <label class="block">Email</label>
            <input
              v-model="email"
              disabled
              class="w-full p-2 border-2 border-gray-500 rounded opacity-50"
              type="email"
            />
          </div>

          <div class="w-full">
            <label class="block">Password</label>
            <div class="flex">
              <input
                disabled
                v-model="password"
                class="w-full p-2 border-2 border-gray-500 rounded rounded-r-none"
                type="password"
              />
              <div
                class="w-12 border-2 hover:text-purple-600 border-gray-500 cursor-pointer rounded border-l-0 rounded-l-none flex justify-center items-center"
              >
                <svg
                  @click="passwordChanges = !passwordChanges"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div v-if="passwordChanges" class="w-full">
            <h3 class="text-center text-lg text-gray-700 font-semibold">
              Change Password
            </h3>
            <input
              v-model="currentPassword"
              class="w-full p-2 border-2 border-gray-500 rounded rounded-r-none"
              type="password"
              placeholder="Current password"
            />
            <label class="block">New Password</label>
            <input
              v-model="newPassword"
              class="w-full p-2 border-2 border-gray-500 rounded rounded-r-none"
              type="password"
              placeholder="New password"
            />
            <label class="block">Confirm Password</label>
            <input
              v-model="confirmPassword"
              class="w-full p-2 border-2 border-gray-500 rounded rounded-r-none"
              type="password"
              placeholder="Re-type new password"
            />
          </div>

          <div class="pt-5">
            <button
              v-if="!isPending"
              :class="{ frozen: nothingToUpdate }"
              :disabled="nothingToUpdate"
              class="focus:outline-none py-2 px-8 shadow rounded bg-white text-purple-600 hover:bg-purple-600 hover:text-white"
            >
              Save
            </button>
            <button
              v-else
              class="relative flex justify-center items-center py-2 px-10 shadow focus:outline-none rounded tracking-wide bg-white text-purple-600"
            >
              <div>
                Saving...
              </div>
              <div class="absolute top-3 right-1">
                <div
                  class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-purple-600"
                ></div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import { ref } from "@vue/reactivity";
import getUserDoc from "@/composables/getUserDoc";
import useUserDoc from "@/composables/useUserDoc";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";
import { watch, watchEffect } from "@vue/runtime-core";
import useStorage from "@/composables/useStorage";
import { projectAuth, firebase } from "@/firebase/config";

export default {
  components: {
    Footer,
  },
  setup() {
    const firstname = ref("");
    const lastname = ref("");
    const username = ref("");
    const email = ref("");
    const phone = ref("");
    const password = ref(null);
    const fileError = ref(null);
    const file = ref(null);
    const errorChangePassword = ref(null);
    const successful = ref(false);
    const passwordChanges = ref(false);
    const currentPassword = ref(null);
    const newPassword = ref(null);
    const confirmPassword = ref(null);
    const showProfile = ref(true);
    const nothingToUpdate = ref(true);
    const nothingToAddMore = ref(true);
    const isPending = ref(false);
    const pending = ref(false);

    const types = ["image/png", "image/jpg", "image/jpeg", "image/svg"];

    const router = useRouter();
    const { user } = getUser();
    const { _user } = getUserDoc("users");
    const { updateProfile } = useUserDoc("users", user.value?.uid);
    const { url, uploadImage } = useStorage();

    watch(_user, () => {
      firstname.value = _user.value.firstname;
      lastname.value = _user.value.lastname;
      username.value = user.value.displayName;
      email.value = _user.value.email;
      phone.value = _user.value.phone;
      password.value = user.value.providerId;
    });

    watchEffect(() => {
      //disabled button save for my profile
      if (
        firstname.value != _user.value?.firstname ||
        lastname.value != _user.value?.lastname ||
        phone.value != _user.value?.phone
      ) {
        nothingToAddMore.value = false;
      } else {
        nothingToAddMore.value = true;
      }

      //disabled button save for account setting
      if (
        file.value ||
        username.value != user.value?.displayName ||
        currentPassword.value
      ) {
        nothingToUpdate.value = false;
      } else {
        nothingToUpdate.value = true;
      }
    });

    const handleAddProfileInfo = async () => {
      pending.value = true;
      const profile = {
        firstname: firstname.value || null,
        lastname: lastname.value || null,
        phone: phone.value || null,
      };
      console.log(user.value.uid);
      await updateProfile(profile);

      pending.value = false;
      successful.value = true;
      setTimeout(() => {
        successful.value = false;
      }, 3000);
    };

    const handleNavigation = () => {
      router.push({ name: "Home" });
    };

    const handleInsertImage = (e) => {
      const limitedMB = 1 * 1024 * 1024; //1MB
      const selected = e.target.files[0];
      fileError.value = null;

      if (selected.size > limitedMB) {
        fileError.value = `Size of the image must be less than 1MB.`;
      } else {
        if (selected && types.includes(selected.type)) {
          //append profile to the div with id(img) immediately
          const div = document.getElementById("img");
          //check whether div has children or not
          if (div.firstChild) {
            div.removeChild(div.firstChild);
          }
          const image = document.createElement("img");
          image.style.height = "100%";
          image.style.width = "100%";
          image.style.objectFit = "cover";
          image.style.objectPosition = "center";
          image.src = URL.createObjectURL(selected);
          div.append(image);

          file.value = selected;
        } else {
          fileError.value = `Must be file of type jpg, jpeg, png, and svg are allowed.`;
          file.value = null;
        }
      }
      e.target.value = "";
    };

    const handleUpdateProfile = async () => {
      isPending.value = true;
      if (file.value) {
        await uploadImage(file.value);
      }

      if (url.value) {
        try {
          await projectAuth.currentUser.updateProfile({
            photoURL: url.value,
          });
        } catch (err) {
          errorChangePassword.value = err.message;
          setTimeout(() => {
            errorChangePassword.value = null;
          }, 4000);
        }
      }

      if (username.value != user.value.displayName) {
        try {
          await projectAuth.currentUser.updateProfile({
            displayName: username.value,
          });
          await updateProfile({ name: username.value });

          successful.value = true;
          setTimeout(() => {
            successful.value = false;
          }, 3000);
        } catch (err) {
          errorChangePassword.value = err.message;
          setTimeout(() => {
            errorChangePassword.value = null;
          }, 4000);
        }
      }

      if (
        newPassword.value &&
        confirmPassword.value &&
        newPassword.value === confirmPassword.value
      ) {
        //re-authenticate user sign-in before change user password
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.value.email,
          currentPassword.value
        );

        try {
          await projectAuth.currentUser.reauthenticateWithCredential(
            credential
          );
          await projectAuth.currentUser.updatePassword(newPassword.value);

          successful.value = true;
        } catch (err) {
          errorChangePassword.value = err.message;
          setTimeout(() => {
            errorChangePassword.value = null;
          }, 4000);
        }
      } else {
        if (newPassword.value && confirmPassword.value) {
          errorChangePassword.value = "Password confirmation doesn't match!";
          setTimeout(() => {
            errorChangePassword.value = null;
          }, 4000);
        }
      }
      isPending.value = false;
    };

    return {
      isPending,
      pending,
      firstname,
      lastname,
      username,
      email,
      phone,
      password,
      currentPassword,
      newPassword,
      confirmPassword,
      showProfile,
      fileError,
      file,
      user,
      _user,
      nothingToUpdate,
      nothingToAddMore,
      errorChangePassword,
      successful,
      passwordChanges,
      handleAddProfileInfo,
      handleNavigation,
      handleInsertImage,
      handleUpdateProfile,
    };
  },
};
</script>
