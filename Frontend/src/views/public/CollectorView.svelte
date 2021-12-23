<script>
  import AddTrip from './../../Components/Collector/API/AddTrip.svelte';
  import EditCollector from "./../../Components/Collector/API/EditCollector.svelte";
  import DashboardLayout from "./../../Layout/DashboardLayout.svelte";
  import {
    push,
    pop,
    replace
  } from "svelte-spa-router";
  import API from "./../../Services/Api.js";

  import {
    onMount
  } from "svelte";
  import TripsListItem from "../../Components/Collector/TripsListItem.svelte";



  export let params = {};

  //onMount Action

  onMount(load);


  //Dynamic data
  export let collector = {};
  export let trips;


  //Modal vars
  export let addTripWindow;
  export let editCollectorWindow;

  async function load() {
    await loadCollector();
    await loadTrips();
  }

  function loadCollector() {
    return new Promise((resolve, reject) => {
      try {
        API.get(`/collector/id/${params.collector}`).then((res) => {
          console.log(res);
          collector = res;
          resolve();
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  function loadTrips() {
    return new Promise((resolve, reject) => {
      try {
        API.get(`/trips/collector/${params.collector}`).then((res) => {
          console.log(res);
          trips = res;
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }
</script>

<DashboardLayout header hideHeader headerHeight={56} let:scroller>
  <div slot="header">
    <div class="header" class:shadow={!!scroller.scroll}>Page title</div>
  </div>
</DashboardLayout>
<div class="grid h-full grid-cols-2 gap-4">
  <div class=" rounded overflow-hidden shadow-lg m-4">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">Collector: {collector.name}</div>
      <p class="text-gray-700 text-base">
        <ul>
          <li>Owner: {collector.owner}</li>
          <li>Description: {collector.description}</li>
        </ul>
    </div>
    <div class="px-6 pt-4 pb-2">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded" on:click={()=>
        editCollectorWindow.show()}>Edit Collector</button>
    </div>
  </div>
  <div class="h-full m-2">
    <div class="h-full overflow-x-auto overflow-y-auto">
      {#if trips != undefined && trips.length >= 1}
        <table class="table-auto border-collapse w-full">
          <thead class="bg-gray-50">
            <tr>
              {#each Object.keys(trips[0]) as key}
                {#if key != "_id"}
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {key}
                  </th>
                {/if}
              {/each}
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each trips as trip}
              <TripsListItem {trip} id={collector["_id"]} />
            {/each}
          </tbody>
        </table>
      {/if}
    </div>
  </div>
</div>

<div
  class="fixed bottom-0 right-0 px-6 py-3 m-5 font-bold text-white bg-blue-500 rounded-full"
  on:click={() => addTripWindow.show()}
>
  Create
</div>

<AddTrip bind:this={addTripWindow} reload={load} {params}/>

<EditCollector bind:this={editCollectorWindow} reload={load} {collector} {params}/>