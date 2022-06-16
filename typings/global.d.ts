import type { App } from "vue";
export {};
declare global {
  interface Window {
    Vue: App;
  }
}
