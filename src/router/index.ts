import { createRouter,createWebHashHistory } from "vue-router";
import user from './user' 
import team from './team'
import plan from './plan'

const routes = [
 ...user,
 ...team,
 ...plan
]
 
const router = createRouter({
 history:createWebHashHistory('/'),
 routes
})
 
export default router