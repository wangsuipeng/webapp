<template>
  <div class="create-comm">
    <div class="content">
      <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
        <mu-button icon slot="left" @click="outPage">
          <i class="iconfont icon-fanhui ret-btn"></i>
        </mu-button>创建社区
        <mu-button icon slot="right">
          <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
        </mu-button>
      </mu-appbar>
      <mu-container class="content-header">
        <mu-form
          :model="form"
          class="mu-demo-form"
          :label-position="labelPosition"
          label-width="100"
        >
          <mu-form-item prop="userPhone" label="选择城市 ：" label-position="left">
            <mu-select
              placeholder="请选择社区所在的城市"
              filterable
              v-model="form.cityName"
              full-width
              class="placeholder-text"
            >
              <mu-option v-for="city in fruits" :key="city" :label="city" :value="city"></mu-option>
            </mu-select>
          </mu-form-item>
          <mu-form-item prop="communityName" label="小区名称 ：" label-position="left">
            <mu-text-field
              v-model="form.communityName"
              placeholder="请输入社区名称"
              class="placeholder-text"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="address" label="小区地址 ：" label-position="left">
            <mu-text-field v-model="form.address" placeholder="请输入小区地址" class="placeholder-text"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="name" label="您的姓名 ：" label-position="left">
            <mu-text-field v-model="form.name" placeholder="请输入您的姓名" class="placeholder-text"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="userPhone" label="联系电话：" label-position="left">
            <mu-text-field
              v-model="form.contactPhone"
              placeholder="请输入您的联系人手机号"
              class="placeholder-text"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="userPhone" label="手机号码 ：" label-position="left">
            <mu-text-field v-model="form.userPhone" placeholder="请输入您的手机号" class="placeholder-text"></mu-text-field>
          </mu-form-item>
        </mu-form>
        <mu-button color="#FF5242" class="step-next" @click="addCommunity" v-ripple>下一步</mu-button>
      </mu-container>
    </div>
    <div class="flex-wrapper footer-bottom" justify-content="center" v-show="hidShow">
      <mu-flex class="flex-demo" justify-content="center">携手共建美好家园</mu-flex>
    </div>
  </div>
