<script>


    export let data
    export let columns = []
    export let index
    

    export let editData = (index) => {}
    console.log(editData)
</script>

<tr>
    
    {#each columns as key}
        {#if key != "_id"}
            <td class="px-6 py-4 whitespace-nowrap text-sm bg-gray-100 text-gray-500">{data[key]?data[key]:""}</td>
        {/if}
    {/each}
    <td class="px-6 py-4 whitespace-nowrap bg-gray-200 text-right text-sm font-medium">
		<button on:click={()=> editData(index)}>edit</button>
	</td>
</tr>