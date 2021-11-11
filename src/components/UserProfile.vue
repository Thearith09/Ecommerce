<template>
  <div class="mb-auto h-auto py-10 px-10 lg:px-0 w-full lg:w-9/12 mx-auto">
    <div v-if="!isCustomer" class="pb-3">
      <div
        class="relative flex space-x-1 text-gray-500 font-medium text-sm pb-2"
      >
        <p
          @click="handleSwitchingComponent('Dashboard')"
          class="hover:underline cursor-pointer"
        >
          Dashboard
        </p>
        <p>/</p>
        <p v-if="showProfile">My Profile</p>
        <p
          v-if="!showProfile"
          @click="showProfile = true"
          class="hover:underline cursor-pointer"
        >
          My Profile
        </p>
        <div v-if="!showProfile" class="flex space-x-1">
          <p>/</p>
          <p>Account Settings</p>
        </div>
      </div>
      <div class="font-bold text-xl font-serif text-gray-900">
        {{ showProfile ? "My Profile" : "Account Settings" }}
      </div>
    </div>
    <div
      v-else
      class="bg-yellow-300 p-5 mb-10 text-3xl font-serif font-bold text-gray-900"
    >
      My Profile
    </div>
    <div v-if="showProfile" class="text-gray-500 flex">
      <div
        class="relative bg-white shadow border w-full p-10 rounded flex flex-col items-center space-y-3"
      >
        <div
          @click="showProfile = false"
          class="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-purple-700 hover:bg-purple-100 p-2 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div>
          <img
            class="rounded-full border-4 border-purple-600 w-28 h-28 object-cover object-center block overflow-hidden"
            :src="user.photoURL"
            alt=""
          />
        </div>
        <p class="text-lg font-mono font-semibold text-gray-700">
          {{ firstname }} {{ lastname }}
        </p>
        <p class="font-mono text-purple-700 leading-3">
          {{ email }}
        </p>
        <p class="font-mono text-gray-700 leading-3">
          {{ _user?.phone }}
        </p>

        <form
          @submit.prevent="handleAddProfileInfo"
          class="w-full space-y-1 pt-5"
        >
          <div class="flex space-x-5 w-full">
            <div class="w-full">
              <label class="block text-sm">Firstname</label>
              <input
                v-model="firstname"
                class="w-full p-2 border rounded hover:shadow hover:border-gray-300 focus:shadow focus:border-gray-300 focus:outline-none"
                type="text"
              />
            </div>

            <div class="w-full">
              <label class="block text-sm">Lastname</label>
              <input
                v-model="lastname"
                class="w-full p-2 border rounded hover:shadow hover:border-gray-300 focus:shadow focus:border-gray-300 focus:outline-none"
                type="text"
              />
            </div>
          </div>

          <div class="w-full">
            <label class="block text-sm">Username</label>
            <input
              v-model="username"
              disabled
              class="w-full p-2 opacity-70 border border-gray-300 rounded cursor-not-allowed"
              type="text"
            />
          </div>

          <div class="w-full">
            <label class="block text-sm">Email</label>
            <input
              v-model="email"
              disabled
              class="w-full p-2 opacity-70 border border-gray-300 rounded cursor-not-allowed"
              type="email"
            />
          </div>

          <div class="relative w-full">
            <label class="block text-sm">Phone number</label>
            <input
              v-model="phone"
              autofocus
              placeholder="phone number"
              class="w-full p-2 border rounded hover:shadow hover:border-gray-300 focus:shadow focus:border-gray-300 focus:outline-none"
              type="text"
            />
            <div
              v-if="_user && !_user.phone"
              class="group absolute right-1 top-1/2 text-red-600"
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
              <div
                class="absolute -top-7 -right-2 w-52 hidden group-hover:block text-sm"
              >
                please enter your phone number
              </div>
            </div>
          </div>

          <div v-if="!successful" class="pt-3 flex space-x-5 items-center">
            <button
              v-if="!pending"
              :class="{ frozen: nothingToAddMore }"
              :disabled="nothingToAddMore"
              class="focus:outline-none py-2 px-16 rounded bg-white border border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
            >
              Save Info
            </button>
            <button
              v-else
              class="relative flex justify-center items-center py-2 px-16 focus:outline-none cursor-wait border border-purple-700 rounded tracking-wide bg-white text-purple-700"
            >
              <div>
                Saving...
              </div>
              <div class="absolute top-3 right-1">
                <div
                  class="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-purple-700"
                ></div>
              </div>
            </button>
          </div>
          <div v-else class="pt-3">
            <button
              class="flex justify-center items-center py-1 px-20 rounded bg-green-400 bg-opacity-80 focus:outline-none tracking-wide border"
            >
              <svg
                class="animate_animated animate__bounceIn animate__delay-2s text-white h-9 w-9 p-px rounded-full fill-current"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-else
      class="relative p-5 lg:p-10 text-gray-500 bg-white shadow rounded border"
    >
      <div
        @click="showProfile = true"
        class="absolute top-3 left-3 text-gray-700 hover:text-purple-700 flex items-center cursor-pointer hover:-translate-x-1 transform transition-all duration-150"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-7"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="text-lg font-semibold font-mono">Back</span>
      </div>
      <form
        class="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5"
        @submit.prevent="handleUpdateProfile"
      >
        <div class="w-full max-w-xl">
          <label
            class="block text-center text-lg pb-3 text-gray-700 font-semibold font-mono"
            >Update Profile</label
          >

          <div class="w-full pt-1">
            <div
              class="border-2 border-dashed border-gray-300 p-5 w-full h-auto flex flex-col items-center tracking-wide text-purple-700 ease-linear transition-all duration-150"
            >
              <div
                id="img"
                class="max-h-0 w-full overflow-hidden h-full"
                :style="file ? 'max-height: 360px;' : ''"
              ></div>
              <span class="material-icons-outlined text-5xl">
                cloud_upload
              </span>
              <span
                class="border-t border-b inline-block border-purple-700 py-2 my-5 text-center capitalize font-semibold"
              >
                Upload Your Profile
              </span>
              <label
                v-if="fileError"
                class="text-red-600 text-sm text-center mb-5"
              >
                {{ fileError }}
              </label>
              <label
                class="cursor-pointer hover:bg-purple-700 hover:text-white py-2 px-20 border border-purple-700 rounded-full text-center"
                >Select a file
                <input @change="handleInsertImage" type="file" class="hidden" />
              </label>
            </div>
          </div>
        </div>

        <div class="w-full space-y-1">
          <label
            class="block text-center pb-5 text-gray-700 font-semibold font-mono"
          ></label>
          <div class="w-full">
            <label class="block text-sm">Username</label>
            <input
              v-model="username"
              class="w-full p-2 border rounded hover:shadow hover:border-gray-300 focus:shadow focus:border-gray-300 focus:outline-none"
              type="text"
            />
          </div>

          <div class="w-full">
            <label class="block text-sm">Email</label>
            <input
              v-model="email"
              disabled
              class="w-full p-2 border rounded cursor-not-allowed focus:outline-none"
              type="email"
            />
          </div>

          <div class="w-full">
            <label class="block text-sm">Password</label>
            <div class="flex">
              <input
                disabled
                v-model="password"
                class="w-full p-2 border rounded focus:outline-none rounded-r-none cursor-not-allowed"
                type="password"
              />
              <div
                class="w-12 border hover:text-purple-600 cursor-pointer rounded border-l-0 rounded-l-none flex justify-center items-center"
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

          <div v-if="passwordChanges" class="w-full space-y-2">
            <h3 class="text-center py-2 text-gray-700 font-semibold">
              Change a New Password
            </h3>
            <div>
              <label class="block text-sm">Current password</label>
              <input
                v-model="currentPassword"
                class="w-full p-2 border rounded hover:shadow hover:border-gray-300 focus:shadow focus:border-gray-300 focus:outline-none"
                type="password"
                placeholder="Current password"
              />
            </div>

            <div>
              <label class="block text-sm">New password</label>
              <input
                v-model="newPassword"
                class="w-full p-2 border rounded hover:shadow hover:border-gray-300 focus:shadow focus:border-gray-300 focus:outline-none"
                type="password"
                placeholder="New password"
              />
            </div>

            <div>
              <label class="block text-sm">Confirm password</label>
              <input
                v-model="confirmPassword"
                class="w-full p-2 border rounded hover:shadow hover:border-gray-300 focus:shadow focus:border-gray-300 focus:outline-none"
                type="password"
                placeholder="Re-type new password"
              />
            </div>
          </div>
          <label class="text-red-600 text-sm">
            {{ errorChangePassword }}
          </label>

          <div v-if="!successful" class="pt-3 flex space-x-5 items-center">
            <button
              v-if="!isPending"
              :class="{ frozen: nothingToUpdate }"
              :disabled="nothingToUpdate"
              class="focus:outline-none py-2 px-16 rounded border border-purple-700 bg-white text-purple-600 hover:bg-purple-600 hover:text-white"
            >
              Update Profile
            </button>
            <button
              v-else
              class="relative flex justify-center items-center py-2 px-20 focus:outline-none rounded border cursor-wait border-purple-700 tracking-wide bg-white text-purple-600"
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
          <div v-else class="pt-3">
            <button
              class="flex justify-center items-center py-1 px-24 rounded bg-green-400 bg-opacity-80 focus:outline-none tracking-wide border"
            >
              <svg
                class="animate_animated animate__bounceIn animate__delay-2s text-white h-9 w-9 p-px rounded-full fill-current"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
                />
              </svg>
            </button>
          </div>
          <!-- 
          <div
            v-if="errorChangePassword"
            class="animate_animated animate__zoomIn animate__delay-1s flex items-center justify-center w-96 pt-3 shadow-lg"
          >
            <div
              class="flex w-full max-w-sm mx-auto overflow-hidden h-20 bg-white rounded"
            >
              <div class="flex items-center justify-center w-16 bg-red-600">
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

              <div
                class="flex justify-center items-center w-full leading-none px-2"
              ></div>
            </div>
          </div> -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import getUserDoc from "@/composables/getUserDoc";
