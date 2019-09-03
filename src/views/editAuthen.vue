<template>
    <div>
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>修改认证
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <table width="100%" border="1" align="center">
                <tr>
                    <td align="center">认证社区</td>
                    <td align="center">
                        <input type="text" class="text" v-model="communityName" />
                    </td>
                </tr>
                <tr>
                    <td align="center">真实姓名</td>
                    <td align="center">
                        <input type="text" class="text" v-model="auditForm.realName" />
                    </td>
                </tr>
                <tr>
                    <td align="center">手机号码</td>
                    <td align="center">
                        <input type="text" class="text" v-model="auditForm.phone" />
                    </td>
                </tr>
                <tr>
                    <td align="center">家庭住址</td>
                    <td align="center">
                        <input type="text" class="text" v-model="auditForm.address" />
                    </td>
                </tr>
            </table>
            <div class="upgrade" @click="submitAudit">
                <button>提交审核</button>
            </div>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            communityName: "",
            auditForm: {
                phone: "",
                communityId: "",
                realName: "", // 真实姓名
                address: "" //地址
            },
            communData: [],
            pageSize: 10000,
            currentPage: 1,
            searchValue: "" // 搜索内容
        };
    },
    created() {
        this.getCommunity();
        this.communityName = localStorage.getItem("myCommunity");
        this.auditForm.communityId = localStorage.getItem("communityId");
        this.auditForm.phone = localStorage.getItem("phone");
        this.auditForm.realName = localStorage.getItem("realName");
        this.auditForm.address = localStorage.getItem("address");
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        submitAudit() {
            for (let i = 0; i < this.communData.length; i++) {
                if (this.communityName === this.communData[i].name) {
                    this.auditForm.communityId = this.communData[i].id;
                }
            }
            this.$axios({
                url: "admin/mobile/communityMessage/addCommunityMember",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify(this.auditForm)
            })
                .then(result => {
                    console.log(result.data.respCode);
                    if (result.data.respCode == "1000") {
                        this.$alert(
                            "工作人员将在1-2个工作日内完成审核",
                            "提示",
                            {
                                okLabel: "知道了"
                            }
                        ).then(() => {
                            this.$router.push("/layout/person");
                        });
                    } else {
                        this.$toast.error("提交失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
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
                    cityName: ""
                })
            })
                .then(result => {
                    this.communData = result.data.data.list;
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
    margin-top: 10px;
    padding: 10px;
    height: calc(100vh - 56px);
    overflow-y: auto;
}
table {
    border-collapse: collapse;
    border: 1px solid #ccc;
}
table tr {
    height: 40px;
}
table tr td:first-child {
    width: 30%;
}
tr:nth-child(even) {
    /* background-color:#FCC; */
}
tr:hover {
    /* background-color:#FF6; */
}
.upgrade {
    margin-top: 30px;
    width: 100%;
    height: 3rem;
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 3rem;
    border-radius: 6px;
    background-color: #ff5242;
}
.text {
    width: 100%;
    height: 100%;
    padding-left: 15px;
}
</style>
