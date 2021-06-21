import { createStore } from 'vuex'
import gia11Info from './gia11Info.js'
import auth from './auth.js'

export default createStore({
  state: {
    error: null
  },
  getters: {
    getError: state => state.error
  },
  mutations: {
    pushError (state, error) {
      state.error = error
    },
    deleteError(state) {
      state.error = null
    }
  },
  modules: {
    auth,
    gia11Info
  }
})