</template>
<script>
import Qs from "qs";
const fruits = [
  "北京",
  "广州",
  "深圳",
  "珠海",
  "汕头",
  "韶关",
  "佛山",
  "江门",
  "湛江",
  "茂名",
  "肇庆",
  "惠州",
  "梅州",
  "汕尾",
  "河源",
  "阳江",
  "清远",
  "东莞",
  "中山",
  "潮州",
  "揭阳",
  "云浮",
  "上海",
  "天津",
  "重庆",
  "沈阳",
  "大连",
  "鞍山",
  "抚顺",
  "本溪",
  "丹东",
  "锦州",
  "营口",
  "阜新",
  "辽阳",
  "盘锦",
  "铁岭",
  "朝阳",
  "葫芦岛",
  "南京",
  "苏州",
  "无锡",
  "常州",
  "镇江",
  "南通",
  "泰州",
  "扬州",
  "盐城",
  "连云港",
  "徐州",
  "淮安",
  "宿迁",
  "武汉",
  "黄石",
  "十堰",
  "荆州",
  "宜昌",
  "襄樊",
  "鄂州",
  "荆门",
  "孝感",
  "黄冈",
  "咸宁",
  "随州",
  "恩施土家族苗族自治州",
  "仙桃",
  "天门",
  "潜江",
  "神农架林区",
  "成都",
  "自贡",
  "攀枝花",
  "泸州",
  "德阳",
  "绵阳",
  "广元",
  "遂宁",
  "内江",
  "乐山",
  "南充",
  "眉山",
  "宜宾",
  "广安",
  "达州",
  "雅安",
  "巴中",
  "资阳",
  "阿坝藏族羌族自治州",
  "甘孜藏族自治州",
  "凉山彝族自治州",
  "西安",
  "铜川",
  "宝鸡",
  "咸阳",
  "渭南",
  "延安",
  "汉中",
  "榆林",
  "安康",
  "商洛",
  "石家庄",
  "唐山",
  "秦皇岛",
  "邯郸",
  "邢台",
  "保定",
  "张家口",
  "承德",
  "沧州",
  "廊坊",
  "衡水",
  "太原",
  "大同",
  "阳泉",
  "长治",
  "晋城",
  "朔州",
  "晋中",
  "运城",
  "忻州",
  "临汾",
  "吕梁",
  "郑州",
  "开封",
  "洛阳",
  "平顶山",
  "安阳",
  "鹤壁",
  "新乡",
  "焦作",
  "濮阳",
  "许昌",
  "漯河",
  "三门峡",
  "南阳",
  "商丘",
  "信阳",
  "周口",
  "驻马店",
  "长春",
  "吉林",
  "四平",
  "辽源",
  "通化",
  "白山",
  "松原",
  "白城",
  "延边朝鲜族自治州",
  "哈尔滨",
  "齐齐哈尔",
  "鹤岗",
  "双鸭山",
  "鸡西",
  "大庆",
  "伊春",
  "牡丹江",
  "佳木斯",
  "七台河",
  "黑河",
  "绥化",
  "大兴安岭地区",
  "呼和浩特",
  "包头",
  "乌海",
  "赤峰",
  "通辽",
  "鄂尔多斯",
  "呼伦贝尔",
  "巴彦淖尔",
  "乌兰察布",
  "锡林郭勒盟",
  "兴安盟",
  "阿拉善盟",
  "济南",
  "青岛",
  "淄博",
  "枣庄",
  "东营",
  "烟台",
  "潍坊",
  "济宁",
  "泰安",
  "威海",
  "日照",
  "莱芜",
  "临沂",
  "德州",
  "聊城",
  "滨州",
  "菏泽",
  "合肥",
  "芜湖",
  "蚌埠",
  "淮南",
  "马鞍山",
  "淮北",
  "铜陵",
  "安庆",
  "黄山",
  "滁州",
  "阜阳",
  "宿州",
  "巢湖",
  "六安",
  "亳州",
  "池州",
  "宣城",
  "杭州",
  "宁波",
  "温州",
  "嘉兴",
  "湖州",
  "绍兴",
  "金华",
  "衢州",
  "舟山",
  "台州",
  "丽水",
  "福州",
  "厦门",
  "莆田",
  "三明",
  "泉州",
  "漳州",
  "南平",
  "龙岩",
  "宁德",
  "长沙",
  "株洲",
  "湘潭",
  "衡阳",
  "邵阳",
  "岳阳",
  "常德",
  "张家界",
  "益阳",
  "郴州",
  "永州",
  "怀化",
  "娄底",
  "湘西土家族苗族自治州",
  "南宁",
  "柳州",
  "桂林",
  "梧州",
  "北海",
  "防城港",
  "钦州",
  "贵港",
  "玉林",
  "百色",
  "贺州",
  "河池",
  "来宾",
  "崇左",
  "南昌",
  "景德镇",
  "萍乡",
  "九江",
  "新余",
  "鹰潭",
  "赣州",
  "吉安",
  "宜春",
  "抚州",
  "上饶",
  "贵阳",
  "六盘水",
  "遵义",
  "安顺",
  "铜仁地区",
  "毕节地区",
  "黔西南布依族苗族自治州",
  "黔东南苗族侗族自治州",
  "黔南布依族苗族自治州",
  "昆明",
  "曲靖",
  "玉溪",
  "保山",
  "昭通",
  "丽江",
  "普洱",
  "临沧",
  "德宏傣族景颇族自治州",
  "怒江傈僳族自治州",
  "迪庆藏族自治州",
  "大理白族自治州",
  "楚雄彝族自治州",
  "红河哈尼族彝族自治州",
  "文山壮族苗族自治州",
  "西双版纳傣族自治州",
  "拉萨",
  "那曲地区",
  "昌都地区",
  "林芝地区",
  "山南地区",
  "日喀则地区",
  "阿里地区",
  "海口",
  "三亚",
  "五指山",
  "琼海",
  "儋州",
  "文昌",
  "万宁",
  "东方",
  "澄迈县",
  "定安县",
  "屯昌县",
  "临高县",
  "白沙黎族自治县",
  "昌江黎族自治县",
  "乐东黎族自治县",
  "陵水黎族自治县",
  "保亭黎族苗族自治县",
  "琼中黎族苗族自治县",
  "兰州",
  "嘉峪关",
  "金昌",
  "白银",
  "天水",
  "武威",
  "酒泉",
  "张掖",
  "庆阳",
  "平凉",
  "定西",
  "陇南",
  "临夏回族自治州",
  "甘南藏族自治州",
  "银川",
  "石嘴山",
  "吴忠",
  "固原",
  "中卫",
  "西宁",
  "海东地区",
  "海北藏族自治州",
  "海南藏族自治州",
  "黄南藏族自治州",
  "果洛藏族自治州",
  "玉树藏族自治州",
  "海西蒙古族藏族自治州",
  "乌鲁木齐",
  "克拉玛依",
  "吐鲁番地区",
  "哈密地区",
  "和田地区",
  "阿克苏地区",
  "喀什地区",
  "克孜勒苏柯尔克孜自治州",
  "巴音郭楞蒙古自治州",
  "昌吉回族自治州",
  "博尔塔拉蒙古自治州",
  "石河子",
  "阿拉尔",
  "图木舒克",
  "五家渠",
  "伊犁哈萨克自治州",
  "香港",
  "澳门",
  "台北市",
  "高雄市",
  "台北县",
  "桃园县",
  "新竹县",
  "苗栗县",
  "台中县",
  "彰化县",
  "南投县",
  "云林县",
  "嘉义县",
  "台南县",
  "高雄县",
  "屏东县",
  "宜兰县",
  "花莲县",
  "台东县",
  "澎湖县",
  "基隆市",
  "新竹市",
  "台中市",
  "嘉义市",
  "台南市"
];
export default {
  data() {
    return {
      fruits,
      labelPosition: "top",
      form: {
        cityName: "", // 城市编码
        communityName: "", // 社区名称
        address: "", // 小区地址
        name: "", // 姓名
        userPhone: "", // 手机号码
        contactPhone: "" // 联系人
      },
      docmHeight: document.documentElement.clientHeight, // 默认屏幕高度
      showHeight: document.documentElement.clientHeight, // 实时屏幕高度
      hidShow: true // 显示或者隐藏footer
    };
  },
  mounted() {
    let vm = this;
    // window.resize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
    //首页返回键处理
    //处理逻辑：1秒内，连续两次按返回键，则退出应用；
    var first = null;
    mui.back = function() {
      //首次按键，提示 再按一次退出应用
      if (!first) {
        first = new Date().getTime(); //记录第一次按下回退键的时间
        mui.toast("再按一次退出社区"); //给出提示
        // history.go(-1); //回退到上一页面
        setTimeout(function() {
          //1s中后清除
          first = null;
        }, 1000);
      } else {
        if (new Date().getTime() - first < 1000) {
          //如果两次按下的时间小于1s，
          plus.runtime.quit(); //那么就退出app
        }
      }
    };
  },
  watch: {
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        this.hidShow = false;
        console.log(this.hidShow);
      } else {
        this.hidShow = true;
      }
    }
  },

  methods: {
    outPage() {
      this.$router.goBack();
    },
    searchVague() {},
    addCommunity() {
      let commmData = {
        userPhone: this.form.contactPhone,
        cityName: this.form.cityName,
        communityName: this.form.communityName,
        name: this.form.name,
        contactPhone: this.form.contactPhone,
        address: this.form.address
      };
      localStorage.setItem("communityName", this.form.communityName);
      this.$axios({
        url: "admin/mobile/communityMessage/addCommunityCheckInfo",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: Qs.stringify(commmData)
      })
        .then(result => {
          if (result.data.status == "success") {
            this.$router.push("/toExamine");
          } else {
            this.$toast({
              message: "创建失败",
              position: "middle",
              duration: 1500
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
<style lang="less" scoped>
.mu-demo-form {
  width: 100%;
  max-width: 460px;
  margin-top: 10px;
}
.mu-form-item {
  margin-bottom: 0 !important;
}
</style>

<style scoped>
.create-comm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.ret-btn {
  display: inline-block;
  color: #fff;
  font-size: 30px;
}
.footer-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #ccc;
}
.step-next {
  width: 100%;
  height: 2.2rem;
  margin-top: 5vh;
}
.placeholder-text {
  font-size: 14px !important;
}
</style>
