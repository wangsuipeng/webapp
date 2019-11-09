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
      component: () => import('@/views/familyDiscussion.vue'),
      meta: { keepAlive: true }
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
    },
    {
      path: '/about',
      component: () => import('@/views/about.vue')
    },
    {
      path: '/authentication',
      component: () => import('@/views/authentication.vue')
    },
    {
      path: '/editAuthen',
      component: () => import('@/views/editAuthen.vue')
    },
    {
      path: '/share',
      component: () => import('@/views/share.vue')
    },
    {
      path: '/releasePublic',
      component: () => import('@/views/releasePublic.vue')
    },
    {
      path: '/loveProgress',
      component: () => import('@/views/loveProgress.vue')
    },
    {
      path: '/myLove',
      component: () => import('@/views/myLove.vue')
    },
    {
      path: '/applyRepair',
      component: () => import('@/views/applyRepair.vue')
    },
    {
      path: '/electricityRepair',
      component: () => import('@/views/electricityRepair.vue')
    },
    {
      path: '/water',
      component: () => import('@/views/water.vue')
    },
    {
      path: '/coalGas',
      component: () => import('@/views/coalGas.vue')
    },
    {
      path: '/house',
      component: () => import('@/views/house.vue')
    },
    {
      path: '/integral',
      component: () => import('@/views/integral.vue')
    },
    {
      path: '/parkingLot',
      component: () => import('@/views/parkingLot.vue')
    },
    {
      path: '/myApply',
      component: () => import('@/views/myApply.vue')
    },
    {
      path: '/submitAudit',
      component: () => import('@/views/submitAudit.vue')
    },
    {
      path: '/auditContents',
      component: () => import('@/views/auditContents.vue')
    },
    {
      path: '/sharePosts',
      component: () => import('@/views/sharePosts.vue')
    },
    {
      path: '/browseShare',
      component: () => import('@/views/browseShare.vue')
    },
    {
      path: '/parkingLotCart',
      component: () => import('@/views/parkingLotCart.vue')
    },
    {
      path: '/leasePark',
      component: () => import('@/views/leasePark.vue')
    },
    {
      path: '/rentSeeking',
      component: () => import('@/views/rentSeeking.vue')
    },
    {
      path: '/sellVehicle',
      component: () => import('@/views/sellVehicle.vue')
    },
    {
      path: '/auditProgress',
      component: () => import('@/views/auditProgress.vue')
    },
    {
      path: '/propertyFee',
      component: () => import('@/views/propertyFee.vue')
    },
    {
      path: '/myApplication',
      component: () => import('@/views/myApplication.vue')
    },
    {
      path: '/contentApplication',
      component: () => import('@/views/contentApplication.vue')
    },
    {
      path: '/workApply',
      component: () => import('@/views/workApply.vue')
    },
    {
      path: '/noticePage',
      component: () => import('@/views/noticePage.vue')
    },
    {
      path: '/myPost',
      component: () => import('@/views/myPost.vue')
    },
    {
      path: '/advertisement',
      component: () => import('@/views/advertisement.vue')
    },
    {
      path: '/postContent',
      component: () => import('@/views/postContent.vue')
    },
    {
      path: '/myIntegral',
      component: () => import('@/views/myIntegral.vue')
    },
    {
      path: '/complaint',
      component: () => import('@/views/complaint.vue')
    },
    {
      path: '/forgetPassword',
      component: () => import('@/components/login/forgetPassword.vue')
    },
    {
      path: '/setPassWord',
      component: () => import('@/components/login/setPassWord.vue')
    }
  ]
})