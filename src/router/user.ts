
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
    }]
}]
export default routes;