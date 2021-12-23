<script>
	import AddCollector from './../../Components/Collector/API/AddCollector.svelte';
	import DashboardLayout from './../../Layout/DashboardLayout.svelte';
	import CollectorInfo from './../../Components/Collector/CollectorInfo.svelte';


	import API from './../../Services/Api.js';

	import {
		onMount
	} from "svelte";
	import App from '../../App.svelte';
	import CollectorView from './CollectorView.svelte';

	onMount(load);

	function load() {
		getCollectors()
	}

	var collectorList = []



	function getCollectors() {
		try {

			API.get(`/collector`)
				.then((res) => {
					collectorList = res;
				});
		} catch (error) {
			console.log(error)
		}
	};


	export let addCollectorWindow
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


<div class="fixed bottom-0 right-0 px-6 py-3 m-5 font-bold text-white bg-blue-500 rounded-full" on:click={() => addCollectorWindow.show()}>Create</div>

<AddCollector bind:this={addCollectorWindow} reload={load}/>