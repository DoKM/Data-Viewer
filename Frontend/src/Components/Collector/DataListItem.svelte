<script>


    export let data
    export let columns = []
    export let index
    

    export let editDataFunc = (index) => {}
</script>

<tr>
    
    {#each columns as key}
        {#if key != "_id"}
            <td class="px-6 py-4 whitespace-nowrap text-sm bg-gray-100 text-gray-500">{data[key]?data[key]:""}</td>
        {/if}
    {/each}
    <td class="px-6 py-4 whitespace-nowrap bg-gray-200 text-right text-sm font-medium">
		<button on:click={()=> {console.log(index);editDataFunc(index)}}>edit</button>
	</td>
</tr>