import { createRouter,createWebHashHistory } from "vue-router";
import user from './user' 
import team from './team'
const routes = [
 ...user,
 ...team
]
 
const router = createRouter({
 history:createWebHashHistory('/'),
 routes
})
 
export default router