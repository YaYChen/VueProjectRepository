import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    name: 'zh'
  },
  mutations: {
    changeLanguage (state,value) {
      state.name=value;
      console.log('name: '+state.name);
    }
  }
})

export default store