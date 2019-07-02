const state = {
    bottomNav: sessionStorage.getItem('bottomNav') || 'notice'
}
const mutations = {
    // 修改token，并将token存入localStorage 
    CHANGE_NAV(state,nav) {
        state.bottomNav = nav;
        sessionStorage.setItem('bottomNav',nav)
    }
}
const actions = {
    CHANGE_NAV({commit},nav) {
        commit('CHANGE_NAV',nav)
    }
}
export default {
    state,
    mutations,
    actions
}