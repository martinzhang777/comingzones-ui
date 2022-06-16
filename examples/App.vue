<style lang="scss">
.page.base-page {
  .page-content {
  }
  .page-footer {
  }
}
</style>
<template>
  <div class="page base-page">
    <f-date
      :type="'date'"
      label="请选择年月日"
      v-model:value="state.currentDate"
    ></f-date>
    <div class="page-content">content</div>
    <div class="page-footer">footer</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "@vue/runtime-core";
export default defineComponent({
  name: "Base",
  setup() {
    console.log("Base Created");
    const state = reactive({
      currentDate: "",
    });
    return { state };
  },
});
</script>
