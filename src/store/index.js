import { createStore } from 'vuex'

export default createStore({
  state: {
    exams: [],
    uploadExams: []
  },
  getters: {
    getUploadExams: state => state.uploadExams,
    getAllExams: state => state.exams
  },
  mutations: {
    pushUploadExams (state, uploadExams) {
      state.uploadExams = uploadExams
    },
    pushAllExams (state, exams) {
      state.exams = exams
    }
  },
  actions: {
    async sendExams ({ dispatch, commit }, data) {
      try {
        const response = await fetch('http://192.168.43.161:5000/api/exams', {
          method: 'POST',
          body: data
        })
        if (response.ok) {
          commit('pushUploadExams', await response.json())
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getAllExams ({ dispatch, commit }) {
      try {
        const response = await fetch('http://192.168.43.161:5000/api/exams')
        if (response.ok) {
          commit('pushAllExams', await response.json())
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  modules: {
  }
})
