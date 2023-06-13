
const routes = [{
    name: 'Team',
    path: '/team',
    component: ()=>import("../views/Team/Index.vue"),
    children: [{
        name: 'TeamResult',
        path: 'result/:teamId',
        component: ()=>import("../views/Team/Result.vue")
    }, {
        name: 'TeamList',
        path: '/team/list',
        component: ()=>import("../views/Team/List.vue")
    }, {
        name: 'TeamCreate',
        path: '/team/create',
        component: ()=>import("../views/Team/Create.vue")
    }, {
        name: 'TeamMember',
        path: 'members/:teamId',
        component: ()=>import("../views/Team/Member.vue")
    }]
}]
export default routes;