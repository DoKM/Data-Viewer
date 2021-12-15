<script>


    export let data
    export let columns = []
    $: console.log(data)
</script>

<tr>
    
    {#each columns as key}
        {#if key != "_id"}
            <td>{data[key]?data[key]:""}</td>
        {/if}
    {/each}
</tr>