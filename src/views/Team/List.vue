<template>
    <van-loading size="24px" type="spinner" v-if="loading">加载中...</van-loading>
    <div v-else class="team-list">
        <textarea id="myInput" style="width:0;height:0;opacity: 0;"></textarea>
        <h2 class="team-title" v-if="currentPlan">
                {{ currentPlan.isStart ? '正在执行中的计划' : '未开始的团队计划' }}
        </h2>
        <div class="team-current" v-if="currentPlan">
            <div class="team-current-top">
                <div class="team-current-left">
                    <p class="team-current-title">{{currentPlan.name}}</p>
                    <p class="team-current-desc">{{currentPlan.description ? currentPlan.description : '暂无团队描述' }}</p>
                    <p class="team-current-time">
                        <i></i> 计划开始时间：{{$filters.dateFormat(currentPlan.start)}}
                    </p>
                </div>
                <div class="team-current-right" v-if="currentPlan.isLeader&&!currentPlan.isStart">
                    <!-- <i class="team-current-refresh"></i> -->
                    <i class="team-current-copy" id="copyBtn" ref="copyBtn" :data-clipboard-text="currentPlan.id+':'+currentPlan.invitation_code">复制邀请码</i>
                </div>
            </div>
            <div class="team-current-bottom">
                <div class="team-current-left">
                    <p class="team-current-title"  @click="toMember(currentPlan.id,currentPlan.name)">团队人员</p>
                    <span class="team-current-applying"  @click="toMember(currentPlan.id,currentPlan.name)" v-if="applyingCount">{{applyingCount}}</span>
                    <p class="team-current-desc" @click="toMember(currentPlan.id,currentPlan.name)">{{currentPlan.members}}等 &gt;</p>
                </div>
                <div class="team-current-right">
                    <p class="team-current-captain">队长 <span>{{currentPlan.leader_info.username}}</span></p>
                    <div class="team-current-detail" @click="toResult(currentPlan.id,currentPlan.name)">查看详情</div>
                </div>
            </div>
        </div>
        <Empty v-else />
        <div class="team-history" v-if="list.length">
            <h2 class="team-history-title">
                历史团队计划
            </h2>
            <div class="team-history-item" v-for="item in list" :key="item.id">
                <p class="team-current-title">{{item.name}}</p>
                <p class="team-current-desc">{{item.desc}}</p>
                <p class="team-current-desc">{{$filters.dateFormat(item.start)}}</p>
                <i class="team-history-detail" @click="toResult(item.id,item.name)">查看详情</i>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { teamList } from '@/utils/team'
import Empty from './components/Empty.vue'
import { ref } from 'vue';
import { useRouter} from 'vue-router'
import { teamUsers } from '@/utils/team'
import { showToast } from 'vant';
import ClipboardJS from 'clipboard'

const router = useRouter()
const showJoin = ref(false);
const loading = ref(true);
const list = ref([]);
const currentPlan = ref(null);
let applyingCount = ref(0);
const init = async () => {
    const { data: { data } } = await teamList();
    if (data.current_team.length) {
        currentPlan.value = { 
            ...data.current_team[0],
            isLeader: data.current_team[0].leader_info.id === localStorage.getItem('userId'),
            members: data.current_team[0].members.slice(0,2).map(member => member.user_info.username).join('、'),
            isStart: true
        };
    } else {
        const noStart = data.teams.find(item => {
            return new Date(item.start).getTime() > new Date().getTime()
        })
        if (noStart) {
            const isLeader = noStart.leader_info.id === localStorage.getItem('userId')
            currentPlan.value = {
                ...noStart,
                isLeader,
                members: noStart.members.slice(0,2).map(member => member.user_info.username).join('、'),
                isStart: false,
            }
            if (isLeader) {
                let { data: { data } } = await teamUsers(noStart.id, {is_allowed: false});
                applyingCount.value = data.length;
            }
        }
        
    }
    // console.log(data.current_team[0].member
    list.value = data.teams.filter(item => {
        return new Date(item.start).getTime() < new Date().getTime() && item.id !== currentPlan.value?.id
    });
    loading.value = false
}
const toMember = (id, name) => {
    router.push({
        path: '/team/members/' + id +'?name=' + encodeURIComponent(name),
        query: {
            name: encodeURIComponent(name)
        }
    })
}
const toResult = (id, name) => {
    router.push({
        path: '/team/result/' + id +'?name=' + encodeURIComponent(name),
        query: {
            name: encodeURIComponent(name)
        }
    })
}

const clipboard = new ClipboardJS('#copyBtn');
clipboard.on('success', function(e) {
    showToast('复制成功')
    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.log('Action:', e.action);
    console.log('Trigger:', e.trigger);
});
    // clipboard.destroy();

init();

</script>

<style lang="scss">
.team-list {
    padding-top: 15px;
    width: 335px;
    margin: 0 auto;
}
.team-title {
    font-size: 18px;
    margin-bottom: 15px;
}
.team-current {
    border-radius: 15px;;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.1);
    padding: 20px;
    box-sizing: border-box;
    &-applying {
        background-color: red;
        width: 18px;
        height: 18px;
        display: inline-block;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        line-height: 18px;
        position: absolute;
        margin-left: 65px;
        margin-top: -20px;
    }
    &-top {
        display: flex;
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    &-title {
        font-size: 15px;
    }
    &-desc {
        font-size: 14px;
        color: $gray;
        margin-top: 6px;
        span {
            text-decoration:underline;
        }
    }
    &-time {
        color: $gray;
        margin-top: 10px;
        i {
            display: inline-block;
            width: 15px;
            height: 15px;
            background-image: url('../../assets/calender.png');
            background-size: 100% 100%;
            position: relative;
            top: 3px;
        }
    }
    &-right {
        flex: 1;
        position: relative;
    }
    &-refresh {
        display: inline-block;
        width: 15px;
        height: 15px;
        background-image: url('../../assets/refresh.png');
        background-size: 100% 100%;
        position: absolute;
        right: 0;
    }
    &-copy {
        display: inline-block;
        width: 79px;
        height: 25px;
        background-color: $blue;
        color: #fff;
        line-height: 25px;
        border-radius: 10px;
        position: absolute;
        right: 0;
        top: 35px;
        text-align: center;
        font-size: 10px;
    }
    &-bottom {
        display: flex;
    }
    &-captain {
        float: right;
        span {
            color: $gray;
        }
    }
    &-detail {
        color: $blue;
        position: absolute;
        top: 30px;
        right: 10px;
        &::after {
            content: '';
            width: 15px;
            height: 15px;
            background-image: url('../../assets/right.png');
            background-size: 100% 100%;
            position: absolute;
            right: -13px;
            margin-top: 1px;
        }
    }
}
.team-history {
    &-title {
        font-size: 18px;
        margin: 35px 0 25px;
    }
    &-item {
        border-radius: 15px;;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.1);
        padding: 20px;
        position: relative;
        margin-top: 20px;
    }
    &-detail {
        display: inline-block;
        width: 79px;
        height: 25px;
        background-color: $blue;
        color: #fff;
        line-height: 25px;
        border-radius: 10px;
        position: absolute;
        right: 15px;
        top: 40px;
        text-align: center;
        font-size: 10px;
    }
}
</style>