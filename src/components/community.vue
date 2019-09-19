<template>
    <div class="community">
        <mu-paper :z-depth="0" class="demo-loadmore-wrap">
            <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
                <mu-button icon slot="left" @click="openBotttomSheet">
                    <mu-icon value="menu"></mu-icon>
                </mu-button>签约社区
                <mu-button icon slot="right" @click="refresh()">
                    <mu-icon value="refresh"></mu-icon>
                </mu-button>
            </mu-appbar>
            <div class="search-value">
                <input type="text" v-model="searchValue" placeholder="请输入社区名" />
                <mu-icon value="search" color="#FF5242" class="magnifier" @click="searchVague"></mu-icon>
            </div>
            <mu-container ref="container" class="demo-loadmore-content">
                <mu-load-more
                    @refresh="refresh"
                    :refreshing="refreshing"
                    :loading="loading"
                    @load="load"
                >
                    <mu-list>
                        <div v-for="(item,index) in communData" :key="index">
                            <mu-list-item v-ripple @click.native="myCommunity(item.name,item.id)" class="muse-list">
                                <mu-list-item-title>{{item.name}}</mu-list-item-title>
                            </mu-list-item>
                        </div>
                    </mu-list>
                </mu-load-more>
            </mu-container>
        </mu-paper>
        <mu-button
            v-ripple
            fab
            color="red"
            class="add-commun"
            @click="createProject"
            v-show="hidShow"
        >
            <mu-icon value="add"></mu-icon>
        </mu-button>
        <div class="flex-wrapper footer-bottom" justify-content="center" v-show="hidShow">
            <mu-flex class="flex-demo" justify-content="center">携手共建美好家园</mu-flex>
        </div>
        <mu-container>
            <mu-bottom-sheet :open.sync="open">
                <div class="demo-picker-container">
                    <mu-button flat color="primary" @click="confirmCity" class="confirm-city">确认</mu-button>
                    <mu-button flat color="primary" @click="cancelCity" class="cancel-city">取消</mu-button>
                    <mu-slide-picker
                        :slots="addressSlots"
                        :visible-item-count="7"
                        @change="addressChange"
                        :values="address"
                    ></mu-slide-picker>
                </div>
            </mu-bottom-sheet>
        </mu-container>
    </div>
