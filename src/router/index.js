import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
Router.prototype.goBack = function () { 
　this.isBack = true
  this.go(-1)
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/layout',
      component: () => import('@/components/Layout.vue'),
      redirect: '/layout/notice',
      children: [
        {
          path: 'notice',
          component: () => import('@/components/main/notice.vue'),
        },
        {
          path: 'widgets',
          component: () => import('@/components/main/widgets.vue'),
        },
        {
          path: 'person',
          component: () => import('@/components/main/person.vue'),
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/components/login/login.vue')
    },
    {
      path: '/login/register',
      component: () => import('@/components/login/register.vue')
    },
    {
      path: '/login/loginSuccess',
      component: () => import('@/components/login/loginSuccess.vue')
    },
    {
      path: '/community',
      component: () => import('@/components/community.vue')
    },
    {
      path: '/createComm',
      component: () => import('@/components/createComm.vue')
    },
    {
      path: '/toExamine',
      component: () => import('@/components/toExamine.vue')
    },
    {
      path: '/examineSuccess',
      component: () => import('@/components/examineSuccess.vue')
    },
    {
      path: '/familyD',
      component: () => import('@/views/familyDiscussion.vue')
    },
    {
      path: '/post',
      component: () => import('@/views/posting.vue')
    },
    {
      path: '/personalCenter',
      component: () => import('@/views/personalCenter.vue')
    },
    {
      path: '/browse',
      component: () => import('@/views/browse.vue')
    },
    {
      path: '/nickName',
      component: () => import('@/views/nickName.vue')
    },
    {
      path: '/mobilePhone',
      component: () => import('@/views/mobilePhone.vue')
    },
    {
      path: '/gender',
      component: () => import('@/views/gender.vue')
    },
    {
      path: '/changePassword',
      component: () => import('@/views/changePassword.vue')
    },
    {
      path: '/propertyPay',
      component: () => import('@/views/propertyPay.vue')
    },
    {
      path: '/loveBank',
      component: () => import('@/views/loveBank.vue')
    },
    {
      path: '/editPost',
      component: () => import('@/views/editPost.vue')
    }
  ]
})
