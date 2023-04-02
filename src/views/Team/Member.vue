<template>
    <div class="team-member">
        <h5 class="team-member-title">
            XXX团队计划人员情况
        </h5>
        <div class="team-member-content">
            <div class="team-member-appling">
                <div class="team-member-subtitle">
                    申请中的人员
                </div>
                <div class="team-member-item">
                    <input id="c2" type="checkbox"> 小葱
                </div>
                <div class="team-member-item">
                    <input id="c2" type="checkbox"> 小葱
                </div>
                <div class="team-member-item">
                    <input id="c2" type="checkbox"> 小葱
                </div>
                <div class="btn">同意申请</div>
            </div>
            <div class="team-member-appled">
                <div class="team-member-subtitle">
                    已申请的人员
                </div>
                <div class="team-member-item">
                    暂无
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.team-member {
    background-color: #F4F9FD;
    min-height: 100vh;
    padding: 30px 20px;
    &-title {
        font-size: 24px;
        margin-bottom: 15px;
    }
    &-content {
        padding: 15px;
        background-color: #fff;
        border-radius: 15px;
    }
    &-subtitle {
        font-size: 19px;
        margin-bottom: 5px;
    }
    &-item {
        height: 25px;
        line-height: 25px;
        input {
            display: inline-block;
            vertical-align: middle;
            margin-right: 4px;
        }
    }
    &-appling {
        border-bottom: 1px solid #E4E6E8;
    }
    &-appled {
        padding-top: 10px;
    }
}
</style>