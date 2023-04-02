<template>
    <div class="mask">
        <div class="join">
            <h5 class="join-title">
                加入团队计划
                <span class="join-close">X</span>
            </h5>
            <div class="join-text">
                请输入邀请码：
            </div>
            <input class="join-input"/>
            <p class="join-desc">
                添加完成后可在计划列表中看到，可在计划列表中添加任务。
            </p>
            <div class="btn">提交</div>
        </div>
    </div>
</template>
<style lang="scss">
.mask {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: .5);
}
.join {
    width: 90%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 60px;
    background-color: #fff;
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    &-close {
        float: right;
    }
    &-text {
        font-size: 14px;
        margin-top: 20px;
    }
    &-desc {
        font-size: 10px;
        margin-top: 20px;
    }
    &-text,&-desc {
        color: #7D8592;
    }
    &-input {
        display: block;
        height: 48px;
        line-height: 48px;
        font-size: 17px;
        width: 100%;
        border: 1px solid #D8E0F0;
        border-radius: 15px;
        margin: 20px 0 30px;
    }
}
</style>