export default {
  state: {
    refreshToken: null,
    accessToken: null
  },
  getters: {
    getAccessToken: state => state.accessToken,
    getRefreshToken: state => state.refreshToken
  },
  mutations: {
    setTokens (state, tokens) {
      state.refreshToken = tokens.refreshToken
      localStorage.setItem('refreshToken', tokens.refreshToken)
      state.accessToken = tokens.accessToken
      localStorage.setItem('accessToken', tokens.accessToken)
    },
    deleteTokens (state) {
      state.refreshToken = null
      localStorage.removeItem('refreshToken')
      state.accessToken = null
      localStorage.removeItem('accessToken')
    }
  },
  actions: {
    async login ({ dispatch, commit }, user) {
      try {
        const response = await fetch('http://192.168.43.161:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify(user)
        })
        if (response.ok) {
          commit('setTokens', await response.json())
        }
      } catch (error) {
        commit('pushError', error)
        throw error
      }
    },
    async getNewTokens ({ dispatch, commit }) {
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const response = await fetch('http://192.168.43.161:5000/api/getNewTokens', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({refreshToken})
        })
        if (response.ok) {
          commit('setTokens', await response.json())
        }
      } catch (error) {
        commit('pushError', error)
        throw error
      }
    },
    async logoutFromDB ({ dispatch, commit }) {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        const response = await fetch('http://192.168.43.161:5000/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: accessToken
          },
          body: JSON.stringify({refreshToken})
        })

        if (response.status === 403) {
          await dispatch('getNewTokens')
          await dispatch('logoutFromDB')
        }

        if (response.ok) {
          commit('deleteTokens')
        }
      } catch (error) {
        commit('pushError', error)
        throw error
      }
    }
  }
}
