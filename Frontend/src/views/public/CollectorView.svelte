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

    export let currentRoute

    onMount(loadCollector)

    
    export let name
    export let id
    export let owner
    export let description

    function loadCollector(){
        try {
            
        
            axios.get(`/collector/id/${currentRoute.namedParams.id}`, { crossdomain: true })
			.then((res) => {
				let collector = res.data;
                name = collector.name
                owner = collector.owner
                id = collector._id
                description = collector.description
                console.log(description)
                console.log(collector)
                console.log(res)
                
        // name = "pjenis"
			});
        }catch (error) {
            console.log(error)
        }
    }
  </script>
  
  <div>
    <h1 class="title is-4">ID of route/ {currentRoute.namedParams.id}</h1>
    <h1 class="title is-4">ID / {id}</h1>
    <h1 class="title is-4">Name / {name}</h1>
    <h1 class="title is-4">Owner / {owner}</h1>
    <h1 class="title is-4">Description / {description}</h1>


  </div>