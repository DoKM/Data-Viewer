<script>
  import API from "./../../Services/Api.js";
  import {
    link
  } from 'svelte-spa-router'
  import {
    saveAs
  } from "file-saver";

  import {
    onMount
  } from "svelte";

  import DashboardLayout from "./../../Layout/DashboardLayout.svelte";
  import DataListItem from "../../Components/Collector/DataListItem.svelte";

  import Graph from "../../Components/UI/Graph.svelte";

  import EditTrip from './../../Components/Collector/API/EditTrip.svelte';
  import EditData from './../../Components/Collector/API/EditData.svelte';
  import EditGraph from './../../Components/Collector/API/EditGraph.svelte';
  import AddGraph from './../../Components/Collector/API/AddGraph.svelte';
  import AddData from "./../../Components/Collector/API/AddData.svelte";
  


  export let params = {};

  //Data

  export let collector = params.collector;
  export let id = params.trip;
  export let readings = [];
  export let columns = [];
  export let sortedReadings = {};

  export let graphs = []

  export let trip = {}

  //onMount action

  onMount(load);

  async function load() {
    loadTrip();
    loadReadings();
    loadGraphs();
  }


  async function loadTrip() {
    return new Promise((resolve, reject) => {
      try {
        API.get(`/trips/collector/${collector}/id/${id}`).then((res) => {
          trip = res;
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async function loadGraphs() {
    return new Promise((resolve, reject) => {
      try {
        API.get(`/graph/collector/${collector}/trip/${id}`).then((res) => {
          graphs = res;
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
          columns = [];
          res.forEach((reading) => {
            Object.keys(reading).forEach((key) => {
              if (!columns.includes(key)) {
                columns = [...columns, key];
              }
            });
          });
          readings = res;
          sortedReadings = {};
          for (let i = 0; i < columns.length; i++) {
            for (let ii = 0; ii < readings.length; ii++) {
              let numberValue
              try {
                numberValue = parseInt(readings[ii][columns[i]])
                if (numberValue == NaN) {
                  numberValue = 0
                }
              } catch (error) {
                numberValue = 0
              }
              sortedReadings[columns[i]] = [...sortedReadings[columns[i]] || [], numberValue]
              delete sortedReadings["_id"]
            }
          }
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function exportToCSV() {
    const items = readings;
    const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
    const header = Object.keys(items[0]);
    const csv = [
      header.join(","), // header row first
      ...items.map((row) =>
        header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
      ),
    ].join("\r\n");
    console.log(csv);
    saveAs(new Blob([csv], {
      type: "text/plain;charset=utf-8"
    }), "data.csv");
  }

  
  //Modals
  export let addDataWindow;
  export let editDataWindow;
  
  export let editTripWindow;
  
  export let addGraphWindow;
  export let editGraphWindow;
  
  
  //Data for modals
  export let row;
  export let graphEdit;
  
  function editData(index) {

    editDataWindow.loadRow(readings[index])

    editDataWindow.show();
  }

  export function editGraph(id) {

    graphEdit = graphs[id]
    editGraphWindow.show()
  }
</script>

<DashboardLayout header hideHeader headerHeight={56} let:scroller>
  <div slot="header">
    <div class="header" class:shadow={!!scroller.scroll}>Page title</div>
  </div>
  <span slot="nav">
    <li class="sm:inline-block">
      <a use:link={`/collector/${collector}`} class="p-3 hover:text-red-900">Collector</a>
    </li>
  </span>
</DashboardLayout>
<div class="grid h-full grid-cols-2 gap-4">
  <div class="grid h-fit grid-cols-2 gap-4 ">
    {#each graphs as graphData, index}
      <Graph readings={sortedReadings} {graphData} id={index} edit={editGraph}/>
    {/each}
  </div>
  <div class="h-full m-2">
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Trip: {trip.name}</div>
        <p class="text-gray-700 text-base">
          <ul>
            <li>Trip date: {trip.date}</li>
            <li>Trip location: {trip.location}</li>
          </ul>
      </div>
      <div class="px-6 pt-4 pb-2">
        <!-- <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> -->
        {#if readings.length >= 1}
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded" on:click={() => exportToCSV()}>Download as CSV</button>
        {/if}
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded" on:click={() => editTripWindow.show()}>Edit Trip</button>
      </div>
    </div>
    {#if readings.length >= 1}
      <table class="table-auto border-collapse w-full mt-4">
        <thead class="bg-gray-50">
          <tr>
            {#each columns as key}
              {#if key != "_id"}
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >{key}</th
                >
              {/if}
            {/each}
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each readings as reading, index}
            <DataListItem data={reading} {columns} {editData} {index} />
          {/each}
        </tbody>
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


<AddData
  bind:this={addDataWindow}
  {params}
  colums={columns}
  reload={load}
  
/>

<EditData
  bind:this={editDataWindow}
  {params}
  colums={columns}
  reading={row}
  reload={load}
/>


<EditTrip bind:this={editTripWindow} {params} {trip}/>


<AddGraph bind:this={addGraphWindow} readings={sortedReadings} {params} reload={load}/>


<EditGraph bind:this={editGraphWindow} readings={sortedReadings} {params} graph={graphEdit} reload={load}/>