import { App } from "vue";
import List from "./index.vue";

export { List };

export default (app: App): void => {
  app.component(List.name, List);
};
