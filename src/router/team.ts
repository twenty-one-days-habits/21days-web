
const routes = [{
    name: 'Team',
    path: '/team',
    component: ()=>import("../views/Team/Index.vue"),
    children: [{
        name: 'Result',
        path: 'result',
        component: ()=>import("../views/Team/Result.vue")
    }]
}]
export default routes;