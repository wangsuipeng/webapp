<template>
  <div class="complaint">
    <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
      <mu-button icon slot="left" @click="outPage">
        <i class="iconfont icon-fanhui ret-btn"></i>
      </mu-button>投诉
      <mu-button icon slot="right">
        <!-- <mu-icon size="30" value="more_horiz"></mu-icon> -->
      </mu-button>
    </mu-appbar>
    <div class="content-main">
      <textarea
        class="textarea"
        v-model="textareaValue"
        placeholder="请填写投诉内容..."
        name
        id
        cols="30"
        rows="10"
      ></textarea>
      <van-button class="btn" type="danger" @click="complaint">提交</van-button>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      textareaValue: "",
      postContent: {},
    };
  },
  created () {
    this.postContent = JSON.parse(localStorage.getItem("familyDiscussion"));
  },
  methods: {
    outPage() {
      this.$router.goBack();
    },
    complaint() {
      this.$axios({
        url: "admin/mobile/article/complaint",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify({
          articleId: this.postContent.articleId,
          content: this.textareaValue
        })
      })
        .then(result => {
          if (result.data.respCode == 1000) {
            this.$toast("投诉成功");
            this.$router.goBack();
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
.content-main {
  padding: 10px;
}
.textarea {
  padding: 0.5rem;
  width: 100%;
  height: 10rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
}
.btn {
  margin-top: 1rem;
  width: 100%;
  border-radius: 2rem;
}
</style>  