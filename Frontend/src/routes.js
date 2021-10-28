import Home from './Views/public/Home.svelte'
import CollectorView from './Views/public/CollectorView.svelte'
import LunchMenuAdmin from './Views/admin/LunchMenuAdmin.svelte'
import AdminLayout from './Views/admin/AdminLayout.svelte'

const routes = [
  { name: '/', component: Home },
  { name: '/collector', component: CollectorView },
  {
    name: '/admin/manage-menus',
    component: AdminLayout,
    nestedRoutes: [
      { name: 'index', component: LunchMenuAdmin },
    ],
  },
]

export { routes }