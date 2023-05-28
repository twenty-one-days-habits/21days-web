import { createRouter,createWebHashHistory } from "vue-router";
import user from './user' 
import team from './team'
import plan from './plan'
console.log(user);
console.log(team);
console.log(plan);

const routes = [
 ...user,
 ...team,
 ...plan,
]
console.log(routes)
const router = createRouter({
 history:createWebHashHistory('/'),
 routes
})
 
export default router