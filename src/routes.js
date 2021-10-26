// Admin Layout
import Admin from "./layouts/Admin.svelte";
// Auth Layout
import Auth from "./layouts/Auth.svelte";

// No Layout Pages
import Index from "./views/Index.svelte";
import Landing from "./views/Landing.svelte";
import Profile from "./views/Profile.svelte";

const routes = [
  { name: 'admin/*admin', component: Admin },
  {
    name: 'landing',
    component: Landing,
  },
  { name: "/", component: Index}
]

export { routes }