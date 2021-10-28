<DashboardLayout header hideHeader headerHeight={56} let:scroller>
    <div slot="header">
      <div class="header" class:shadow={!!scroller.scroll}>
              Page title
          </div>
    </div>
</DashboardLayout>

<script>
	import DashboardLayout from './../../Layout/DashboardLayout.svelte';
	import CollectorInfo from './../../Components/Collector/CollectorInfo.svelte';
    import axios from "axios";
    
    // axios.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest'}
    axios.defaults.baseURL = 'http://localhost:3000'

    import {
		onMount
	} from "svelte";
import AdminLayout from '../admin/AdminLayout.svelte';
import App from '../../App.svelte';
import LunchMenuAdmin from '../admin/LunchMenuAdmin.svelte';


    let count = 30;
    let name = "undefined"

    onMount(getCollectors);

    function handleClick() {
        getCollectors()
        
    }

    var collectorList = []
    

    function getCollectors() {
        try {
            
        
            axios.get(`/collector`, { crossdomain: true })
			.then((res) => {
				collectorList = res.data;
                console.log(res)
                
        // name = "pjenis"
			});
        }catch (error) {
            console.log(error)
        }
	};
    

    export { count }
</script>

<div>
    

    <div>
        
        
        <button id="button" on:click={handleClick}>Test {count}</button>
        <div class="flex flex-wrap justify-center px-3">
        {#each collectorList as collector}
            <CollectorInfo {...collector}/>
        {/each}
        </div>
    </div>


</div>