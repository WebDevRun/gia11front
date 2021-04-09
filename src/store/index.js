import { createStore } from 'vuex'

export default createStore({
  state: {
    years: [],
    exams: [],
    uploadExams: []
  },
  getters: {
    getAllYears: state => state.years,
    getUploadExams: state => state.uploadExams,
    getAllExams: state => state.exams
  },
  mutations: {
    pushAllYears (state, years) {
      state.years = years
    },
    pushUploadExams (state, uploadExams) {
      state.uploadExams = uploadExams
    },
    pushAllExams (state, exams) {
      state.exams = exams
    }
  },
  actions: {
    async getAllYears ({ dispatch, commit }) {
      try {
        const response = await fetch('http://192.168.1.22:5000/api/years')
        // const response = await fetch('http://192.168.43.161:5000/api/years')
        if (response.ok) {
          commit('pushAllYears', await response.json())
        }
      } catch (error) {
        console.log(error)
      }
    },
    async sendExams ({ dispatch, commit }, data) {
      try {
        const response = await fetch('http://192.168.1.22:5000/api/exams', {
        // const response = await fetch('http://192.168.43.161:5000/api/exams', {
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
    async getAllExams ({ dispatch, commit }, params) {
      try {
        const response = await fetch(`http://192.168.1.22:5000/api/exams?year=${params}`)
        // const response = await fetch(`http://192.168.43.161:5000/api/exams${windowData}`)
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
