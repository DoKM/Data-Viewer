<script>
	// import { navigateTo } from 'svelte-router-spa'
	import { Navigate } from 'svelte-router-spa'
	// logic goes here
	export let trip;

	export let id;
	
</script>

<tr>
	{#each Object.keys(trip) as key}
		
			<td>	
				{#if key == "_id"}
				<Navigate  to="/trips/collector/{id}/trip/{trip[key]}">
					<button>
						lmao
					</button>
				</Navigate>
					
				{:else}
					{trip[key]}
				{/if}
			</td>
		
	{/each}
</tr>