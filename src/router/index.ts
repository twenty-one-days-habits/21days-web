import { createRouter,createWebHashHistory } from "vue-router";
import user from './user' 
import team from './team'
import plan from './plan'
import today from './today'

const routes = [
 {
    name: 'Main',
    path: '/',
    redirect: '/team/list'
 },
 ...user,
 ...team,
 ...plan,
 ...today,
 {
   name: 'Home',
   path: '/home',
   component: ()=>import("../views/Home/Index.vue"),
 }
]

const router = createRouter({
 history:createWebHashHistory('/'),
 routes
})
 
export default router