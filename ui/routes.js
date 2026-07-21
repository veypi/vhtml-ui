export default ({ $mod }) => ({
  routes: [
    { path: '/', component: '/page/home.html', name: 'home' },
    {
      path: '/c/:name',
      component: (path, params) => `/examples/${params.name}.html`,
      layout: 'default',
      error_redirect: '/404'
    },
    { path: '*', component: '/page/404.html', layout: 'default' }
  ]
})
