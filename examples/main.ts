import { createApp } from "vue";
import App from "./App.vue";
import ComingUI from "~/index";
import "comingzones-ui/lib/comingzones-ui.css";

createApp(App).use(ComingUI).mount("#app");
