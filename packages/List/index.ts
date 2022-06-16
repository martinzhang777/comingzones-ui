import { App } from "vue";
import List from "./index.vue";

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，那么所有的组件都会被注册
List.install = function (Vue: App) {
  // 遍历注册全局组件
  Vue.component(List.name, List);
};
export default List;
