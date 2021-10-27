<nav class="bg-blue-900 shadow-lg">
    <div class="container mx-auto">
        <div class="sm:flex">
            <a href="#" class="text-white text-3xl font-bold p-3">APP LOGO</a>

            <!-- Menus -->
            <div class="ml-55 mt-4">
                <ul class="text-white sm:self-center text-xl">
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
    import axios from "axios";
    axios.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest'}
    axios.defaults.baseURL = 'http://localhost:3000'

    import {
		onMount
	} from "svelte";

    let count = 30;
    let name = "undefined"

    onMount(getCollectors);

    function handleClick() {
        getCollectors()
        
    }

    var collectorList = []
    

    function getCollectors() {
        try {
            
        
            axios.get(`/books/mongo`, { crossdomain: true })
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
        {#each collectorList as collector}
            <p id="test">Collector name = {collector.name}</p>
            <p id="test">Collector owner = {collector.owner}</p>
            <p id="test">Collector description = {collector.description}</p>
        {/each}
    </div>


</div>