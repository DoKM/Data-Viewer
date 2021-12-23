<script>
  import API from "./../../Services/Api.js";
  import { push, pop, replace } from "svelte-spa-router";

  import { library } from "@fortawesome/fontawesome-svg-core";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
  import {
    FontAwesomeIcon,
    FontAwesomeLayers,
    FontAwesomeLayersText,
  } from "fontawesome-svelte";
  library.add(faTrash);

  export let params = {};

  export let colums = ["test", "test", "test"];
  export let reading = {};
  export let row = [];

  export let dataId = "";

  $: {
    if (reading != null) {
      dataId = reading["_id"];
    }
    if (colums.includes("_id")) {
      let index = colums.indexOf("_id");
      deleteColumn(index);
    }
    if (colums.length == 0) {
      colums = ["new"];
    }
  }
  {
    row = [];
    for (let i = 0; i < colums.length; i++) {
      row[i] = reading[colums[i]];
    }
  }
  function newColum() {
    colums = [...colums, `new ${colums.length + 1}`];
  }

  function checkIfDupeName(index, array) {
    if (array[index] == "") {
      return true;
    }
    for (let i = 0; i < array.length; i++) {
      if (i != index && array[i] === array[index]) {
        return true;
      }
    }
    return false;
  }

  function gatherInfo() {
    let object = {};
    for (let i = 0; i < colums.length; i++) {
      object[colums[i]] = row[i];
    }

    return object;
  }

  function deleteColumn(i) {
    colums = [...colums.slice(0, i), ...colums.slice(i + 1)];
    console.log(row);
    row = [...row.slice(0, i), ...row.slice(i + 1)];
  }

  function validateKeys() {
    for (let i = 0; i < colums.length; i++) {
      if (checkIfDupeName(i, colums)) {
        return false;
      }
    }
    return true;
  }

  export function update() {
    if (validateKeys()) {
      let data = gatherInfo();
      console.log(data);
      API.put(
        `/data/collector/${params.collector}/trip/${params.trip}/id/${dataId}`,
        data
      );
      editDataWindow.hide();
      reload();
    }
  }

  export function deleteData() {
    API.delete(
      `/data/collector/${params.collector}/trip/${params.trip}/id/${dataId}`
    );
    editDataWindow.hide();
    reload();
  }
  export let editDataWindow;
  export let reload = () => {};
</script>

<div class="overflow-x-auto overflow-y-auto">
  <table class="table-auto border-collapse w-full">
    <thead class="bg-gray-50">
      <tr>
        {#each colums as colum, index}
          {#if colum != "_id"}
            <th
              scope="col"
              class="text-left text-xs font-medium text-red-500 uppercase tracking-wider text-center"
            >
              <button on:click={() => deleteColumn(index)}><FontAwesomeIcon icon={faTrash}/></button>
            </th>
          {/if}
        {/each}
        <th scope="col" class="relative px-6 py-3">
          <span class="sr-only">Edit</span>
        </th>
      </tr>

      <tr>
        {#each colums as colum, index}
          {#if colum != "_id"}
            <th
              scope="col"
              class="text-left text-xs font-medium rounded  {checkIfDupeName(
                index,
                colums
              )
                ? 'border-2 bg-red-300 border-rose-500 text-red-500'
                : 'text-gray-500'} uppercase tracking-wider"
            >
              <input
                class="p-0 bg-transparent outline-none border-none"
                bind:value={colums[index]}
                type="text"
              />
            </th>
          {/if}
        {/each}
      </tr>
    </thead>

    <tbody class="bg-white divide-y divide-gray-200">
      <tr>
        {#each colums as colum, index}
          {#if colum != "_id"}
            <td class="whitespace-nowrap text-sm bg-gray-100 text-gray-600">
              <input
                class="p-0 bg-transparent outline-none border-none"
                type="number"
                bind:value={row[index]}
              />
            </td>
          {/if}
        {/each}
      </tr>
    </tbody>
  </table>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-2 px-4 rounded" on:click={() => newColum()}>New Colum</button>
</div>
