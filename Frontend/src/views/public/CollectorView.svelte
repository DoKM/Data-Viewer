<DashboardLayout header hideHeader headerHeight={56} let:scroller>
    <div slot="header">
      <div class="header" class:shadow={!!scroller.scroll}>
              Page title
          </div>
    </div>
</DashboardLayout>

<script>
    import DashboardLayout from './../../Layout/DashboardLayout.svelte';
    import axios from "axios";
    
    // axios.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest'}
    axios.defaults.baseURL = 'http://localhost:3000'

    import {
		onMount
	} from "svelte";
import TripsListItem from '../../Components/Collector/TripsListItem.svelte';

    export let currentRoute

    onMount(loadstuff)

    
    export let name
    export let id
    export let owner
    export let description

    export let trips


    async function loadstuff(){
        await loadCollector();
        await loadTrips();
    }

    function loadCollector(){
        return new Promise((resolve, reject)=>{
            try {
            
                axios.get(`/collector/id/${currentRoute.namedParams.id}`, { crossdomain: true })
			    .then((res) => {
                    console.log(res)
				    let collector = res.data;
                    name = collector.name
                    owner = collector.owner
                    id = collector._id
                    description = collector.description
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

    function loadTrips(){
        return new Promise((resolve, reject)=>{
            try{
                axios.get(`/trips/collector/${currentRoute.namedParams.id}`, { crossdomain: true })
			    .then((res) => {
                    console.log(res.data)
                    trips = res.data
                    resolve()
                })
            }catch(error){
                reject(error)
            }
        })
        
    }
  </script>
  
  <div>
    <h1 class="title is-4">ID of route/ {currentRoute.namedParams.id}</h1>
    <h1 class="title is-4">ID / {id}</h1>
    <h1 class="title is-4">Name / {name}</h1>
    <h1 class="title is-4">Owner / {owner}</h1>
    <h1 class="title is-4">Description / {description}</h1>


  </div>
  <div>

    {#if trips != undefined && trips.length >= 1}
        <table>
            <tr>
                {#each Object.keys(trips[0]) as key}
                    <th>
                        {key}
                    </th>
                {/each}
            </tr>
            {#each trips as trip}
                <TripsListItem trip = {trip} id= {id}/>
            {/each}
        </table>
    {:else}
        kut
    {/if}
    
  </div>