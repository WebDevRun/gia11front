let isRetry = false

export default {
  state: {
    schools: [],
    years: [],
    exams: [],
    uploadExams: [],
    minScoreStatus: {}
  },
  getters: {
    getAllSchools: state => state.schools,
    getAllYears: state => state.years,
    getUploadExams: state => state.uploadExams,
    getAllExams: state => state.exams,
    getMinScoreStatus: state => state.minScoreStatus
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
    },
    pushMinScoreStatus (state, minScoreStatus) {
      state.minScoreStatus = minScoreStatus
    }
  },
  actions: {
    async getAllSchools ({ dispatch, commit }) {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const response = await fetch('http://192.168.1.22:5000/api/schools', {
          method: 'GET',
          headers: {
            Authorization: accessToken
          }
        })

        if (response.status === 401 && !isRetry) {
          isRetry = true
          await dispatch('getNewTokens')
          await dispatch('getAllSchools')
        }



        if (response.ok) {
          commit('pushAllShools', await response.json())
          isRetry = false
        }

        if (isRetry) {
          commit('deleteTokens')
        }
      } catch (error) {
        commit('pushError', error)
      }
    },
    async getAllYears ({ dispatch, commit }) {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const response = await fetch('http://192.168.1.22:5000/api/years', {
          method: 'GET',
          headers: {
            Authorization: accessToken
          }
        })
        if (response.status === 401 && !isRetry) {
          isRetry = true
          await dispatch('getNewTokens')
          await dispatch ('getAllYears')
        }

        if (response.ok) {
          commit('pushAllYears', await response.json())
          isRetry = false
        }

        if (isRetry) {
          commit('deleteTokens')
        }
      } catch (error) {
        commit('pushError', error)
      }
    },
    async sendExams ({ dispatch, commit }, data) {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const response = await fetch('http://192.168.1.22:5000/api/exams', {
          method: 'POST',
          headers: {
            Authorization: accessToken
          },
          body: data
        })

        if (response.status === 401 && !isRetry) {
          isRetry = true
          await dispatch('getNewTokens')
          await dispatch ('sendExams', data)
        }

        if (response.ok) {
          commit('pushUploadExams', await response.json())
          isRetry = false
        }

        if (isRetry) {
          commit('deleteTokens')
        }
      } catch (error) {
        commit('pushError', error)
      }
    },
    async getAllExams ({ dispatch, commit }, params) {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const response = await fetch(`http://192.168.1.22:5000/api/exams?year=${params}`, {
          method: 'GET',
          headers: {
            Authorization: accessToken
          }
        })

        if (response.status === 401 && !isRetry) {
          isRetry = true
          await dispatch('getNewTokens')
          await dispatch ('getAllExams', params)
        }

        if (response.ok) {
          commit('pushAllExams', await response.json())
        isRetry = false
        }

        if (isRetry) {
          commit('deleteTokens')
        }
      } catch (error) {
        commit('pushError', error)
      }
    },
    async addMinScore ({ dispatch, commit }, minScore) {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const response = await fetch('http://192.168.1.22:5000/api/addminscore', {
          method: "POST",
          headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(minScore)
        })

        if (response.status === 401 && !isRetry) {
          isRetry = true
          await dispatch('getNewTokens')
          await dispatch ('addMinScore', minScore)
        }

        if (response.ok) {
          commit('pushMinScoreStatus', await response.json())
          isRetry = false
        }

        if (isRetry) {
          commit('deleteTokens')
        }
      } catch (error) {
        commit('pushError', error)
      }
    }
  }
}
