<style lang="scss">
.f-list-container {
  .skeleton-item {
    margin-bottom: 20px;
    &:nth-child(1) {
      margin-top: 8px;
    }
  }
  .loading-more {
    width: 18px;
    margin-right: 4px;
  }
}
</style>
<template>
  <van-pull-refresh
    v-model="refreshing"
    @refresh="onRefresh"
    class="f-list-container"
    :readonly="loading && items.length == 0"
  >
    <!-- <template #pulling="props">
      <img
        class="doge"
        src="https://img.yzcdn.cn/vant/doge.png"
        :style="{ transform: `scale(${props.distance / 80})` }"
      />
    </template>
    <template #loosing>
      <img class="doge" src="https://img.yzcdn.cn/vant/doge.png" />
    </template>
    <template #loading>
      <img class="doge" src="https://img.yzcdn.cn/vant/doge-fire.jpg" />
    </template> -->
    <van-list
      v-if="pagination"
      v-model:loading="loading"
      :finished="finished"
      v-model:error="error"
      @load="onLoad"
    >
      <slot
        v-if="items.length > 0"
        :items="items"
        :onRefresh="onRefresh"
        :loading="loading"
      >
        <div
          class="item"
          v-for="item in items"
          :key="item.id"
          @click="
            $router.push({ name: 'CourseDetail', query: { id: item.id } })
          "
        >
          {{ item.name }}
        </div>
      </slot>

      <slot name="skeleton">
        <!-- 默认的骨架屏 -->
        <div
          v-skeleton="loading && items.length == 0"
          v-if="loading && items.length === 0"
        >
          <van-skeleton
            class="skeleton-item"
            :row="3"
            v-for="item in 12"
            :key="item"
          />
        </div>
      </slot>
      <slot name="empty">
        <van-empty v-if="showEmpty" description="暂无数据"></van-empty>
        <van-empty
          image="error"
          v-if="!loading && items.length === 0 && !refreshing && error"
          description="数据获取失败"
        >
          <van-button
            class="retry-btn"
            size="small"
            block
            type="danger"
            @click="onRefresh"
            >重试</van-button
          >
        </van-empty>
      </slot>

      <!-- 底部插槽 -->
      <template #loading>
        <div class="flex-center">
          <van-loading class="loading-more" />努力加载中...
        </div>
      </template>
      <template #finished>
        <van-divider v-if="items.length > 0">已经到底线啦~</van-divider>
      </template>
      <template #error v-if="items.length > 0">
        <div>加载失败,点击重试</div>
      </template>
    </van-list>
    <div :class="listClass" v-if="!pagination">
      <slot
        v-if="filterItems.length > 0"
        :items="items"
        :filterItems="filterItems"
        :onRefresh="onRefresh"
        :loading="loading"
      >
        <div
          class="item"
          v-for="item in items"
          :key="item.id"
          @click="
            $router.push({ name: 'CourseDetail', query: { id: item.id } })
          "
        >
          {{ item.name }}
        </div>
      </slot>
      <slot name="skeleton">
        <!-- 默认的骨架屏 -->
        <div
          v-skeleton="loading && items.length == 0"
          v-if="loading && items.length === 0"
        >
          <van-skeleton
            class="skeleton-item"
            :row="3"
            v-for="item in 12"
            :key="item"
          />
        </div>
      </slot>
      <slot name="empty">
        <van-empty v-if="showEmpty" description="暂无数据"> </van-empty>
        <van-empty
          image="error"
          v-if="!loading && items.length === 0 && !refreshing && error"
          description="数据获取失败"
        >
          <van-button
            class="retry-btn"
            size="small"
            block
            type="danger"
            @click="onRefresh"
            >重试</van-button
          >
        </van-empty>
      </slot>
    </div>
  </van-pull-refresh>
</template>
<script lang="ts">
import { useList } from "@/hooks";
import { computed, defineComponent } from "@vue/runtime-core";

function findParent(el: HTMLElement): HTMLElement | null {
  if (el.parentElement?.classList.contains("f-list-container")) {
    return el.parentElement;
  }
  if (el.parentElement) {
    return findParent(el.parentElement);
  }
  return null;
}

function setSkeleton(el: HTMLElement, binding: any) {
  const container = findParent(el);
  if (container) {
    container.style.height = binding.value ? "100%" : "";
  }
}

export default defineComponent({
  name: "FList",
  components: {
    "van-field": Field,
    "van-popup": Popup,
    "van-datetime-picker": DatetimePicker,
  },
  directives: {
    skeleton: {
      mounted: setSkeleton,
      beforeUnmount: (el) => {
        setSkeleton(el, { value: false });
      },
    },
  },
  props: {
    source: {
      type: Function,
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否需要首次加载
     */
    first: {
      type: Boolean,
      default: false,
    },
    class: String,
    filter: {
      type: Function,
    },
  },
  setup(props) {
    console.debug("[Components] List Created");
    const {
      pageNo,
      items,
      pageSize,
      refreshing,
      onRefresh,
      onLoad,
      offset,
      finished,
      error,
      loading,
    } = useList<any>(props.source as any);
    if (!props.pagination && props.first && !loading.value) {
      onRefresh();
    }
    const listClass = `f-list ${props.class ? props.class : ""}`;

    const filterItems = computed<any[]>(() => {
      return props?.filter?.(items) || items;
    });

    const showEmpty = computed(() => {
      return (
        !loading.value &&
        (props?.filter ? filterItems.value.length === 0 : items.length === 0) &&
        !refreshing.value &&
        !error.value
      );
    });

    return {
      pageNo,
      items,
      filterItems,
      pageSize,
      refreshing,
      onRefresh,
      onLoad,
      offset,
      finished,
      error,
      loading,
      listClass,
      showEmpty,
    };
  },
});
</script>
