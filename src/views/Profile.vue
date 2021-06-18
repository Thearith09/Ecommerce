<template>
  <div class="relative flex flex-col h-screen">
    <div class="relative flex flex-col h-screen items-center">
      <div
        v-if="successful"
        class="animate_animated animate__bounceIn animate_faster fixed top-0 w-60 h-auto p-5 bg-green-500 bg-opacity-80 rounded"
      >
        <p class="text-white text-center">
          Update successful!
        </p>
      </div>
      <div
        v-if="errorChangePassword"
        class="animate_animated animate__bounceIn animate__zoomIn animate__faster fixed top-0 w-60 h-auto bg-red-600 bg-opacity-80 rounded p-5"
      >
        <p class="text-white">
          {{ errorChangePassword }}
        </p>
      </div>
    </div>

    <div class="p-5 mb-auto h-auto w-full md:w-3/4 lg:w-2/4 2xl:w-1/3 mx-auto">
      <div class="text-4xl my-16 text-gray-700 font-bold">
        <div class="w-full h-12 bg-gray-100">
          <div
            @click="handleNavigation"
            class="flex items-center font-mono transform transition hover:-translate-x-1 h-full w-20 cursor-pointer text-gray-500 hover:text-gray-700 text-lg "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="">Back</span>
          </div>
        </div>
        <h1 class="font-mono">
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
              class="w-full p-2 border-2 border-gray-500 rounded"
              type="text"
            />
          </div>

          <div class="w-full">
            <label class="block">Email</label>
            <input
              v-model="email"
              disabled
              class="w-full p-2 border-2 border-gray-500 rounded"
              type="email"
            />
          </div>

          <div class="w-full">
            <label class="block">Phone number</label>
            <input
              v-model="phone"
              class="w-full p-2 border-2 border-gray-500 rounded"
              type="text"
            />
          </div>

          <div class="pt-5">
            <button
              class="focus:outline-none py-2 px-8 shadow rounded text-white bg-pink-500 hover:bg-pink-700 font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div v-else class="py-10 text-gray-500">
        <form class="space-y-2" @submit.prevent="handleUpdateProfile">
          <label class="block">Upload Profile</label>
          <div id="img" class="w-full h-60 border-2 boder-gray-500 p-2"></div>
          <div class="w-full">
            <input
              @change="handleInsertImage"
              type="file"
              placeholder="Upload Profile"
            />
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
              class="w-full p-2 border-2 border-gray-500 rounded"
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
                class="w-12 border-2 hover:text-pink-700 border-gray-500 cursor-pointer rounded border-l-0 rounded-l-none flex justify-center items-center"
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
              class="focus:outline-none py-2 px-8 shadow rounded text-white bg-pink-500 hover:bg-pink-700 font-semibold"
            >
              Save
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
import { watch } from "@vue/runtime-core";
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

    const handleAddProfileInfo = async () => {
      const profile = {
        firstname: firstname.value,
        lastname: lastname.value,
        name: username.value,
        email: email.value,
        phone: phone.value,
      };

      await updateProfile(profile);

      successful.value = true;
      setTimeout(() => {
        successful.value = false;
      }, 2000);
    };

    const handleNavigation = () => {
      router.push({ name: "Home" });
    };

    const handleInsertImage = (e) => {
      const limitedMB = 1048576; //1MB
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
          }, 3000);
        }
      }

      if (username.value) {
        try {
          await projectAuth.currentUser.updateProfile({
            displayName: username.value,
          });
          successful.value = true;
          setTimeout(() => {
            successful.value = false;
          }, 2000);
        } catch (err) {
          errorChangePassword.value = err.message;
          setTimeout(() => {
            errorChangePassword.value = null;
          }, 3000);
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
          setTimeout(() => {
            successful.value = false;
          }, 2000);
        } catch (err) {
          errorChangePassword.value = err.message;
          setTimeout(() => {
            errorChangePassword.value = null;
          }, 3000);
        }
      } else {
        if (newPassword.value && confirmPassword.value) {
          errorChangePassword.value = "Password confirmation doesn't match!";
          setTimeout(() => {
            errorChangePassword.value = null;
          }, 3000);
        }
      }
    };

    return {
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
