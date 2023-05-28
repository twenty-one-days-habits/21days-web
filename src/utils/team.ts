import request from './request'
  
export function teamCreate( data:any ){
    return request({
        url: '/teams/create',
        method: "post",
        data
    })
}

export function teamList () {
    return request({
        url: '/teams/my'
    })
}

export function joinTeam (data) {
    // /teams/join
    return request({
        url: '/teams/join',
        method: "post",
        data
    })
}

export function teamUsers (teamId, params = {}) {
    return request({
        // teams/83d95f163c834b12a8d050f463e84359/user
        url: '/teams/' + teamId +'/users',
        params
    })
}

export function teamApprove(teamId, user_ids) {
    return request({
        // teams/83d95f163c834b12a8d050f463e84359/user
        url: '/teams/' + teamId +'/users/approve',
        method: "post",
        data: {
            user_ids,
        }
    })
}

export function getTeamStatics(teamId) {
    ///teams/83d95f163c834b12a8d050f463e84359/statistic
    return request({
        // teams/83d95f163c834b12a8d050f463e84359/user
        url: '/teams/' + teamId +'/statistic',
    })
}

