<script>
  import AddData from "./../../Components/Collector/AddData.svelte";
  import Modal from "./../../Components/UI/Modal.svelte";
  import API from "./../../Services/Api.js";
  import { saveAs } from 'file-saver';

  import { onMount } from "svelte";

  import DashboardLayout from "./../../Layout/DashboardLayout.svelte";
  import DataListItem from "../../Components/Collector/DataListItem.svelte";
  import { trip } from "../../Stores/Trip";

  export let params = {};
  // export let currentRoute;

  export let collector = params.collector;
  export let id = params.trip;
  export let readings = [];

  console.log(params);

  // console.log(currentRoute.namedParams)

  onMount(loadData);

  async function loadData() {
    loadTrip();
    loadReadings();
  }

  async function loadTrip() {
    return new Promise((resolve, reject) => {
      try {
        API.get(`/trips/collector/${collector}/id/${id}`).then((res) => {
          console.log(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async function loadReadings() {
    return new Promise((resolve, reject) => {
      try {
        API.get(`/data/collector/${collector}/trip/${id}`).then((res) => {
          console.log(res);
          // console.log(description)
          // console.log(collector)
          // console.log(res)
          columns = []
          res.forEach(reading => {
            Object.keys(reading).forEach(key => {
              if(!columns.includes(key)){
                columns = [...columns, key]
              }
            })
          });
          readings = res;
          console.log(columns)
          resolve();
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  function exportToCSV(){
    const items = readings
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    const csv = [
      header.join(','), // header row first
      ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
      ].join('\r\n')
    console.log(csv)
    saveAs(new Blob([...csv], {type: "text/plain;charset=utf-8"}), "data.csv")

  }



  export let addDataWindow;
  export let addDataFunc;
  export let editTripWindow;
  export let addGraphWindow;

  export let columns = [];
</script>

<DashboardLayout header hideHeader headerHeight={56} let:scroller>
  <div slot="header">
    <div class="header" class:shadow={!!scroller.scroll}>Page title</div>
  </div>
</DashboardLayout>
<div class="grid h-full grid-cols-2 gap-4">
  <div>
    <span class="font-bold ">Graphs should go here WIP</span>
  </div>
  <div class="h-full m-2">
    {#if readings.length >= 1}
    <button on:click={()=>exportToCSV()}>Download as CSV</button>
      <table>
        <tr>
          {#each columns as key}
            {#if key != "_id"}
              <th>{key}</th>
            {/if}
          {/each}
        </tr>

          {#each readings as reading}
           
            
            <DataListItem data={reading} columns={columns} />
          {/each}

      </table>
    {/if}
  </div>
</div>

<div
  class="fixed bottom-0 right-0 px-6 py-3 m-5 font-bold text-white bg-blue-500 rounded-full"
  on:click={() => {
    addDataWindow.show();
  }}
>
  Add Data
</div>
<div
  class="fixed bottom-0 left-0 px-6 py-3 m-5 font-bold text-white bg-blue-500 rounded-full"
  on:click={() => {
    addGraphWindow.show();
  }}
>
  Add Graph
</div>

<Modal bind:this={addDataWindow}>
  <span slot="content">
    <AddData bind:this={addDataFunc} params={params} />
  </span>
  <span slot="button">
    <button
      type="button"
      on:click={() => addDataFunc.post()}
      class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
    >
      Edit
    </button>
  </span>
</Modal>

<Modal bind:this={editTripWindow}>
  <span slot="title">Edit Old Trip</span>
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
      on:click={() => editTrip()}
      class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
    >
      Edit
    </button>
  </span>
</Modal>

<Modal bind:this={addGraphWindow} />
