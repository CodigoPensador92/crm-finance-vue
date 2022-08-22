import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  getters: {
    error: s => s.error
  },
  mutations: {
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() {
    //  const key = process.env.VUE_APP_FIXER
    //  const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
    //  return await res.json()
    var myHeaders = new Headers();
    myHeaders.append("apikey", "436M6PQDClooEPVoOcMF70CDkLvJSTYM");

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    const res = await fetch(`https://api.apilayer.com/fixer/2022-08-05?symbols=RUB,USD,EUR&base=EUR`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
        // return await res
      return await res.json()
    
    }
  },
  modules: {
    auth,
    info,
    category,
    record
  }
})
