<template>
    <div class="applyRepair">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;height: 2.8rem">
            <mu-button icon slot="left" @click="outPage">
                <i class="iconfont icon-fanhui ret-btn"></i>
            </mu-button>报修申请
            <mu-button icon slot="right">
                <!-- <mu-icon size="30" value="control_point"></mu-icon> -->
            </mu-button>
        </mu-appbar>
        <div class="container-main">
            <div class="content">
                <div class="flex-box" v-ripple @click="electricityRepair">
                    <mu-icon size="50" value="flash_off" color="#ff5242"></mu-icon>
                    <div class="text">电力报修</div>
                </div>
                <div class="flex-box" v-ripple @click="water">
                    <mu-icon size="50" value="invert_colors" color="#ff5242"></mu-icon>
                    <div class="text">供水报修</div>
                </div>
                <div class="flex-box" v-ripple @click="coalGas">
                    <mu-icon class="icon-explain" size="50" value="cake" color="#ff5242"></mu-icon>
                    <div class="text">煤气报修</div>
                </div>
                <div class="flex-box" v-ripple @click="house">
                    <mu-icon class="icon-explain" size="50" value="domain" color="#ff5242"></mu-icon>
                    <div class="text">房屋报修</div>
                </div>
            </div>
            <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="center"></mu-flex>
            </mu-flex>
            <mu-row>
                <mu-col span="12">
                    <div class="grid-cell">
                        <span class="current-application">当前申请</span>
                    </div>
                </mu-col>
            </mu-row>
            <mu-paper :z-depth="0">
                <mu-data-table
                    stripe
                    :columns="columns"
                    :sort.sync="sort"
                    @sort-change="handleSortChange"
                    :data="listTable"
                >
                    <template slot-scope="scope">
                        <td class="is-center">{{scope.row.processName}}</td>
                        <td class="is-center">{{scope.row.detail}}</td>
                        <td class="is-center">
                            <span v-if="scope.row.type == '2'">处理完成</span>
                            <span v-else>处理中...</span>
                        </td>
                        <td class="is-center">{{scope.row.detailPhoneOneName}}</td>
                        <td class="is-center">{{scope.row.detailOneDate}}</td>
                        <td class="is-center">{{scope.row.endTime}}</td>
                    </template>
                </mu-data-table>
            </mu-paper>
            <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="center"></mu-flex>
            </mu-flex>
            <mu-row>
                <mu-col span="12">
                    <div class="grid-cell">
                        <span class="current-application">历史申请</span>
                    </div>
                </mu-col>
            </mu-row>
            <mu-paper :z-depth="0">
                <mu-data-table
                    :columns="columns1"
                    :sort.sync="sort"
                    @sort-change="handleSortChange"
                    :data="listTableHis"
                >
                    <template slot-scope="scope">
                        <td class="is-center">{{scope.row.processName}}</td>
                        <td class="is-center">{{scope.row.detail}}</td>
                        <td class="is-center">
                            <span v-if="scope.row.type == '2'">处理完成</span>
                            <span v-else>处理中...</span>
                        </td>
                        <td class="is-center">{{scope.row.detailOneDate}}</td>
                    </template>
                </mu-data-table>
            </mu-paper>
        </div>
    </div>
