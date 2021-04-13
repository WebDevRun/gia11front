import { createStore } from 'vuex'

export default createStore({
  state: {
    schools: [],
    years: [],
    exams: [],
    uploadExams: []
  },
  getters: {
    getAllSchools: state => state.schools,
    getAllYears: state => state.years,
    getUploadExams: state => state.uploadExams,
    getAllExams: state => state.exams
  },
  mutations: {
    pushAllShools (state, schools) {
      state.schools = schools
    },
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
    async getAllSchools ({ dispatch, commit }) {
      try {
        // const response = await fetch('http://192.168.1.22:5000/api/schools')
        const response = await fetch('http://192.168.43.161:5000/api/schools')
        if (response.ok) {
          commit('pushAllShools', await response.json())
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getAllYears ({ dispatch, commit }) {
      try {
        // const response = await fetch('http://192.168.1.22:5000/api/years')
        const response = await fetch('http://192.168.43.161:5000/api/years')
        if (response.ok) {
          commit('pushAllYears', await response.json())
        }
      } catch (error) {
        console.log(error)
      }
    },
    async sendExams ({ dispatch, commit }, data) {
      try {
        // const response = await fetch('http://192.168.1.22:5000/api/exams', {
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
    async getAllExams ({ dispatch, commit }, params) {
      try {
        // const response = await fetch(`http://192.168.1.22:5000/api/exams?year=${params}`)
        const response = await fetch(`http://192.168.43.161:5000/api/exams?year=${params}`)
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
