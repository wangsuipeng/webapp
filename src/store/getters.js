const getters = {
    bottomNav: state => state.settings.bottomNav,
    articleTitle: state => state.settings.articleTitle,
    articleContent: state => state.settings.articleContent,
    phoneNumber: state => state.settings.phoneNumber,
    headPortrait: state => state.settings.headPortrait,
    versionNum: state => state.settings.versionNum,
    password: STATE => STATE.settings.password
}
export default getters;