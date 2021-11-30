import Home from './Views/public/Home.svelte'
import CollectorView from './Views/public/CollectorView.svelte'
import LunchMenuAdmin from './Views/admin/LunchMenuAdmin.svelte'
import AdminLayout from './Views/admin/AdminLayout.svelte'
import TripView from './Views/public/TripView.svelte'

const routes = [
  { name: '/', component: Home },
  { name: '/collector/:id', component: CollectorView },
  { name: '/trips/collector/:collection/trip/:id', component: TripView},
  {
    name: '/admin/manage-menus',
    component: AdminLayout,
    nestedRoutes: [
      { name: 'index', component: LunchMenuAdmin },
    ],
  },
]

export { routes }