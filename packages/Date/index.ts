import type { App } from "vue";
import Date from "./src/index.vue";
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，那么所有的组件都会被注册
Date.install = function (Vue: App) {
  // 遍历注册全局组件
  Vue.component(Date.name, Date);
};
export default Date;
