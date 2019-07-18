<template>
    <div class="applyRepair">
        <mu-appbar color="#ff5242" style="width: 100%; text-align: center;height: 56px">
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
                    <mu-icon size="50" value="local_parking" color="#ff5242"></mu-icon>
                    <div class="text">电力报修</div>
                </div>
                <div class="flex-box" v-ripple>
                    <mu-icon size="50" value="local_see" color="#ff5242"></mu-icon>
                    <div class="text">供水报修</div>
                </div>
                <div class="flex-box" v-ripple>
                    <mu-icon class="icon-explain" size="50" value="local_shipping" color="#ff5242"></mu-icon>
                    <div class="text">煤气报修</div>
                </div>
                <div class="flex-box" v-ripple>
                    <mu-icon class="icon-explain" size="50" value="local_shipping" color="#ff5242"></mu-icon>
                    <div class="text">房屋报修</div>
                </div>
            </div>
            <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="center"></mu-flex>
            </mu-flex>
            <mu-row>
                <mu-col span="12">
                    <div class="grid-cell"><span class="current-application">当前申请</span></div>
                </mu-col>
            </mu-row>
            <mu-paper :z-depth="0">
                <mu-data-table
                    border
                    :columns="columns"
                    :sort.sync="sort"
                    @sort-change="handleSortChange"
                    :data="list.slice(0, 6)"
                >
                    <template slot-scope="scope">
                        <td>{{scope.row.name}}</td>
                        <td class="is-center">{{scope.row.calories}}</td>
                        <td class="is-center">{{scope.row.fat}}</td>
                        <td class="is-center">{{scope.row.carbs}}</td>
                        <td class="is-center">{{scope.row.protein}}</td>
                        <td class="is-center">{{scope.row.iron}}%</td>
                    </template>
                </mu-data-table>
            </mu-paper>
            <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="center"></mu-flex>
            </mu-flex>
            <mu-row>
                <mu-col span="12">
                    <div class="grid-cell"><span class="current-application">历史申请</span></div>
                </mu-col>
            </mu-row>
            <mu-paper :z-depth="0">
                <mu-data-table
                    border
                    :columns="columns"
                    :sort.sync="sort"
                    @sort-change="handleSortChange"
                    :data="list.slice(0, 6)"
                >
                    <template slot-scope="scope">
                        <td>{{scope.row.name}}</td>
                        <td class="is-center">{{scope.row.calories}}</td>
                        <td class="is-center">{{scope.row.fat}}</td>
                        <td class="is-center">{{scope.row.carbs}}</td>
                        <td class="is-center">{{scope.row.protein}}</td>
                        <td class="is-center">{{scope.row.iron}}%</td>
                    </template>
                </mu-data-table>
            </mu-paper>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            sort: {
                name: "",
                order: "asc"
            },
            columns: [
                { title: "事项", width: 100, name: "name" },
                {
                    title: "描述",
                    name: "calories",
                    width: 150,
                    align: "center",
                    sortable: true
                },
                {
                    title: "当前处理人",
                    name: "fat",
                    width: 126,
                    align: "center",
                    sortable: true
                },
                {
                    title: "处理时间",
                    name: "carbs",
                    width: 126,
                    align: "center",
                    sortable: true
                }
            ],
            list: [
                {
                    name: "Frozen",
                    calories: "Frozen",
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: 1
                },
                {
                    name: "Ice cream",
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: 1
                }
            ]
        };
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
