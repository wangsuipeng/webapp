const state = {
    bottomNav: sessionStorage.getItem('bottomNav') || 'notice',
    articleTitle: "",
    articleContent: "",
    phoneNumber: localStorage.getItem("phone")
}
const mutations = {
    // 修改token，并将token存入localStorage 
    CHANGE_NAV(state,nav) {
        state.bottomNav = nav;
        sessionStorage.setItem('bottomNav',nav)
    },
    ARTICLE_TITLE(state,title) {
        state.articleTitle = title;
    },
    ARTICLE_CONTENT(state,text) {
        state.articleContent = text;
    },
    REMEMBER_PHONE(state,phone) {
        state.phoneNumber = phone;
    }
}
const actions = {
    CHANGE_NAV({commit},nav) {
        commit('CHANGE_NAV',nav)
    },
    ARTICLE_TITLE({commit},title) {
        commit('ARTICLE_TITLE',title)
    },
    ARTICLE_CONTENT({commit},text) {
        commit('ARTICLE_CONTENT',text)
    },
    REMEMBER_PHONE({commit},phone) {
        commit('REMEMBER_PHONE',phone)
    }
}
export default {
    state,
    mutations,
    actions
}