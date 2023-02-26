import { createRouter,createWebHashHistory } from "vue-router";
import user from './user' 
console.log(user)
const routes = [
 ...user
]
 
const router = createRouter({
 history:createWebHashHistory('/'),
 routes
})
 
export default router