</template>
<script>
import Qs from "qs";
const address = {
    北京: ["北京"],
    广东: [
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
        "云浮"
    ],
    上海: ["上海"],
    天津: ["天津"],
    重庆: ["重庆"],
    辽宁: [
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
        "葫芦岛"
    ],
    江苏: [
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
        "宿迁"
    ],
    湖北: [
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
        "神农架林区"
    ],
    四川: [
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
        "凉山彝族自治州"
    ],
    陕西: [
        "西安",
        "铜川",
        "宝鸡",
        "咸阳",
        "渭南",
        "延安",
        "汉中",
        "榆林",
        "安康",
        "商洛"
    ],
    河北: [
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
        "衡水"
    ],
    山西: [
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
        "吕梁"
    ],
    河南: [
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
        "驻马店"
    ],
    吉林: [
        "长春",
        "吉林",
        "四平",
        "辽源",
        "通化",
        "白山",
        "松原",
        "白城",
        "延边朝鲜族自治州"
    ],
    黑龙江: [
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
        "大兴安岭地区"
    ],
    内蒙古: [
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
        "阿拉善盟"
    ],
    山东: [
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
        "菏泽"
    ],
    安徽: [
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
        "宣城"
    ],
    浙江: [
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
        "丽水"
    ],
    福建: [
        "福州",
        "厦门",
        "莆田",
        "三明",
        "泉州",
        "漳州",
        "南平",
        "龙岩",
        "宁德"
    ],
    湖南: [
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
        "湘西土家族苗族自治州"
    ],
    广西: [
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
        "崇左"
    ],
    江西: [
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
        "上饶"
    ],
    贵州: [
        "贵阳",
        "六盘水",
        "遵义",
        "安顺",
        "铜仁地区",
        "毕节地区",
        "黔西南布依族苗族自治州",
        "黔东南苗族侗族自治州",
        "黔南布依族苗族自治州"
    ],
    云南: [
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
        "西双版纳傣族自治州"
    ],
    西藏: [
        "拉萨",
        "那曲地区",
        "昌都地区",
        "林芝地区",
        "山南地区",
        "日喀则地区",
        "阿里地区"
    ],
    海南: [
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
        "琼中黎族苗族自治县"
    ],
    甘肃: [
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
        "甘南藏族自治州"
    ],
    宁夏: ["银川", "石嘴山", "吴忠", "固原", "中卫"],
    青海: [
        "西宁",
        "海东地区",
        "海北藏族自治州",
        "海南藏族自治州",
        "黄南藏族自治州",
        "果洛藏族自治州",
        "玉树藏族自治州",
        "海西蒙古族藏族自治州"
    ],
    新疆: [
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
        "伊犁哈萨克自治州"
    ],
    香港: ["香港"],
    澳门: ["澳门"],
    台湾: [
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
    ]
};
export default {
    data() {
        return {
            addressSlots: [
                {
                    width: "100%",
                    textAlign: "right",
                    values: Object.keys(address)
                },
                {
                    width: "100%",
                    textAlign: "left",
                    values: ["北京"]
                }
            ],
            address: ["北京", "北京"],
            addressProvince: "",
            addressCity: "",
            open: false,
            num: 10,
            refreshing: false,
            loading: false,
            text: "List",
            communData: [], // 所有社区的集合
            pageSize: 10,
            currentPage: 1,
            searchValue: "", // 搜索内容
            docmHeight: document.documentElement.clientHeight, // 默认屏幕高度
            showHeight: document.documentElement.clientHeight, // 实时屏幕高度
            hidShow: true // 显示或者隐藏footer
        };
    },
    created() {
        this.getCommunity();
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
        mui.back = function () {
            //首次按键，提示 再按一次退出应用
            if (!first) {
                first = new Date().getTime(); //记录第一次按下回退键的时间
                mui.toast("再按一次退出社区"); //给出提示
                // history.go(-1); //回退到上一页面
                setTimeout(function () {
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
            } else {
                this.hidShow = true;
            }
        }
    },
    methods: {
        myCommunity(name,id) {
            localStorage.setItem("myCommunity", name);
            localStorage.setItem("communityId", id);
            this.$store.dispatch("CHANGE_NAV", "widgets");
            this.$router.push("/layout/widgets");
        },
        addressChange(value, index) {
            switch (index) {
                case 0:
                    this.addressProvince = value;
                    const arr = address[value];
                    this.addressSlots[1].values = arr;
                    this.addressCity = arr[0];
                    break;
                case 1:
                    this.addressCity = value;
                    break;
            }
            this.address = [this.addressProvince, this.addressCity];
        },
        confirmCity() {
            this.address = [this.addressProvince, this.addressCity];
            this.open = false;
            this.getCommunity();
            console.log(this.address);
            console.log(this.addressCity);
        },
        cancelCity() {
            this.open = false;
        },
        closeBottomSheet() {
            this.open = false;
        },
        openBotttomSheet() {
            this.open = true;
        },
        refresh() {
            this.refreshing = true;
            this.$refs.container.scrollTop = 0;
            setTimeout(() => {
                this.refreshing = false;
                this.text = this.text === "List" ? "Menu" : "List";
                this.pageSize = 10;
                this.currentPage = 1;
            }, 2000);
        },
        load() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.pageSize = 10;
                this.currentPage++;
            }, 2000);
        },
        // 创建项目
        createProject() {
            this.$router.push("/createComm");
        },
        getCommunity() {

            this.$axios({
                url: "admin/mobile/communityMessage/list",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    page: this.currentPage,
                    limit: this.pageSize,
                    name: this.searchValue,
                    cityName: this.addressCity
                })
            })
                .then(result => {
                    this.communData = result.data.data.list;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 模糊搜索
        searchVague() {
            this.getCommunity();
        }
    }
};
</script>
<style lang="less" scoped>
.demo-loadmore-wrap {
    width: 100%;
    height: 70vh;
    display: flex;
    flex-direction: column;
    .mu-appbar {
        width: 100%;
    }
}
.demo-loadmore-content {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0;
}
</style>
<style scoped>
.community {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
}
.confirm-city {
    min-width: 61px;
    float: right;
}
.cancel-city {
    float: left;
    min-width: 61px;
}
.add-commun {
    position: fixed;
    bottom: 14vh;
    left: 43%;
    top: auto !important;
    right: auto !important;
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
.mu-appbar {
    background-color: #ff5242 !important;
}
.search-value {
    position: relative;
    width: 100%;
    height: 7vh;
    padding: 0 8px;
    background-color: #fff;
}
.search-value input {
    width: 100%;
    height: 32px;
    margin-top: 8px;
    background-color: rgb(230, 226, 226);
    border-radius: 16px;
    outline: none;
    padding: 15px;
}
.magnifier {
    position: absolute;
    top: 12px;
    right: 17px;
}
.muse-list {
    position: relative;
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .muse-list:before {
        content: "";
        pointer-events: none; /* 防止点击触发 */
        box-sizing: border-box;
        position: absolute;
        width: 200%;
        height: 200%;
        left: 0;
        top: 0;
        /* border-radius: 8px; */
        border-bottom: 1px solid #dcdcdc;
        -webkit-transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        transform: scale(0.5);
        transform-origin: 0 0;
    }
}
</style>
