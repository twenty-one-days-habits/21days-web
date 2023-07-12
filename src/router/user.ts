
const routes = [{
    name: 'User',
    path: '/user',
    component: ()=>import("../views/User/Index.vue"),
    children: [{
        name: 'Login',
        path: 'login',
        component: ()=>import("../views/User/Login.vue")
    }, {
        name: 'Register',
        path: 'register',
        component: ()=>import("../views/User/Register.vue")
    }, {
        name: 'Forget',
        path: 'forget',
        component: ()=>import("../views/User/Forget.vue")
    }, {
        name: 'Reset',
        path: 'reset',
        component: () => import("../views/User/Reset.vue")
    }]
}]
export default routes;