import Vue from "vue";
import App from "./App.vue";

require("@/plugins/vee-validate.js");

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
