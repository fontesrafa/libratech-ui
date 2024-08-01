import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import axios from "axios"
import { Model } from "vue-api-query"

Model.$http = axios

createApp(App).use(router).mount("#app")
