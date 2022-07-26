import Vue from 'vue'
import App from './App.vue'
import {message1, message2} from "./data"
import { showMessages } from './function'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

showMessages(message1)
showMessages(message2)
