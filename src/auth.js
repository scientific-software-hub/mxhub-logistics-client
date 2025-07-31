import axios from 'axios'

const state = {
    token: null,
    user: null,
}

const mutations = {
    SET_AUTH(state, { token, user }) {
        state.token = token
        state.user = user
    },
    CLEAR_AUTH(state) {
        state.token = null
        state.user = null
    },
}

const actions = {
    async loginViaQr({ commit }, { login, password }) {
        const data = new FormData();
        data.append("login", login);
        data.append("password", password);
        const res = await axios.post('/ispyb/ispyb-ws/rest/authenticate?site=DESY_LOCAL', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        })
        const { token } = res.data
        commit('SET_AUTH', { token, user: login })
    },
    logout({ commit }) {
        commit('CLEAR_AUTH')
    },
}

const getters = {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
    token: (state)=>state.token,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}