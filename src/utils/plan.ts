import request from './request'
import { Plan } from '../interface/plan'

/**
 * 签到
 */
export function getAllPlans(teamId: string, userId: string, data: any) {
  return request({
    url: `/tasks/${teamId}/${userId}`,
    method: "get",
    data
  })
}

/**
 * 获取我的团队
 * @returns 
 */
export function getMyTeams() {
  return request({
    url: `/teams/my`,
    method: "get",
    data: {
      page: 1,
      per_page: 10
    }
  })
}

/**
 * 签到
 * @returns 
 */
export function checkIn(teamId: string, taskId: string) {
  return request({
    url: `/tasks/checkin`,
    method: "post",
    data: {
      team_id: teamId,
      task_id: taskId
    }
  })
}

/**
 * 创建任务：不限制
 * @param data 
 * @returns 
 */
export function createTask(data: Plan) {
  return request({
    url: `/tasks`,
    method: "post",
    data
  })
}

// 修改任务
export function editTask(data: Plan) {
  return request({
    url: `/tasks/${data.id}`,
    method: "put",
    data
  })
}

export function getTasksByDate(teamId:string, userId:string, date: string) {
  return request({
    url: `/tasks/${teamId}/${userId}`,
    method: "get",
    params: {
      date
    }
  })
}


export function getTasksList(teamId:string, userId:string) {
  return request({
    url: `/tasks/plan/${teamId}/${userId}`,
  })
}

export function getDetail(taskId:string) {
  return request({
    url: `/tasks/${taskId}`,
  })
}