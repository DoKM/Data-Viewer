import Home from './Views/public/Home.svelte'
import CollectorView from './Views/public/CollectorView.svelte'
import LunchMenuAdmin from './Views/admin/LunchMenuAdmin.svelte'
import AdminLayout from './Views/admin/AdminLayout.svelte'
import TripView from './Views/public/TripView.svelte'

const routes = {
  // Exact path
  '/': Home,

  // Using named parameters, with last being optional
  '/collector/:collector': CollectorView,

  '/collector/:collector/trips/:trip': TripView,
}

export { routes }