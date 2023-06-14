import { createRouter,createWebHashHistory } from "vue-router";
import user from './user' 
import team from './team'
import plan from './plan'
import today from './today'

const routes = [
 ...user,
 ...team,
 ...plan,
 ...today
]

const router = createRouter({
 history:createWebHashHistory('/'),
 routes
})
 
export default router