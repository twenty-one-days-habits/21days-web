
const routes = [{
    name: 'Team',
    path: '/team',
    component: ()=>import("../views/Team/Index.vue"),
    children: [{
        name: 'Result',
        path: 'result',
        component: ()=>import("../views/Team/Result.vue")
    }, {
        name: 'TeamList',
        path: 'list',
        component: ()=>import("../views/Team/List.vue")
    }, {
        name: 'TeamCreate',
        path: 'create',
        component: ()=>import("../views/Team/Create.vue")
    }, {
        name: 'Member',
        path: 'member',
        component: ()=>import("../views/Team/Member.vue")
    }]
}]
export default routes;