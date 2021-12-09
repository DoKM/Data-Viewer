<script>
  import DashboardLayout from "./../../Layout/DashboardLayout.svelte";
  import {push, pop, replace} from 'svelte-spa-router'
  import axios from "axios";

  // axios.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest'}
  axios.defaults.baseURL = "http://localhost:3000";

  import { onMount } from "svelte";
  import TripsListItem from "../../Components/Collector/TripsListItem.svelte";
  import Modal from "../../Components/UI/Modal.svelte";

  //Writeable stores
  import { collector } from "../../Stores/Collector";
  import { trip } from "./../../Stores/Trip.js";

  export let params = {};

  onMount(loadstuff);

  export let name;
  export let id;
  export let owner;
  export let description;

  export let trips;

  export let createTripsWindow;
  export let editCollectorWindow;

  async function loadstuff() {
    await loadCollector();
    await loadTrips();
  }

  function loadCollector() {
    console.log("YEEEEEEEEEEEEEEEET");

    return new Promise((resolve, reject) => {
      try {
        axios
          .get(`/collector/id/${params.collector}`, { crossdomain: true })
          .then((res) => {
            console.log(res);
            let collector = res.data;
            name = collector.name;
            owner = collector.owner;
            id = collector._id;
            description = collector.description;
            // console.log(description)
            // console.log(collector)
            // console.log(res)
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
        axios
          .get(`/trips/collector/${params.collector}`, { crossdomain: true })
          .then((res) => {
            console.log(res.data);
            trips = res.data;
            resolve();
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  async function createTrip() {
    try {
      axios
        .post(`/trips/collector/${params.collector}`, $trip, {
          crossdomain: true,
        })
        .then((res) => {
          console.log(res.data);
          loadTrips();
          createTripsWindow.hide();
        });
    } catch (error) {
      reject(error);
    }
  }

  async function editCollector() {
    try {
      axios
        .put(`/collector/id/${params.collector}`, $collector, {
          crossdomain: true,
        })
        .then((res) => {
          console.log("yes");
          console.log(res.data);
          console.log("YAAAAAAAAAAAAAAAAAAAYEEET");
          createTripsWindow.hide();
          loadCollector().then((res) => {
            console.log("resolved");
          });
        });
    } catch (error) {
      reject(error);
    }
  }

  async function deleteCollector(){
    try {
      axios.delete(`/collector/id/${params.collector}`, {crossdomain: true}).then((res)=>{
        push(`/collector/`)


      })
    } catch(error){
      reject(error)
    }
  }

  function HideOtherWindows() {
    createTripsWindow.hide();
  }
</script>

<DashboardLayout header hideHeader headerHeight={56} let:scroller>
  <div slot="header">
    <div class="header" class:shadow={!!scroller.scroll}>Page title</div>
  </div>
</DashboardLayout>
<div class="grid h-full grid-cols-2 gap-4">
  <div>
    <!-- <h1 class="title is-4">ID of route/ {currentRoute.namedParams.collector}</h1> -->
    <h1 class="title is-4">ID / {id}</h1>
    <h1 class="title is-4">Name / {name}</h1>
    <h1 class="title is-4">Owner / {owner}</h1>
    <h1 class="title is-4">Description / {description}</h1>
    <button on:click={() => editCollectorWindow.show()}>edit</button>
  </div>
  <div class="h-full">
    <div class="h-full overflow-x-auto overflow-y-auto">
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
            <TripsListItem {trip} {id} />
          {/each}
        </table>
      {:else}
        kut
      {/if}
    </div>
  </div>
</div>

<div
  class="fixed bottom-0 right-0 px-6 py-3 m-5 font-bold text-white bg-blue-500 rounded-full"
  on:click={() => createTripsWindow.show()}
>
  Create
</div>

<Modal bind:this={createTripsWindow}>
  <span slot="title">Create new Trip</span>
  <span slot="content">
    <div class="mb-6 md:flex md:items-center">
      <div class="md:w-1/3">
        <label
          class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
          for="inline-name"
        >
          Name
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          bind:value={$trip.name}
          class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-name"
          type="text"
          placeholder="Trip #"
        />
      </div>
    </div>
    <div class="mb-6 md:flex md:items-center">
      <div class="md:w-1/3">
        <label
          class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
          for="inline-date"
        >
          Date
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          bind:value={$trip.date}
          class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-date"
          type="datetime-local"
        />
      </div>
    </div>
    <div class="mb-6 md:flex md:items-center">
      <div class="md:w-1/3">
        <label
          class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
          for="inline-location"
        >
          Location
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          bind:value={$trip.location}
          class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-location"
          type="text"
          placeholder="Location"
        />
      </div>
    </div>

    <div class="md:flex md:items-center">
      <div class="md:w-1/3" />
      <div class="md:w-2/3" />
    </div>
  </span>
  <span slot="button">
    <button
      type="button"
      on:click={() => createTrip()}
      class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
    >
      Create
    </button>
  </span>
</Modal>

<Modal bind:this={editCollectorWindow}>
  <span slot="title">Edit Collector {name}</span>
  <span slot="content">
    <div class="mb-6 md:flex md:items-center">
      <div class="md:w-1/3">
        <label
          class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
          for="inline-name"
        >
          Name
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          bind:value={$collector.name}
          class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-name"
          type="text"
          default={name}
        />
      </div>
    </div>
    <div class="mb-6 md:flex md:items-center">
      <div class="md:w-1/3">
        <label
          class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
          for="inline-owner"
        >
          Owner
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          bind:value={$collector.owner}
          class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-owner"
          type="text"
          default={owner}
        />
      </div>
    </div>
    <div class="mb-6 md:flex md:items-center">
      <div class="md:w-1/3">
        <label
          class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
          for="inline-description"
        >
          Description
        </label>
      </div>
      <div class="md:w-2/3">
        <textarea
          bind:value={$collector.description}
          class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          default={description}
        />
      </div>
    </div>
    <div class="md:flex md:items-center">
      <div class="md:w-1/3" />
      <div class="md:w-2/3" />
    </div>
  </span>
  <span slot="button">
    <button
      type="button"
      on:click={() => deleteCollector()}
      class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
    >
      Delete
    </button>
    <button
      type="button"
      on:click={() => editCollector()}
      class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
    >
      Edit
    </button>
  </span>
</Modal>
