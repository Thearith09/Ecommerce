<template>
  <div class="px-5 md:px-10 lg:px-16 mt-8">
    <div class="pb-3">
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
        <p>
          Promotions
        </p>
      </div>
      <div class="flex justify-between items-center font-bold text-gray-900">
        <div class="text-xl font-serif">
          Promotions
        </div>
        <div
          v-if="user?.admin || user?.packer"
          @click="handleSwitchingComponent('AddPromotion')"
          class="relative bg-yellow-400 opacity-80 py-2 px-6 rounded cursor-pointer hover:opacity-100"
        >
          New Promotion
        </div>
      </div>
    </div>

    <div
      v-if="promotions && promotions.length > 0"
      class="relative grid grid-cols-2 gap-6 bg-white max-h-itemList overflow-auto border shadow px-5 pt-10 py-10"
    >
      <div
        v-for="(promotion, i) in promotions"
        :key="promotion.id"
        v-show="i >= start && i < end"
      >
        <div class="relative h-60 shadow">
          <img
            class="w-full h-full object-cover object-center rounded"
            :src="promotion.url"
          />

          <div
            v-if="user?.admin || user?.packer"
            @click="toggleAction(i)"
            class="absolute top-2 right-2 border rounded p-1 text-gray-90000 bg-purple-400 bg-opacity-90 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
              />
            </svg>
          </div>

          <div
            class="absolute top-7 right-2 border border-gray-300 bg-white h-24 w-10 text-base z-40 py-2 list-none text-left rounded shadow mt-3"
            :class="{
              hidden: !activeModals[i].active,
            }"
            style="min-width: 12rem"
          >
            <a
              @click="handleSwitchingComponent('AddPromotion', promotion)"
              href="#edit"
              class="flex items-center space-x-3 text-sm py-2 px-4 text-gray-500 hover:bg-purple-600 hover:text-white focus:bg-purple-600 focus:text-white"
            >
              <i class="fas fa-pen"></i>
              <p>Edit</p>
            </a>
            <a
              @click="
                handleSwitchingComponent(
                  'DeletePromotionConfirmation',
                  promotion
                )
              "
              href="#remove"
              class="flex items-center space-x-3 text-sm py-2 px-4 text-gray-500 hover:bg-purple-600 hover:text-white focus:bg-purple-600 focus:text-white"
            >
              <i class="fas fa-trash"></i>
              <p>Remove</p>
            </a>
          </div>
        </div>
      </div>
      <div
        v-if="promotions.length - end > 0"
        class="absolute bottom-0 flex justify-center items-center w-full text-purple-700 text-lg font-medium font-mono"
      >
        <p
          @click="handleShowMore(promotions.length)"
          class="py-2 cursor-pointer"
        >
          view {{ promotions.length - end }} mores
        </p>
      </div>

      <div
        v-if="promotions.length == end"
        class="absolute bottom-0 flex justify-center items-center w-full text-purple-700 text-lg font-medium font-mono"
      >
        <p @click="handleShowLess" class="py-2 cursor-pointer">
          view in less
        </p>
      </div>
    </div>

    <div
      v-else
      class="flex justify-center items-center bg-white text-xl tracking-wider font-bold border shadow px-5 py-10"
    >
      There's no any promotions.
    </div>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
export default {
  setup(props, { emit }) {
    const activeModals = ref([]);
    const start = ref(0);
    const end = ref(4);
    const { user } = getUser();

    const { documents: promotions } = getCollection("promotions");

    watch(promotions, () => {
      promotions.value?.forEach((promotion) => {
        activeModals.value.push({ active: false });
      });
    });

    const handleSwitchingComponent = (component, promotion) => {
      emit("onSwitchingComponent", component, promotion);
    };

    const toggleAction = (i) => {
      if (activeModals.value[i].active) {
        activeModals.value[i].active = false;
      } else {
        for (let index in activeModals.value) {
          if (index == i) {
            activeModals.value[index].active = true;
          } else {
            activeModals.value[index].active = false;
          }
        }
      }
    };

    const handleShowMore = (length) => {
      end.value = length;
    };

    const handleShowLess = () => {
      end.value = 4;
    };

    return {
      handleSwitchingComponent,
      handleShowMore,
      handleShowLess,
      toggleAction,
      activeModals,
      promotions,
      start,
      end,
      user,
    };
  },
};
</script>

<style></style>
