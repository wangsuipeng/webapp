// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import './assets/js/mui.js'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
import 'muse-ui-message/dist/muse-ui-message.css';
import store from './store'
import { SwitchCell } from 'vant';
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import Loading from 'muse-ui-loading';
import { Uploader } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Dialog } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Toast } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { Rate } from 'vant';
import { Panel } from 'vant';

Vue.use(Panel);
Vue.use(Rate);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Swipe).use(SwipeItem);
// 全局注册
Vue.use(Dialog);
Vue.use(Cell).use(CellGroup);
Vue.use(Uploader);
Vue.use(Loading);
Vue.use(SwitchCell);

Vue.prototype.$axios = axios

axios.defaults.baseURL = process.env.API_ROOT
// 设置post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.interceptors.request.use((response) =>
//   config => {
//     console.log(response)
//     // if (res.headers.authorization) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//     //   // config.headers.Authorization = `token ${localStorage.JWT_TOKEN}`;
//     //   config.headers.Authorization = res.headers.authorization;
//     // }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
// })
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
  
//   console.log('22222222222222')
//   console.log(response.headers['Authorization']);
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });
Vue.use(MuseUI)
Vue.use(Vuetify)
Vue.use(Toast)
Vue.use(Message);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
