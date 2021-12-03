

<script>
    import axios from "axios";

    let url = window.location.href
    
    // axios.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest'}
    axios.defaults.baseURL = 'http://localhost:3000'

    import {
		onMount
	} from "svelte";

    import DashboardLayout from './../../Layout/DashboardLayout.svelte';
    import DataListItem from '../../Components/Collector/DataListItem.svelte';
    export let params = {}
    // export let currentRoute;
    
    export let collector = params.collector;
    export let id = params.trip;
    export let readings = []
    
    console.log(params)
    
    
    // console.log(currentRoute.namedParams)

    onMount(loadData)

    async function loadData(){
        await loadReadings()
    }



    async function loadReadings(){
        return new Promise((resolve, reject)=>{
            try {
            
                axios.get(`/data/collector/${collector}/trip/${id}`, { crossdomain: true })
			    .then((res) => {
                    console.log(res.data)
				    readings = res.data
                    // console.log(description)
                    // console.log(collector)
                    // console.log(res)
                    resolve();
			    });
            }catch (error) {
                
                console.log(error)
                reject(error)
            }
        })
    }


</script>

<DashboardLayout header hideHeader headerHeight={56} let:scroller>
    <div slot="header">
      <div class="header" class:shadow={!!scroller.scroll}>
              Page title
          </div>
    </div>
</DashboardLayout>

<div>
    test
    {url}
    
    {id}
    {collector}

    {#if readings.length >= 1}
    <table>
        <tr>
            {#each Object.keys(readings[0]) as key}
                <th>{key}</th>
            {/each}
        </tr>
        <tr>
            {#each readings as reading}
                <DataListItem data={reading}/>
            {/each}
        </tr>
    </table>
    {:else}
        Potato
    {/if}
</div>