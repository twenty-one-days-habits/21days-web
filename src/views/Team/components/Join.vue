<script setup lang="ts">
    import Button from '@/components/Button.vue'
    import { joinTeam } from 'utils/team'
    import { defineEmits, ref } from 'vue';
    import { showToast } from 'vant';
    const emit = defineEmits(['close']);
    const code = ref('');
    const close = () => {
        emit('close')
    }
    const submit = async () => {
        const [team_id, invitation_code] = code.value.split(':');
        if (!team_id || !invitation_code) {
            showToast('邀请码有误')
            return;
        }
        await joinTeam({
            team_id,
            invitation_code,
        })
        showToast('申请成功，请联系队长审核')
        close()
    }
</script>
<template>
    <div class="mask">
        <div class="join">
            <h5 class="join-title">
                加入团队计划
                <span class="join-close" @click="close">X</span>
            </h5>
            <div class="join-text">
                请输入邀请码：
            </div>
            <input v-model="code" class="join-input"/>
            <p class="join-desc">
                添加完成后可在计划列表中看到，可在计划列表中添加任务。
            </p>
            <Button text="提交"  @click="submit" className="primary"/>
        </div>
    </div>
</template>
<style lang="scss">
.mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba($color: #000000, $alpha: .5);
    z-index: 10;
}
.join {
    width: 90%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 60px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    &-title {
        font-size: 18px;
    }
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
        font-size: 9px;
        width: 100%;
        border: 1px solid #D8E0F0;
        border-radius: 15px;
        margin: 20px 0 30px;
        padding: 0 10px;
        box-sizing: border-box;
    }
}
</style>