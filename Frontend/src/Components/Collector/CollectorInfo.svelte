<script>
	import {link} from 'svelte-spa-router'
	// import { navigateTo } from 'svelte-router-spa'
	// import { Navigate } from 'svelte-router-spa'
	// logic goes here
	export let _id;
	export let name;
	export let owner;
	export let description;
	// export let link = `/collector/{_id}`
	
</script>

<!-- markup (zero or more items) goes here -->

	
<div class="flex flex-col m-1 rounded-lg">
	<div class="bg-gray-100 rounded-lg w-96">
		

		<div class="px-10 py-6 text-center">
			<div>
				<div class="mb-4 text-3xl font-bold text-purple-600 uppercase">{name}</div>
				<span>{owner}</span>
			</div>
			
			
			<span class="text-sm">
				{description}
			</span>
		</div>
			<a href="/collector/{_id}" use:link>
			<button
			class="w-full h-16 text-lg font-extrabold text-gray-100 transition duration-300 bg-purple-600 rounded-b-lg hover:bg-purple-700">Open</button>
		<!-- </Navigate > -->
		</a>
	</div>
</div>


<style>
	/* styles go here */
</style>

