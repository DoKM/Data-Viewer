<nav class="bg-blue-900 shadow-lg">
    <div class="container mx-auto">
        <div class="sm:flex">
            <a href="#" class="p-3 text-3xl font-bold text-white">APP LOGO</a>

            <!-- Menus -->
            <div class="mt-4 ml-55">
                <ul class="text-xl text-white sm:self-center">
                    <li class="sm:inline-block">
                        <a href="#" class="p-3 hover:text-red-900">About</a>
                    </li>
                    <li class="sm:inline-block">
                        <a href="#" class="p-3 hover:text-red-900">Services</a>
                    </li>
                    <li class="sm:inline-block">
                        <a href="#" class="p-3 hover:text-red-900">Blog</a>
                    </li>
                    <li class="sm:inline-block">
                        <a href="#" class="p-3 hover:text-red-900">Contact</a>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</nav>

<script>
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