<script>
    import { each } from "svelte/internal";

    export let data
</script>

<tr>
    {#each Object.keys(data) as key}
        <td>{data[key]}</td>
    {/each}
</tr>