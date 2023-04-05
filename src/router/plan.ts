const routes = [{
  name: 'Plan',
  path: '/plan',
  component: ()=>import("../views/Plan/Index.vue"),
  children: [{
      name: 'today',
      path: 'today',
      component: ()=>import("../views/Plan/Today.vue")
  }, {
      name: 'List',
      path: 'list',
      component: ()=>import("../views/Plan/List.vue")
  }, {
    name: 'Create',
    path: 'create',
    component: ()=>import("../views/Plan/Create.vue")
}]
}]
export default routes;