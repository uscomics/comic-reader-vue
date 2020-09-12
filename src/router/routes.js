
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Builder.vue') },
      { path: 'index', component: () => import('pages/Index.vue') },
      { path: 'Toon/:archetype_id/:build', component: () => import('pages/Toon.vue') },
      { path: 'AT', component: () => import('pages/AT.vue') },
      { path: 'Notes', component: () => import('pages/Notes.vue') },
      { path: 'reader', component: () => import('pages/Reader.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
