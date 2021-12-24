<script>
	import Modal from './../../UI/Modal.svelte';
  import Graph from "./../../UI/Graph.svelte";
  

  export let graph

  export let readings = {};

  import API from "./../../../Services/Api.js";

  export let params = {};

  export let collector = params.collector;
  export let trip = params.trip;
  export let id = graph?._id

  async function update() {
    return new Promise((resolve, reject) => {
      try {
        API.put(`/graph/collector/${collector}/trip/${trip}/id/${id}`, graph);
        reload()
        hide()
        resolve()
      } catch(error){
        reject(error)
      }
    })
  }

  async function remove() {
    return new Promise((resolve, reject) => {
      try {
        API.delete(`/graph/collector/${collector}/trip/${trip}/id/${id}`);
        reload()
        resolve()
      } catch(error){
        reject(error)
      }
    })
  }

  let modal;

  export function show() {
    modal.show();
  }

  export function hide() {
    modal.hide();
  }

  export let reload = () => {};
</script>
<Modal bind:this={modal}>
  <span slot="title">Edit Graph</span>
  <span slot="content">
    <div class="grid h-full grid-cols-2 gap-4">
      <div class="h-full m-2">
        <Graph {readings} graphData={graph} />
      </div>
      <div class="h-full m-2">
        <label for="graphName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Graph
          name:</label>
        <input bind:value={graph.name} name="graphName"
          class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500" />
        {#each graph.graphs as graphData}
            <div class="border border-black">
              <label
                for="displayname"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >Display name:</label
              >
              <input
                name="displayname"
                bind:value={graphData.displayName}
                class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              />
              <label
                for="column"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >Choose data column:</label
              >
              <select
                name="column"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                bind:value={graphData.name}
              >
                {#each Object.keys(readings) as key}
                  <option value={key}>{key}</option>
                {/each}
              </select>
            </div>
          {/each}
          <div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded"
              on:click={() => {
                graph.graphs = [...graph.graphs, {}];
              }}>New Graph</button
            >
          </div>
          <label
            for="displayname"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            <span>Automatic labels:</span>
            <input type="checkbox" bind:checked={graph.label.auto} />
          </label>
      
          <label
            for="column"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >Choose label column:</label
          >
          <select
            disabled={graph.label.auto}
            name="column"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            bind:value={graph.label.name}
          >
            {#each Object.keys(readings) as key}
              <option value={key}>{key}</option>
            {/each}
          </select>
          <label
                for="defaultLabelLength"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >Default width:</label
              >
          <input name="defaultLabelLength"
            type="number"
            bind:value={graph.label.defaultLength}
            class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
      </div>
    </span>
    <span slot="button">
      <button
        type="button"
        on:click={() => remove()}
        class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Delete
      </button>
      <button
        type="button"
        on:click={() => update()}
        class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Create
      </button>
      </span>
  </Modal>