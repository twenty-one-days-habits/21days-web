export interface Plan {
  id: string,
  title: string,
  team_id: string,
  description: string,
  check_in_type: number,
  days: string,
  score: number,
  everyday: number,
  counts: number,
  date: string
}

export interface CheckInResponse {
  team_id: string,
  task_id: string
}
export interface UserInfo {
  active: boolean,
  created_at: string,
  email: string,
  first_name: string | null,
  id: string,
  is_admin: boolean,
  last_name: string | null,
  username: string,
}

export interface Team {
  created_at: string,
  created_by: string,
  description: string,
  end: string,
  id: string,
  invitation_code: string,
  leader: string,
  leader_info: UserInfo, 
  members: Array<UserInfo>,
  name: string,
  start: string,
  updated_at: string,
  updated_by: string
}

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}

// $createdAt
// : 
// "2023-06-06T12:46:53.192+00:00"
// $id
// : 
// "647f2abd2dba2a32b56a"
// clientCode
// : 
// ""
// clientEngine
// : 
// ""
// clientEngineVersion
// : 
// ""
// clientName
// : 
// "Python Requests"
// clientType
// : 
// "library"
// clientVersion
// : 
// "2.31"
// countryCode
// : 
// "us"
// countryName
// : 
// "United States"
// current
// : 
// true
// deviceBrand
// : 
// ""
// deviceModel
// : 
// ""
// deviceName
// : 
// ""
// expire
// : 
// "2024-06-05 12:46:53.187"
// ip
// : 
// "23.106.140.233"
// osCode
// : 
// ""
// osName
// : 
// ""
// osVersion
// : 
// ""
// provider
// : 
// "email"
// providerAccessToken
// : 
// ""
// providerAccessTokenExpiry
// : 
// ""
// providerRefreshToken
// : 
// ""
// providerUid
// : 
// "535172264@163.com"
// userId
// : 
// "6429231009aae62f8397"