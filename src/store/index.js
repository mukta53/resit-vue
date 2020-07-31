import Vue from 'vue'
import Vuex from 'vuex'

const baseAddress = 'http://localhost:4200/api'

Vue.use(Vuex)

const response = {
  data: {},
  error: {}
}
const headers = {
  "Content-Type": "application/json",
  "Authorization": ""
}

export default new Vuex.Store({
  state: {
    user: {},
    search: [],
    list: [],
    courses: [],
    users: []
  },
  mutations: {
    initialiseStore (state) {
      if (localStorage.getItem('currentUser')) {
        const user = JSON.parse(localStorage.getItem('currentUser'))
        headers.Authorization = user.token
        state.user = user
      }
    },
    currentUser (state, currentUser) {
      state.user = currentUser
      if (currentUser !== {}) {
        headers.Authorization = currentUser.token
      }
    },
    searchedCourse (state, course) {
      state.search = course
    },
    courseList (state, data) {
      state.list = data
    },
    courses (state, data) {
      state.courses = data
    },
    setUsers (state, data) {
      state.users = data
    }
  },
  actions: {
    async userSignup ({ commit }, payload) {
      try {
        const res = await fetch(`${baseAddress}/users`,{
          method: 'POST',
          headers: headers,
          body: JSON.stringify(payload)
        })
        const json = await res.json() 
        response.data = json
        commit('currentUser', json)
      } catch (error) {
        response.error = error
      }
      return response
    },
    async userLogin ({ commit }, payload) {
      try {
        const res = await fetch(`${baseAddress}/users/login`,{
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
        const json = await res.json()
        response.data = json
        commit('currentUser', json)
      } catch (error) {
        response.error = error
      }
      return response
    },
    async adminLogin ({ commit }, payload) {
      try {
        const res = await fetch(`${baseAddress}/admin/login`,{
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
        const json = await res.json()
        response.data = json
        commit('currentUser', json)
      } catch (error) {
        response.error = error
      }
      return response
    },
    async search({ commit }, data) {
      const url = baseAddress +
                  `/courses?search=${data.search}&tfilter=${data.tfilter}&pfilter=${data.pfilter}` +
                  `&sort=${data.sort}&sorttype=${data.sorttype}`
      try {
        const res = await fetch(url,{
          method: 'GET',
          headers: headers
        })
        const json = await res.json()
        response.data = json
        commit('searchedCourse', json)
      } catch (error) {
        response.error = error
      }
      return response
    },
    async courseList({ commit }) {
      const url = baseAddress + '/courses/list'
      try {
        const res = await fetch(url,{
          method: 'GET',
          headers: headers
        })
        const json = await res.json()
        response.data = json
        commit('courseList', json)
      } catch (error) {
        response.error = error
      }
      return response
    },
    async getUsers({ commit }) {
      const url = baseAddress + '/users'
      try {
        const res = await fetch(url,{
          method: 'GET',
          headers: headers
        })
        const json = await res.json()
        response.data = json
        commit('setUsers', json)
      } catch (error) {
        response.error = error
      }
      return response
    },
    async addCourse({ commit }, payload) {
      const url = baseAddress + '/courses'
      try {
        const res = await fetch(url,{
          method: 'POST',
          headers: headers,
          body: JSON.stringify(payload)
        })
        const json = await res.json()
        response.data = json
        commit('courses', response.data.data)
      } catch (error) {
        response.error = error
      }
      return response
    },
    saveUser ({ commit }, user) {
      commit('currentUser', user)
    }
  },
  modules: {
  }
})
