import { useRequest } from "vue-request";
import { ref, reactive, computed } from "vue";

function log(text: string) {
  console.debug(`[HOOK useList] ${text}`);
}

function getItems<T>({
  pageNo,
  pageSize,
  offset,
}: APP.PaginationParams): Promise<APP.Pagination<T>> {
  console.debug(`[userList] 加载数据：${pageNo}`);
  const items: T[] = [];
  for (let i = offset; i < pageNo * pageSize; i++) {
    items.push({
      id: i,
      name: "测试数据" + i,
    } as any);
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.99999) {
        console.debug("error");
        return reject("请求失败");
      }
      resolve({
        total: 38,
        rows: items,
      });
    }, 3000);
  });
}

/**
 *
 * 列表
 * @export
 * @template T
 * @returns
 */
export default <T>(
  service: APP.ListSource<T> = getItems
): APP.ListResult<T> => {
  // 当前页码
  const pageNo = ref(1);
  const pageSize = ref(20);
  const refreshing = ref(false);
  const finished = ref(false);
  const hasError = ref(false);
  const items: T[] = reactive([]);
  const offset = computed(() => (pageNo.value - 1) * pageSize.value);
  const loading = ref(false);

  const { run, cancel } = useRequest(service, {
    manual: true,
    onSuccess: ({ total, rows }) => {
      log("onSuccess");
      // 如果当前请求的是第一页
      if (pageNo.value == 1) {
        items.splice(0);
      }
      items.push(...rows);
      finished.value = items.length >= total || rows.length === 0;
      pageNo.value++;
    },
    onError: () => {
      hasError.value = true;
    },
    onBefore: () => {
      console.debug("on before");
      hasError.value = false;
      loading.value = true;
    },
    onAfter: () => {
      console.debug("on after");
      refreshing.value = false;
      loading.value = false;
    },
  });
  async function onLoad() {
    log("onLoad");
    run({
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      offset: offset.value,
    });
  }
  function onRefresh(options?: { refresh?: boolean; empty?: boolean }) {
    // 取消之前的请求处理结果
    cancel();
    // 默认状态
    options = options || {
      refresh: true,
      empty: false,
    };
    log("onRefresh");
    pageNo.value = 1;
    // 是否显示下拉刷新的状态
    refreshing.value = !!options.refresh;
    // 刷新时 不显示加载完成的状态
    finished.value = false;
    run({
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      offset: offset.value,
    });
    // 清空列表
    if (options.empty) {
      items.splice(0);
    }
  }
  return {
    pageNo,
    items,
    pageSize,
    refreshing,
    onRefresh,
    onLoad,
    offset,
    finished,
    error: hasError,
    loading,
  };
};
