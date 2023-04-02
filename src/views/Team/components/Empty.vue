<template>
    <div class="empty">
        <img src="@/assets/empty.png"/>
        <div class="empty-desc">
            当前没有正在执行中的计划
        </div>
    </div>
    <div style="height: 58px;margin-top: 25px;">
        <div class="empty-create">
            创建团队计划
        </div>
        <div class="empty-join">
            加入团队计划
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .empty {
        text-align: center;
        padding-top: 20px;
        &-desc {
            margin-top: 10px;
            font-size: 12px;
        }
        &-create, &-join {
            width: 144px;
            height: 58px;
            line-height: 58px;
            font-size: 18px;
            color: #fff;
            text-align: center;
            border-radius: 12px;
            font-weight: bold;
        }
        &-create {
           background-color: rgba(#753ECF, 0.8); 
           float: left;
        }
        &-join {
            background-color: #FFAA00;
            float: right;
        }
    }
</style>