import useUserDoc from "@/composables/useUserDoc";
import getUser from "@/composables/getUser";
import { watch, watchEffect } from "@vue/runtime-core";
import useStorage from "@/composables/useStorage";
import { projectAuth, firebase } from "@/firebase/config";
export default {
  props: ["accountSettings", "isCustomer"],
  setup(props, { emit }) {
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

    const { user } = getUser();
    const { _user } = getUserDoc("users");
    const { updateProfile } = useUserDoc("users", user.value?.uid);
    const { url, uploadImage } = useStorage();

    watch(_user, () => {
      firstname.value = _user.value.firstname;
      lastname.value = _user.value.lastname;
      username.value = user.value.displayName.split(" ")[0];
      email.value = _user.value.email;
      phone.value = _user.value.phone;
      password.value = user.value.providerId;
    });

    watchEffect(() => {
      if (props?.accountSettings) {
        showProfile.value = false;
      }
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
        username.value != user.value.displayName.split(" ")[0] ||
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
          // image.style.borderRadius = "4px";
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
          successful.value = true;
          errorChangePassword.value = null;
          setTimeout(() => {
            successful.value = false;
          }, 2000);
        } catch (err) {
          errorChangePassword.value = err.message;
        }
      }

      if (username.value != user.value.displayName) {
        try {
          await projectAuth.currentUser.updateProfile({
            displayName: username.value,
          });
          await updateProfile({ name: username.value });

          successful.value = true;
          errorChangePassword.value = null;
          setTimeout(() => {
            successful.value = false;
          }, 2000);
        } catch (err) {
          errorChangePassword.value = err.message;
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
          errorChangePassword.value = null;
          setTimeout(() => {
            successful.value = false;
          }, 2000);
        } catch (err) {
          errorChangePassword.value = err.message;
        }
      } else {
        if (newPassword.value && confirmPassword.value) {
          errorChangePassword.value = "Password confirmation doesn't match!";
        }
      }
      isPending.value = false;
    };

    const handleSwitchingComponent = (component) => {
      emit("onSwitchingComponent", component);
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
      handleInsertImage,
      handleUpdateProfile,
      handleSwitchingComponent,
    };
  },
};
</script>
