const routes = [{
  name: 'Plan',
  path: '/plan',
  component: ()=>import("../views/Plan/Index.vue"),
  children: [{
      name: 'PlanList',
      path: '/plan/list',
      component: ()=>import("../views/Plan/List.vue")
  }, {
    name: 'PlanCreate',
    path: '/plan/create/:teamId',
    component: ()=>import("../views/Plan/Create.vue")
  }]
}]
export default routes;