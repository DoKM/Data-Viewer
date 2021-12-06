<script>
	import DashboardLayout from './../../Layout/DashboardLayout.svelte';
	import CollectorInfo from './../../Components/Collector/CollectorInfo.svelte';
    import Modal from '../../Components/UI/Modal.svelte';
    import axios from "axios";
    
    // axios.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest'}
    axios.defaults.baseURL = 'http://localhost:3000'

    import {
		onMount
	} from "svelte";
    import App from '../../App.svelte';
    import CollectorView from './CollectorView.svelte';



    //Child Compontents
    export let createWindow;

    export const modalInfo = {

    }


    onMount(getCollectors);

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
    

    
</script>

<DashboardLayout header hideHeader headerHeight={56} let:scroller>
    <div slot="header">
      <div class="header" class:shadow={!!scroller.scroll}>
              Page title
          </div>
    </div>
</DashboardLayout>

<div>
    

    <div>
        
        
        
        <div class="flex flex-wrap justify-center px-3">
        {#each collectorList as collector}
            <CollectorInfo {...collector}/>
        {/each}
        </div>
    </div>


</div>


<div class="absolute bottom-0 right-0 px-6 py-3 m-5 font-bold text-white bg-blue-500 rounded-full" on:click={() => createWindow.show()}>Create</div>

<Modal bind:this={createWindow}>
    <span slot="title">Pjenis</span>
    <span slot="content">stuff</span>
</Modal>
