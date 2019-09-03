<template>
    <div class="authentication">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>我的认证
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <table width="100%" border="1" align="center">
                <tr>
                    <td align="center">认证社区</td>
                    <td align="center">
                        {{authenticationData.communityName}}
                    </td>
                </tr>
                <tr>
                    <td align="center">真实姓名</td>
                    <td align="center">
                        {{authenticationData.realName}}
                    </td>
                </tr>
                <tr>
                    <td align="center">角色类型</td>
                    <td align="center">
                        {{authenticationData.roleType}}
                    </td>
                </tr>
                <tr>
                    <td align="center">电话号码</td>
                    <td align="center">
                        {{authenticationData.userPhone}}
                    </td>
                </tr>
                <tr>
                    <td align="center">家庭住址</td>
                    <td align="center">
                        {{authenticationData.address}}
                    </td>
                </tr>
                <tr>
                    <td align="center">认证状态</td>
                    <td align="center">
                        {{authenticationData.check}}
                    </td>
                </tr>
                <tr>
                    <td align="center">认证时间</td>
                    <td align="center">
                        {{authenticationData.checkTime}}
                    </td>
                </tr>
            </table>
            <div class="upgrade" @click="editAuthen">
                <button>修改认证信息</button>
            </div>  
        </div>
    </div>
</template>
<script>
import Qs from 'qs';
export default {
    data() {
        return {
            authenticationData: {
                address: "",
                userPhone: "",
                realName: "",
                checkTime: "",
                check: "",
                roleType: "",
                communityName: ""
            }
        };
    },
    created () {
        this.authenticationData.communityName = localStorage.getItem("myCommunity")
        this.authenticationData.userPhone = localStorage.getItem("phone")
        this.getCommunityMessage();  
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        editAuthen() {
            localStorage.setItem('realName',this.authenticationData.realName);
            localStorage.setItem('address',this.authenticationData.address);
            this.$router.push("/editAuthen")
        },
        getCommunityMessage() {
            this.$axios({
                url: "admin/mobile/communityMessage/getCommunityUserPermission",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    userId: sessionStorage.getItem("userId"),
                    communityId: localStorage.getItem("communityId")
                })
            }).then((result) => {
                if (result.data.respCode == 1000) {
                    this.authenticationData.address = result.data.data.address;
                    this.authenticationData.communityName = result.data.data.communityName;
                    this.authenticationData.realName = result.data.data.realName;
                    this.authenticationData.checkTime = result.data.data.createTime;
                    if (result.data.data.companyRoleType == 5) {
                        this.authenticationData.roleType = "游客";
                    } else if (result.data.data.companyRoleType == 4) {
                        this.authenticationData.roleType = "业主";
                    } else{
                        this.authenticationData.roleType = "工作人员";
                    }
                    if (result.data.data.check == 0) {
                        this.authenticationData.check = "未认证用户"
                    } else {
                        this.authenticationData.check = "认证用户"
                    }
                }
            }).catch((err) => {
                console.log(err)
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
.title {
    font-weight: bold;
}
table{
    border-collapse:collapse;
    border: 1px solid #ccc;
}
table tr {
    height: 40px;
}
table tr td:first-child {
    width: 30%;
}
tr:nth-child(even){
    /* background-color:#FCC; */
}
tr:hover{
    /* background-color:#FF6; */
}
.upgrade {
    margin-top: 30px;
    width: 100%;
    height: 2.2rem;
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 2.2rem;
    border-radius: 6px;
    background-color: #ff5242;
}
.text {
    width: 100%;
    height: 100%;
    padding-left: 15px;
}
</style>
