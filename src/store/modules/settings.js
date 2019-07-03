const state = {
    bottomNav: sessionStorage.getItem('bottomNav') || 'notice',
    articleTitle: '',
}
const mutations = {
    // 修改token，并将token存入localStorage 
    CHANGE_NAV(state,nav) {
        state.bottomNav = nav;
        sessionStorage.setItem('bottomNav',nav)
    },
    ARTICLE_TITLE(state,title) {
        state.articleTitle= title;
    }
}
const actions = {
    CHANGE_NAV({commit},nav) {
        commit('CHANGE_NAV',nav)
    },
    ARTICLE_TITLE({commit},title) {
        commit('ARTICLE_TITLE',title)
    }
}
export default {
    state,
    mutations,
    actions
}