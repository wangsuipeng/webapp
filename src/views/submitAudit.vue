<template>
  <div class="submit-audit">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>提交审核
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <div class="container-main">
      <h3 class="title">{{postContent}}</h3>
      <textarea readonly name="text" id v-model="articleTitle" class="textarea-text"></textarea>
      <mu-flex justify-content="center" align-items="center" class="submit">
        <mu-button round color="#ff5242" @click="submitReview">提交</mu-button>
      </mu-flex>
    </div>
  </div>
</template>
<script>
import Qs from "qs";
export default {
  data() {
    return {
      postContent: "",
      articleTitle: "",
      releaseLove: [],
      allRuningTask: [],
      serviceId: ""
    };
  },
  created() {
    this.serviceId = localStorage.getItem("serviceIds");
    this.queryAllRuningTask();
  },
  mounted() {
    mui.back = function() {
      history.go(-1); //回退到上一页面
    };
  },
  methods: {
    outPage() {
      this.$router.goBack();
    },
    // 查询所有进行中的任务
    queryAllRuningTask() {
      this.$axios({
        url: "admin/mobile/welfare/queryAllRuningTask",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          userId: sessionStorage.getItem("userId")
        })
      })
        .then(result => {
          if (result.data.respCode == 1000) {
            this.allRuningTask = result.data.data.receiveTasks;
            this.releaseLove = result.data.data.publishTasks;
            for (let i = 0; i < this.allRuningTask.length; i++) {
              if (this.serviceId == this.allRuningTask[i].serviceId) {
                this.postContent = this.allRuningTask[i].serviceName;
                this.articleTitle = this.allRuningTask[i].seviceDetail;
              }
            }
            for (let i = 0; i < this.releaseLove.length; i++) {
              if (this.serviceId == this.releaseLove[i].serviceId) {
                this.postContent = this.releaseLove[i].serviceName;
                this.articleTitle = this.releaseLove[i].seviceDetail;
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 提交审核
    submitReview() {
      this.$axios({
        url: "admin/mobile/welfare/submitReview",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          receiveUserId: sessionStorage.getItem("userId"),
          serviceId: this.serviceId
        })
      })
        .then(result => {
          if (result.data.respCode == 1000) {
            this.$router.goBack();
          } else {
            this.$alert(result.data.errorMsg, "提示", {
              okLabel: "知道了"
            }).then(() => {
              // this.$toast.message("提示信息");
              this.$router.goBack();
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.ret-btn {
  display: inline-block;
  color: #fff;
  font-size: 30px;
}
.container-main {
  width: 100%;
  height: calc(100vh - 56px);
  overflow-y: auto;
}
.title-sub {
  width: 100%;
  height: 40px;
  padding-left: 20px;
  line-height: 40px;
  font-size: 18px;
  background-color: aquamarine;
}
.textarea-text {
  width: 100%;
  min-height: 15rem;
  text-indent: 20px;
  outline: none;
  padding: 5px 10px;
}
.title {
  width: 100%;
  padding: 15px 0;
  background-color: rgb(204, 204, 204, 0.3);
  text-align: center;
  margin: 0 !important;
}
.submit {
  padding: 0 20px;
}
</style>
