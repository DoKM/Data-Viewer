<script>
	// import { navigateTo } from 'svelte-router-spa'
	// import { Navigate } from 'svelte-router-spa'
	// logic goes here
	export let trip;

	export let id;
	
</script>

<tr>
	{#each Object.keys(trip) as key}
		
			<td>	
				{#if key == "_id"}
				<!-- <Navigate  to="/collector/{id}/trips/{trip[key]}"> -->
					<button>
						open
					</button>
				<!-- </Navigate> -->
					
				{:else}
					{trip[key]}
				{/if}
			</td>
		
	{/each}
</tr>