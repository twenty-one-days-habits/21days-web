<template>
    <div class="team-result">
        <div class="team-result-title">XXX团队完成情况总览</div>
        <div class="team-result-item">
            <p class="team-result-desc">成员名称</p>
            <p class="team-result-name">小葱</p>
            <div class="team-result-every">
                <img class="team-result-icon" src="../../assets/icon_all.png">
                <div class="team-result-detail">
                    <div class="team-result-back">
                        <div class="team-result-process"></div>
                    </div>
                    <div class="team-result-text">
                        <span class="plan-name">任务一</span>
                        <span class="plan-right">3/<em>5</em></span>
                    </div>
                </div>
            </div>
            <div class="team-result-every">
                <img class="team-result-icon" src="../../assets/icon_all.png">
                <div class="team-result-detail">
                    <div class="team-result-back">
                        <div class="team-result-process"></div>
                    </div>
                    <div class="team-result-text">
                        <span class="plan-name">任务一</span>
                        <span class="plan-right">3/<em>5</em></span>
                    </div>
                </div>
            </div>
            <div class="team-result-every">
                <img class="team-result-icon" src="../../assets/icon_all.png">
                <div class="team-result-detail">
                    <div class="team-result-back">
                        <div class="team-result-process"></div>
                    </div>
                    <div class="team-result-text">
                        <span class="plan-name">任务一</span>
                        <span class="plan-right">3/<em>5</em></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.team-result {
    min-height: 100vh;
    background-color: #F4F9FD;
    padding: 23px;
    &-title {
        font-size: 24px;
        line-height: 1.6;
    }
    &-item {
        border-radius: 8px;
        background-color: #FFFFFF;
        padding: 15px;
    }
    &-desc {
        color: #91929E;
        font-size: 14px;
    }
    &-name {
        margin-top: 10px;
        border-bottom: 1px solid #E4E6E8;
        padding-bottom: 10px;
    }
    &-detail {
        margin-left: 30px;
        flex: 1;
    }
    &-every {
        margin-top: 20px;
        display: flex;
    }
    &-icon {
        width: 40px;
        display: block;
    }
    &-back {
        height: 5px;
        margin-top: 10px;
        background-color: rgba(#E4E6E8, 0.5);
    }
    &-process {
        background-color: #A46BFF;
        width: 30%;
        height: 5px;
    }
    &-text {
        margin-top: 10px;
    }
    .plan-right {
        float: right;
        em {
            color: #ccc;
        }
    }
}
</style>