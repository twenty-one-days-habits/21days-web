const routes = [{
  name: 'Today',
  path: '/today',
  component: ()=>import("../views/Today/index.vue"),
  children: [{
      name: 'TodayIndex',
      path: '/today/index',
      component: ()=>import("../views/Today/Today.vue")
  }]
}]
export default routes;