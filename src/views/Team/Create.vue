<template>
    <div class="team-create">
        <div class="team-create-item">
            <div class="team-create-label">
                团队计划名称
            </div>
            <div>
                <input class="team-create-input" placeholder="请输入团队计划名称"/>
            </div>
        </div>
        <div class="team-create-item">
            <div class="team-create-label">
                开始日期
            </div>
            <div>
                <input class="team-create-input" placeholder="请输入开始日期"/>
                <span class="team-create-calender"></span>
            </div>
        </div>
        <!-- <div class="team-create-item">
            <div class="team-create-label">
                结束日期
            </div>
            <div>
                <input class="team-create-input" placeholder="请输入开始日期"/>
            </div>
        </div> -->
        <div class="team-create-item">
            <div class="team-create-label">
                描述
            </div>
            <div>
                <input class="team-create-input" placeholder="请输入开始日期"/>
            </div>
        </div>
        <div class="btn">完成设置</div>
    </div>
</template>
<style lang="scss" scoped>
.team-create {
    padding: 20px;
    &-label {
        font-size: 18px;
        margin-top: 20px;
    }
    &-input {
        font-size: 20px;
        border: none;
        display: block;
        width: 100%;
        height: 40px;
        margin-top: 10px;
    }
    &-calender {
        display: block;
        width: 20px;
        height: 20px;
        float: right;
        margin-top: -30px;
        background-image: url('@/assets/calender.png');
        background-size: 100% 100%;
    }
}
</style>