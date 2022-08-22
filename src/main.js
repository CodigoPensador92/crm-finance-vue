import Vue from 'vue'
import Vuelidate from 'vuelidate'
import PaginateVue from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import localizeFilter from './filters/localize.filter'
import tooltipDirective from'./directives/tooltip.directive'
import messagePlugin from './utils/message.plugin'
import titlePlugin from './utils/title.plugin'
import LoaderComp from './components/app/LoaderComp'
import VueMeta from 'vue-meta'
import 'materialize-css/dist/js/materialize.min'

import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

Vue.config.productionTip = false

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(VueMeta)


Vue.component('LoaderComp', LoaderComp)
Vue.component('PaginateVue', PaginateVue)

firebase.initializeApp({apiKey: "AIzaSyCYTeCfRCdGgMg1Bo47SFcjYWjpiPv4-8k",
authDomain: "vue-crm-balina.firebaseapp.com",
projectId: "vue-crm-balina",
storageBucket: "vue-crm-balina.appspot.com",
messagingSenderId: "6077376011",
appId: "1:6077376011:web:e4a81dc1cf586d9da2490e",
measurementId: "G-RJPFF3N4BQ"})


const auth = firebase.auth();
console.log(auth)

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