</template>
<script>
import Qs from "qs";
export default {
    data() {
        return {
            sort: {
                name: "",
                order: "asc"
            },
            columns: [
                {
                    title: "事项",
                    name: "processName",
                    width: 150,
                    align: "center"
                },
                {
                    title: "描述",
                    name: "detail",
                    width: 226,
                    align: "center"
                },
                {
                    title: "阶段",
                    name: "type",
                    width: 126,
                    align: "center"
                },
                {
                    title: "当前处理人",
                    name: "userId",
                    width: 126,
                    align: "center"
                },
                {
                    title: "处理时间",
                    name: "detailOneDate",
                    width: 170,
                    align: "center"
                },
                {
                    title: "逗留时间",
                    name: "endTime",
                    width: 170,
                    align: "center"
                }
            ],
            columns1: [
                {
                    title: "事项",
                    name: "processName",
                    width: 150,
                    align: "center"
                },
                {
                    title: "描述",
                    name: "detail",
                    width: 226,
                    align: "center"
                },
                {
                    title: "阶段",
                    name: "type",
                    width: 126,
                    align: "center"
                },
                {
                    title: "处理时间",
                    name: "detailOneDate",
                    width: 170,
                    align: "center"
                },
            ],
            listTable: [], // 申请中的数据
            listTableHis: [], // 历史申请的数据
            timer: "",
        };
    },
    created() {
        this.getUserApplyWorkflowInfo();
        this.getUserApplyInfoHistory();
    },
    methods: {
        outPage() {
            this.$router.goBack();
        },
        electricityRepair() {
            this.$router.push("/electricityRepair");
        },
        handleSortChange({ name, order }) {
            this.list = this.list.sort((a, b) =>
                order === "asc" ? a[name] - b[name] : b[name] - a[name]
            );
        },
        water() {
            this.$router.push("/water");
        },
        coalGas() {
            this.$router.push("/coalGas");
        },
        house() {
            this.$router.push("/house");
        },
        //获取用户申请中的
        getUserApplyWorkflowInfo() {
            this.$axios({
                url: "admin/mobile/processCheck/getUserApplyWorkflowInfo",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    communityId: localStorage.getItem("communityId"),
                    status: "0",
                    userId: sessionStorage.getItem("userId")
                })
            })
                .then(result => {
                    if (result.data.respCode === "1000") {
                        this.listTable = result.data.data;
                        setInterval(() => {
                            this.nowTimeStr()
                            for (var i = 0;i < this.listTable.length;i++) {
                                let minutes = this.GetDateDiff(this.listTable[i].createTime, this.timer, "minute");
                                this.$set(this.listTable[i],'endTime',Math.floor(minutes/60) + "小时" + (minutes%60) + "分")
                                
                            }
                        }, 1000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //获取用户历史申请
        getUserApplyInfoHistory() {
            this.$axios({
                url: "admin/mobile/processCheck/getUserApplyWorkflowInfo",
                method: "post",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                },
                data: Qs.stringify({
                    communityId: localStorage.getItem("communityId"),
                    status: "1",
                    userId: sessionStorage.getItem("userId")
                })
            })
                .then(result => {
                    if (result.data.respCode === "1000") {
                        this.listTableHis = result.data.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        nowTimeStr() {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var timestr = year + "-" + month + "-" + day + "- "+h+":"+m+":"+s;
            this.timer =  timestr;
        },
        GetDateDiff(startTime, endTime, diffType) {
            //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
            startTime = startTime.replace(/\-/g, "/");
            endTime = endTime.replace(/\-/g, "/");
            //将计算间隔类性字符转换为小写
            diffType = diffType.toLowerCase();
            var sTime =new Date(startTime); //开始时间
            var eTime =new Date(endTime); //结束时间
            //作为除数的数字
            var timeType =1;
            switch (diffType) {
                case"second":
                    timeType =1000;
                    break;
                case"minute":
                    timeType =1000*60;
                    break;
                case"hour":
                    timeType =1000*3600;
                    break;
                case"day":
                    timeType =1000*3600*24;
                    break;
                default:
                    break;
            }
            return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
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
.content {
    width: 100%;
}
.flex-box {
    width: 25%;
    float: left;
    text-align: center;
    padding: 1vh 0;
}
.flex-wrapper {
    width: 100%;
    height: 10px;
}
.flex-demo {
    width: 100%;
    height: 100%;
    background-color: #ccc;
    opacity: 0.5;
}
.current-application {
    display: inline-block;
    font-size: 16px;
    font-weight: 500;
    padding: 6px 10px;
}
</style>
