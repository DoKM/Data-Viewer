<script>
	import { Router } from 'svelte-router-spa'
	import { routes } from './routes'
  </script>
  
  <style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  </style>


  <main>
	<Router {routes}/>
  </main>