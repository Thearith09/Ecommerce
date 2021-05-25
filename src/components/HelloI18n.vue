<template>
  <p>{{ $t("product") }}</p>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{
        lang
      }}</option>
    </select>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloI18n",
  data() {
    return { langs: ["en", "kh"] };
  },
});
</script>

<i18n>
{
  "en": {
    "category": "Category",
    "product": "Product"
  },
  "kh": {
    "category":"ប្រភេទទំនិញ",
    "product": "ផលិតផល"
  }
}
</i18n>
