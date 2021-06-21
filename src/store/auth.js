let isRetry = false

export default {
  state: {
    accessToken: null
  },
  getters: {
    getAccessToken: state => state.accessToken,
  },
  mutations: {
    setTokens (state, accessToken) {
      state.accessToken = accessToken
      localStorage.setItem('accessToken', accessToken)
    },
    deleteTokens (state) {
      state.accessToken = null
      localStorage.removeItem('accessToken')
    }
  },
  actions: {
    async login ({ dispatch, commit }, user) {
      try {
        const response = await fetch('http://192.168.43.161:5000/api/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(user)
        })

        if (response.status === 403) {
          commit('pushError', await response.json())
        }

        if (response.ok) {
          commit('setTokens', await response.json())
          commit('deleteError')
          isRetry = false
        }
      } catch (error) {
        commit('pushError', error)
      }
    },
    async getNewTokens ({ dispatch, commit }) {
      try {
        const response = await fetch('http://192.168.43.161:5000/api/getNewTokens', {
          method: 'POST',
          credentials: 'include'
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
        const response = await fetch('http://192.168.43.161:5000/api/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: accessToken,
          }
        })

        if (response.status === 401 && !isRetry) {
          isRetry = true
          await dispatch('getNewTokens')
          await dispatch('logoutFromDB')
        }
        commit('deleteTokens')
      } catch (error) {
        commit('pushError', error)
        throw error
      }
    }
  }
}
