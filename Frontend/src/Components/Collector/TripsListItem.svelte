<script>
	import {link} from 'svelte-spa-router'

	export let trip;

	export let id;
	
	
</script>

<tr>
	{#each Object.keys(trip) as key}
		{#if key != "_id"}
			<td class="px-6 py-4 whitespace-nowrap text-sm bg-gray-100 text-gray-500">
				
					{trip[key]}
				
			</td>
			{/if}
		
	{/each}
	<td class="px-6 py-4 whitespace-nowrap bg-gray-200 text-right text-sm font-medium">
		<a href="/collector/{id}/trips/{trip["_id"]}" use:link class="text-indigo-600 hover:text-indigo-900">
				
					Open
				
			</a>
	</td>
</tr>