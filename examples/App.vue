<style lang="scss">
// 页面的固定规范
.page {
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  &.inner {
    top: 0;
    bottom: 0;
    height: unset;
  }
  height: 100vh;
  // padding-bottom: env(safe-area-inset-bottom);
  .page-content {
    flex: 1;
    position: relative;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
.page.base-page {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  .page-content {
    height: 400px;
    background: grey;
    overflow: auto;
    .product {
      height: 100px;
      background: yellow;
    }
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
    <div class="page-content">
      <f-list ref="list" :source="dataSource" :pagination="false" first>
        <template v-slot="{ items }">
          <div class="products">
            <div class="product" v-for="(item, index) in items" :key="index">
              {{ item }}
            </div>
          </div>
        </template>
      </f-list>
    </div>
    <div class="page-footer">footer</div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onActivated,
  onDeactivated,
} from "vue";
export default defineComponent({
  name: "Base",
  setup() {
    console.log("Base Created");
    const state = reactive({
      currentDate: "",
    });

    // eslint-disable-next-line no-undef
    let list: any = ref(null);
    const dataSource = (pagination: any) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const res = {
            rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            total: 10,
          };
          resolve(res);
          return res;
        }, 1000);
      });
    };
    onActivated(() => {
      // onRefresh();
      list.value?.onRefresh({ refresh: false, empty: false });
    });
    return { state, dataSource, list };
  },
});
</script>
