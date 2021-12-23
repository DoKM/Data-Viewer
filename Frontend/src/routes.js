import Home from './Views/public/Home.svelte'
import CollectorView from './Views/public/CollectorView.svelte'


import TripView from './Views/public/TripView.svelte'

const routes = {
  // Exact path
  '/': Home,

  '/collector/:collector': CollectorView,

  '/collector/:collector/trips/:trip': TripView,
}

export { routes }