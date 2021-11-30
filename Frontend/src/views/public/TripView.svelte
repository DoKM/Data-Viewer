

<script>
import { onMount } from 'svelte';

    import DashboardLayout from './../../Layout/DashboardLayout.svelte';
    export let currentRoute;
    export let id = currentRoute.namedParams.id;
    export let collector = currentRoute.namedParams.collection;

    export let readings = []
    
    console.log(currentRoute.namedParams)

    onMount()

    async function loadData(){
        await loadData()
    }

    async function loadReadings(){

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
    {id}
    {collector}
    {currentRoute.namedParams.collection}
    {currentRoute.namedParams.id}
</div>