<script>
	import DashboardLayout from './../../Layout/DashboardLayout.svelte';
	import CollectorInfo from './../../Components/Collector/CollectorInfo.svelte';
	import Modal from '../../Components/UI/Modal.svelte';

  import { collector } from '../../Stores/Collector';

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




	onMount(getCollectors);

	var collectorList = []



	function getCollectors() {
	  try {

	    axios.get(`/collector`, {
	        crossdomain: true
	      })
	      .then((res) => {
	        collectorList = res.data;
	        console.log(res)

	        // name = "pjenis"
	      });
	  } catch (error) {
	    console.log(error)
	  }
	};
  
  function createCollector(){
    console.log($collector)
    try {
      axios.post(`/collector`,$collector, {
	        crossdomain: true
          
	      })
	      .then((res) => {
	        
	        console.log(res)
          createWindow.hide()
          getCollectors()

	        // name = "pjenis"
	      });
    } catch (error){
      console.log(error)
    }
    
    
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
    

    <div>
        
        
        
        <div class="flex flex-wrap justify-center px-3">
        {#each collectorList as collector}
            <CollectorInfo {...collector}/>
        {/each}
        </div>
    </div>


</div>


<div class="fixed bottom-0 right-0 px-6 py-3 m-5 font-bold text-white bg-blue-500 rounded-full" on:click={() => createWindow.show()}>Create</div>

<Modal bind:this={createWindow}>
    <span slot="title">Create new Collector</span>
    <span slot="content">
        <div class="mb-6 md:flex md:items-center">
            <div class="md:w-1/3">
              <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-name">
                Name
              </label>
            </div>
            <div class="md:w-2/3">
              <input bind:value={$collector.name} class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500" id="inline-name" type="text" placeholder="Collecter #">
            </div>
          </div>
          <div class="mb-6 md:flex md:items-center">
            <div class="md:w-1/3">
              <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-owner">
                Owner
              </label>
            </div>
            <div class="md:w-2/3">
              <input bind:value={$collector.owner} class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500" id="inline-owner" type="text" placeholder="Owner">
            </div>
          </div>
          <div class="mb-6 md:flex md:items-center">
            <div class="md:w-1/3">
              <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-description">
                Description
              </label>
            </div>
            <div class="md:w-2/3">
              <textarea bind:value={$collector.description} class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
            </div>
          </div>

          
          
          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              
            </div>
          </div>
    </span>
    <span slot="button">
        <button type="button" on:click={()=>createCollector()} class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
            Create  
        </button>
    </span>
</Modal>
